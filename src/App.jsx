import { useEffect, useState } from 'react';
import { BrowserRouter, HashRouter, Link, NavLink, Route, Routes, useLocation } from 'react-router-dom';
import {
  ArrowRight, BarChart3, BookOpenCheck, BrainCircuit, Check, ChevronRight,
  Boxes, Database, Factory, FileCheck2, Fingerprint, History, Layers3, Menu, Network,
  PackageSearch, PlayCircle, Quote, Scale, ShieldCheck, Sparkles, TrendingUp, X, Zap
} from 'lucide-react';
import PricingSection from './components/PricingSection';
import WelcomePro from './pages/WelcomePro';
import accountingFlowLogo from './assets/accountingflow-logo.png';
import auditFlowLogo from './assets/auditflow-logo.png';
import insightrixLogo from './assets/insightrix-logo.png';

const navItems = [
  ['Platform', '/'],
  ['AccountingFlow', '/accountingflow'],
  ['AuditFlow', '/auditflow'],
  ['Operations Intelligence', '/operations-intelligence'],
  ['Company', '/company'],
];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo({ top: 0, behavior: 'instant' }), [pathname]);
  return null;
}

function Brand() {
  return <Link className="brand" to="/" aria-label="Insightrix 홈">
    <span className="brand-logo-frame"><img src={insightrixLogo} alt="Insightrix" /></span>
  </Link>;
}

function ProductLogo({ type, location = 'card' }) {
  const audit = type === 'audit';
  return <span className={`product-logo ${audit ? 'audit' : 'accounting'} ${location}`}>
    <img src={audit ? auditFlowLogo : accountingFlowLogo} alt={audit ? 'AuditFlow' : 'AccountingFlow'} />
  </span>;
}

function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  useEffect(() => setOpen(false), [location.pathname]);
  return <header className="site-header">
    <div className="nav-shell">
      <Brand />
      <button className="menu-button" onClick={() => setOpen(!open)} aria-label="메뉴 열기" aria-expanded={open}>
        {open ? <X /> : <Menu />}
      </button>
      <nav className={open ? 'nav-links is-open' : 'nav-links'} aria-label="주 메뉴">
        {navItems.map(([label, href]) => <NavLink key={href} to={href} end={href === '/'}>{label}</NavLink>)}
        <NavLink to="/pricing">Pricing</NavLink>
        <Link className="nav-cta" to="/contact">도입 문의 <ArrowRight size={15} /></Link>
      </nav>
    </div>
  </header>;
}

function Footer() {
  return <footer className="site-footer">
    <div className="footer-main">
      <div><Brand /><p>회계·감사·운영 데이터를 설명 가능한 판단과 실행으로 연결하는 Intelligence Platform.</p></div>
      <div><strong>Platform</strong><Link to="/accountingflow">AccountingFlow</Link><Link to="/auditflow">AuditFlow</Link><Link to="/operations-intelligence">Operations Intelligence</Link><Link to="/pricing">Pricing & Download</Link></div>
      <div><strong>Company</strong><Link to="/company">About Insightrix</Link><Link to="/contact">Contact</Link><a href="mailto:douglas@insightrix.ai.kr">douglas@insightrix.ai.kr</a></div>
    </div>
    <div className="footer-bottom"><span>© 2026 Insightrix Corp. All Rights Reserved.</span><span>판단은 사람의 몫입니다. Insightrix는 그 판단을 가능하게 만듭니다.</span></div>
  </footer>;
}

const Pill = ({ children }) => <span className="eyebrow"><span />{children}</span>;
const ArrowLink = ({ to, children, light = false }) => <Link className={light ? 'text-link light' : 'text-link'} to={to}>{children}<ArrowRight size={17} /></Link>;

