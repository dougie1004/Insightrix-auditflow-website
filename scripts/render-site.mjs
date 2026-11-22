import fs from 'node:fs';
import { showcaseProducts as siteProducts, showcaseNavigation as navigation, developmentNotice } from '../src/site-config.js';
import { products as demoProducts } from '../public/demos/demo-data.js';

const arrow = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const wordmark = `<span class="brand-icon" aria-hidden="true"></span><span>Insightrix<span class="brand-period">.</span></span>`;
const header = active => `<a class="skip-link" href="#main">본문으로 이동</a><header class="site-header"><div class="container header-inner"><a href="/" class="wordmark" aria-label="Insightrix 홈">${wordmark}</a><nav class="desktop-nav" aria-label="주 메뉴">${navigation.map(([href,label])=>`<a href="${href}" ${active===href?'aria-current="page"':''}>${label}</a>`).join('')}</nav><a class="button button-dark header-cta" href="/consulting.html">상담 문의 ${arrow}</a><details class="mobile-nav"><summary aria-label="메뉴 열기"><span></span><span></span></summary><nav aria-label="모바일 메뉴">${navigation.map(([href,label])=>`<a href="${href}">${label}</a>`).join('')}<a class="mobile-request" href="/consulting.html">상담 문의 ${arrow}</a></nav></details></div></header>`;
const footer = () => `<footer class="site-footer"><div class="container"><div class="footer-top"><div><span class="eyebrow light">LET’S TALK ABOUT YOUR WORK</span><h2>개선하고 싶은 업무가 있나요?</h2></div><div class="footer-action"><a class="button button-white" href="/consulting.html">상담 문의 ${arrow}</a><p>${developmentNotice}</p></div></div><div class="footer-bottom"><a class="wordmark" href="/">${wordmark}</a><p>회계·감사·기업 운영을 위한 업무 솔루션</p><span>© 2026 Insightrix</span></div></div></footer>`;
const gtm = `<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-PLHLHFBM');</script>`;
const publicBase = 'https://www.insightrix.ai.kr';
const canonicalPath = path => path.replace(/\.html$/, '');
const publicPages = ['/', '/company', '/manufacturing-case', '/consulting', ...siteProducts.map(p=>'/'+p.slug), '/contact'];
const page = (title, description, active, body, theme='') => `<!doctype html><html lang="ko"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${title} | Insightrix</title><meta name="description" content="${escape(description)}">${active ? '<link rel="canonical" href="'+publicBase+canonicalPath(active)+'">' : '<meta name="robots" content="noindex">'}<link rel="icon" type="image/png" sizes="32x32" href="/brand/favicon-32.png"><link rel="icon" type="image/svg+xml" href="/brand/favicon.svg"><link rel="preload" href="/fonts/PretendardVariable.woff2" as="font" type="font/woff2" crossorigin><link rel="stylesheet" href="/src/index.css">${gtm}<script type="module" src="/src/site.js"></script><script src="/demos/embed.js" defer></script></head><body class="marketing ${theme}">${header(active)}<main id="main">${body}</main>${footer()}</body></html>`;

