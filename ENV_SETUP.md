# Vercel 환경 변수 설정 가이드

## 🔐 필수 환경 변수 (13개)

### 1. Toss Payments 인증
```bash
TOSS_SECRET_KEY=live_sk_YOUR_ACTUAL_SECRET_KEY
# 테스트: test_sk_D4yK60gBa0V19M683J7MrY5vP781
# 프로덕션: Toss Payments 대시보드에서 발급받은 실제 키
```

### 2. 에러 알림 (Discord/Slack Webhook)
```bash
ERROR_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_WEBHOOK_ID/YOUR_WEBHOOK_TOKEN
# Discord 서버 설정 → 통합 → 웹후크 → 새 웹후크
# 또는 Slack: https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

### 3. 성공 알림 (선택사항)
```bash
SUCCESS_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_SUCCESS_WEBHOOK
# 결제 성공 시 알림 (모니터링용)
```

### 4. 다운로드 CDN 기본 URL
```bash
DOWNLOAD_BASE_URL=https://your-cdn.com/releases
# 예시: https://insightrix.s3.ap-northeast-2.amazonaws.com/releases
# 또는: https://pub-xxxxx.r2.dev/releases
```

---

## 📦 AccountingFlow 버전 정보

### 5-7. 버전 및 릴리스 노트
```bash
ACCOUNTING_LATEST_VERSION=1.0.0
ACCOUNTING_RELEASE_NOTES=Initial release with AI-powered accounting automation
ACCOUNTING_PUB_DATE=2026-02-01T00:00:00Z
```

### 8-10. 플랫폼별 서명 (Signature)
```bash
# Windows x64
ACCOUNTING_WIN_SIGNATURE=dBwAIBA1MCECIQDlmxZ...
# 생성 방법: tauri signer sign "AccountingFlow_1.0.0_x64_en-US.msi.zip" -k private.key

# macOS Intel
ACCOUNTING_MAC_INTEL_SIGNATURE=dBwAIBA1MCECIQDlmxZ...
# 생성 방법: tauri signer sign "AccountingFlow_1.0.0_x64.app.tar.gz" -k private.key

# macOS Apple Silicon
ACCOUNTING_MAC_ARM_SIGNATURE=dBwAIBA1MCECIQDlmxZ...
# 생성 방법: tauri signer sign "AccountingFlow_1.0.0_aarch64.app.tar.gz" -k private.key
```

---

## 📊 AuditFlow 버전 정보 (동일 구조)

### 11-13. AuditFlow 버전 정보
```bash
AUDIT_LATEST_VERSION=1.0.0
AUDIT_RELEASE_NOTES=Professional audit analysis with Gemini 3.0 Pro
AUDIT_PUB_DATE=2026-02-01T00:00:00Z

AUDIT_WIN_SIGNATURE=dBwAIBA1MCECIQDlmxZ...
AUDIT_MAC_INTEL_SIGNATURE=dBwAIBA1MCECIQDlmxZ...
AUDIT_MAC_ARM_SIGNATURE=dBwAIBA1MCECIQDlmxZ...
```

---

## 🛠️ Vercel Dashboard 설정 방법

### 방법 1: Web UI
1. Vercel 프로젝트 → Settings → Environment Variables
2. 각 변수 이름과 값 입력
3. Environment: Production, Preview, Development 모두 선택
4. Save

### 방법 2: Vercel CLI
```bash
# 한 번에 설정
vercel env add TOSS_SECRET_KEY production
vercel env add ERROR_WEBHOOK_URL production
# ... (나머지 변수들도 동일하게)

# 또는 .env 파일에서 일괄 업로드
vercel env pull .env.production
# 편집 후
vercel env push .env.production
```

---

## 🔑 Tauri 서명 키 생성 방법

### 1. 키 페어 생성
```bash
# 프로젝트 루트에서
tauri signer generate -w ~/.tauri/insightrix.key