function ProductVisual({ type }) {
  const audit = type === 'audit';
  const operations = type === 'operations';
  const name = operations ? 'Operations Intelligence' : audit ? 'AuditFlow' : 'AccountingFlow';
  return <div className={`product-visual ${audit ? 'audit' : ''} ${operations ? 'operations' : ''}`} aria-label={`${name} 제품 화면 예시`}>
    <div className="visual-top"><span><i /><i /><i /></span><b>{operations ? 'Operations / Integrated Plan' : audit ? 'AuditFlow / Evidence Review' : 'AccountingFlow / Monthly Close'}</b><small>{operations ? 'Planning workspace' : 'Live workspace'}</small></div>
    <div className="visual-body">
      <aside><span className="active" /><span /><span /><span /><span /></aside>
      <main>
        <div className="visual-heading"><div><small>{operations ? 'Fulfillment plan' : audit ? 'Review queue' : 'Close tasks'}</small><strong>{operations ? '96.4%' : audit ? '12 / 14' : '24 / 28'}</strong></div><span className="status">{operations ? 'On plan' : 'Verified'}</span></div>
        <div className="mini-grid"><div><small>{operations ? 'Orders linked' : audit ? 'Rules tested' : 'Transactions'}</small><b>{operations ? '428' : audit ? '1,284' : '24,819'}</b></div><div><small>{operations ? 'Material ready' : audit ? 'Evidence bound' : 'Matched'}</small><b>{operations ? '93.8%' : audit ? '98.1%' : '97.6%'}</b></div><div><small>{operations ? 'Plan alerts' : 'Needs review'}</small><b>{operations ? '7' : '14'}</b></div></div>
        <div className="chart"><span /><span /><span /><span /><span /><span /><span /><span /></div>
        <div className="rows"><span /><span /><span /></div>
      </main>
    </div>
  </div>;
}

