export const developmentNotice = '현재 개발 중인 Insightrix 제품의 파일럿 참여 기업을 모집합니다. 참여 관련 사항은 문의를 통해 안내드립니다.';

export const siteProducts = [
    {
        id: 'accounting', slug: 'accountingflow', name: 'AccountingFlow', short: 'AF', number: '01',
        category: '회계 업무', accent: '#345cda', tint: '#edf1ff',
        heading: '증빙과 전표 사이,\n놓치는 근거 없이.',
        summary: '전표와 총계정원장, 재무제표를 연결하는 회계 프로그램을 개발하고 있습니다. 현재 개발 버전에서 샘플 전표 조회와 재무상태표·시산표 화면을 확인했습니다. 자료 입력과 외부 서비스 연동은 추가 검증 중입니다.',
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
        summary: '감사 자료를 분석하고 발견사항과 관계를 검토하는 도구를 개발하고 있습니다. 분석 엔진의 회귀검증을 진행했으며, 실제 프로그램 화면은 메뉴 조작 검증과 촬영을 마친 뒤 공개합니다.',
        shortDescription: '검토 항목부터 근거 자료와 판단의 기록까지.',
        steps: [
            ['쟁점을 나누고', '항목별 기준과 확인할 질문을 정리합니다.'],
            ['자료를 연결하고', '검토 대상과 원천 자료를 함께 살펴봅니다.'],
            ['판단을 준비합니다', '추가 확인 사항과 검토 이력을 확인합니다.'],
        ],
        tags: ['검토 항목', '근거 자료', '감사 이력'],
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
