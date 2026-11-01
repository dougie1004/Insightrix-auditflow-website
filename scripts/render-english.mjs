import fs from 'node:fs';
const arrow = '<span aria-hidden="true">↗</span>';
const notice = 'Insightrix products are under development. Contact us to discuss pilot participation, availability and scope.';
const products = [
 ['accountingflow','AccountingFlow','Accounting','Review journals, ledgers and financial statements.','View journal entries, the general ledger, the balance sheet and the trial balance. Data entry and external service integrations are in preparation.',[['Review journals','Inspect dates, counterparties, debits and credits in sample entries.'],['Explore the ledger','Review transactions and amounts reflected in the general ledger.'],['View statements','Review aggregated balance sheet and trial balance figures.']]],
 ['auditflow','AuditFlow','Audit review','Manage audit projects and supporting data.','Create audit projects, register data and browse audit scenarios. AI analysis and final reports are in preparation.',[['Manage projects','Review audit scope and project status.'],['Collect data','Import CSV files, inspect their contents and save them.'],['Explore scenarios','Browse audit scenarios by business area and risk level.']]],
 ['operationsflow','OperationsFlow','Business operations','Production, SCM and profitability in one view.','Review key production, SCM and profitability indicators in an integrated application. Select a period and business area to view relevant indicators.',[['Review production','Inspect production volume, equipment and work productivity.'],['Check SCM','Review demand, plans and key SCM indicators.'],['Explore profitability','View sales and profit indicators together.']]]
];
const replacements = {
 '본문으로 이동':'Skip to content','Insightrix 홈':'Insightrix home','주 메뉴':'Main navigation','모바일 메뉴':'Mobile navigation','메뉴 열기':'Open menu','파일럿 참여 문의':'Pilot inquiry','파일럿 참여':'Pilot participation','소개':'About',
 '확인하고 싶은 업무,<br>함께 이야기해요.':'Let’s talk about<br>your work.', '회계·감사·기업 운영을 위한 업무 솔루션':'Tools for accounting, audit and business operations',
 '프로그램 사용 모습':'Application recording','전표 → 총계정원장 → 재무상태표 → 시산표':'Journals → General ledger → Balance sheet → Trial balance','프로젝트 목록 → 상세 조회 → 자료 등록 1~3단계':'Projects → Details → Data registration steps 1–3','전체 지표 → 생산운영 → SCM → 수익성':'Overview → Production → SCM → Profitability',
 '개발 중인 프로그램 · 샘플 전표로 촬영 · 1.25배속':'Development version · Sample journals · 1.25× speed','개발 중인 Windows 프로그램 · 샘플 데이터로 촬영':'Windows development version · Recorded using sample data','실제 구현 화면 · 고화질 · 예시 데이터 · 19.5초':'Implemented application · High definition · Sample data · 19.5 seconds',
 '정지 화면 크게 보기':'Open full-size still','고화질 크게 보기':'Open high-definition recording','GIF 받기':'Download GIF','영상 재생':'Play recording',
 '샘플 전표로 전표·원장·재무제표를 살펴보는 모습입니다. 재생 버튼을 누르면 화면이 움직입니다. 자료 입력과 외부 서비스 연동은 준비 중입니다.':'Recorded with sample journals. Select Play recording to view journals, ledgers and statements. Data entry and external integrations are in preparation.',
 '샘플 데이터로 프로그램을 사용하는 모습입니다. 재생 버튼을 누르면 화면이 움직입니다. AI 분석과 최종 보고서는 준비 중입니다.':'Recorded using sample data. Select Play recording to watch the application. AI analysis and final reports are in preparation.',
 '구현된 프로그램을 예시 데이터로 실행하고 Chrome에서 직접 조회한 4개 장면입니다. 재생 버튼을 누르면 장면이 순서대로 바뀝니다. 실제 회사명과 업무자료는 포함하지 않았습니다.':'Four scenes recorded from the implemented application in Chrome using example data. Select Play recording to view the sequence. No real company names or business records are included.',
 '실제 AccountingFlow 개발 버전에서 샘플 전표, 총계정원장, 재무상태표와 시산표 메뉴를 직접 선택해 조회하는 화면':'AccountingFlow development application showing sample journals, ledger and financial statements',
 'AuditFlow에서 프로젝트와 자료 등록 1~3단계, 민감정보 숨김 완료 상태를 확인하는 화면':'AuditFlow projects, data registration steps 1–3 and sensitive-data masking status',
 'OperationsFlow 통합 운영 화면에서 업무 필터로 생산운영·SCM·수익성 지표를 조회하는 모습. 수치는 모두 예시입니다.':'OperationsFlow production, SCM and profitability filters with example figures',
};
function translate(s) { for (const [ko,en] of Object.entries(replacements)) s=s.split(ko).join(en); return s; }
const rows = products.map(([slug,name,category,heading,summary]) => `<a class="product-row" href="/en/${slug}.html"><div class="product-row-name"><span>${category}</span><h3>${name}</h3></div><div class="product-row-copy"><p>${summary}</p></div>${arrow}</a>`).join('');
function wrap(slug,title,body) {
 let ko=fs.readFileSync(`${slug}.html`,'utf8');
 let head=ko.split('<body')[0].replace('lang="ko"','lang="en"').replace(/<title>.*?<\/title>/,`<title>${title} | Insightrix</title>`).replace(/<meta name="description" content="[^"]*">/,`<meta name="description" content="${notice}">`);
 let header=ko.match(/<a class="skip-link"[\s\S]*?<\/header>/)[0];
 header=header.replace(/<a class="language-switch"[^>]*>EN<\/a>/,`<a class="language-switch" href="${slug==='index'?'/':'/'+slug+'.html'}" lang="ko" hreflang="ko" aria-label="한국어 페이지 보기">한국어</a>`);
 header=header.replace(/href="\/(?!en\/|src\/|#)([^"]*)"/g,(_,path)=>`href="/en/${path}"`);
 // The Korean counterpart must remain outside /en/.
 header=header.replace(/(<a class="language-switch" href=")[^"]+/,`$1${slug==='index'?'/':'/'+slug+'.html'}`);
 let footer=ko.match(/<footer[\s\S]*?<\/footer>/)[0].replace(/href="\//g,'href="/en/').replace(/<p>현재 개발 중인[\s\S]*?<\/p>/,`<p>${notice}</p>`);
 const counterpart=slug==='index'?'/':'/'+slug+'.html';
 head += `<link rel="alternate" hreflang="ko" href="https://insightrix.ai.kr${counterpart}"><link rel="alternate" hreflang="en" href="https://insightrix.ai.kr/en/${slug==='index'?'':slug+'.html'}">`;
 return head+`<body class="marketing">${translate(header)}<main id="main">${body}</main>${translate(footer)}</body></html>`;
}
fs.mkdirSync('en',{recursive:true});
const section=(title,text)=>`<section class="container company-hero"><span class="eyebrow">INSIGHTRIX</span><h1>${title}</h1><p>${text}</p></section>`;
fs.writeFileSync('en/index.html',wrap('index','Tools for accounting, audit and business operations',section('Bring scattered evidence<br>into a clear workflow.','We build tools to help people review evidence and prepare decisions across accounting, audit and business operations.')+`<section class="container product-index"><h2>Three products. One clear purpose.</h2>${rows}<p>${notice}</p><a class="button button-dark" href="/en/contact.html">Discuss a pilot ${arrow}</a></section>`));
for(const [slug,name,category,heading,summary,steps] of products){
 const ko=fs.readFileSync(slug+'.html','utf8');
 const recording=translate(ko.match(/<details class="demo-recording"[\s\S]*?<\/details>/)[0]);
 const body=section(heading,summary)+`<section class="container process-section"><div class="process-strip">${steps.map(([h,p],i)=>`<div><span>0${i+1}</span><h2>${h}</h2><p>${p}</p></div>`).join('')}</div></section><section class="container demo-section" id="demo"><h2>Explore the application</h2>${recording}<p>${notice} Screens and recordings use sample data.</p><a class="button button-dark" href="/en/contact.html">Pilot inquiry ${arrow}</a></section>`;
 fs.writeFileSync(`en/${slug}.html`,wrap(slug,name+' · '+category,body));
}
fs.writeFileSync('en/company.html',wrap('company','About',section('Good decisions start<br>with good evidence.','Insightrix develops tools that help people examine the context of their work, from accounting entries and audit questions to inventory movements.')+`<section class="container process-section"><div class="process-strip"><div><h2>Trace the process</h2><p>Understand the source data and criteria behind a review.</p></div><div><h2>Focus on the work</h2><p>Each product addresses distinct accounting, audit or operational questions.</p></div><div><h2>People decide</h2><p>Tools organize information; professionals make the final decisions. Products are under development and examples use sample data.</p></div></div>${rows}</section>`));
let form=fs.readFileSync('contact.html','utf8').match(/<form[\s\S]*?<\/form>/)[0];
const formText={'성함을 입력해 주세요':'Enter your name','소속을 입력해 주세요 (선택)':'Company or organization (optional)','관심 제품(AccountingFlow / AuditFlow / OperationsFlow)과 함께 검토하고 싶은 업무를 알려 주세요.':'Tell us which product interests you and what work you would like to review.','관심 제품과 파일럿 검토 목적':'Product of interest and pilot goals','소속 회사 / 기관':'Company / organization','성함':'Name','이메일':'Email','파일럿 참여 문의 보내기':'Send pilot inquiry'};
for(const [ko,en] of Object.entries(formText)) form=form.split(ko).join(en);
form=form.replace(/<p class="form-notice">[\s\S]*?<\/p>/,`<p class="form-notice">${notice}</p>`);
fs.writeFileSync('en/contact.html',wrap('contact','Pilot inquiry',`<section class="container contact-layout"><div class="contact-intro"><span class="eyebrow">LET’S START WITH YOUR WORK</span><h1>What would you<br>like to improve?</h1><p>We are looking for companies to try products under development and share feedback from real work.</p><p>Participation, duration, costs and support depend on your needs and product readiness. We will discuss these individually.</p></div><div class="contact-form-wrap"><div class="form-heading"><h2>Pilot inquiry</h2><span>* Required</span></div>${form}</div></section>`));
fs.writeFileSync('en/thanks.html',wrap('thanks','Pilot inquiry information',section('Thank you for your interest.',notice)));

fs.writeFileSync('en/app.html',wrap('contact','Pilot participation',section('Help shape tools for your work.',notice)+`<section class="container product-index"><p>We are looking for companies to use products in real work and share feedback. Scope, duration, costs and support are discussed individually after reviewing your needs and product readiness.</p>${rows}<a class="button button-dark" href="/en/contact.html">Pilot inquiry</a></section>`).replace('href="/contact.html" lang="ko"','href="/app.html" lang="ko"').replaceAll('https://insightrix.ai.kr/contact.html','https://insightrix.ai.kr/app.html').replaceAll('https://insightrix.ai.kr/en/contact.html','https://insightrix.ai.kr/en/app.html'));
