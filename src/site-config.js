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

export const showcaseProducts = [
    ...siteProducts,
    {
        id: 'factory', slug: 'factoryflow', name: 'FactoryFlow', short: 'FF', number: '04',
        category: "공장 디지털 트윈", accent: '#28706a', tint: '#e8f4f0',
        heading: "실제 공장을 가상으로 재현하고\n생산계획을 먼저 시험합니다.",
        summary: "FactoryFlow는 실제 공장의 설비와 공정, 작업 흐름을 가상으로 재현한 디지털 트윈입니다. 생산계획을 가상 공장에 적용해 작업이 설비를 어떻게 거치는지 살펴보고, 일정을 바꾸면 어디에 부하와 대기가 생기는지 비교합니다.",
        shortDescription: "실제 공장을 가상으로 재현해 생산계획을 적용하기 전에 시험합니다.",
        steps: [["실제 공장의 작업 흐름을 재현합니다","제품이 어떤 공정을 거치고 어느 설비에서 작업되는지 가상 공장에서 확인합니다."],["가상 공장에 생산계획을 적용합니다","작업 순서에 따라 생산이 진행되는 모습을 보고, 어느 설비에 작업이 몰리거나 대기가 생기는지 살펴봅니다."],["변경 전후를 비교합니다","작업일을 옮겼을 때 설비별 작업량과 공수가 어떻게 달라지는지 확인합니다. 시험 결과는 현장 확정 배정과 구분합니다."]],
        tags: ["디지털 트윈","생산 시뮬레이션","설비 부하"],
        demoStory: "가상 공장에 생산계획을 적용한 뒤, 작업이 설비를 거치는 모습과 설비별 부하·대기 결과를 확인합니다.",
    },
    {
        id: 'prf', slug: 'prf', name: 'PatentResearchFlow', short: 'PRF', number: '05',
        category: "연구개발·특허화", accent: '#7657a6', tint: '#f0ebf8',
        heading: "우리 회사 기술로\n어떤 특허를 준비할 수 있을까요?",
        summary: "회사에 이미 있는 기술과 개발 여건을 바탕으로 연구개발 후보와 특허화 방향을 추천합니다. 선행특허와 청구항을 비교해 기존 기술과 겹치는 부분, 차별점을 검토할 부분, 추가로 확인할 항목을 구분합니다.",
        shortDescription: "회사에 이미 있는 기술로 도전할 특허 후보를 찾습니다.",
        steps: [["보유 기술을 정리합니다","현재 구현할 수 있는 것과 아직 해결하지 못한 기술 과제를 구분합니다."],["후보와 추천 근거를 확인합니다","선행특허의 청구항을 대조해 차별화를 검토할 기술 요소나 적용 방식을 제안합니다."],["다음 연구를 준비합니다","후보별 추가 조사와 실험 과제를 정리하고, 변리사와 검토할 자료를 준비합니다."]],
        tags: ["보유 기술","특허화 후보","선행특허 근거"],
        demoStory: "가상 회사의 보유 기술과 개발 여건을 입력한 뒤, 추천 후보 한 건과 선행특허 근거를 열어 어떤 실험으로 차별점을 확인할지 살펴봅니다.",
    },
    {
        id: 'wgf', slug: 'wgf', name: 'WorkGuardFlow', short: 'WGF', number: '06',
        category: "업무를 대신하는 AI 에이전트", accent: '#b05b45', tint: '#faeee9',
        heading: "보고서 작성부터 프로그램 개발까지,\nAI 에이전트에게 맡기세요.",
        summary: "WorkGuardFlow는 오픈소스 LLM을 기반으로 사용자가 맡긴 일을 대신 수행하는 AI 에이전트입니다. 질문에 답하는 데 그치지 않고, 자료를 조사하고 내용을 정리해 보고서나 현황 요약을 작성하거나 프로그램을 개발합니다.",
        shortDescription: "보고서 작성, 리서치, 현황 정리, 프로그램 개발을 AI 에이전트에게 맡길 수 있습니다.",
        steps: [["보고서 작성","검토할 자료와 보고 목적을 주면 핵심 근거를 정리하고 보고서를 작성합니다."],["리서치와 현황 정리","맡긴 주제를 조사하고, 흩어진 자료에서 달라진 점과 확인이 필요한 이슈를 정리합니다."],["프로그램 개발","필요한 기능과 조건을 알려주면 에이전트가 지정된 작업 범위에서 코드를 작성하거나 수정합니다."]],
        tags: ["보고서 작성","리서치·현황 정리","프로그램 개발"],
        demoStory: "생산계획 비교를 맡긴 뒤, Excel 비교표와 Word 보고서가 어떻게 만들어지고 검토되는지 확인합니다.",
    },
];
export const showcaseNavigation = [
    ['/company.html', '소개'],
    ...showcaseProducts.map(product => ['/'+product.slug+'.html', product.name]),
    ['/app.html', '파일럿 참여'],
];