const featureNotes = {
  factory: '실제 공장을 재현한 화면에서 작업의 이동을 재생하고 설비별 부하와 대기를 확인합니다.',
  prf: '보유 기술과 개발 조건을 정리한 뒤 연구개발 후보와 검증할 항목을 확인합니다.',
  wgf: '생산계획 비교를 지시하면 Excel 비교표와 Word 보고서가 만들어집니다. 별도 검토에서 발견된 불일치를 수정하고 Word 보고서를 다시 검토합니다.',
};
const featureMedia = product => {
  const path = product.id === 'wgf' ? '/recordings/wgf-report-demo-v2' : '/recordings/'+product.id+'-function-review';
  return {poster:path+'-poster.webp', gif:path+'.gif', note:featureNotes[product.id]};
};
const featurePanel = product => {
  const m = featureMedia(product);
  return `<details class="demo-recording" id="actual-recording" open><summary><span><b>기능 시연</b><span>${m.note}</span></span><i aria-hidden="true">+</i></summary><div class="film-content"><div class="film-toolbar"><div class="film-actions"><a class="film-full" href="${m.gif}" target="_blank" rel="noopener">영상 크게 보기 ${arrow}</a><button class="film-control" type="button" data-film="${product.id}-feature" aria-pressed="false" aria-controls="film-${product.id}-feature">영상 재생</button></div></div><img id="film-${product.id}-feature" src="${m.poster}" data-poster="${m.poster}" data-animation="${m.gif}" width="1320" height="820" loading="lazy" decoding="async" alt="${product.name} 기능 시연"><p class="film-note"><strong>이 영상에서 확인할 수 있는 기능</strong> · ${m.note}</p></div></details>`;
};
const preview = product => {
    if (featureNotes[product.id]) {
        const m=featureMedia(product);
        return `<div class="mini-app actual-preview" style="--accent:${product.accent};--tint:${product.tint}"><div class="mini-app-bar"><span class="mini-product"><i>${product.short}</i>${product.name}</span></div><a href="/${product.slug}.html#demo"><img src="${m.poster}" width="1320" height="820" alt="${product.name} 기능 시연" decoding="async"></a><a class="mini-open" href="/${product.slug}.html#demo">기능 시연 보기 ${arrow}</a></div>`;
    }

    if (product.id === 'audit') return `<div class="mini-app actual-preview" style="--accent:${product.accent};--tint:${product.tint}"><div class="mini-app-bar"><span class="mini-product"><i>${product.short}</i>${product.name}</span><span class="sample-pill">실행 화면 · 샘플 데이터</span></div><a href="/auditflow.html#demo"><img src="/recordings/auditflow-wording-review-v3-poster.webp" width="1282" height="832" alt="AuditFlow의 실제 감사 시나리오 화면" decoding="async"></a><a class="mini-open" href="/auditflow.html#demo">프로그램 화면 보기 ${arrow}</a></div>`;

    if (product.id === 'accounting') return `<div class="mini-app actual-preview" style="--accent:${product.accent};--tint:${product.tint}"><div class="mini-app-bar"><span class="mini-product"><i>${product.short}</i>${product.name}</span><span class="sample-pill">실행 화면 · 샘플 데이터</span></div><a href="/accountingflow.html#demo"><img src="/recordings/accountingflow-real-poster.webp" width="1280" height="720" alt="AccountingFlow에서 샘플 전표를 조회한 실제 총계정원장 화면" decoding="async"></a><a class="mini-open" href="/accountingflow.html#demo">프로그램 화면 보기 ${arrow}</a></div>`;

    if (product.id === 'operations') return `<div class="mini-app actual-preview" style="--accent:${product.accent};--tint:${product.tint}"><div class="mini-app-bar"><span class="mini-product"><i>${product.short}</i>${product.name}</span><span class="sample-pill">실행 화면 · 샘플 데이터</span></div><a href="/operationsflow.html#demo"><img src="/recordings/operationsflow-details-blurred-20261101-v4-poster.webp" width="1005" height="698" alt="OperationsFlow 실제 프로그램의 생산운영 지표 조회 화면. 예시 지표 숫자는 흐리게 처리했습니다." decoding="async"></a><a class="mini-open" href="/operationsflow.html#demo">프로그램 화면 보기 ${arrow}</a></div>`;

    const view=demoProducts[product.id]?.views?.[0];
    if (!view) return `<div class="mini-app actual-preview" style="--accent:${product.accent};--tint:${product.tint}"><div class="mini-app-bar"><span class="mini-product"><i>${product.short}</i>${product.name}</span><span class="sample-pill">제품 안내</span></div><div class="mini-app-content"><div class="mini-heading"><div><span class="mini-overline">${product.category}</span><h3>${product.shortDescription}</h3></div><span class="mini-symbol">—</span></div><p class="request-description">${product.demoStory}</p><a class="mini-open" href="/${product.slug}.html#demo">제품 소개 보기 ${arrow}</a></div></div>`;
    return `<div class="mini-app" style="--accent:${product.accent};--tint:${product.tint}"><div class="mini-app-bar"><span class="mini-product"><i>${product.short}</i>${product.name}</span><span class="sample-pill">가상 예시</span></div><div class="mini-app-content"><div class="mini-heading"><div><span class="mini-overline">${product.category}</span><h3>${view.section}</h3></div><span class="mini-symbol">↗</span></div><div class="mini-metrics">${view.metrics.slice(0,2).map(metric=>`<div><span>${metric[0]}</span><strong>${metric[1]}<small>건</small></strong></div>`).join('')}<div class="mini-spark" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span><span></span></div></div><div class="mini-table"><div class="mini-table-head"><span>${view.columns[0]}</span><span>${view.columns[1]}</span><span>진행 상태</span></div>${view.items.slice(0,3).map(item=>`<div class="mini-table-row"><b>${item.id}</b><span>${item.cells[0]}</span><em>${item.status}</em></div>`).join('')}</div><a class="mini-open" href="/${product.slug}.html#demo">제품 개발 현황 보기 ${arrow}</a></div></div>`;
};
const renderProductRows = products => products.map(product=>`<a class="product-row" href="/${product.slug}.html" style="--accent:${product.accent};--tint:${product.tint}"><span class="product-number">${product.number}</span><div class="product-row-name"><span class="product-category">${product.category}</span><h3>${product.name}</h3></div><div class="product-row-copy"><p>${product.shortDescription}</p><span>${product.tags.join('  ·  ')}</span></div><span class="row-arrow">${arrow}</span></a>`).join('');
const productRows = renderProductRows(siteProducts);
const fieldExamples = [
  ['수익성','매출만으로는 제품과 고객이 이익에 얼마나 기여하는지 판단하기 어렵습니다.','제품·고객별 매출과 원가를 연결해 손익을 분석하고, 가격·판매 구성 개선의 우선순위를 정합니다.','제품·고객별 손익 분석'],
  ['비용','비용 총액만으로는 물량 증가의 영향과 공정 비효율의 영향을 구분하기 어렵습니다.','작업공수와 설비 가동시간을 공정별로 분석해, 원가를 높이는 요인과 개선 대상 공정을 파악합니다.','공정별 원가 동인 분석'],
  ['재고','총재고만 보면 장기재고와 공급 부족 위험이 상쇄되어 보일 수 있습니다.','품목별 수요·가용재고·입고 예정량을 대조해 적정성을 판단하고, 보충과 장기재고 소진의 우선순위를 정합니다.','재고 적정성 및 공급 부족 분석'],
  ['생산','월간 계획을 변경해도 주간 편성과 일별 작업 배정이 어떻게 달라지는지 한눈에 알기 어렵습니다.','월간 계획, 주간 편성, 일별 작업 배정, 생산실적을 연결해 계획 대비 차이와 조정이 필요한 작업을 확인합니다.','생산계획 대비 실적 관리'],
  ['인력','전체 인원만으로는 공정별 인력 부족과 교대조 간 업무 편차를 설명하기 어렵습니다.','공정·교대조별 필요 공수와 가용 인력을 비교해, 인력 재배치가 필요한 작업을 파악합니다.','공정별 인력 소요 분석'],
  ['생산능력(CAPA)','생산 목표를 높이기 전에 어느 설비와 공정이 전체 생산량을 제한하는지 확인해야 합니다.','설비 가동시간과 인력 투입 조건을 달리해 생산 가능량을 산정하고, 병목 해소 방안을 비교합니다.','생산능력 산정 및 병목 분석'],
];
const fieldCaseHome = `
<section class="container field-proof" aria-labelledby="field-proof-title">
  <div class="section-heading"><div><span class="eyebrow">제조 현장 개선 사례</span><h2 id="field-proof-title">제조업 운영 진단 및<br>수익성 개선</h2></div><p>생산계획과 실적의 차이를 출발점으로 제품·고객별 손익, 공정별 원가, 재고 적정성, 인력과 설비의 생산능력을 함께 분석했습니다.</p></div>
  <div class="field-compare">
    <div><span>개선 전</span><h3>계획과 실적의 관리 기준이 분리돼 있었습니다.</h3><p>생산계획을 변경할 때 재고 수급, 설비 부하, 인력 소요, 수익성 영향을 각각 확인해야 했습니다.</p></div>
    <div><span>개선 후</span><h3>생산계획 조정에 필요한 판단 기준을 마련했습니다.</h3><p>월간 계획부터 일별 작업 배정과 생산실적까지 연결했습니다. 재고 부족과 공정별 생산 여력을 확인하고, 제품·고객별 손익과 비용 분석을 바탕으로 개선 과제의 우선순위를 정했습니다.</p></div>
  </div>
  <ul class="field-tags" aria-label="진단·개선 범위">${fieldExamples.map(([label])=>'<li>'+label+'</li>').join('')}</ul>
  <div class="hero-actions"><a class="button button-dark" href="/consulting.html">상담 문의 ${arrow}</a><a class="text-link" href="/manufacturing-case.html">제조업 컨설팅 사례 보기 ${arrow}</a></div>
  <p class="field-note">첫 상담에서는 문제가 생기는 상황만 알려 주세요. 내부 자료는 보내지 않아도 됩니다.</p>
</section>`;
const heroFactory = siteProducts.find(p=>p.id==='factory');
const home = `<section class="home-hero container">
 <div class="hero-copy"><span class="eyebrow"><i class="status-dot"></i>현장 상주형 경영혁신 컨설팅과 업무 소프트웨어</span><h1>현장에서 문제를 찾고,<br>해결까지 함께합니다.</h1><p class="hero-description">전문 컨설턴트가 고객사에 상주해 현업과 문제의 원인을 찾습니다. 생산계획·재고·수익성 등 운영 이슈를 진단하고, 업무 프로세스를 개선하거나 필요한 소프트웨어를 개발합니다.</p><div class="hero-actions"><a class="button button-dark" href="/consulting.html">상담 문의 ${arrow}</a><a class="text-link" href="/manufacturing-case.html">제조 현장 사례 보기 ${arrow}</a></div></div>
 <div class="hero-visual featured-demo"><div class="preview-caption"><span>대표 시연</span><span>공장 디지털 트윈</span></div>${preview(heroFactory)}<p class="preview-footnote"><span class="tiny-line"></span>가상 공장에 생산계획을 적용해 설비별 부하와 대기를 비교합니다.</p></div>
 </section>${fieldCaseHome}
 <section class="product-index container" id="products"><div class="section-heading"><div><span class="eyebrow">INSIGHTRIX PRODUCTS</span><h2>인사이트릭스 제품</h2></div><p>회계·감사, 제조 운영, 특허 연구, AI 업무 수행을 지원하는 여섯 제품입니다.</p></div><div class="product-rows">${productRows}</div><div class="hero-actions"><a class="text-link" href="/contact.html">제품 파일럿 참여 문의 ${arrow}</a></div></section>
 <section class="principles-section"><div class="container principles-layout"><div><span class="eyebrow">OUR APPROACH</span><h2>결과의 근거를<br>확인할 수 있게 합니다.</h2><p>현업 담당자가 어떤 자료와 판단 기준으로 결과가 만들어졌는지 확인할 수 있도록 설계합니다.</p></div><dl class="principles-list"><div><dt><span>01</span>현장 진단</dt><dd>업무 흐름과 원천 자료를 살펴 지연이나 집계 차이가 발생하는 지점을 찾습니다.</dd></div><div><dt><span>02</span>프로세스 개선과 맞춤 개발</dt><dd>역할과 운영 기준을 정리하고, 필요한 소프트웨어를 고객사의 업무 환경에 맞게 적용합니다.</dd></div><div><dt><span>03</span>현장 적용과 인계</dt><dd>담당자와 적용 결과를 확인하고, 현업이 운영을 이어갈 수 있도록 기준과 사용법을 정리합니다.</dd></div></dl></div></section>`;
