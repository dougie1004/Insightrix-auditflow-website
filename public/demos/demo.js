import { products } from './demo-data.js';

const product = products[document.body.dataset.product];
const root = document.getElementById('demo');
let activeView = 0;
let selectedItem = 0;
const escape = (value) => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const icons = [
    '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
    '<path d="M7 3h10l3 3v15H4V3h3Zm1 6h8M8 13h8M8 17h5"/>',
    '<path d="M3 7h7l2-3h9v16H3V7Zm0 4h18"/>',
    '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>'
];
const icon = (index) => `<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">${icons[index]}</svg>`;
const status = (text) => `<span class="status ${/연결|대조 예시/.test(text) ? 'connected' : 'pending'}"><i></i>${escape(text)}</span>`;

document.documentElement.style.setProperty('--accent', product.accent);
root.innerHTML = `<div class="shell">
    <aside class="sidebar">
        <div class="brand"><span class="brand-mark">${product.short}</span><div>${product.name}<small>INSIGHTRIX</small></div></div>
        <div class="nav-caption">${product.area}</div>
        <nav class="nav" aria-label="${product.name} 시연 메뉴">${product.views.map((view, index) => `<button data-view="${index}" aria-pressed="${index === 0}">${icon(index)}<span>${escape(view.label)}</span></button>`).join('')}</nav>
        <div class="sidebar-note"><span class="sidebar-dot"></span> 제품 소개용 시연<p>개발 중인 제품의 화면 예시입니다.<br>실제 서비스와 다를 수 있습니다.</p></div>
    </aside>
    <main id="workspace"></main>
</div>`;

function renderMetrics(view) {
    const longValues = view.metrics.some(metric => metric[1].length > 6);
    return `<div class="metrics ${longValues ? 'long-values' : ''}">${view.metrics.map((metric, index) => `<section class="metric"><div class="metric-label">${escape(metric[0])}<span>0${index + 1}</span></div><div class="metric-value"><strong>${escape(metric[1])}</strong><span>${escape(metric[2])}</span></div><p>${escape(metric[3])}</p></section>`).join('')}</div>`;
}

function renderBreakdown(view) {
    if (!view.breakdown) return '';
    const total = view.breakdown.reduce((sum, item) => sum + item[1], 0);
    return `<section class="distribution"><div><h2>업무 흐름</h2><p>가상 데이터 구성</p></div><div class="distribution-content"><div class="distribution-bar" role="img" aria-label="${view.breakdown.map(item => `${item[0]} ${item[1]}건`).join(', ')}">${view.breakdown.map((item, index) => `<span class="segment-${index}" style="width:${item[1] / total * 100}%"></span>`).join('')}</div><div class="distribution-labels">${view.breakdown.map((item, index) => `<span><i class="segment-${index}"></i>${escape(item[0])}<b>${item[1]}건</b></span>`).join('')}</div></div></section>`;
}

function renderTable(view) {
    return `<p class="table-hint">표가 넓으면 좌우로 넘겨 확인하세요.</p><div class="table-wrap"><table><thead><tr>${view.columns.map(column => `<th scope="col">${escape(column)}</th>`).join('')}</tr></thead><tbody>${view.items.map((item, index) => `<tr class="${index === selectedItem ? 'selected' : ''}"><td><button class="row-trigger" data-item="${index}" aria-label="${item.id} 시연 상세 보기" aria-pressed="${index === selectedItem}">${item.id}<span>↗</span></button></td>${item.cells.map(cell => `<td>${escape(cell)}</td>`).join('')}<td>${status(item.status)}</td></tr>`).join('')}</tbody></table></div>`;
}

function renderDocuments(view) {
    return `<div class="documents">${view.items.map((item, index) => `<button class="document-card ${index === selectedItem ? 'selected' : ''}" data-item="${index}" aria-pressed="${index === selectedItem}" aria-label="${item.id} ${escape(item.cells[0])} 상세 보기"><span class="document-top"><span class="file-type">${item.type}</span><span class="document-id">${item.id}</span></span><strong>${escape(item.cells[0])}</strong><span class="document-description">${escape(item.cells[1])} · ${escape(item.cells[2])}</span>${status(item.status)}</button>`).join('')}</div>`;
}

