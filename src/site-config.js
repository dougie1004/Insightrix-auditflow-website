export const developmentNotice = '현재 개발 중인 Insightrix 제품의 파일럿 참여 기업을 모집합니다. 참여 관련 사항은 문의를 통해 안내드립니다.';

export const siteProducts = [
    {
        id: 'accounting', slug: 'accountingflow', name: 'AccountingFlow', short: 'AF', number: '01',
        category: '회계 업무', accent: '#345cda', tint: '#edf1ff',
        heading: '증빙과 전표 사이,\n놓치는 근거 없이.',
        summary: '전표부터 원장, 재무제표까지 한곳에서 살펴보는 회계 프로그램입니다. 아래 영상에서 전표·원장·재무상태표·시산표 화면을 확인할 수 있습니다. 현재 개발 중이며, 자료 입력과 외부 서비스 연동은 준비 중입니다.',
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
        heading: '판단의 앞과 뒤에,\n확인할 수 있는 근거.',
        summary: '감사 프로젝트와 자료, 시나리오를 한곳에서 관리하는 프로그램입니다. 아래 영상에서 프로젝트를 살펴보고 자료와 시나리오 메뉴를 이용하는 모습을 확인할 수 있습니다. 현재 개발 중이며, AI 분석과 최종 보고서는 준비 중입니다.',
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
        heading: '발주에서 재고까지,\n운영의 흐름을 한눈에.',
        summary: '구매와 입출고, 재고 수량과 평가 근거를 연결해 확인하는 기업 운영 도구를 개발하고 있습니다.',
        shortDescription: '구매 발주와 입출고, 재고의 움직임을 함께.',
        steps: [
            ['진행을 살피고', '구매 발주와 입고 예정 내역을 확인합니다.'],
            ['수량을 대조하고', '기초·입고·출고·기말의 흐름을 살펴봅니다.'],
            ['가치를 검토합니다', '재고 평가에 쓰인 금액과 근거를 비교합니다.'],
        ],
        tags: ['구매 발주', '입출고·재고', '재고 평가'],
    },
];

export const navigation = [
    ...siteProducts.map(product => [`/${product.slug}.html`, product.name]),
    ['/company.html', '소개'],
    ['/app.html', '파일럿 참여'],
];
