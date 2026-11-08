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
    {
        id: 'factory', slug: 'factoryflow', name: 'FactoryFlow', short: 'FF', number: '04',
        category: '생산운영 검토', accent: '#28706a', tint: '#e8f4f0',
        heading: '생산계획과 작업순서를\n검토할 수 있도록.',
        summary: 'SCM 생산계획과 작업순서를 입력으로 받아 공정·설비·시간 근거를 확인하고 생산운영 검토안을 살펴보는 프로그램입니다. 실제 배정과 확정계획을 대신하지 않으며, 근거가 부족한 항목은 보류 상태로 구분합니다.',
        shortDescription: '생산계획과 작업순서를 근거와 함께 검토합니다.',
        steps: [
            ['계획을 불러오고', '월·주·일 계획과 선택한 작업 범위를 확인합니다.'],
            ['경로를 살펴보고', '공정·설비 후보와 관측 시간 근거를 구분해 봅니다.'],
            ['검토안을 확인합니다', '재생 가능 상태와 보류 사유를 확인합니다.'],
        ],
        tags: ['생산계획 검토', '공정·설비 후보', '작업순서'],
    },
    {
        id: 'prf', slug: 'prf', name: 'PRF', short: 'PRF', number: '05',
        category: '수익성 검토', accent: '#7657a6', tint: '#f0ebf8',
        heading: '제품 수익성의 흐름을\n확인할 수 있도록.',
        summary: '현재 프로젝트에서 확인된 PRF 관련 구현과 실제 실행 범위를 대조한 뒤, 제품·판매·원가 연결이 확인되는 범위만 소개하는 시험본입니다. 확인되지 않은 기능과 상용 제공 범위는 표시하지 않습니다.',
        shortDescription: '제품·판매·원가 연결 상태를 확인하는 시험본입니다.',
        steps: [
            ['자료 범위를 확인하고', '수익성 계산에 사용된 기간과 대상 범위를 구분합니다.'],
            ['연결 상태를 살펴보고', '판매 SKU와 제조·원가 연결 여부를 확인합니다.'],
            ['확인할 항목을 남깁니다', '근거가 부족한 항목은 추가 확인 대상으로 구분합니다.'],
        ],
        tags: ['판매 SKU', '원가 연결', '수익성 검토'],
    },
    {
        id: 'wgf', slug: 'wgf', name: 'WGF', short: 'WGF', number: '06',
        category: '실행 통제', accent: '#b05b45', tint: '#faeee9',
        heading: '작업의 범위와 상태를\n확인할 수 있도록.',
        summary: 'WorkGuardFlow는 요청을 확정 작업계획과 실행 준비정보로 정리하고, 승인된 범위의 실행과 검증 결과를 별도 기록으로 연결하는 실행 통제형 워크플로입니다. 생산계획이나 단순 파일 생성 도구로 설명하지 않습니다.',
        shortDescription: '작업 범위·실행 상태·검증 결과를 연결합니다.',
        steps: [
            ['요청을 정리하고', '요청 범위와 확정 작업계획을 구분합니다.'],
            ['실행 상태를 확인하고', '준비·승인·실행·검증 상태를 섞지 않고 표시합니다.'],
            ['결과를 검토합니다', '실행 기록과 검증 결과를 다음 단계와 연결합니다.'],
        ],
        tags: ['작업 범위', '실행 통제', '검증 기록'],
    },
];

export const navigation = [
    ...siteProducts.map(product => [`/${product.slug}.html`, product.name]),
    ['/company.html', '소개'],
    ['/app.html', '파일럿 참여'],
];
