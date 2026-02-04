# API 테스트 가이드

## 🧪 Postman 컬렉션 사용법

### 1. Postman 설치 및 임포트
```bash
# Postman 다운로드
https://www.postman.com/downloads/

# 컬렉션 임포트
1. Postman 실행
2. Import → Upload Files
3. Insightrix_API_Tests.postman_collection.json 선택
```

### 2. 환경 변수 설정
```
BASE_URL: http://localhost:5173 (로컬 테스트)
또는
BASE_URL: https://your-domain.vercel.app (배포 후)
```

---

## 📋 테스트 시나리오

### A. Payment Confirmation API

#### ✅ 1. Success - Valid Payment
**목적**: 정상적인 결제 검증 플로우 테스트

**Request**:
```json
POST /api/confirm-payment
{
  "paymentKey": "test_payment_key_123",
  "orderId": "order-{{randomUUID}}",
  "amount": 39900,
  "serviceType": "accounting"
}
```

**Expected Response** (200 OK):
```json
{
  "status": "success",
  "message": "Payment confirmed and license issued",
  "licenseKey": "LIC-ACCOUNTING-A1B2C3D4-1738560000000",
  "plan": "Standard Plan",
  "serviceType": "accounting",
  "expiresAt": 1770096000000
}
```

**검증 포인트**:
- [ ] Status code: 200
- [ ] licenseKey 형식: `LIC-{SERVICE}-{RANDOM}-{TIMESTAMP}`
- [ ] expiresAt이 1년 후 타임스탬프인지 확인
- [ ] Discord/Slack에 성공 알림 도착 확인

---

#### 🔁 2. Idempotency - Duplicate Request
**목적**: 중복 결제 방지 메커니즘 테스트

**Request** (동일한 orderId로 2번 호출):
```json
POST /api/confirm-payment
{
  "paymentKey": "test_payment_key_123",
  "orderId": "order-duplicate-test",  // 고정된 ID
  "amount": 39900,
  "serviceType": "accounting"
}
```

**Expected Response** (200 OK):
```json
{
  "status": "success",
  "message": "Payment already processed (cached)",
  "licenseKey": "LIC-ACCOUNTING-...",  // 첫 번째와 동일한 키
  "serviceType": "accounting"
}
```

**검증 포인트**:
- [ ] 두 번째 요청도 200 OK 반환
- [ ] licenseKey가 첫 번째와 동일
- [ ] message에 "cached" 포함
- [ ] Toss API 호출 없이 즉시 응답 (로그 확인)

---

#### ❌ 3. Error - Missing Fields
**목적**: 필수 파라미터 누락 시 에러 처리 테스트

**Request**:
```json
POST /api/confirm-payment
{
  "paymentKey": "test_key"
  // orderId, amount, serviceType 누락
}
```

**Expected Response** (400 Bad Request):
```json
{
  "error": "Missing required fields"
}
```

**검증 포인트**:
- [ ] Status code: 400
- [ ] 명확한 에러 메시지

---

#### 🚫 4. Error - Invalid Method
**목적**: HTTP 메서드 검증 테스트

**Request**:
```
GET /api/confirm-payment
```

**Expected Response** (405 Method Not Allowed):
```json
{
  "error": "Method not allowed"
}
```

---

### B. Auto-Update API

#### 📦 1. Update Available - AccountingFlow
**목적**: 업데이트 매니페스트 반환 테스트

**Request**:
```
GET /api/updates?service=accounting&current_version=0.9.0
```

**Expected Response** (200 OK):
```json
{
  "version": "1.0.0",
  "notes": "Initial release with AI-powered accounting automation",
  "pub_date": "2026-02-01T00:00:00Z",
  "platforms": {
    "windows-x86_64": {
      "signature": "dBwAIBA1MCECIQDlmxZ...",
      "url": "https://cdn.com/AccountingFlow_1.0.0_x64_en-US.msi.zip"
    },
    "darwin-x86_64": {
      "signature": "dBwAIBA1MCECIQDlmxZ...",
      "url": "https://cdn.com/AccountingFlow_1.0.0_x64.app.tar.gz"
    },
    "darwin-aarch64": {
      "signature": "dBwAIBA1MCECIQDlmxZ...",
      "url": "https://cdn.com/AccountingFlow_1.0.0_aarch64.app.tar.gz"
    }
  }
}
```

**검증 포인트**:
- [ ] Status code: 200
- [ ] version이 current_version보다 높음
- [ ] 3개 플랫폼 모두 포함
- [ ] signature와 url이 모두 존재

---

#### ✅ 2. No Update - Latest Version
**목적**: 최신 버전일 때 204 응답 테스트

**Request**:
```
GET /api/updates?service=accounting&current_version=1.0.0
```