function Home() {
  usePageMeta('Insightrix | Enterprise Intelligence Platform', '회계·감사·운영 데이터를 검증 가능한 판단과 실행으로 연결하는 Enterprise Intelligence Platform.');
  return <>
    <section className="hero home-hero">
      <div className="hero-copy">
        <Pill>Financial intelligence, built for accountability</Pill>
        <h1>판단을 자동화하지 않고,<br /><em>판단의 근거를 완성합니다.</em></h1>
        <p>Insightrix는 회계, 감사, 생산·SCM·수익성 데이터를 하나의 근거 체계로 연결합니다. 모든 결과는 검증 가능하고, 설명 가능하며, 실제 실행으로 이어집니다.</p>
        <div className="hero-actions"><Link className="button primary" to="/contact">도입 상담하기 <ArrowRight size={18} /></Link><Link className="button ghost" to="/operations-intelligence">플랫폼 살펴보기</Link></div>
        <div className="trust-line"><ShieldCheck size={18} /><span>Rule-bound</span><Fingerprint size={18} /><span>Evidence-first</span><History size={18} /><span>Replayable</span></div>
      </div>
      <div className="hero-media"><ProductVisual type="audit" /><div className="floating-proof"><FileCheck2 /><span><b>Evidence linked</b>원천 데이터부터 최종 검토까지</span><strong>100%</strong></div></div>
    </section>

    <section className="statement-band"><p>AI가 더 많은 결론을 내리는 시대,<br /><strong>Insightrix는 사람이 더 나은 판단을 내릴 수 있는 구조</strong>를 만듭니다.</p></section>

    <section className="section-shell product-intro">
      <div className="section-heading"><Pill>One platform, three critical workflows</Pill><h2>회계에서 감사, 운영까지.<br />신뢰할 수 있는 하나의 구조.</h2><p>숫자를 만들고 검증하며 실제 운영 계획으로 연결하는 과정을 같은 원칙으로 설계합니다.</p></div>
      <div className="product-cards">
        <article className="product-card accounting"><div className="card-kicker"><BookOpenCheck /> ACCOUNTING INTELLIGENCE</div><ProductLogo type="accounting" /><p>증빙 인식부터 전표 제안과 검증까지. 모든 숫자가 언제든 설명 가능한 상태로 유지되도록 설계된 회계 인프라입니다.</p><ul><li><Check /> 복식부기 규칙 기반 검증</li><li><Check /> 증빙–전표 연결과 추적</li><li><Check /> 사용자 승인 중심 워크플로</li></ul><ArrowLink to="/accountingflow">AccountingFlow 알아보기</ArrowLink></article>
        <article className="product-card audit"><div className="card-kicker"><Scale /> AUDIT INTELLIGENCE</div><ProductLogo type="audit" /><p>감사인의 결론을 대신하지 않고, 규칙·근거·판단 경로를 하나로 묶어 증명 가능한 감사 구조를 제공합니다.</p><ul><li><Check /> 규칙 기반 위험 시나리오</li><li><Check /> 증거 연결형 Audit Trail</li><li><Check /> 판단 과정 재현</li></ul><ArrowLink to="/auditflow">AuditFlow 알아보기</ArrowLink></article>
        <article className="product-card operations"><div className="card-kicker"><Factory /> OPERATIONS INTELLIGENCE</div><h3 className="operations-name">Operations<br />Intelligence</h3><p>영업·재고·생산·구매·수익성 데이터를 하나의 계획으로 연결해 현장이 바로 실행할 수 있게 만듭니다.</p><ul><li><Check /> 주문–재고–생산계획 연결</li><li><Check /> 소요량·구매계획 가시화</li><li><Check /> 제품별 수익성 통합</li></ul><ArrowLink to="/operations-intelligence">Operations Intelligence 알아보기</ArrowLink></article>
      </div>
    </section>

    <section className="dark-section">
      <div className="dark-copy"><Pill>Designed around proof</Pill><h2>좋은 자동화는<br />설명할 수 있어야 합니다.</h2><p>Insightrix는 빠른 답보다 답이 만들어진 경로를 보존합니다. 입력, 규칙, 예외, 검토와 승인 기록을 하나의 증거 체계로 연결합니다.</p><ArrowLink light to="/company">우리가 설계하는 방식</ArrowLink></div>
      <div className="principle-list">{[
        [Database, 'Source integrity', '원천 데이터와 결과 사이의 연결을 끊지 않습니다.'],
        [Network, 'Rule-bound reasoning', '모든 분석은 사전에 정의된 기준 위에서 수행됩니다.'],
        [History, 'Judgment replay', '과거 시점의 입력과 판단 경로를 다시 재현합니다.'],
        [ShieldCheck, 'Human accountability', '최종 판단과 책임은 항상 전문가에게 남습니다.']
      ].map(([Icon, title, text], i) => <div key={title}><span>0{i + 1}</span><Icon /><section><h3>{title}</h3><p>{text}</p></section></div>)}</div>
    </section>

    <section className="cta-section"><Pill>Build trust into every decision</Pill><h2>설명 가능한 회계·감사·운영을<br />지금 시작하세요.</h2><p>현재 업무와 데이터 구조를 먼저 이해한 뒤, 적용 가능한 범위부터 함께 설계합니다.</p><Link className="button primary" to="/contact">Insightrix와 상담하기 <ArrowRight size={18} /></Link></section>
  </>;
}

const accountingFeatures = [
  [FileCheck2, '증빙–전표 연결', '모든 전표가 어떤 증빙과 입력에서 시작되었는지 추적할 수 있습니다.'],
  [BookOpenCheck, '복식부기 규칙 검증', '차변과 대변의 일치, 계정 규칙과 필수 정보를 저장 전에 확인합니다.'],
  [BrainCircuit, 'AI 제안, 사람의 승인', '시스템이 계정과 전표를 제안하지만 최종 확정은 담당자가 수행합니다.'],
  [History, '완전한 변경 이력', '누가 무엇을 검토하고 수정했는지 사후에 재현할 수 있습니다.'],
];

