// Only accept sizing messages from a same-origin product demo embedded here.
window.addEventListener('message', (event) => {
    if (event.origin !== window.location.origin || event.data?.type !== 'insightrix:demo-size') return;
    const height = event.data.height;
    if (!Number.isFinite(height) || height < 400 || height > 2400) return;
    for (const frame of document.querySelectorAll('iframe.product-demo')) {
        if (frame.contentWindow === event.source) {
            frame.style.height = Math.ceil(height) + 'px';
            break;
        }
    }
});
