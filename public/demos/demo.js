import { products } from './demo-data.js?v=20261028b';

const product = products[document.body.dataset.product];
const tints = { accounting: '#edf1ff', audit: '#eaf4ed', operations: '#f8eee5' };
const root = document.getElementById('demo');
const state = { view: 0, selected: 0, query: '', status: 'all' };
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const paths = [
    '<rect x="3" y="3" width="7" height="7" rx="1.3"/><rect x="14" y="3" width="7" height="7" rx="1.3"/><rect x="3" y="14" width="7" height="7" rx="1.3"/><rect x="14" y="14" width="7" height="7" rx="1.3"/>',
    '<path d="M6 3h9l4 4v14H5V3h1Zm3 7h6m-6 4h6m-6 4h4"/>',
    '<path d="M3 8h7l2-3h9v15H3V8Zm0 4h18"/>',
    '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
];
const icon = index => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">${paths[index]}</svg>`;
const searchIcon = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5"/><path d="m15.5 15.5 4.5 4.5"/></svg>';
const view = () => product.views[state.view];
const badge = text => `<span class="badge ${/연결|대조 예시/.test(text)?'linked':'waiting'}"><i></i>${escape(text)}</span>`;
document.documentElement.style.setProperty('--accent', product.accent);
document.documentElement.style.setProperty('--tint', tints[document.body.dataset.product]);
root.innerHTML = `<div class="demo-shell"><aside class="sidebar"><a href="/" target="_top" class="app-company" aria-label="Insightrix 홈"><svg viewBox="0 0 28 28" fill="none" aria-hidden="true"><path d="M5 22V9m9 13V4m9 18V14" stroke="currentColor" stroke-width="3" stroke-linecap="round"/></svg>Insightrix.</a><div class="app-product"><span>${product.short}</span><div><strong>${product.name}</strong><small>${product.area}</small></div></div><span class="sidebar-caption">업무 공간</span><nav aria-label="${product.name} 시연 메뉴">${product.views.map((item,index)=>`<button data-view="${index}" aria-pressed="${index===0}">${icon(index)}<span>${escape(item.label)}</span></button>`).join('')}</nav><div class="sidebar-footer"><span><i></i>소개용 시연</span><p>가상 데이터로 구성한<br>제품 화면 예시입니다.</p></div></aside><main id="workspace"></main></div>`;

function metrics(current) {
    const long=current.metrics.some(item=>item[1].length>6);
    return `<div class="stats-strip ${long?'long-values':''}">${current.metrics.map(item=>`<section><span>${escape(item[0])}</span><strong>${escape(item[1])}<small>${escape(item[2])}</small></strong><p>${escape(item[3])}</p></section>`).join('')}</div>`;
}

function contextChart(current) {
    if(current.breakdown){
        const total=current.breakdown.reduce((sum,item)=>sum+item[1],0);
        return `<section class="context-chart"><div><span class="chart-title">업무 구성</span><small>가상 예시 전체 ${total}건</small></div><div class="stacked-chart"><div class="stacked-track" role="img" aria-label="${current.breakdown.map(item=>item[0]+' '+item[1]+'건').join(', ')}">${current.breakdown.map((item,index)=>`<i class="segment-${index}" style="width:${item[1]/total*100}%"></i>`).join('')}</div><div class="chart-legend">${current.breakdown.map((item,index)=>`<span><i class="segment-${index}"></i>${escape(item[0])}<b>${item[1]}건</b></span>`).join('')}</div></div></section>`;
    }
    if(document.body.dataset.product==='operations'&&state.view===2){
        const entries=current.items.map(item=>({id:item.id,opening:Number(item.cells[0].replaceAll(',','')),closing:Number(item.cells[3].replaceAll(',',''))}));
        const maximum=Math.max(...entries.flatMap(item=>[item.opening,item.closing]));
        const columns=entries.map((item,index)=>{const x=42+index*126;const h1=item.opening/maximum*62,h2=item.closing/maximum*62;return `<rect x="${x}" y="${82-h1}" width="22" height="${h1}" rx="2" fill="#c9d3ce"/><rect x="${x+27}" y="${82-h2}" width="22" height="${h2}" rx="2" fill="${product.accent}"/><text x="${x+25}" y="106" text-anchor="middle">${item.id}</text>`;}).join('');
        return `<figure class="inventory-chart"><figcaption><strong>품목별 재고 흐름</strong><span><i class="opening"></i>기초<i class="closing"></i>기말 · EA</span></figcaption><svg viewBox="0 0 550 120" role="img" aria-label="${entries.map(item=>item.id+' 기초 '+item.opening+' EA, 기말 '+item.closing+' EA').join('; ')}"><path d="M20 82h510" stroke="#dce3dd"/>${columns}</svg></figure>`;
    }
    if(document.body.dataset.product==='accounting'&&state.view===1){
        return `<section class="balance-chart"><div><span>차변 합계</span><i></i><strong>881,000원</strong></div><div><span>대변 합계</span><i></i><strong>881,000원</strong></div><p>가상 전표 4건의 금액 대조 예시</p></section>`;
    }
    return '';
}

