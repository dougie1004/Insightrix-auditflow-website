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
        // Try to open app via deep link
        const deepLinkUrl = `accountingflow://payment/success?orderId=${orderId}&plan=${plan}`;

        // Attempt to trigger deep link
        window.location.href = deepLinkUrl;

        // Fallback countdown for manual action
        if (autoRedirect) {
            const timer = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        // Try deep link again
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
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full">
                {/* Success Animation */}
                <div className="bg-white rounded-[3rem] shadow-2xl p-12 text-center relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>

                    <div className="absolute -top-20 -right-20 w-40 h-40 bg-indigo-100 rounded-full opacity-20 blur-3xl"></div>
                    <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-100 rounded-full opacity-20 blur-3xl"></div>

                    {/* Success Icon */}
                    <div className="relative mb-8">
                        <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full mx-auto flex items-center justify-center shadow-xl animate-bounce">
                            <CheckCircle className="w-14 h-14 text-white" strokeWidth={3} />
                        </div>
                        <div className="absolute -top-2 -right-2 animate-ping">
                            <Sparkles className="w-8 h-8 text-yellow-400" />
                        </div>
                    </div>

                    {/* Main Message */}
                    <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
                        🎉 구독이 완료되었습니다!
                    </h1>
                    <p className="text-xl text-slate-600 mb-8">
                        <span className="font-bold text-indigo-600">{plan}</span> 플랜이 성공적으로 활성화되었습니다.
                    </p>

                    {/* Order Info */}
                    <div className="bg-slate-50 rounded-2xl p-6 mb-8 border border-slate-200">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-slate-500 font-medium">주문 번호</span>
                            <span className="font-mono font-bold text-slate-900">{orderId}</span>
                        </div>
                    </div>

                    {/* App Return Instructions */}
                    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 mb-8 border-2 border-indigo-200">
                        <Rocket className="w-12 h-12 text-indigo-600 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-900 mb-3">이제 앱으로 돌아가세요</h3>
                        <p className="text-slate-600 mb-6 leading-relaxed">
                            AccountingFlow 앱이 자동으로 열립니다. <br />
                            {countdown > 0 && (
                                <span className="text-indigo-600 font-bold">{countdown}초 후 자동 실행...</span>
                            )}
                        </p>

                        <button
                            onClick={handleOpenApp}
                            className="w-full bg-indigo-600 text-white py-4 px-8 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all transform hover:scale-105 active:scale-95 flex items-center justify-center gap-3 shadow-lg shadow-indigo-200"
                        >
                            <Download className="w-6 h-6" />
                            앱 열기
                            <ArrowRight className="w-5 h-5" />
                        </button>

                        <button
                            onClick={() => setAutoRedirect(false)}
                            className="mt-3 text-sm text-slate-500 hover:text-slate-700 underline"
                        >
                            자동 실행 취소
                        </button>
                    </div>

                    {/* Next Steps */}
                    <div className="text-left space-y-4">
                        <h4 className="font-bold text-slate-900 text-lg mb-4">✨ 다음 단계</h4>

                        <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 transition-all">
                            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0">
                                <span className="font-black text-indigo-600">1</span>
                            </div>
                            <div>
                                <h5 className="font-bold text-slate-900 mb-1">앱에서 라이선스 확인</h5>
                                <p className="text-sm text-slate-600">Settings 메뉴에서 활성화된 플랜을 확인하세요.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 transition-all">
                            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0">
                                <span className="font-black text-indigo-600">2</span>
                            </div>
                            <div>
                                <h5 className="font-bold text-slate-900 mb-1">프리미엄 기능 사용</h5>
                                <p className="text-sm text-slate-600">AI 분석, 실시간 세무 알림 등 모든 기능을 자유롭게 이용하세요.</p>
                            </div>
                        </div>

                        <div className="flex items-start gap-4 p-4 bg-white rounded-xl border border-slate-200 hover:border-indigo-300 transition-all">
                            <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center shrink-0">
                                <span className="font-black text-indigo-600">3</span>
                            </div>
                            <div>
                                <h5 className="font-bold text-slate-900 mb-1">도움이 필요하신가요?</h5>
                                <p className="text-sm text-slate-600">
                                    <a href="/contact" className="text-indigo-600 hover:underline font-medium">
                                        고객 지원팀에 문의하기 →
                                    </a>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Troubleshooting */}
                    <div className="mt-8 pt-6 border-t border-slate-200">
                        <details className="text-left">
                            <summary className="cursor-pointer text-sm font-bold text-slate-600 hover:text-slate-900">
                                앱이 자동으로 열리지 않나요?
                            </summary>
                            <div className="mt-4 text-sm text-slate-600 space-y-2 bg-slate-50 p-4 rounded-xl">
                                <p>1. 위의 "앱 열기" 버튼을 직접 클릭해보세요.</p>
                                <p>2. 브라우저에서 "AccountingFlow 열기" 팝업이 나타나면 허용을 클릭하세요.</p>
                                <p>3. 그래도 안 되면 앱을 수동으로 실행한 후 Settings → Subscription에서 라이선스를 확인하세요.</p>
                            </div>
                        </details>
                    </div>
                </div>

                {/* Back to Home */}
                <div className="text-center mt-8">
                    <button
                        onClick={() => navigate('/')}
                        className="text-slate-500 hover:text-slate-700 font-medium text-sm flex items-center gap-2 mx-auto"
                    >
                        <ExternalLink className="w-4 h-4" />
                        웹사이트 홈으로 돌아가기
                    </button>
                </div>
            </div>
        </div>
    );
};

export default WelcomePro;
