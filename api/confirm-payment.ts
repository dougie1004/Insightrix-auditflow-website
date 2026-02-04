// No next/server import for standard Vercel Edge Functions in Vite projects
export const config = {
    runtime: 'edge',
};

// Simple in-memory cache for idempotency (Edge runtime compatible)
// In production, use Vercel KV or Upstash Redis
const processedOrders = new Map<string, { licenseKey: string; timestamp: number }>();

// Error notification helper
async function notifyError(error: any, context: string) {
    const webhookUrl = process.env.ERROR_WEBHOOK_URL; // Discord or Slack webhook
    if (!webhookUrl) return;

    try {
        await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                content: `🚨 **Payment Error** in ${context}`,
                embeds: [{
                    title: 'Error Details',
                    description: `\`\`\`${JSON.stringify(error, null, 2)}\`\`\``,
                    color: 15158332, // Red
                    timestamp: new Date().toISOString(),
                }]
            }),
        });
    } catch (notifyError) {
        console.error('Failed to send error notification:', notifyError);
    }
}

export default async function handler(req: Request) {
    if (req.method !== 'POST') {
        return new Response(JSON.stringify({ error: 'Method not allowed' }), {
            status: 405,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    try {
        const { paymentKey, orderId, amount, serviceType } = await req.json();

        // 1. Basic Validation
        if (!paymentKey || !orderId || !amount || !serviceType) {
            return new Response(JSON.stringify({ error: 'Missing required fields' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // 2. Idempotency Check - Prevent duplicate processing
        const cached = processedOrders.get(orderId);
        if (cached) {
            // Check if cache is still valid (within 1 hour)
            if (Date.now() - cached.timestamp < 3600000) {
                console.log(`[Idempotency] Returning cached result for orderId: ${orderId}`);
                return new Response(JSON.stringify({
                    status: 'success',
                    message: 'Payment already processed (cached)',
                    licenseKey: cached.licenseKey,
                    serviceType: serviceType,
                }), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' }
                });
            } else {
                // Cache expired, remove it
                processedOrders.delete(orderId);
            }
        }

        // 3. Secret Key from Environment Variable
        const secretKey = process.env.TOSS_SECRET_KEY;
        if (!secretKey) {
            await notifyError({ error: 'TOSS_SECRET_KEY not configured' }, 'Environment Setup');
            return new Response(JSON.stringify({ error: 'Server configuration error' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        const basicToken = btoa(`${secretKey}:`);

        // 4. Confirm Payment with Toss API
        const response = await fetch('https://api.tosspayments.com/v1/payments/confirm', {
            method: 'POST',
            headers: {
                'Authorization': `Basic ${basicToken}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                paymentKey,
                orderId,
                amount,
            }),
        });

        const data = await response.json();

        if (!response.ok) {
            // Log error to monitoring service
            await notifyError({
                orderId,
                amount,
                serviceType,
                tossError: data,
            }, 'Toss API Verification');

            return new Response(JSON.stringify({
                error: 'Payment verification failed',
                details: data.message || 'Unknown error'
            }), {
                status: response.status,
                headers: { 'Content-Type': 'application/json' }
            });
        }

        // 5. Verification Successful -> Issue License Key
        // Generate cryptographically secure license key
        const timestamp = Date.now();
        const randomPart = crypto.randomUUID().split('-')[0].toUpperCase();
        const licenseKey = `LIC-${serviceType.toUpperCase()}-${randomPart}-${timestamp}`;

        // 6. Cache the result for idempotency
        processedOrders.set(orderId, {
            licenseKey,
            timestamp: Date.now(),
        });

        // 7. Clean up old cache entries (keep last 100)
        if (processedOrders.size > 100) {
            const oldestKey = processedOrders.keys().next().value;
            if (oldestKey) processedOrders.delete(oldestKey);
        }

        // 8. TODO: Save to database (Supabase, Firebase, or Vercel Postgres)
        // await saveToDatabase({ orderId, licenseKey, amount, serviceType, userId: data.customerId });

        // 9. Success notification (optional, for monitoring)
        if (process.env.SUCCESS_WEBHOOK_URL) {
            await fetch(process.env.SUCCESS_WEBHOOK_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    content: `✅ **Payment Success**: ${data.orderName} - ₩${amount.toLocaleString()}`,
                }),
            }).catch(() => { }); // Silent fail for notifications
        }

        return new Response(JSON.stringify({
            status: 'success',
            message: 'Payment confirmed and license issued',
            licenseKey: licenseKey,
            plan: data.orderName,
            serviceType: serviceType,
            expiresAt: timestamp + (365 * 24 * 60 * 60 * 1000), // 1 year from now
        }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-store', // Never cache payment confirmations
            }
        });

    } catch (error) {
        console.error('Payment confirmation error:', error);

        // Send critical error notification
        await notifyError(error, 'Payment Confirmation Handler');

        return new Response(JSON.stringify({
            error: 'Internal server error',
            message: 'Please contact support if payment was deducted'
        }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
