export const developmentNotice = '현재 개발 중인 Insightrix 제품의 파일럿 참여 기업을 모집합니다. 참여 관련 사항은 문의를 통해 안내드립니다.';

export const siteProducts = [
    {
        id: 'accounting', slug: 'accountingflow', name: 'AccountingFlow', short: 'AF', number: '01',
        category: '회계 업무', accent: '#345cda', tint: '#edf1ff',
        heading: '전표와 원장, 재무제표를\n한곳에서 살펴보세요.',
        summary: '전표와 총계정원장, 재무상태표와 시산표를 조회하는 회계 프로그램입니다. 현재 개발 중이며, 자료 입력과 외부 서비스 연동은 준비 중입니다.',
        shortDescription: '전표와 원장, 재무제표를 한 흐름으로.',
        steps: [
            ['전표를 확인하고', '샘플 전표의 거래일자·거래처·차변·대변을 조회합니다.'],
            ['원장을 살펴보고', '총계정원장에 반영된 거래와 금액을 확인합니다.'],
            ['재무제표를 조회합니다', '재무상태표와 합계잔액시산표의 집계 결과를 확인합니다.'],
        ],
        tags: ['전표 조회', '총계정원장', '재무제표'],
    },
    {
        id: 'audit', slug: 'auditflow', name: 'AuditFlow', short: 'AU', number: '02',
        category: '감사 검토', accent: '#18745b', tint: '#eaf4ed',
        heading: '감사 프로젝트와 자료를\n한곳에서 관리하세요.',
        summary: '감사 프로젝트를 만들고 자료를 등록하며 감사 시나리오를 살펴보는 프로그램입니다. 현재 개발 중이며, AI 분석과 최종 보고서는 준비 중입니다.',
        shortDescription: '감사 프로젝트와 자료, 시나리오를 한곳에서.',
        steps: [
            ['프로젝트를 관리하고', '감사 대상과 범위, 진행 상태를 살펴봅니다.'],
            ['자료를 모아보고', 'CSV 파일을 불러와 내용을 확인하고 저장합니다.'],
            ['시나리오를 살펴봅니다', '업무 영역과 위험 수준에 따라 감사 시나리오를 찾아봅니다.'],
        ],
        tags: ['감사 프로젝트', 'CSV 자료', '시나리오 조회'],
    },
    {
        id: 'operations', slug: 'operationsflow', name: 'OperationsFlow', short: 'OF', number: '03',
        category: '기업 운영', accent: '#a85932', tint: '#f8eee5',
        heading: '생산·SCM·수익성을\n하나의 화면에서.',
        summary: '생산운영·SCM·수익성의 주요 지표를 함께 살펴보는 통합 운영 프로그램입니다. 기간과 업무를 선택해 필요한 지표를 조회할 수 있습니다.',
        shortDescription: '생산운영과 SCM, 수익성 지표를 한곳에서.',
        steps: [
            ['생산을 살피고', '생산량과 설비·작업 생산성 지표를 확인합니다.'],
            ['SCM을 확인하고', '수요와 계획 등 SCM의 주요 지표를 살펴봅니다.'],
            ['수익성을 조회합니다', '매출과 이익 등 수익성 지표를 함께 확인합니다.'],
        ],
        tags: ['생산운영', 'SCM', '수익성'],
    },
];

export const navigation = [
    ...siteProducts.map(product => [`/${product.slug}.html`, product.name]),
    ['/company.html', '소개'],
    ['/app.html', '파일럿 참여'],
];
