import { useState } from 'react';
import { ArrowRight, Check, Info, ShieldAlert, ShieldCheck } from 'lucide-react';
import DownloadButton from './DownloadButton';

const plans = {
  accounting: {
    name: 'AccountingFlow',
    label: 'Verified Core',
    description: '회계 자동화를 제공하되, 회계 판단의 책임은 사용자에게 남기는 기본 구조입니다.',
    system: ['복식부기 규칙 강제 적용', '차대 불일치 전표 저장 방지', '증빙–전표 간 연결 구조 유지', '동일 입력과 기준에 대한 결과 재현'],
    human: ['계정과목 최종 승인', '비용·자산·수익 분류 판단', '세무 신고 및 외부 보고'],
    basis: '전표 생성량과 적용 범위 기준',
    notice: '모든 전표는 사용자 승인 전까지 임시 상태로 유지됩니다.',
  },
  audit: {
    name: 'AuditFlow',
    label: 'Judgment Support',
    description: '감사 판단을 대신하지 않고, 판단에 필요한 근거와 재현 구조를 제공하는 분석 구조입니다.',
    system: ['규칙 기반 위험 시나리오 구성', '룰·데이터 경로 근거 생성', '판단 과정 재현 지원', '감사 Trail 구조 유지'],
    human: ['이상 여부에 대한 최종 판단', '조치 필요성 결정', '감사 의견 및 보고서 서명'],
    basis: '프로젝트와 데이터 범위 기준',
    notice: 'AuditFlow는 감사인의 의사결정을 지원하며 감사 의견을 생성하지 않습니다.',
  },
  operations: {
    name: 'Operations Intelligence',
    label: 'Connected Operations',
    description: '영업·재고·생산·구매·수익성 데이터를 하나의 실행 계획으로 연결하는 통합 운영 구조입니다.',
    system: ['ERP·MES·WMS 원천 데이터 연결', '주문–재고–생산계획 정합성 검증', '반제품·원자재 소요량 계산', '계획 변경과 제품 수익성 근거 추적'],
    human: ['수요와 우선순위 확정', '예외 상황 대응 판단', '생산·구매·출고 실행 승인'],
    basis: '연동 데이터·모듈·사업장 범위 기준',
    notice: '운영 계획은 현업 담당자의 검토와 승인 후 실행됩니다.',
  },
};

export default function PricingSection() {
  const [service, setService] = useState<'accounting' | 'audit' | 'operations'>('accounting');
  const plan = plans[service];
  return <>
    <section className="pricing-hero">
      <span className="eyebrow"><span />Pricing by responsibility</span>
      <h1>기능의 수가 아니라,<br /><em>책임의 범위로 구분합니다.</em></h1>
      <p>Insightrix의 요금 구조는 시스템이 책임지는 영역과 전문가가 판단해야 하는 영역을 먼저 명확하게 정의합니다.</p>
    </section>

    <section className="pricing-shell">
      <div className="pricing-principles">
        <div><ShieldCheck /><h2>모든 플랜에 적용되는 원칙</h2></div>
        <ul><li><Check />판단 결과를 자동 확정하지 않습니다.</li><li><Check />모든 출력은 재현 가능해야 합니다.</li><li><Check />최종 판단과 법적 책임은 사용자에게 귀속됩니다.</li><li><Check />책임 범위는 도입 전에 명확히 정의합니다.</li></ul>
      </div>

      <div className="pricing-tabs" role="tablist" aria-label="제품 선택">
        <button className={service === 'accounting' ? 'active' : ''} onClick={() => setService('accounting')}>AccountingFlow</button>
        <button className={service === 'audit' ? 'active' : ''} onClick={() => setService('audit')}>AuditFlow</button>
        <button className={service === 'operations' ? 'active' : ''} onClick={() => setService('operations')}>Operations Intelligence</button>
      </div>

      <article className="plan-card">
        <header><div><span>{plan.label}</span><h2>{plan.name}</h2><p>{plan.description}</p></div><div className="pricing-basis"><small>PRICING BASIS</small><strong>{plan.basis}</strong><span>적용 범위 확인 후 협의</span></div></header>
        <div className="responsibility-columns">
          <section><div><ShieldCheck /><h3>시스템이 책임지는 영역</h3></div><ul>{plan.system.map(item => <li key={item}><Check />{item}</li>)}</ul></section>
          <section><div><ShieldAlert /><h3>{service === 'audit' ? '감사인이' : service === 'operations' ? '경영·운영팀이' : '사용자가'} 책임지는 영역</h3></div><ul>{plan.human.map(item => <li key={item}><Check />{item}</li>)}</ul></section>
        </div>
        <footer><Info /><p>{plan.notice}</p><a href="/contact">적용 범위 상담하기 <ArrowRight /></a></footer>
      </article>

      <div className="enterprise-card"><div><span>ENTERPRISE & CUSTOM</span><h2>조직의 기준에 맞춘<br />별도 설계가 필요하다면.</h2></div><ul><li><Check />내부 규정 맞춤 Rule Engine</li><li><Check />온프레미스·하이브리드 구성</li><li><Check />ERP·MES·WMS 데이터 연동</li></ul><a className="button primary" href="/contact">구축 상담하기 <ArrowRight /></a></div>

      {service !== 'operations' ? <section className="download-section"><span className="eyebrow"><span />Product download</span><h2>제품을 직접 확인하세요.</h2><p>데모 프로그램에서 검증 가능한 업무 구조를 살펴보고 정식 도입을 상담할 수 있습니다.</p><DownloadButton service={service} /></section> : <section className="download-section"><span className="eyebrow"><span />Operations assessment</span><h2>먼저 데이터 연결 범위를 확인하세요.</h2><p>ERP·MES·WMS·엑셀의 현재 구조와 계획 업무를 진단한 뒤 적합한 모듈과 도입 단계를 제안합니다.</p><a className="button primary" href="/contact">운영 데이터 진단 신청 <ArrowRight /></a></section>}
    </section>
  </>;
}
