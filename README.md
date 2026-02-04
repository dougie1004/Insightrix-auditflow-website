# Insightrix Website - Distribution Hub

## 📦 프로젝트 구조

```
AuditFlow website/
├── src/
│   ├── components/
│   │   ├── PricingSection.tsx    # 요금제 비교 (결제 제거됨)
│   │   └── DownloadButton.tsx    # OS 감지 다운로드 버튼
│   ├── pages/
│   └── App.jsx                   # 메인 라우팅
├── api/
│   └── confirm-payment.ts        # Vercel Edge Function (앱 전용)
├── public/                       # 이미지 및 정적 파일
└── index.html

```

## 🎨 주요 기능

### 1. **OS 자동 감지 다운로드**
- UserAgent 기반 Windows/Mac 자동 감지
- 파일 크기, 업데이트 날짜, 보안 인증 마크 표시
- 신뢰도 향상을 위한 메타데이터 노출

### 2. **요금제 비교 페이지**
- AccountingFlow / AuditFlow 탭 전환
- 결제 버튼 → "무료 데모 다운로드" 버튼으로 변경
- 앱 내 구독 안내 문구 추가

### 3. **Vercel Edge Function**
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

- [ ] 실제 다운로드 파일 URL 연결 (S3/R2)
- [ ] 버전 관리 시스템 구축
- [ ] 다운로드 카운터 추가
- [ ] 릴리스 노트 페이지 추가
