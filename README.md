# Insightrix Website

## 📦 프로젝트 구조

```
AuditFlow website/
├── src/
│   ├── components/
│   │   ├── PricingSection.tsx    # 요금제 비교 (결제 제거됨)
│   │   └── DownloadButton.tsx    # 기존 Contact로 연결하는 사용 요청 버튼
│   ├── pages/
│   └── App.jsx                   # 메인 라우팅
├── api/
│   └── confirm-payment.ts        # Vercel Edge Function (앱 전용)
├── public/demos/                 # 제품별 가상 예시 HTML·CSS·JS
└── index.html

```

## 🎨 주요 기능

### 1. **프로그램 사용 요청**
- 프로그램은 현재 개발 중이며, 사용 요청 후 별도로 전달합니다.
- 사용 요청 버튼은 기존 Contact 화면으로 이동합니다.
- 설치 파일 주소와 임시 버전·용량·업데이트·보안 인증 표시는 제공하지 않습니다.

### 2. **요금제 비교 페이지**
- AccountingFlow / AuditFlow 탭 전환
- 개발 안내와 사용 요청 링크 표시
- 결제 검증 API와 문의 제출처는 기존 동작 유지

### 3. **제품별 소개용 시연**
- AccountingFlow: 증빙 검토, 전표, 증빙 보관함, 검증 이력
- AuditFlow: 감사 검토 현황, 검토 항목, 근거 자료, 감사 이력
- OperationsFlow: 운영 현황, 구매 발주, 입출고·재고, 재고 평가
- 메뉴와 항목 선택에 따라 화면과 상세가 바뀝니다.
- 모든 수치·기록은 가상 예시입니다. 실제 구현·운영 결과를 나타내지 않습니다.
- 개인 PC의 제품 원본이나 회사 운영 자료는 포함하지 않습니다.

### 4. **Vercel Edge Function**
- 앱에서 호출하는 결제 검증 API
- Toss Payments 서버 사이드 확인
- 라이선스 키 발급 및 반환

## 🚀 배포 방법

### Vercel 배포
```bash
npm install
npm run build
vercel --prod
```

### 환경 변수 설정 (Vercel Dashboard)
```
TOSS_SECRET_KEY=your_secret_key_here
```

## 📝 TODO

- [ ] 실제 제품 원본 확인 후 소개 자료 갱신
- [ ] GIF 재촬영과 공개 범위는 별도 사용자 지시에 따라 진행