# 출력:
# Private key: ~/.tauri/insightrix.key (절대 공유 금지!)
# Public key: dBwAIBA1MCECIQDlmxZ... (tauri.conf.json에 입력)
```

### 2. 빌드 파일 서명
```bash
# Windows
tauri signer sign "dist/AccountingFlow_1.0.0_x64_en-US.msi.zip" \
  -k ~/.tauri/insightrix.key

# macOS
tauri signer sign "dist/AccountingFlow_1.0.0_x64.app.tar.gz" \
  -k ~/.tauri/insightrix.key
```

### 3. 서명 값 복사
```bash
# 출력된 signature 값을 복사하여 환경 변수에 입력
Signature: dBwAIBA1MCECIQDlmxZ... ← 이 값
```

---

## 🧪 환경 변수 검증 스크립트

```javascript
// verify-env.js
const required = [
  'TOSS_SECRET_KEY',
  'ERROR_WEBHOOK_URL',
  'DOWNLOAD_BASE_URL',
  'ACCOUNTING_LATEST_VERSION',
  'ACCOUNTING_WIN_SIGNATURE',
];

required.forEach(key => {
  if (!process.env[key]) {
    console.error(`❌ Missing: ${key}`);
  } else {
    console.log(`✅ ${key}: ${process.env[key].substring(0, 20)}...`);
  }
});
```

실행:
```bash
node verify-env.js
```

---

## 📊 Discord Webhook 테스트

```bash
curl -X POST "YOUR_WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "content": "🧪 Test notification from Insightrix",
    "embeds": [{
      "title": "Environment Setup",
      "description": "Webhook is working correctly!",
      "color": 3066993
    }]
  }'
```

성공 시: Discord 채널에 메시지 표시

---

## 🚨 보안 체크리스트

- [ ] `TOSS_SECRET_KEY`는 절대 Git에 커밋하지 않음
- [ ] Tauri 개인키(`~/.tauri/insightrix.key`)는 안전한 곳에 백업
- [ ] Webhook URL은 팀원만 접근 가능한 채널로 설정
- [ ] 프로덕션 환경에서만 실제 Secret Key 사용
- [ ] 개발/테스트 환경은 별도 Webhook 사용

---

## 💡 자동화 팁

### GitHub Actions로 버전 자동 업데이트
```yaml
# .github/workflows/update-version.yml
name: Update Version on Release

on:
  release:
    types: [published]

jobs:
  update-vercel-env:
    runs-on: ubuntu-latest
    steps:
      - name: Update ACCOUNTING_LATEST_VERSION
        run: |
          curl -X POST "https://api.vercel.com/v9/projects/${{ secrets.VERCEL_PROJECT_ID }}/env" \
            -H "Authorization: Bearer ${{ secrets.VERCEL_TOKEN }}" \
            -H "Content-Type: application/json" \
            -d '{
              "key": "ACCOUNTING_LATEST_VERSION",
              "value": "${{ github.event.release.tag_name }}",
              "type": "encrypted",
              "target": ["production"]
            }'
```

---

## 📝 환경 변수 템플릿

복사하여 사용하세요:

```bash
# === Toss Payments ===
TOSS_SECRET_KEY=

# === Notifications ===
ERROR_WEBHOOK_URL=
SUCCESS_WEBHOOK_URL=

# === CDN ===
DOWNLOAD_BASE_URL=

# === AccountingFlow ===
ACCOUNTING_LATEST_VERSION=1.0.0
ACCOUNTING_RELEASE_NOTES=
ACCOUNTING_PUB_DATE=
ACCOUNTING_WIN_SIGNATURE=
ACCOUNTING_MAC_INTEL_SIGNATURE=
ACCOUNTING_MAC_ARM_SIGNATURE=

# === AuditFlow ===
AUDIT_LATEST_VERSION=1.0.0
AUDIT_RELEASE_NOTES=
AUDIT_PUB_DATE=
AUDIT_WIN_SIGNATURE=
AUDIT_MAC_INTEL_SIGNATURE=
AUDIT_MAC_ARM_SIGNATURE=
```