fs.writeFileSync('index.html',page('현장 상주형 경영혁신 컨설팅·맞춤형 소프트웨어 개발','전문 컨설턴트가 고객 현장에 상주해 생산계획·재고·수익성 등 운영 문제를 진단하고, 업무 프로세스 개선과 소프트웨어 개발을 함께 진행합니다.','/',home));

function diagram(product){
    if(product.id==='accounting') return `<div class="workflow-art accounting-art"><div class="art-caption">증빙 → 전표 연결 예시<span class="sample-pill">가상 자료</span></div><div class="art-pair"><div class="receipt-art"><span class="document-corner"></span><span class="art-kicker">원천 증빙</span><b>사무용품 영수증</b><span class="art-id">EV-1024</span><div class="receipt-rule"></div><span>소모품 구입</span><strong>248,000<small>원</small></strong><div class="receipt-rule dashed"></div><span class="art-note">예시 거래 자료</span></div><span class="art-connector">${arrow}</span><div class="journal-art"><span class="art-kicker">전표 초안</span><b>JV-0041</b><div><span>차변 · 소모품비</span><strong>248,000</strong></div><div><span>대변 · 미지급금</span><strong>248,000</strong></div><em>담당자 검토 전</em></div></div></div>`;
    if(product.id==='audit') return `<div class="workflow-art audit-art"><div class="art-caption">자료 → 검토 항목 연결 예시<span class="sample-pill">가상 자료</span></div><div class="audit-case"><span class="art-kicker">검토 항목 · AU-032</span><b>중복 지급 여부 검토</b><span class="case-state">감사인 검토 대기</span></div><div class="evidence-connections"><div><span class="evidence-line"></span><i>REF</i><div><b>지급 명세 예시</b><span>REF-104 · 거래 자료</span></div><span>연결</span></div><div><span class="evidence-line"></span><i>REF</i><div><b>회계 전표 예시</b><span>REF-101 · 원천 근거</span></div><span>연결</span></div></div><p class="art-bottom">확인할 질문 <b>같은 거래가 중복 지급되었는가?</b></p></div>`;
    return preview(product);
}
const recording = product => featureNotes[product.id] ? featurePanel(product) : product.id === 'accounting'
    ? `<details class="demo-recording" id="actual-recording" open><summary><span><b>프로그램 사용 모습</b><span>전표 → 총계정원장 → 재무상태표 → 시산표</span></span><i aria-hidden="true">+</i></summary><div class="film-content"><div class="film-toolbar"><p>샘플 전표 조회 화면 · 1.25배속</p><div class="film-actions"><a href="/recordings/accountingflow-real-poster.webp" target="_blank" rel="noopener" class="film-full">정지 화면 크게 보기 ${arrow}</a><button class="film-control" type="button" data-film="accounting-real" aria-pressed="false" aria-controls="film-accounting-real">영상 재생</button></div></div><img id="film-accounting-real" src="/recordings/accountingflow-real-poster.webp" data-poster="/recordings/accountingflow-real-poster.webp" data-animation="/recordings/accountingflow-real-20261030.gif" width="1280" height="720" loading="lazy" decoding="async" alt="AccountingFlow에서 샘플 전표, 총계정원장, 재무상태표와 시산표 메뉴를 직접 선택해 조회하는 화면"><p class="film-note">샘플 전표에서 총계정원장과 재무제표까지 이어지는 조회 과정을 보여줍니다.</p></div></details>`
    : product.id === 'audit'
    ? `<details class="demo-recording" id="actual-recording" open><summary><span><b>프로그램 사용 모습</b><span>프로젝트 목록 → 상세 조회 → 자료 등록 1~3단계</span></span><i aria-hidden="true">+</i></summary><div class="film-content"><div class="film-toolbar"><p>Windows 실행 화면 · 샘플 자료</p><div class="film-actions"><a href="/recordings/auditflow-wording-review-v3-poster.webp" target="_blank" rel="noopener" class="film-full">정지 화면 크게 보기 ${arrow}</a><button class="film-control" type="button" data-film="audit-real" aria-pressed="false" aria-controls="film-audit-real">영상 재생</button></div></div><img id="film-audit-real" src="/recordings/auditflow-wording-review-v3-poster.webp" data-poster="/recordings/auditflow-wording-review-v3-poster.webp" data-animation="/recordings/auditflow-wording-review-v3.gif" width="1282" height="832" loading="lazy" decoding="async" alt="AuditFlow에서 프로젝트와 자료 등록 1~3단계, 민감정보 숨김 완료 상태를 확인하는 화면"><p class="film-note">샘플 자료로 감사 프로젝트를 관리하고 자료를 등록한 뒤, 시나리오를 조회하는 과정입니다.</p></div></details>`
    : product.id === 'operations'
    ? `<details class="demo-recording" id="actual-recording" open><summary><span><b>프로그램 사용 모습</b><span>생산운영 제품군 표 → SCM 품목 상세 → 수익성 비교·차트</span></span><i aria-hidden="true">+</i></summary><div class="film-content"><div class="film-toolbar"><p>실제 화면의 촬영용 사본 · 지표·상세 자료 가림 · 30초</p><div class="film-actions"><a href="/recordings/operationsflow-details-blurred-20261101-v4.webp" target="_blank" rel="noopener" class="film-full">고화질 크게 보기 ${arrow}</a><a href="/recordings/operationsflow-details-blurred-20261101-v4.gif" download class="film-full">GIF 받기</a><button class="film-control" type="button" data-film="operations-real" aria-pressed="false" aria-controls="film-operations-real">영상 재생</button></div></div><img id="film-operations-real" src="/recordings/operationsflow-details-blurred-20261101-v4-poster.webp" data-poster="/recordings/operationsflow-details-blurred-20261101-v4-poster.webp" data-animation="/recordings/operationsflow-details-blurred-20261101-v4.webp" width="1005" height="698" loading="lazy" decoding="async" alt="OperationsFlow의 실제 생산운영·SCM·수익성 세부 UI를 합성 입력으로 조회한 장면. 지표와 상세 자료는 가렸습니다."><p class="film-note">기존 프로그램의 세부 UI를 별도 사본에서 합성 입력으로 실행했습니다. 생산운영의 제품군별 생산현황, SCM의 월간 예상·권고와 SKU 상세, 수익성의 기간 비교 표·월별 손익 차트를 직접 조작해 촬영한 6개 장면입니다. 지표·건수·상세 행은 가렸습니다. 운영 계산 엔진이나 전체 메뉴의 검증을 뜻하지 않습니다.</p><div class="film-actions"><a class="film-full" href="/recordings/operationsflow-details-blurred-20261101-v4-production.webp" target="_blank" rel="noopener">생산운영 정지 화면 크게 보기</a><a class="film-full" href="/recordings/operationsflow-details-blurred-20261101-v4-scm.webp" target="_blank" rel="noopener">SCM 정지 화면 크게 보기</a><a class="film-full" href="/recordings/operationsflow-details-blurred-20261101-v4-profitability.webp" target="_blank" rel="noopener">수익성 정지 화면 크게 보기</a></div></div></details>`
    : `<div class="demo-recording" id="actual-recording"><div class="film-content"><div class="film-toolbar"><p>주요 기능 안내</p></div><p class="film-note">${product.demoStory}</p></div></div>`;

