import { siteProducts } from './site-config.js';

function updateTabList(button) {
    const tabs = [...button.closest('[role="tablist"]').querySelectorAll('[role="tab"]')];
    for (const tab of tabs) {
        const active = tab === button;
        tab.setAttribute('aria-selected', String(active));
        tab.tabIndex = active ? 0 : -1;
    }
}

document.addEventListener('click', event => {
    const preview = event.target.closest('[data-preview]');
    const demo = event.target.closest('[data-demo]');
    if (preview) {
        const template = document.getElementById('preview-' + preview.dataset.preview);
        const panel = document.getElementById('hero-preview');
        if (!template || !panel) return;
        updateTabList(preview);
        panel.replaceChildren(template.content.cloneNode(true));
        panel.setAttribute('aria-labelledby', preview.id);
    }
    if (demo) {
        const product = siteProducts.find(p => p.slug === demo.dataset.demo);
        if (!product) return;
        updateTabList(demo);
        const frame = document.getElementById('home-demo-frame');
        frame.src = '/demos/' + product.slug + '.html';
        frame.title = product.name + ' 소개용 시연 — 가상 예시 데이터';
    }
    for (const menu of document.querySelectorAll('.mobile-nav[open]')) {
        if (!menu.contains(event.target) || event.target.closest('a')) menu.open = false;
    }
});

document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
        for (const menu of document.querySelectorAll('.mobile-nav[open]')) {
            menu.open = false;
            menu.querySelector('summary').focus();
        }
    }
    const tab = event.target.closest('[role="tab"][data-preview], [role="tab"][data-demo]');
    if (!tab || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
    const tabs = [...tab.closest('[role="tablist"]').querySelectorAll('[role="tab"]')];
    const index = tabs.indexOf(tab);
    const next = event.key === 'Home' ? 0 : event.key === 'End' ? tabs.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length;
    event.preventDefault();
    tabs[next].focus();
    tabs[next].click();
});

function stopFilm(button) {
    const image = document.getElementById(button.getAttribute('aria-controls'));
    if (!image) return;
    image.src = image.dataset.poster;
    button.setAttribute('aria-pressed', 'false');
    button.textContent = '영상 재생';
}
document.addEventListener('click', event => {
    const button = event.target.closest('[data-film]');
    if (!button) return;
    if (button.getAttribute('aria-pressed') === 'true') return stopFilm(button);
    const image = document.getElementById(button.getAttribute('aria-controls'));
    if (!image) return;
    image.src = image.dataset.animation;
    button.setAttribute('aria-pressed', 'true');
    button.textContent = '영상 멈추기';
});
for (const recording of document.querySelectorAll('.demo-recording')) {
    recording.addEventListener('toggle', () => {
        if (!recording.open) stopFilm(recording.querySelector('[data-film]'));
    });
}
document.addEventListener('visibilitychange', () => {
    if (document.hidden) document.querySelectorAll('[data-film]').forEach(stopFilm);
});

window.matchMedia('(prefers-reduced-motion: reduce)').addEventListener('change', event => {
    if (event.matches) document.querySelectorAll('[data-film]').forEach(stopFilm);
});