function AccountingFlow() {
  usePageMeta('AccountingFlow | Insightrix', 'CFO가 신뢰할 수 있는 검증·리뷰 중심 회계 인프라.');
  const submitPilot = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = new FormData();
    payload.append('entry.2005620554', data.get('name'));
    payload.append('entry.1045781291', data.get('company'));
    payload.append('entry.1166974658', data.get('email'));
    payload.append('entry.839337160', data.get('scale'));
    payload.append('entry.1065040343', data.get('team'));
    try {
      await fetch('https://docs.google.com/forms/d/e/1FAIpQLSfR524Xby7aLSUdPcvn2xIaPuDqrCYWj4c4ZvOd7N9jzOO1xw/formResponse', { method: 'POST', mode: 'no-cors', body: payload });
      form.reset(); window.alert('신청이 접수되었습니다. AccountingFlow 팀이 곧 연락드리겠습니다.');
    } catch { window.alert('신청 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.'); }
  };
  return <>
    <ProductHero eyebrow="Accounting intelligence" logoType="accounting" title={<>편한 회계가 아니라,<br /><em>CFO가 신뢰하는 회계 인프라.</em></>} description="AccountingFlow는 결론을 대신 내리지 않습니다. 모든 숫자가 언제든 설명 가능한 상태로 유지되도록 설계되었습니다." cta="파일럿 신청하기" target="#pilot"><ProductVisual type="accounting" /></ProductHero>
    <section className="section-shell split-intro"><div><Pill>From transaction to trust</Pill><h2>질문에 답하기 전에,<br />먼저 근거를 정리합니다.</h2></div><div><p>“이번 달 비용이 왜 늘었지?”라는 질문에 AccountingFlow는 숫자만 말하지 않습니다.</p><p>전표 → 계정 → 증빙 → 처리 흐름을 먼저 정리해 보여주고, CFO가 직접 판단할 수 있는 상태를 만듭니다.</p></div></section>
    <ProductDemo type="accounting" title="전표 제안부터 검토·확정까지, 실제 구현 화면입니다." description="증빙 인식, 계정 연결, 전표 제안과 회계 담당자의 검토 과정을 직접 확인하세요." steps={['증빙 인식','계정 연결','전표 제안','사용자 검토','전표 확정','변경 이력']} />
    <FeatureGrid items={accountingFeatures} />
    <section className="section-shell boundary-section"><div><Pill>Intentional boundaries</Pill><h2>AccountingFlow가<br />자동화하지 않는 것.</h2><p>편의를 위해 기준을 낮추지 않습니다. 빠른 회계보다 나중에 설명 가능한 회계를 선택합니다.</p></div><div className="boundary-list">{['증빙 없는 전표를 자동 확정하지 않습니다.','CFO 확인 없이 계정과목을 변경하지 않습니다.','설명할 수 없는 분개를 생성하지 않습니다.','리스크가 있는 처리를 조용히 넘기지 않습니다.'].map((x,i)=><div key={x}><span>0{i+1}</span><p>{x}</p></div>)}</div></section>
    <section id="pilot" className="form-band"><div><Pill>AccountingFlow pilot</Pill><h2>검증·리뷰 중심<br />회계 인프라 파일럿</h2><p>20년 이상의 회계·감사 실무 기준을 시스템 규칙으로 구현한 검증 중심 회계 엔진입니다.</p></div><form onSubmit={submitPilot}><label>성함<input name="name" required placeholder="홍길동" /></label><label>회사명<input name="company" required placeholder="(주)인사이트릭스" /></label><label>이메일 주소<input name="email" type="email" required placeholder="cfo@company.com" /></label><label>연간 매출 규모<select name="scale" defaultValue="50억 ~ 300억"><option>50억 미만</option><option>50억 ~ 300억</option><option>300억 이상</option></select></label><label>회계·경리 인원<select name="team" defaultValue="재무 1-2명"><option>본인 직접 관리</option><option>재무 1-2명</option><option>3명 이상</option></select></label><button className="button primary" type="submit">파일럿 신청하기 <ArrowRight size={18}/></button></form></section>
  </>;
}

const auditFeatures = [
  [Scale, 'Rule-bound scenario', '통계적 이상이 아닌, 사전에 정의된 감사 규칙 위반 가능성을 시나리오로 구성합니다.'],
  [Fingerprint, 'Evidence-first trail', '원천 데이터, 감지 규칙과 시스템의 판단 경로를 하나로 묶어 관리합니다.'],
  [History, 'Judgment replay', '과거 특정 시점의 데이터와 규칙으로 판단 과정이 만들어진 이유를 재현합니다.'],
  [Layers3, 'Structured outputs', '점수가 아니라 감사인이 검토하고 사용할 수 있는 구조화된 산출물을 제공합니다.'],
];

