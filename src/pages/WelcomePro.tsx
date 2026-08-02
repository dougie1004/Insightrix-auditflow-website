import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, Sparkles, Rocket, Download, ExternalLink, ArrowRight } from 'lucide-react';

const WelcomePro = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(10);
    const [autoRedirect, setAutoRedirect] = useState(true);

    const plan = searchParams.get('plan') || 'Professional';
    const orderId = searchParams.get('orderId') || '';

    useEffect(() => {
        const deepLinkUrl = `accountingflow://payment/success?orderId=${orderId}&plan=${plan}`;
        window.location.href = deepLinkUrl;

        if (autoRedirect) {
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        window.location.href = deepLinkUrl;
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [orderId, plan, autoRedirect]);

    const handleOpenApp = () => {
        window.location.href = `accountingflow://payment/success?orderId=${orderId}&plan=${plan}`;
    };

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 selection:bg-amber-500/30 selection:text-amber-200 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-2xl w-full relative z-10">
                {/* Success Animation */}
                <div className="glass-panel rounded-3xl shadow-2xl p-8 md:p-12 text-center relative overflow-hidden border border-slate-900">
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-amber-500 via-yellow-200 to-amber-500"></div>

                    {/* Success Icon */}
                    <div className="relative mb-6">
                        <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full mx-auto flex items-center justify-center shadow-xl animate-bounce">
                            <CheckCircle className="w-12 h-12 text-white" strokeWidth={3} />
                        </div>
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-emerald-500/10 rounded-full blur-xl pointer-events-none"></div>
                    </div>

                    {/* Main Message */}
                    <h1 className="text-3xl font-extrabold text-white mb-3 tracking-tight">
                        🎉 구독이 완료되었습니다!
                    </h1>
                    <p className="text-base text-slate-400 mb-8">
                        <span className="font-bold text-amber-400 text-glow">{plan}</span> 플랜이 성공적으로 활성화되었습니다.
                    </p>

                    {/* Order Info */}
                    <div className="bg-slate-900/60 rounded-xl p-4 mb-6 border border-slate-900">
                        <div className="flex items-center justify-between text-xs md:text-sm">
                            <span className="text-slate-500 font-semibold">주문 번호</span>
                            <span className="font-mono font-bold text-slate-200">{orderId}</span>
                        </div>
                    </div>

                    {/* App Return Instructions */}
                    <div className="bg-amber-500/5 rounded-2xl p-6 md:p-8 mb-8 border border-amber-500/15">
                        <Rocket className="w-10 h-10 text-amber-400 mx-auto mb-3" />
                        <h3 className="text-lg font-bold text-white mb-2">이제 앱으로 돌아가세요</h3>
                        <p className="text-xs md:text-sm text-slate-400 mb-6 leading-relaxed">
                            AccountingFlow 데스크톱 앱이 자동으로 실행됩니다. <br />
                            {countdown > 0 && (
                                <span className="text-amber-400 font-bold">{countdown}초 후 자동 연동...</span>
                            )}
                        </p>

                        <button
                            onClick={handleOpenApp}
                            className="w-full bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 text-slate-950 py-3.5 px-8 rounded-xl font-bold text-sm transition-all transform hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-lg shadow-amber-500/10"
                        >
                            <Download className="w-4 h-4" />
                            앱 열기
                            <ArrowRight className="w-4 h-4" />
                        </button>

                        <button
                            onClick={() => setAutoRedirect(false)}
                            className="mt-3 text-xs text-slate-500 hover:text-slate-400 underline font-semibold"
                        >
                            자동 실행 취소
                        </button>
                    </div>

                    {/* Next Steps */}
                    <div className="text-left space-y-3">
                        <h4 className="font-bold text-slate-200 text-sm mb-3">✨ 다음 단계</h4>

                        <div className="flex items-start gap-3 p-4 bg-slate-900/30 rounded-xl border border-slate-900 hover:border-slate-800 transition-all">
                            <div className="w-6 h-6 bg-slate-900 border border-slate-800 rounded flex items-center justify-center shrink-0">
                                <span className="font-bold text-xs text-amber-400">1</span>
                            </div>
                            <div>
                                <h5 className="font-bold text-xs text-slate-200 mb-0.5">앱에서 라이선스 확인</h5>
                                <p className="text-[11px] text-slate-400">Settings 메뉴에서 활성화된 플랜을 확인하세요.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-slate-900/30 rounded-xl border border-slate-900 hover:border-slate-800 transition-all">
                            <div className="w-6 h-6 bg-slate-900 border border-slate-800 rounded flex items-center justify-center shrink-0">
                                <span className="font-bold text-xs text-amber-400">2</span>
                            </div>
                            <div>
                                <h5 className="font-bold text-xs text-slate-200 mb-0.5">프리미엄 기능 즉시 개방</h5>
                                <p className="text-[11px] text-slate-400">분개 자동 매핑, 대용량 분석 등 모든 프로 기능을 제한 없이 사용하세요.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-3 p-4 bg-slate-900/30 rounded-xl border border-slate-900 hover:border-slate-800 transition-all">
                            <div className="w-6 h-6 bg-slate-900 border border-slate-800 rounded flex items-center justify-center shrink-0">
                                <span className="font-bold text-xs text-amber-400">3</span>
                            </div>
                            <div>
                                <h5 className="font-bold text-xs text-slate-200 mb-0.5">문의 사항 접수</h5>
                                <p className="text-[11px] text-slate-400">
                                    도입 지원팀에 상담이 필요하시면{' '}
                                    <a href="/contact" className="text-amber-400 hover:underline font-semibold">
                                        고객 지원 문의 바로가기 →
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Troubleshooting */}
                    <div className="mt-6 pt-6 border-t border-slate-900">
                        <details className="text-left group">
                            <summary className="cursor-pointer text-xs font-bold text-slate-500 hover:text-slate-400 select-none">
                                앱이 자동으로 실행되지 않나요?
                            </summary>
                            <div className="mt-3 text-xs text-slate-400 space-y-1.5 bg-slate-900/60 p-4 rounded-xl border border-slate-900">
                                <p>1. 상단의 "앱 열기" 버튼을 직접 탭해 보십시오.</p>
                                <p>2. 브라우저 주소창 팝업 승인에서 "프로그램 실행 요청"을 허용했는지 검토해 주십시오.</p>
                                <p>3. 지속적으로 불가 시 앱을 직접 수동 기동하신 후 Settings → Subscription 메뉴를 새로고침 하시면 됩니다.</p>
                            </div>
                        </details>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="text-center mt-6">
                    <button
                        onClick={() => navigate('/')}
                        className="text-slate-500 hover:text-slate-400 font-semibold text-xs flex items-center gap-1.5 mx-auto transition-colors"
                    >
                        <ExternalLink className="w-3.5 h-3.5" />
                        웹사이트 홈으로 돌아가기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WelcomePro;
