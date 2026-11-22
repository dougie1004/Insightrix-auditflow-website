import { useState, type CSSProperties, type KeyboardEvent } from 'react';
import { showcaseProducts, developmentNotice, type ProductId } from '../site-config';
import DownloadButton from './DownloadButton';
import { Arrow } from './SiteChrome';

export default function PricingSection() {
    const [service, setService] = useState<ProductId>('accounting');
    const product = showcaseProducts.find(item => item.id === service)!;
    const activateFromKey = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
        if (!['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
        const next = event.key === 'Home' ? 0 : event.key === 'End' ? showcaseProducts.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + showcaseProducts.length) % showcaseProducts.length;
        event.preventDefault();
        setService(showcaseProducts[next].id);
        document.getElementById('request-tab-' + showcaseProducts[next].id)?.focus();
    };
    return <>
        <section className="container request-hero"><span className="eyebrow">PILOT PROGRAM</span><h1>파일럿 참여 기업을<br />모집합니다.</h1><p>여섯 제품 중 필요한 제품을 선택해 주세요.<br />고객사의 업무 방식과 기존 시스템에 맞춰 적용 범위를 함께 정합니다.</p></section>
        <section className="container request-section" style={{ '--accent': product.accent, '--tint': product.tint } as CSSProperties}>
            <div className="request-tabs" role="tablist" aria-label="프로그램 선택">{showcaseProducts.map((item, index) => <button key={item.id} role="tab" id={'request-tab-' + item.id} aria-selected={service === item.id} aria-controls="request-program" tabIndex={service === item.id ? 0 : -1} onKeyDown={event => activateFromKey(event, index)} onClick={() => setService(item.id)}><span>{item.category}</span><strong>{item.name}</strong></button>)}</div>
            <div className="request-content" id="request-program" role="tabpanel" aria-labelledby={'request-tab-' + service}><div><span className="eyebrow">{product.category}</span><h2>{product.name}</h2><p className="request-description">{product.summary}</p><dl className="request-topics">{product.steps.map(step => <div key={step[0]}><dt>{step[0]}</dt><dd>{step[1]}</dd></div>)}</dl></div><aside className="request-panel"><span className="note-status"><i className="status-dot" />고객사 맞춤 적용</span><h3>함께 검토할 업무를<br />알려 주세요.</h3><p>{developmentNotice}</p><DownloadButton service={service} /><a className="text-link" href={'/' + product.slug + '.html#demo'}>소개용 시연 살펴보기 <Arrow /></a></aside></div>
            <p className="request-disclaimer">현재 업무 방식과 필요한 기능을 확인한 뒤, 적용 범위와 기간·비용을 함께 정합니다. 시연에는 샘플 자료를 사용하거나 내부 정보를 가렸습니다.</p>
        </section>
    </>;
}