function renderTimeline(view) {
    return `<ol class="timeline">${view.items.map((item, index) => `<li><time>${escape(item.cells[0])}</time><button class="timeline-item ${index === selectedItem ? 'selected' : ''}" data-item="${index}" aria-pressed="${index === selectedItem}" aria-label="${item.id} ${escape(item.cells[1])} 상세 보기"><span class="timeline-dot"></span><span class="timeline-heading"><strong>${escape(item.cells[1])}</strong>${status(item.status)}</span><span class="timeline-description">${escape(item.cells[2])}</span><span class="document-id">${item.id} · 예시 기록</span></button></li>`).join('')}</ol>`;
}

function renderDetail(view) {
    const item = view.items[selectedItem];
    return `<section class="panel detail-panel" aria-live="polite" aria-label="선택 항목 상세"><div class="panel-heading"><h2>${escape(view.detailTitle)}</h2><span class="small-label">선택 항목</span></div><div class="detail-id">${item.id}</div>${status(item.status)}<dl class="detail-list">${item.details.map(detail => `<div><dt>${escape(detail[0])}</dt><dd>${escape(detail[1])}</dd></div>`).join('')}</dl><div class="detail-disclaimer">실제 자료 처리나 승인 없이<br>시연 내용만 표시합니다.</div></section>`;
}

function renderView() {
    const view = product.views[activeView];
    for (const button of root.querySelectorAll('[data-view]')) {
        button.setAttribute('aria-pressed', String(Number(button.dataset.view) === activeView));
    }
    const content = view.kind === 'documents' ? renderDocuments(view) : view.kind === 'timeline' ? renderTimeline(view) : renderTable(view);
    document.getElementById('workspace').innerHTML = `
        <header class="topbar"><div class="breadcrumbs">${product.name}<span>/</span><b>${escape(view.label)}</b></div><span class="demo-badge"><i></i>시연 화면 · 예시 데이터</span></header>
        <div class="page-heading"><div><div class="eyebrow">${product.area} · ${escape(view.label)}</div><h1>${escape(view.title)}</h1><p>${escape(view.subtitle)}</p></div><span class="workspace-label">예시 업무 공간</span></div>
        ${renderMetrics(view)}
        ${renderBreakdown(view)}
        <div class="workspace"><section class="panel content-panel"><div class="panel-heading"><h2>${escape(view.section)}</h2><span class="small-label">예시 ${view.items.length}건</span></div>${content}<p class="list-note">항목을 선택하면 연결 정보와 검토 내용을 확인할 수 있습니다.</p></section>${renderDetail(view)}</div>
        <footer class="demo-footer"><p><strong>제품 소개용 화면입니다.</strong> 모든 수치와 기록은 가상 예시이며 실제 구현·운영 결과를 나타내지 않습니다.</p><a href="/contact.html" target="_top">사용 요청 <span aria-hidden="true">↗</span></a></footer>
        <p class="development-note">프로그램은 현재 개발 중입니다. 사용을 요청하시면 프로그램을 별도로 보내드립니다.</p>`;
}

root.addEventListener('click', event => {
    const menu = event.target.closest('[data-view]');
    const item = event.target.closest('[data-item]');
    if (menu) {
        activeView = Number(menu.dataset.view);
        selectedItem = 0;
        renderView();
    } else if (item) {
        const focusedIndex = item.dataset.item;
        selectedItem = Number(focusedIndex);
        renderView();
        root.querySelector(`[data-item="${focusedIndex}"]`)?.focus({preventScroll:true});
    }
});
renderView();

// Fit the parent preview to the selected view without nested vertical scrolling.
if (window.parent !== window) {
    const reportHeight = () => window.parent.postMessage({type:'insightrix:demo-size',height:root.querySelector('.shell').offsetHeight}, window.location.origin);
    new ResizeObserver(reportHeight).observe(root.querySelector('.shell'));
    window.addEventListener('load', reportHeight);
}