function visibleItems(){
    const query=state.query.trim().toLowerCase();
    return view().items.map((item,index)=>({item,index})).filter(({item})=>(state.status==='all'||item.status===state.status)&&(!query||[item.id,...item.cells,item.status].join(' ').toLowerCase().includes(query)));
}

function table(current,items){
    return `<p class="table-hint">표가 넓으면 좌우로 넘겨 확인하세요.</p><div class="table-scroll"><table><thead><tr>${current.columns.map(column=>`<th scope="col">${escape(column)}</th>`).join('')}</tr></thead><tbody>${items.map(({item,index})=>`<tr class="${state.selected===index?'selected':''}"><td><button class="record-link" data-item="${index}" aria-label="${item.id} 시연 상세 보기" aria-pressed="${state.selected===index}">${item.id}<span aria-hidden="true">↗</span></button></td>${item.cells.map(cell=>`<td>${escape(cell)}</td>`).join('')}<td>${badge(item.status)}</td></tr>`).join('')}</tbody></table></div>`;
}

function documents(items){
    return `<div class="document-grid">${items.map(({item,index})=>`<button data-item="${index}" aria-label="${item.id} ${escape(item.cells[0])} 상세 보기" aria-pressed="${state.selected===index}" class="document-tile ${state.selected===index?'selected':''}"><div class="document-tile-top"><span class="paper-icon">${item.type}</span><span>${item.id}</span></div><strong>${escape(item.cells[0])}</strong><p>${escape(item.cells[1])}<br>${escape(item.cells[2])}</p>${badge(item.status)}</button>`).join('')}</div>`;
}

function timeline(items){
    return `<ol class="activity-list">${items.map(({item,index})=>`<li><time>${escape(item.cells[0])}</time><button data-item="${index}" aria-label="${item.id} ${escape(item.cells[1])} 상세 보기" aria-pressed="${state.selected===index}" class="activity-record ${state.selected===index?'selected':''}"><i class="activity-point"></i><div><strong>${escape(item.cells[1])}</strong>${badge(item.status)}</div><p>${escape(item.cells[2])}</p><small>${item.id} · 예시 기록</small></button></li>`).join('')}</ol>`;
}

function detail(){
    const current=view();
    const item=current.items[state.selected];
    if(!item)return '<div class="detail-empty">항목을 선택하면<br>연결 정보가 여기에 표시됩니다.</div>';
    return `<div class="detail-top"><span>선택 항목</span>${badge(item.status)}</div><h2>${escape(current.detailTitle)}</h2><div class="detail-code">${item.id}</div>${current.kind==='documents'?`<div class="document-preview"><span class="paper-icon large">${item.type}</span><strong>${escape(item.cells[0])}</strong><span>실제 파일이 없는 가상 자료</span></div>`:''}<dl class="detail-fields">${item.details.map(pair=>`<div><dt>${escape(pair[0])}</dt><dd>${escape(pair[1])}</dd></div>`).join('')}</dl><div class="detail-note">실제 자료 처리나 승인 없이<br>시연 내용만 표시합니다.</div>`;
}

function renderRecords(){
    const current=view(),items=visibleItems();
    if(!items.some(entry=>entry.index===state.selected))state.selected=items[0]?.index??null;
    document.getElementById('record-count').textContent=items.length+'개 예시';
    document.getElementById('record-list').innerHTML=items.length?(current.kind==='documents'?documents(items):current.kind==='timeline'?timeline(items):table(current,items)):`<div class="empty-state">${searchIcon}<strong>검색 결과가 없습니다.</strong><p>검색어와 상태 조건을 다시 확인해 주세요.</p><button data-reset>조건 초기화</button></div>`;
    document.getElementById('detail-content').innerHTML=detail();
}

