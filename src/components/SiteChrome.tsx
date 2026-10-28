import { navigation, developmentNotice } from '../site-config';

export function Arrow() {
    return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function Wordmark() {
    return <><span className="brand-icon"><svg viewBox="0 0 28 28" fill="none" aria-hidden="true"><path d="M5 22V9m9 13V4m9 18V14" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" /></svg></span><span>Insightrix<span className="brand-period">.</span></span></>;
}

export function SiteHeader() {
    return <><a className="skip-link" href="#main">본문으로 이동</a><header className="site-header"><div className="container header-inner"><a href="/" className="wordmark" aria-label="Insightrix 홈"><Wordmark /></a><nav className="desktop-nav" aria-label="주 메뉴">{navigation.map(([href, label]) => <a key={href} href={href} aria-current={href === '/app.html' ? 'page' : undefined}>{label}</a>)}</nav><a className="button button-dark header-cta" href="/contact.html">파일럿 참여 문의 <Arrow /></a><details className="mobile-nav"><summary aria-label="메뉴 열기"><span /><span /></summary><nav aria-label="모바일 메뉴">{navigation.map(([href, label]) => <a key={href} href={href}>{label}</a>)}<a className="mobile-request" href="/contact.html">파일럿 참여 문의 <Arrow /></a></nav></details></div></header></>;
}

export function SiteFooter() {
    return <footer className="site-footer"><div className="container"><div className="footer-top"><div><span className="eyebrow light">LET’S TALK ABOUT YOUR WORK</span><h2>확인하고 싶은 업무,<br />함께 이야기해요.</h2></div><div className="footer-action"><a className="button button-white" href="/contact.html">파일럿 참여 문의 <Arrow /></a><p>{developmentNotice}</p></div></div><div className="footer-bottom"><a className="wordmark" href="/"><Wordmark /></a><p>회계·감사·기업 운영을 위한 업무 솔루션</p><span>© 2026 Insightrix</span></div></div></footer>;
}