function AuditFlow() {
  usePageMeta('AuditFlow | Insightrix', 'AI가 결론을 내리지 않는 증거 중심 감사 인프라.');
  const steps = [['01','Data intake','원천 데이터 수집 및 비식별화'],['02','Rule matching','사전 정의된 감사 규칙과 정합성 검증'],['03','Scenario construction','규칙 위반 가능 시나리오 구성'],['04','Evidence binding','데이터·규칙·판단 경로 연결'],['05','Human judgment','감사인의 최종 판단'],['06','Replay & trace','동일 입력과 기준에 대한 과정 재현']];
  return <>
    <ProductHero eyebrow="Audit intelligence" logoType="audit" title={<>감사인의 판단을 대신하지 않고,<br /><em>그 판단을 증명합니다.</em></>} description="AuditFlow의 모든 분석은 규칙·근거·재현 가능성 위에서 이루어집니다. AI가 결론을 내리지 않는 감사 시스템입니다." cta="도입 상담하기" target="/contact"><ProductVisual type="audit" /></ProductHero>
    <section className="section-shell pipeline"><div className="section-heading left"><Pill>Audit judgment pipeline</Pill><h2>탐지에서 끝나지 않는<br />감사 판단의 전체 경로.</h2><p>감사인의 판단 과정을 여섯 단계로 구조화하고 각 단계의 근거를 보존합니다.</p></div><div className="pipeline-list">{steps.map(([n,t,d])=><div key={n}><span>{n}</span><section><h3>{t}</h3><p>{d}</p></section><ChevronRight /></div>)}</div></section>
    <ProductDemo type="audit" title="위험 분석에서 감사 보고서까지, 실제 구현 화면입니다." description="데이터 등록, 규칙 적용, 위험 시나리오 검토와 근거 연결 흐름을 직접 확인하세요." steps={['데이터 등록','감사 규칙 적용','위험 시나리오','증거 연결','감사인 검토','보고서 생성']} />
    <FeatureGrid items={auditFeatures} />
    <section className="dark-section compact"><div className="dark-copy"><Pill>Audit constitution</Pill><h2>변경 이력이 남는<br />감사의 헌법.</h2><p>유연한 AI보다 책임질 수 있는 기준을 우선합니다.</p></div><div className="constitution-grid">{[['No silent override','모든 규칙 변경은 기록됩니다.'],['No black box','설명 불가능한 판단은 생성하지 않습니다.'],['No retroactive change','과거 판단은 사후 변경되지 않습니다.'],['Human accountability','최종 책임은 항상 감사인에게 귀속됩니다.']].map(([t,d])=><div key={t}><ShieldCheck/><h3>{t}</h3><p>{d}</p></div>)}</div></section>
    <section className="section-shell responsibility"><div className="section-heading"><Pill>Division of responsibility</Pill><h2>시스템이 준비하고,<br />감사인이 판단합니다.</h2></div><div className="responsibility-grid"><article><span>HUMAN JUDGMENT</span><h3>감사인이 책임지는 영역</h3><ul><li><Check/>감사 기준 정의</li><li><Check/>이상 여부 최종 판단</li><li><Check/>법적 감사 의견 표명</li></ul></article><article><span>AUDITFLOW INFRASTRUCTURE</span><h3>AuditFlow가 책임지는 영역</h3><ul><li><Check/>위반 시나리오 구성</li><li><Check/>감사 근거 자동 정리</li><li><Check/>과거 판단 과정 재현</li><li><Check/>설명 책임 구조화</li></ul></article></div></section>
    <section className="section-shell boundary-section"><div><Pill>Intentional boundaries</Pill><h2>AuditFlow가<br />하지 않는 것.</h2><p>기술적 한계가 아니라 감사인의 책임을 존중하기 위한 의도적 제약입니다.</p></div><div className="boundary-list">{['감사 의견을 자동 생성하지 않습니다.','위법 여부를 판정하지 않습니다.','통계적 이상만으로 결론을 내리지 않습니다.','책임 소재가 불분명한 자동화를 제공하지 않습니다.'].map((x,i)=><div key={x}><span>0{i+1}</span><p>{x}</p></div>)}</div></section>
    <section className="cta-section"><Pill>The power of proof</Pill><h2>감사 판단을<br />증명 가능한 자산으로.</h2><p>감리, 소송, 감독기관 질의와 내부 품질 검토에 필요한 당시의 근거와 데이터 경로를 보존합니다.</p><Link className="button primary" to="/contact">AuditFlow 상담하기 <ArrowRight size={18}/></Link></section>
  </>;
}