for(const product of siteProducts){
 const body=`<section class="product-hero container" style="--accent:${product.accent};--tint:${product.tint}"><div class="product-hero-copy"><span class="eyebrow">${product.number} / ${product.category}</span><p class="product-wordmark">${product.name}</p><h1>${product.heading.replace('\n','<br>')}</h1><p class="hero-description">${product.summary}</p><div class="hero-actions"><a class="button button-accent" href="#demo">시연 보기 ${arrow}</a><a class="text-link" href="/consulting.html">도입 상담 ${arrow}</a></div><p class="development-copy">${developmentNotice}</p></div><div class="product-art">${diagram(product)}</div></section><section class="container process-section"><div class="process-strip">${product.steps.map((step,i)=>`<div><span>0${i+1}</span><h2>${step[0]}</h2><p>${step[1]}</p></div>`).join('')}</div></section><section class="container demo-section product-demo-section" id="demo"><div class="section-heading"><div><span class="eyebrow" style="color:${product.accent}">INSIDE ${product.name.toUpperCase()}</span><h2>${product.demoStory ? "주요 기능을 확인하세요." : "프로그램 사용 모습을 살펴보세요."}</h2></div><p>${product.id === 'operations' ? '아래 영상에서 생산운영·SCM·수익성의 세부 조회 화면을 살펴보세요.' : product.demoStory ? featureNotes[product.id] : '아래 영상에서 주요 메뉴를 둘러보세요.'}</p></div>${recording(product)}<div class="product-note"><strong>고객사 업무에 맞춰 적용합니다.</strong><p>기존 제품을 바탕으로 고객사의 업무 방식에 맞춰 적용하고, 필요한 기능은 협의해 추가 개발합니다.</p></div><div class="hero-actions"><a class="text-link" href="/contact.html?product=${product.slug}">이 제품의 파일럿 참여 문의 ${arrow}</a></div></section>`;
 fs.writeFileSync(product.slug+'.html',page(product.name+' · '+product.category,product.summary,'/'+product.slug+'.html',body,'product-page'));
}
const contact=`<section class="container contact-layout"><div class="contact-intro"><span class="eyebrow">LET’S START WITH YOUR WORK</span><h1>어떤 업무를<br>바꾸고 싶으신가요.</h1><p>기존 제품이 귀사의 업무에 어떻게 맞는지 파일럿에서 확인해 보세요.</p><div class="contact-note"><span class="note-status"><i class="status-dot"></i>고객사 맞춤 적용</span><h2>파일럿 참여 기업을<br>모집합니다.</h2><p>관심 제품과 현재 업무 방식, 기존 시스템을 확인한 뒤 적용 범위와 참여 기간·비용을 함께 정합니다.</p><div class="contact-products">${siteProducts.map(p=>`<span><i style="background:${p.accent}"></i>${p.name}</span>`).join('')}</div></div></div><div class="contact-form-wrap"><div class="form-heading"><h2>파일럿 참여 문의</h2><span>* 필수 항목</span></div><form action="https://formspree.io/f/xaqnrpnn" method="POST" class="contact-form"><div class="form-grid"><div class="field"><label for="request-name">성함 <span>*</span></label><input id="request-name" type="text" name="name" autocomplete="name" required placeholder="성함을 입력해 주세요"></div><div class="field"><label for="request-email">이메일 <span>*</span></label><input id="request-email" type="email" name="email" autocomplete="email" required placeholder="name@company.com"></div></div><div class="field"><label for="request-company">소속 회사 / 기관</label><input id="request-company" type="text" name="company" autocomplete="organization" placeholder="소속을 입력해 주세요 (선택)"></div><div class="field"><label for="request-message">파일럿에서 검토하고 싶은 업무 <span>*</span></label><textarea id="request-message" name="message" rows="6" required placeholder="파일럿에서 함께 검토하고 싶은 업무와 필요한 기능을 알려 주세요."></textarea></div><p class="form-notice">${developmentNotice}</p><button class="button button-dark form-submit" type="submit">파일럿 참여 문의 보내기 ${arrow}</button></form></div></section>`;
const productInterest = '<div class="field"><label for="request-product">관심 제품</label><select id="request-product" name="product"><option value="">제품 미정</option>'+siteProducts.map(p=>'<option value="'+p.name+'" data-product-slug="'+p.slug+'">'+p.name+'</option>').join('')+'</select></div>';
const pilotContact = contact.replace('<div class="field"><label for="request-message">',productInterest+'<div class="field"><label for="request-message">');
fs.writeFileSync('contact.html',page('파일럿 참여 문의','Insightrix 제품의 고객사 맞춤 적용과 파일럿 참여에 대해 문의해 주세요.','/contact.html',pilotContact));
const company = `
<section class="container company-hero">
  <span class="eyebrow">ABOUT INSIGHTRIX</span>
  <h1>고객의 현장에서<br>문제를 함께 해결합니다.</h1>
  <p>Insightrix는 현장에 들어가 일하는 경영혁신 파트너입니다. 전문 컨설턴트가 고객사에 상주하며 현업과 함께 문제의 원인을 찾습니다. 일하는 방식을 개선하고, 기존 시스템만으로 해결하기 어려운 문제는 필요한 소프트웨어를 만들어 현장에 적용합니다.</p>
</section>
<section class="principles-section" id="field-services">
  <div class="container principles-layout">
    <div><span class="eyebrow">HOW WE WORK</span><h2>권고로 끝내지 않고,<br>현장에서 적용합니다.</h2></div>
    <dl class="principles-list">
      <div><dt><span>01</span>업무가 실제로 돌아가는 방식을 봅니다</dt><dd>담당자와 함께 자료가 만들어지고 의사결정에 쓰이는 과정을 따라갑니다. 어느 단계에서 일이 막히고, 같은 숫자가 다르게 집계되는지 확인합니다.</dd></div>
      <div><dt><span>02</span>문제에 맞는 해법을 만듭니다</dt><dd>역할이나 판단 기준이 모호하다면 업무 흐름부터 정리합니다. 수작업이 반복되면 집계를 자동화하고, 필요한 정보가 흩어져 있다면 여러 시스템의 데이터를 연결합니다.</dd></div>
      <div><dt><span>03</span>현업이 계속 쓸 수 있게 합니다</dt><dd>바꾼 업무 방식과 새 프로그램을 현장에 적용하고 담당자와 함께 결과를 확인합니다. 사용 과정에서 발견한 문제를 고치고, 운영 기준과 사용법을 정리해 넘깁니다.</dd></div>
    </dl>
  </div>
</section>
<section class="container product-index" id="field-example">
  <div class="section-heading"><div><span class="eyebrow">IN PRACTICE</span><h2>제조 현장에서는 이렇게 일합니다.</h2></div><a class="text-link" href="/manufacturing-case.html">제조 현장 개선 사례 보기 ${arrow}</a></div>
  <div class="process-strip">
    <div><span>01</span><h2>계획과 실적이 어긋나는 이유를 찾습니다.</h2><p>영업 수요가 생산계획으로 이어지는 과정과, 계획이 실제 작업으로 배정되는 기준을 현업과 함께 확인합니다.</p></div>
    <div><span>02</span><h2>누가 무엇을 언제 판단할지 정합니다.</h2><p>월간 계획과 주간 조정, 일별 작업 배정이 연결되도록 판단 기준과 담당 역할을 정리합니다.</p></div>
    <div><span>03</span><h2>판단에 필요한 정보를 한곳에서 봅니다.</h2><p>생산실적, 재고, 수요, 수익성이 흩어져 있다면 현업이 함께 살필 수 있는 화면으로 연결합니다.</p></div>
  </div>
</section>
<section class="container product-index" id="products">
  <div class="section-heading"><div><span class="eyebrow">OUR PRODUCTS</span><h2>업무에 맞는 제품을 만듭니다.</h2></div><p>회계·감사부터 제조 운영, 특허 연구, AI 업무 수행까지. 여섯 제품을 살펴보고 필요한 기능을 찾아보세요.</p></div>
  <a class="text-link" href="/#products">제품 전체 보기 ${arrow}</a>
</section>`;
fs.writeFileSync('company.html',page('현장 상주형 경영혁신 컨설팅','고객사에 상주한 전문 컨설턴트가 현업과 함께 문제를 찾아 프로세스를 개선하고 필요한 소프트웨어를 개발합니다.','/company.html',company));