function renderWorkspace(){
    const current=view();
    for(const button of root.querySelectorAll('[data-view]'))button.setAttribute('aria-pressed',String(Number(button.dataset.view)===state.view));
    const statuses=[...new Set(current.items.map(item=>item.status))];
    document.getElementById('workspace').innerHTML=`<header class="app-topbar"><div><span>${product.name}</span><i>/</i><b>${escape(current.label)}</b></div><span class="demo-mode"><i></i>소개용 시연 · 가상 데이터</span></header><div class="workspace-body"><div class="screen-heading"><div><span class="screen-category">${product.area}</span><h1>${escape(current.title)}</h1><p>${escape(current.subtitle)}</p></div><a href="/contact.html" target="_top" class="app-request">파일럿 참여 문의 <span aria-hidden="true">↗</span></a></div>${metrics(current)}${contextChart(current)}<div class="workbench"><section class="records-panel"><div class="records-heading"><h2>${escape(current.section)}</h2><span id="record-count"></span></div><div class="record-toolbar"><label class="record-search">${searchIcon}<input type="search" data-search aria-label="현재 화면 검색" placeholder="번호나 항목 검색" value="${escape(state.query)}"></label><select data-status aria-label="상태 필터"><option value="all">전체 상태</option>${statuses.map(text=>`<option value="${escape(text)}">${escape(text)}</option>`).join('')}</select><button class="reset-button" data-reset aria-label="검색 조건 초기화">↺</button></div><div id="record-list"></div><p class="record-help">항목을 선택해 연결 정보와 검토 내용을 확인하세요.</p></section><aside class="detail-panel" aria-label="선택 항목 상세" aria-live="polite" id="detail-content"></aside></div><footer class="demo-footer"><p><strong>제품 소개용 화면입니다.</strong> 모든 수치와 기록은 가상 예시이며 실제 구현·운영 결과를 나타내지 않습니다.</p><span>INSIGHTRIX / ${product.short}</span></footer><p class="development-note">현재 개발 중인 Insightrix 제품의 파일럿 참여 기업을 모집합니다. 참여 관련 사항은 문의를 통해 안내드립니다.</p></div>`;
    root.querySelector('[data-status]').value=state.status;
    renderRecords();
}

root.addEventListener('click',event=>{
    const menu=event.target.closest('[data-view]');
    const item=event.target.closest('[data-item]');
    if(menu){state.view=Number(menu.dataset.view);state.selected=0;state.query='';state.status='all';renderWorkspace();}
    else if(item){state.selected=Number(item.dataset.item);renderRecords();root.querySelector(`[data-item="${state.selected}"]`)?.focus({preventScroll:true});}
    else if(event.target.closest('[data-reset]')){state.query='';state.status='all';root.querySelector('[data-search]').value='';root.querySelector('[data-status]').value='all';renderRecords();root.querySelector('[data-search]').focus();}
});
root.addEventListener('input',event=>{if(event.target.matches('[data-search]')){state.query=event.target.value;renderRecords();}});
root.addEventListener('change',event=>{if(event.target.matches('[data-status]')){state.status=event.target.value;renderRecords();}});
root.addEventListener('keydown',event=>{const button=event.target.closest('[data-view]');if(!button||!['ArrowDown','ArrowUp','ArrowLeft','ArrowRight','Home','End'].includes(event.key))return;const index=Number(button.dataset.view),count=product.views.length;const next=event.key==='Home'?0:event.key==='End'?count-1:(index+(['ArrowDown','ArrowRight'].includes(event.key)?1:-1)+count)%count;event.preventDefault();const target=root.querySelector(`[data-view="${next}"]`);target.focus();target.click();});
renderWorkspace();
if(window.parent!==window){const reportHeight=()=>window.parent.postMessage({type:'insightrix:demo-size',height:root.querySelector('.demo-shell').offsetHeight},window.location.origin);new ResizeObserver(reportHeight).observe(root.querySelector('.demo-shell'));window.addEventListener('load',reportHeight);}