function ProductDemo({ type, title, description, steps }) {
  const name = type === 'audit' ? 'AuditFlow' : 'AccountingFlow';
  return <section className="demo-section">
    <div className="demo-copy"><Pill>Implemented product demo</Pill><h2>{title}</h2><p>{description}</p><div className="demo-steps">{steps.map((step, index) => <span key={step}><b>{String(index + 1).padStart(2, '0')}</b>{step}</span>)}</div></div>
    <div className="demo-player"><div className="demo-player-top"><span><PlayCircle size={18} /> {name} product walkthrough</span><small>재생 버튼을 눌러 확인하세요</small></div><video controls playsInline preload="metadata" poster={`/media/${type}flow-poster.webp`} aria-label={`${name} 실제 구현 화면 데모`}><source src={`/media/${type}flow-demo.mp4`} type="video/mp4" />이 브라우저는 비디오 재생을 지원하지 않습니다.</video></div>
  </section>;
}

const operationsModules = [
  [Factory, '생산운영 Intelligence', '주문과 생산 실적, 공정 상태와 납기 위험을 하나의 흐름으로 보여줍니다.'],
  [Boxes, 'SCM·생산계획 Intelligence', '재고와 수요를 연결해 반제품·원자재 소요량과 구매 계획을 구조화합니다.'],
  [TrendingUp, '제품수익성 Intelligence', '제품별 매출, 원가와 운영 변수를 연결해 수익성의 이유를 설명합니다.'],
  [Network, '통합 경영 Intelligence', '영업·구매·생산·재무의 공통 지표를 하나의 경영 판단 체계로 연결합니다.'],
];

