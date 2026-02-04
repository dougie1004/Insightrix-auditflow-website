# Insightrix Website - Deployment Guide

## 🚀 배포 완료 체크리스트

### 1. Vercel 환경 변수 설정

Vercel Dashboard에서 다음 환경 변수를 설정하세요:

```bash
# Toss Payments
TOSS_SECRET_KEY=live_sk_YOUR_SECRET_KEY

# Download URLs
DOWNLOAD_BASE_URL=https://your-cdn.com/releases

# AccountingFlow Version Info
ACCOUNTING_LATEST_VERSION=1.0.0
ACCOUNTING_RELEASE_NOTES=Initial release with AI-powered accounting automation
ACCOUNTING_PUB_DATE=2026-02-01T00:00:00Z
ACCOUNTING_WIN_SIGNATURE=dBwAIBA...
ACCOUNTING_MAC_INTEL_SIGNATURE=dBwAIBA...
ACCOUNTING_MAC_ARM_SIGNATURE=dBwAIBA...

# AuditFlow Version Info
AUDIT_LATEST_VERSION=1.0.0
AUDIT_RELEASE_NOTES=Professional audit analysis with Gemini 3.0 Pro
AUDIT_PUB_DATE=2026-02-01T00:00:00Z
AUDIT_WIN_SIGNATURE=dBwAIBA...
AUDIT_MAC_INTEL_SIGNATURE=dBwAIBA...
AUDIT_MAC_ARM_SIGNATURE=dBwAIBA...
```

### 2. Tauri 서명 생성 방법

```bash
# Windows
tauri signer sign "path/to/AccountingFlow_1.0.0_x64_en-US.msi.zip" -k private.key

# macOS
tauri signer sign "path/to/AccountingFlow_1.0.0_x64.app.tar.gz" -k private.key
```

### 3. 웹사이트 구조

```
/                    → 홈페이지
/pricing             → 요금제 및 다운로드
/welcome-pro         → 결제 성공 후 온보딩 (Deep Link 자동 실행)
/api/confirm-payment → 결제 검증 API
/api/updates         → Tauri 자동 업데이트 API
```

### 4. Deep Link 테스트

결제 완료 후 다음 URL로 리다이렉트됩니다:

```
https://your-domain.com/welcome-pro?orderId=xxx&plan=Professional
```

이 페이지는 자동으로 다음 Deep Link를 실행합니다:

```
accountingflow://payment/success?orderId=xxx&plan=Professional
```

### 5. 자동 업데이트 테스트

앱에서 다음 URL을 호출하여 업데이트 확인:

```
GET https://your-domain.com/api/updates?service=accounting&current_version=0.9.0
```

응답 예시:
```json
{
  "version": "1.0.0",
  "notes": "Bug fixes and performance improvements",
  "pub_date": "2026-02-01T00:00:00Z",
  "platforms": {
    "windows-x86_64": {
      "signature": "dBwAIBA...",
      "url": "https://cdn.com/AccountingFlow_1.0.0_x64_en-US.msi.zip"
    }
  }
}
```

## 🔐 보안 체크리스트

- [ ] HTTPS 강제 적용 (Vercel 자동)
- [ ] Toss Secret Key는 환경 변수로만 관리
- [ ] CORS 설정 확인 (앱에서만 API 호출 가능하도록)
- [ ] Rate Limiting 설정 (Vercel Edge Config)
- [ ] 라이선스 서명 검증 로직 추가

## 📊 모니터링

### Vercel Analytics
- 페이지 뷰 추적
- 다운로드 버튼 클릭률
- /welcome-pro 도달률

### 추천 도구
- Sentry: 에러 모니터링
- PostHog: 사용자 행동 분석
- Vercel Analytics: 성능 모니터링

## 🔄 CI/CD 자동화 (선택사항)

GitHub Actions로 버전 업데이트 자동화:

```yaml
name: Update Version
on:
  release:
    types: [published]

jobs:
  update-env:
    runs-on: ubuntu-latest
    steps:
      - name: Update Vercel Env
        run: |
          vercel env add ACCOUNTING_LATEST_VERSION ${{ github.event.release.tag_name }}
```

## 🎯 최종 확인 사항

1. ✅ 웹사이트 배포 완료
2. ✅ 환경 변수 설정 완료
3. ✅ Deep Link 테스트 성공
4. ✅ 자동 업데이트 API 테스트 성공
5. ✅ 결제 검증 API 테스트 성공
6. ✅ SSL 인증서 확인
7. ✅ 다운로드 파일 업로드 완료

---

**배포 후 첫 사용자 테스트 시나리오:**

1. 웹사이트 방문 → /pricing 이동
2. OS 자동 감지 확인 (Windows/Mac)
3. "무료 데모 다운로드" 클릭
4. 앱 설치 및 실행
5. 앱 내 "구독 관리" 메뉴 이동
6. 결제 진행 (테스트 모드)
7. /welcome-pro 페이지 자동 오픈
8. Deep Link로 앱 복귀 확인
9. 라이선스 활성화 확인
10. 프리미엄 기능 사용 가능 확인
