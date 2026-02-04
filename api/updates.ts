// No next/server import for standard Vercel Edge Functions in Vite projects
export const config = {
    runtime: 'edge',
};

interface UpdateManifest {
    version: string;
    notes: string;
    pub_date: string;
    platforms: {
        'windows-x86_64': {
            signature: string;
            url: string;
        };
        'darwin-x86_64': {
            signature: string;
            url: string;
        };
        'darwin-aarch64': {
            signature: string;
            url: string;
        };
    };
}

export default async function handler(req: Request) {
    // Get service type from query params (accounting or audit)
    const { searchParams } = new URL(req.url);
    const serviceType = searchParams.get('service') || 'accounting';
    const currentVersion = searchParams.get('current_version') || '0.0.0';

    // In production, these should be stored in a database or CMS
    // For now, we'll use environment variables
    const latestVersion = process.env[`${serviceType.toUpperCase()}_LATEST_VERSION`] || '1.0.0';
    const releaseNotes = process.env[`${serviceType.toUpperCase()}_RELEASE_NOTES`] || 'Bug fixes and performance improvements';
    const pubDate = process.env[`${serviceType.toUpperCase()}_PUB_DATE`] || new Date().toISOString();

    // Base URL for downloads (S3, R2, or Vercel Blob)
    const baseUrl = process.env.DOWNLOAD_BASE_URL || 'https://your-cdn.com/releases';

    // Construct download URLs
    const serviceName = serviceType === 'accounting' ? 'AccountingFlow' : 'AuditFlow';

    const manifest: UpdateManifest = {
        version: latestVersion,
        notes: releaseNotes,
        pub_date: pubDate,
        platforms: {
            'windows-x86_64': {
                signature: process.env[`${serviceType.toUpperCase()}_WIN_SIGNATURE`] || '',
                url: `${baseUrl}/${serviceName}_${latestVersion}_x64_en-US.msi.zip`,
            },
            'darwin-x86_64': {
                signature: process.env[`${serviceType.toUpperCase()}_MAC_INTEL_SIGNATURE`] || '',
                url: `${baseUrl}/${serviceName}_${latestVersion}_x64.app.tar.gz`,
            },
            'darwin-aarch64': {
                signature: process.env[`${serviceType.toUpperCase()}_MAC_ARM_SIGNATURE`] || '',
                url: `${baseUrl}/${serviceName}_${latestVersion}_aarch64.app.tar.gz`,
            },
        },
    };

    // Check if update is needed
    const needsUpdate = compareVersions(currentVersion, latestVersion) < 0;

    if (!needsUpdate) {
        return new Response(JSON.stringify({
            message: 'No update available',
            current: currentVersion,
            latest: latestVersion
        }), {
            status: 204,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    return new Response(JSON.stringify(manifest), {
        status: 200,
        headers: {
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
        },
    });
}

// Simple semantic version comparison
function compareVersions(v1: string, v2: string): number {
    const parts1 = v1.split('.').map(Number);
    const parts2 = v2.split('.').map(Number);

    for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
        const num1 = parts1[i] || 0;
        const num2 = parts2[i] || 0;

        if (num1 < num2) return -1;
        if (num1 > num2) return 1;
    }

    return 0;
}