**Expected Response** (204 No Content):
```json
{
  "message": "No update available",
  "current": "1.0.0",
  "latest": "1.0.0"
}
```

**검증 포인트**:
- [ ] Status code: 204
- [ ] 빈 응답 또는 "No update" 메시지

---

### C. Error Notification Test

#### 🚨 Trigger Error Notification
**목적**: Discord/Slack 에러 알림 동작 확인

**Request**:
```json
POST /api/confirm-payment
{
  "paymentKey": "invalid_key_will_fail",
  "orderId": "order-error-test",
  "amount": 99999,
  "serviceType": "accounting"
}
```

**Expected Behavior**:
1. API가 400 또는 500 에러 반환
2. Discord/Slack 채널에 다음 메시지 도착:

```
🚨 **Payment Error** in Toss API Verification

Error Details:
{
  "orderId": "order-error-test",
  "amount": 99999,
  "serviceType": "accounting",
  "tossError": { ... }
}
```

**검증 포인트**:
- [ ] Discord/Slack에 에러 알림 도착
- [ ] 에러 메시지에 orderId 포함
- [ ] 타임스탬프 정확
- [ ] 5초 이내 알림 도착

---

## 🔧 로컬 테스트 환경 설정

### 1. Vite Dev Server 실행
```bash
cd "AuditFlow website"
npm run dev
# http://localhost:5173
```

### 2. 환경 변수 설정 (.env.local)
```bash
TOSS_SECRET_KEY=test_sk_D4yK60gBa0V19M683J7MrY5vP781
ERROR_WEBHOOK_URL=https://discord.com/api/webhooks/YOUR_WEBHOOK
DOWNLOAD_BASE_URL=https://example.com/releases
ACCOUNTING_LATEST_VERSION=1.0.0
```

### 3. Postman에서 BASE_URL 변경
```
BASE_URL: http://localhost:5173
```

---

## 📊 테스트 체크리스트

### Payment API
- [ ] 정상 결제 검증 성공
- [ ] 중복 요청 시 idempotency 동작
- [ ] 필수 필드 누락 시 400 에러
- [ ] 잘못된 HTTP 메서드 시 405 에러
- [ ] Toss API 실패 시 에러 알림 전송
- [ ] 성공 시 Discord/Slack 알림 전송

### Update API
- [ ] 업데이트 필요 시 매니페스트 반환
- [ ] 최신 버전일 때 204 응답
- [ ] 잘못된 service 파라미터 처리
- [ ] 버전 비교 로직 정확성 (1.0.0 > 0.9.0)

### Security
- [ ] TOSS_SECRET_KEY 환경 변수로만 관리
- [ ] 응답에 민감 정보 노출 없음
- [ ] CORS 설정 확인 (앱에서만 호출 가능)
- [ ] Rate limiting 동작 확인

---

## 🐛 트러블슈팅

### 문제: "TOSS_SECRET_KEY not configured" 에러
**해결**:
```bash
# .env.local 파일 생성
echo "TOSS_SECRET_KEY=test_sk_..." > .env.local
# Vite 재시작
```

### 문제: Discord 알림이 오지 않음
**해결**:
1. Webhook URL 확인 (https://discord.com/api/webhooks/...)
2. Discord 서버 권한 확인
3. curl로 직접 테스트:
```bash
curl -X POST "YOUR_WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -d '{"content": "Test"}'
```

### 문제: Idempotency가 작동하지 않음
**원인**: Edge runtime의 메모리는 요청 간 공유되지 않을 수 있음
**해결**: Vercel KV 또는 Upstash Redis 사용
```typescript
import { kv } from '@vercel/kv';
await kv.set(`order:${orderId}`, licenseKey, { ex: 3600 });
```

---

## 📈 성능 테스트

### Apache Bench로 부하 테스트
```bash
# 100개 요청, 동시 10개
ab -n 100 -c 10 -p payment.json -T application/json \
  http://localhost:5173/api/confirm-payment

# payment.json:
# {"paymentKey":"test","orderId":"order-load-test","amount":39900,"serviceType":"accounting"}
```

**기대 결과**:
- 평균 응답 시간: < 500ms
- 에러율: 0%
- Idempotency 정상 동작

---

## 🚀 배포 후 테스트

### 1. Vercel 배포
```bash
vercel --prod
```

### 2. Postman BASE_URL 변경
```
BASE_URL: https://insightrix.vercel.app
```

### 3. 프로덕션 테스트 실행
- [ ] 모든 테스트 케이스 재실행
- [ ] 실제 Toss API 연동 확인 (테스트 키 사용)
- [ ] Discord/Slack 알림 확인
- [ ] HTTPS 인증서 확인

---

**마지막 업데이트**: 2026-02-04
**테스트 환경**: Vite 5.3.4, Vercel Edge Runtime