const consulting = `
<section class="container contact-layout">
  <div class="contact-intro">
    <span class="eyebrow">FIELD CONSULTING</span>
    <h1>상담 문의</h1>
    <p>생산계획이 자주 바뀌거나, 결정에 필요한 수치가 부서마다 다르거나, 반복 집계에 시간이 드나요? 해결하고 싶은 문제부터 알려 주세요.</p>
    <div class="contact-note"><h2>어떻게 시작하나요?</h2><p>어떤 업무에서 문제가 생기는지 먼저 듣고, 현장 진단·프로세스 개선·소프트웨어 개발 중 필요한 방향을 함께 검토합니다. 제품 파일럿 신청과는 별개입니다.</p><a class="text-link" href="/manufacturing-case.html">제조 현장 사례 보기 ${arrow}</a></div>
  </div>
  <div class="contact-form-wrap"><div class="form-heading"><h2>상담 문의</h2><span>* 필수 항목</span></div>
    ${contact.slice(contact.indexOf('<form '),contact.indexOf('</form>')+7)
      .replace('class="contact-form">','class="contact-form"><input type="hidden" name="inquiry_type" value="현장 개선 상담">')
      .replace('파일럿에서 검토하고 싶은 업무','개선하고 싶은 업무')
      .replace('파일럿에서 함께 검토하고 싶은 업무와 필요한 기능을 알려 주세요.','어떤 상황에서 문제가 생기고, 무엇이 달라지면 좋을지 알려 주세요.')
      .replace(developmentNotice,'처음 문의할 때는 내부 자료나 고객 개인정보를 보내지 않아도 됩니다.')
      .replace('파일럿 참여 문의 보내기','상담 문의 보내기')}
    <p class="form-notice">제품을 시험해 보고 싶으신가요? <a class="text-link" href="/contact.html">파일럿 참여 문의</a></p>
  </div>
</section>`;
fs.writeFileSync('consulting.html',page('현장 개선 상담','현장 상주형 경영혁신 컨설팅, 프로세스 개선, 맞춤형 소프트웨어 개발에 대해 문의하세요.','/consulting.html',consulting));