function OperationsIntelligence() {
  usePageMeta('Operations Intelligence | Insightrix', '영업·재고·생산·구매·수익성 데이터를 실행 가능한 하나의 계획으로 연결합니다.');
  const flow = ['고객 주문·예상매출','재고','생산계획','반제품·원자재 소요','구매계획','생산실행','출고·납기','제품수익성'];
  return <>
    <ProductHero eyebrow="Operations intelligence" title={<>흘어진 운영 데이터를,<br /><em>실행 가능한 하나의 계획으로.</em></>} description="영업, 재고, 생산, 구매, 원가와 수익성을 연결해 각 부서가 같은 근거와 우선순위로 실행하게 만듭니다." cta="운영 데이터 진단하기" target="/contact"><ProductVisual type="operations" /></ProductHero>
    <section className="section-shell operations-flow"><div className="section-heading"><Pill>From demand to profitability</Pill><h2>부서별 자료가 아닌,<br />하나의 실행 흐름.</h2><p>주문의 변화가 재고·생산·구매·수익성에 어떻게 영향을 주는지 끝까지 연결합니다.</p></div><div className="flow-track">{flow.map((item, index) => <div key={item}><span>{String(index + 1).padStart(2, '0')}</span><strong>{item}</strong>{index < flow.length - 1 ? <ChevronRight /> : null}</div>)}</div></section>
    <section className="operations-dashboard"><div className="operations-dashboard-copy"><Pill>Integrated planning workspace</Pill><h2>계획, 예외, 실행을<br />한 화면에서 연결합니다.</h2><p>아래 화면은 영업·재고·생산·구매·수익성 모듈의 연결 구조와 구현 범위를 보여주는 플랫폼 프리뷰입니다.</p></div><ProductVisual type="operations" /></section>
    <section className="section-shell operations-modules"><div className="section-heading"><Pill>Four connected intelligence modules</Pill><h2>현장의 실행과<br />경영의 판단을 연결합니다.</h2></div><div className="feature-grid">{operationsModules.map(([Icon,title,text],i)=><article key={title}><span>0{i+1}</span><Icon/><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="section-shell responsibility"><div className="section-heading"><Pill>Operational accountability</Pill><h2>시스템이 계획을 준비하고,<br />현업이 실행을 결정합니다.</h2></div><div className="responsibility-grid"><article><span>MANAGEMENT & OPERATIONS</span><h3>현업이 책임지는 영역</h3><ul><li><Check/>수요·우선순위 확정</li><li><Check/>예외 상황 판단</li><li><Check/>생산·구매 실행 승인</li></ul></article><article><span>OPERATIONS INTELLIGENCE</span><h3>플랫폼이 책임지는 영역</h3><ul><li><Check/>원천 데이터 연결</li><li><Check/>소요량·제약 계산</li><li><Check/>계획 변경 영향 추적</li><li><Check/>수익성 근거 구조화</li></ul></article></div></section>
    <section className="cta-section"><Pill>Connect planning to action</Pill><h2>운영 데이터를<br />실행 가능한 계획으로.</h2><p>ERP·MES·WMS·엑셀 데이터 구조와 현재 계획 업무를 진단한 뒤 적용 범위를 설계합니다.</p><Link className="button primary" to="/contact">도입 범위 상담하기 <ArrowRight size={18}/></Link></section>
  </>;
}

function ProductHero({ eyebrow, logoType, title, description, cta, target, children }) {
  const internalAnchor = target.startsWith('#');
  return <section className="hero product-hero"><div className="hero-copy"><Pill>{eyebrow}</Pill>{logoType && <ProductLogo type={logoType} location="hero" />}<h1>{title}</h1><p>{description}</p>{internalAnchor?<a className="button primary" href={target}>{cta}<ArrowRight size={18}/></a>:<Link className="button primary" to={target}>{cta}<ArrowRight size={18}/></Link>}</div><div className="hero-media">{children}</div></section>;
}

function FeatureGrid({ items }) { return <section className="section-shell feature-section"><div className="section-heading"><Pill>Built for accountable work</Pill><h2>빠른 답보다 중요한<br />검증 가능한 과정.</h2></div><div className="feature-grid">{items.map(([Icon,title,text],i)=><article key={title}><span>0{i+1}</span><Icon/><h3>{title}</h3><p>{text}</p></article>)}</div></section>; }

function Company() {
  usePageMeta('Company | Insightrix', 'Insightrix가 만드는 검증 가능하고 재현 가능한 Financial Intelligence의 원칙.');
  return <>
    <section className="company-hero"><Pill>The standard of integrity</Pill><h1>데이터의 진실을<br /><em>책임질 수 있는 구조로.</em></h1><p>Insightrix는 인간의 전문적 판단과 기술의 정밀함이 만나는 지점에서, 회계·감사·운영 의사결정의 새로운 신뢰 기준을 만듭니다.</p></section>
    <section className="section-shell philosophy"><div className="section-heading left"><Pill>Our philosophy</Pill><h2>기술보다 먼저<br />책임을 설계합니다.</h2></div><div className="quote-card"><Quote/><p>“자동화가 사람의 판단을 흐리게 해서는 안 됩니다. 기술은 결론을 대신하는 것이 아니라, 전문가가 자신의 판단을 설명하고 책임질 수 있게 해야 합니다.”</p><span>Insightrix founding principle</span></div></section>
    <section className="section-shell values"><article><span>01</span><BrainCircuit/><h3>Insight</h3><p>숫자를 넘어 판단에 필요한 맥락과 근거를 제공합니다.</p></article><article><span>02</span><ShieldCheck/><h3>Integrity</h3><p>정확성과 추적 가능성으로 데이터의 진실성을 보호합니다.</p></article><article><span>03</span><Sparkles/><h3>Innovation</h3><p>전문가의 책임을 강화하는 방식으로 회계·감사 프로세스를 재설계합니다.</p></article></section>
    <section className="founder-section"><div><Pill>Leadership</Pill><h2>현장을 아는 전문가가<br />직접 설계합니다.</h2><p>20년 이상의 회계·감사·내부통제·기업 운영 경험을 바탕으로, 실제 전문가와 현업이 책임지고 사용할 수 있는 시스템을 만듭니다.</p></div><div className="founder-card"><span>FOUNDER</span><h3>Douglas Lee</h3><p>CPA · CIA · CFE</p><ul><li><Check/>글로벌 기업 내부감사 및 재무 경험</li><li><Check/>회계·감사·부정조사 전문 자격</li><li><Check/>검증 가능성과 실행 가능성을 중심으로 한 제품 설계</li></ul></div></section>
    <section className="cta-section"><Pill>Work with us</Pill><h2>신뢰할 수 있는 자동화를<br />함께 설계하세요.</h2><Link className="button primary" to="/contact">Insightrix에 문의하기 <ArrowRight size={18}/></Link></section>
  </>;
}

function Contact() {
  usePageMeta('Contact | Insightrix', 'AccountingFlow, AuditFlow, Operations Intelligence 도입 및 데이터 연동 문의.');
  return <section className="contact-page"><div className="contact-intro"><Pill>Start a conversation</Pill><h1>현재의 업무를 이해하는 것부터<br /><em>함께 시작하겠습니다.</em></h1><p>기술 문의, 도입 상담과 데이터 연동 논의를 남겨주세요. 현재 업무와 책임 구조를 검토한 뒤 순차적으로 연락드립니다.</p><div className="contact-details"><span>EMAIL</span><a href="mailto:douglas@insightrix.ai.kr">douglas@insightrix.ai.kr</a><span>PHONE</span><a href="tel:+821034790526">010-3479-0526</a><span>LOCATION</span><p>서울특별시 강남구</p></div></div><form className="contact-form" action="https://formspree.io/f/xaqnrpnn" method="POST"><div className="form-title"><span>CONTACT FORM</span><h2>도입 목적을 알려주세요.</h2><p>확인 후 입력하신 이메일로 답변드리겠습니다.</p></div><label>성함 / 기업명<input type="text" name="name" required placeholder="이름과 회사명을 입력하세요" /></label><label>이메일 주소<input type="email" name="email" required placeholder="name@company.com" /></label><label>문의 유형<select name="type"><option value="AccountingFlow">AccountingFlow 도입</option><option value="AuditFlow">AuditFlow 도입</option><option value="Operations Intelligence">Operations Intelligence 도입</option><option value="ERP/Data Integration">ERP·MES·WMS·데이터 연동</option><option value="Partnership">파트너십</option><option value="General">기타 문의</option></select></label><label>문의 내용<textarea name="message" rows="6" required placeholder="현재 업무와 검토하고 싶은 내용을 알려주세요." /></label><button type="submit" className="button primary">문의 보내기 <ArrowRight size={18}/></button></form></section>;
}

function NotFound() { return <section className="not-found"><Pill>404</Pill><h1>페이지를 찾을 수 없습니다.</h1><p>주소가 변경되었거나 존재하지 않는 페이지입니다.</p><Link className="button primary" to="/">홈으로 돌아가기</Link></section>; }

function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title;
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta); }
    meta.content = description;
  }, [title, description]);
}

function Shell() {
  return <div className="site"><ScrollToTop/><Header/><main><Routes><Route path="/" element={<Home/>}/><Route path="/index.html" element={<Home/>}/><Route path="/accountingflow" element={<AccountingFlow/>}/><Route path="/accountingflow.html" element={<AccountingFlow/>}/><Route path="/auditflow" element={<AuditFlow/>}/><Route path="/auditflow.html" element={<AuditFlow/>}/><Route path="/operations-intelligence" element={<OperationsIntelligence/>}/><Route path="/company" element={<Company/>}/><Route path="/company.html" element={<Company/>}/><Route path="/contact" element={<Contact/>}/><Route path="/contact.html" element={<Contact/>}/><Route path="/pricing" element={<PricingSection/>}/><Route path="/app.html" element={<PricingSection/>}/><Route path="/welcome-pro" element={<WelcomePro/>}/><Route path="*" element={<NotFound/>}/></Routes></main><Footer/></div>;
}

export default function App() {
  const Router = window.location.protocol === 'file:' ? HashRouter : BrowserRouter;
  return <Router><Shell/></Router>;
}
