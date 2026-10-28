import { useState, type CSSProperties, type KeyboardEvent } from 'react';
import { siteProducts, developmentNotice, type ProductId } from '../site-config';
import DownloadButton from './DownloadButton';
import { Arrow } from './SiteChrome';

export default function PricingSection() {
    const [service, setService] = useState<ProductId>('accounting');
    const product = siteProducts.find(item => item.id === service)!;
    const activateFromKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? siteProducts.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + siteProducts.length) % siteProducts.length;
        event.preventDefault();
        setService(siteProducts[next].id);
        document.getElementById('request-tab-' + siteProducts[next].id)?.focus();
    };
    return <>
        <section className="container request-hero"><span className="eyebrow">PILOT PROGRAM</span><h1>파일럿 참여 기업을<br />모집합니다.</h1><p>회계·감사·기업 운영을 위한 세 제품의 파일럿 참여 기업을 모집합니다.<br />실제 업무에 적용하며 사용 의견을 함께 나눌 기업을 찾습니다.</p></section>
        <section className="container request-section" style={{ '--accent': product.accent, '--tint': product.tint } as CSSProperties}>
            <div className="request-tabs" role="tablist" aria-label="프로그램 선택">{siteProducts.map((item, index) => <button key={item.id} role="tab" id={'request-tab-' + item.id} aria-selected={service === item.id} aria-controls="request-program" tabIndex={service === item.id ? 0 : -1} onKeyDown={event => activateFromKey(event, index)} onClick={() => setService(item.id)}><span>{item.category}</span><strong>{item.name}</strong></button>)}</div>
            <div className="request-content" id="request-program" role="tabpanel" aria-labelledby={'request-tab-' + service}><div><span className="eyebrow">{product.category}</span><h2>{product.name}</h2><p className="request-description">{product.summary}</p><dl className="request-topics">{product.steps.map(step => <div key={step[0]}><dt>{step[0]}</dt><dd>{step[1]}</dd></div>)}</dl></div><aside className="request-panel"><span className="note-status"><i className="status-dot" />현재 개발 중입니다</span><h3>함께 검토할 업무를<br />알려 주세요.</h3><p>{developmentNotice}</p><DownloadButton service={service} /><a className="text-link" href={'/' + product.slug + '.html#demo'}>소개용 시연 살펴보기 <Arrow /></a></aside></div>
            <p className="request-disclaimer">관심 제품과 업무에 따라 참여 범위를 개별 안내합니다. 참여 기간·비용·지원 범위는 업무와 제품 준비 상태를 확인한 뒤 안내합니다. 시연 화면의 수치와 기록은 가상 예시입니다. 실제 구현·운영 결과를 나타내지 않으며, 업무의 최종 판단과 승인은 담당자의 몫입니다.</p>
        </section>
    </>;
}