const manufacturingCase = `
<section class="container company-hero">
 <span class="eyebrow">제조 현장 개선 사례</span>
 <h1>제조업 운영 진단 및<br>수익성 개선 사례</h1>
 <p>월간 생산계획과 현장 작업의 차이를 분석하고, 제품·고객별 수익성부터 설비 병목까지 운영 전반을 진단한 사례입니다. 고객사명과 내부 수치를 제외했습니다.</p>
</section>
<section class="container field-details" aria-labelledby="field-details-title">
 <div class="section-heading"><div><span class="eyebrow">진단과 개선</span><h2 id="field-details-title">주요 진단 항목과 개선 방향</h2></div><p>분석 결과를 제품별 판매 전략, 재고 관리, 생산 편성, 인력·설비 배치에 반영할 수 있도록 개선안을 마련합니다.</p></div>
 <div class="field-cards">${fieldExamples.map(([label,issue,work,method])=>`<article class="field-card"><span class="eyebrow">${method}</span><h3>${label}</h3><p><strong>주요 이슈</strong> ${issue}</p><p><strong>진단 및 개선 방안</strong> ${work}</p></article>`).join('')}</div>
</section>
<section class="principles-section">
 <div class="container principles-layout field-visual">
  <div><span class="eyebrow">운영 판단 화면</span><h2>생산·재고·수익성을<br>하나의 운영 기준으로 관리합니다.</h2><p>부서 간 수치를 대조하는 데 그치지 않고, 생산 우선순위와 병목 공정의 개선 과제를 공통 기준으로 논의할 수 있습니다.</p><a class="text-link" href="/operationsflow.html#demo">OperationsFlow 시연 보기 ${arrow}</a></div>
  <figure><img src="/recordings/operationsflow-details-blurred-20261101-v4-production.webp" width="1005" height="698" alt="OperationsFlow의 생산운영 지표 예시 화면" loading="lazy" decoding="async"><figcaption>OperationsFlow 제품 시연 · 샘플 자료</figcaption></figure>
 </div>
</section>
<section class="container product-index"><div class="section-heading"><div><span class="eyebrow">다음 단계</span><h2>제조 운영 개선 상담</h2><p>첫 문의에는 주요 이슈만 적어 주세요. 세부 자료는 진단 범위를 협의한 뒤 확인합니다.</p></div><a class="button button-dark" href="/consulting.html">상담 문의 ${arrow}</a></div><div class="product-rows">${renderProductRows(siteProducts.filter(p=>p.id==='operations'||p.id==='factory'))}</div></section>`;
fs.writeFileSync('manufacturing-case.html',page('제조업 경영혁신 사례 · 생산·재고·수익성·CAPA','제조 현장의 수익성, 비용, 재고, 생산, 인력, 생산능력 문제를 진단하고 월간 생산계획과 현장 실행을 연결한 개선 사례입니다.','/manufacturing-case.html',manufacturingCase));
fs.writeFileSync('public/robots.txt','User-agent: *\nAllow: /\nSitemap: '+publicBase+'/sitemap.xml\n');
fs.writeFileSync('public/sitemap.xml','<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+publicPages.map(path=>'  <url><loc>'+publicBase+path+'</loc></url>').join('\n')+'\n</urlset>\n');

const infoPage=(heading,description,action,label)=>`<section class="container information-page"><span class="eyebrow">INSIGHTRIX</span><h1>${heading}</h1><p>${description}</p><a class="button button-dark" href="${action}">${label} ${arrow}</a></section>`;
fs.writeFileSync('thanks.html',page('파일럿 참여 문의 안내',developmentNotice,'',infoPage('관심을 가져주셔서<br>감사합니다.',developmentNotice,'/','홈으로 돌아가기')));
fs.writeFileSync('404.html',page('페이지를 찾을 수 없습니다','요청한 페이지를 찾을 수 없습니다.','',infoPage('찾으시는 페이지가<br>여기에 없네요.','주소를 다시 확인하시거나 제품 소개에서 필요한 내용을 찾아보세요.','/','홈으로 돌아가기')));
