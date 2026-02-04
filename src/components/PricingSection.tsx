import React, { useState } from 'react';
import { Check, Info, Rocket, Sparkles, AppWindow } from 'lucide-react';
import DownloadButton from './DownloadButton';

const PricingSection = () => {
    const [serviceType, setServiceType] = useState('accounting'); // 'accounting' | 'audit'

    const accountingPlans = [
        {
            name: 'Basic',
            price: 19900,
            description: '개인사업자 및 소규모 팀을 위한 입문용',
            features: ['AI 증합 자동 인식 (월 100건)', '준법 감시 기초 리포트', '커뮤니티 지원'],
            badge: 'Start Free'
        },
        {
            name: 'Standard',
            price: 39900,
            description: '성장하는 중소기업을 위한 최적의 선택',
            features: ['AI 증합 자동 인식 (월 500건)', '실시간 세무 변동 알림', '이메일 우선 지원', '사용자 3인'],
            recommended: true,
            badge: 'Most Popular'
        },
        {
            name: 'Professional',
            price: 79000,
            description: '복잡한 회계 처리가 필요한 중견 기업',
            features: ['AI 증합 자동 인식 (무제한*)', '전사 통합 대시보드', '1:1 전담 매니저', '사용자 무제한'],
            badge: 'Scale Up'
        }
    ];

    const auditPlans = [
        {
            name: 'Lite',
            price: 99000,
            description: '소규모 감사를 위한 핵심 기능 중심',
            features: ['데이터 전수 분석 기초', '이상 항목 탐지 (기본)', 'PDF 리포트 생성'],
            badge: 'Efficient'
        },
        {
            name: 'Pro',
            price: 299000,
            description: '전문 감사인을 위한 고성능 분석 솔루션',
            features: ['Gemini 3.0 Pro 추론 엔진', '복합 리스크 정밀 진단', '엑셀/웹 대시보드 리포팅', '우선 기술 지원'],
            recommended: true,
            badge: 'Expert Choice'
        },
        {
            name: 'Enterprise',
            price: 0,
            description: '대규모 회계법인 및 기업용 맞춤형 구축',
            features: ['On-premise 구축 지원', '맞춤형 AI 모델 튜닝', 'SLA 보장 및 24/7 지원', '보안 커스텀 구성'],
            contactOnly: true,
            badge: 'Custom'
        }
    ];

    const currentPlans = serviceType === 'accounting' ? accountingPlans : auditPlans;

    return (
        <section className="py-24 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 bg-blue-50 text-[#0A192F] px-4 py-2 rounded-full text-sm font-bold mb-6 border border-blue-100">
                        <Sparkles className="w-4 h-4 text-blue-500" />
                        AI-Driven Financial Intelligence
                    </div>
                    <h2 className="text-4xl font-extrabold text-[#0A192F] sm:text-6xl mb-6 tracking-tight">
                        간단한 설치, <br className="sm:hidden" />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0A192F] to-[#2A4B7C]">앱 내에서 즉시 구독</span>
                    </h2>
                    <p className="text-xl text-gray-500 max-w-3xl mx-auto leading-relaxed">
                        웹사이트에서는 요금제 확인과 데모 다운로드만 가능합니다. <br />
                        실제 결제와 라이선스 관리는 설치된 프로그램 내부의 <span className="text-[#0A192F] font-bold underline decoration-wavy decoration-[#D4AF37]">Settings</span> 메뉴에서 안전하게 진행됩니다.
                    </p>
                </div>

                {/* Tab Switcher */}
                <div className="flex justify-center mb-16">
                    <div className="bg-white p-2 rounded-2xl shadow-xl border border-slate-100 flex space-x-2">
                        <button
                            onClick={() => setServiceType('accounting')}
                            className={`px-10 py-4 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 ${serviceType === 'accounting'
                                    ? 'bg-[#0A192F] text-white shadow-lg'
                                    : 'text-slate-500 hover:bg-slate-50'
                                }`}
                        >
                            <Rocket className={`w-5 h-5 ${serviceType === 'accounting' ? 'text-[#D4AF37]' : ''}`} />
                            AccountingFlow
                        </button>
                        <button
                            onClick={() => setServiceType('audit')}
                            className={`px-10 py-4 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 ${serviceType === 'audit'
                                    ? 'bg-[#0A192F] text-white shadow-lg'
                                    : 'text-slate-500 hover:bg-slate-50'
                                }`}
                        >
                            <Check className={`w-5 h-5 ${serviceType === 'audit' ? 'text-[#D4AF37]' : ''}`} />
                            AuditFlow
                        </button>
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 items-stretch">
                    {currentPlans.map((plan, index) => (
                        <div
                            key={index}
                            className={`flex flex-col relative bg-white rounded-[2.5rem] p-10 border transition-all duration-500 hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] hover:-translate-y-2 ${plan.recommended
                                    ? 'border-[#D4AF37] ring-4 ring-[#D4AF37]/5 scale-105 z-10'
                                    : 'border-slate-100'
                                }`}
                        >
                            <div className="flex justify-between items-start mb-8">
                                <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${plan.recommended ? 'bg-[#D4AF37] text-[#0A192F]' : 'bg-slate-100 text-slate-500'
                                    }`}>
                                    {plan.badge}
                                </span>
                                {plan.recommended && <Sparkles className="w-6 h-6 text-[#D4AF37]" />}
                            </div>

                            <div className="mb-8">
                                <h3 className="text-3xl font-black text-[#0A192F] mb-3">{plan.name}</h3>
                                <p className="text-slate-500 text-base leading-relaxed h-12 overflow-hidden">{plan.description}</p>
                            </div>

                            <div className="mb-10">
                                {plan.contactOnly ? (
                                    <div className="text-4xl font-black text-[#0A192F]">Custom</div>
                                ) : (
                                    <div className="flex items-baseline">
                                        <span className="text-5xl font-black text-[#0A192F]">
                                            ₩{plan.price.toLocaleString()}
                                        </span>
                                        <span className="text-slate-400 ml-2 font-bold text-lg">/ 월</span>
                                    </div>
                                )}
                            </div>

                            <ul className="space-y-5 mb-12 flex-grow">
                                {plan.features.map((feature, fIndex) => (
                                    <li key={fIndex} className="flex items-start text-slate-600 font-medium">
                                        <div className="mt-1 mr-4 bg-slate-50 p-1 rounded-lg">
                                            <Check className="w-4 h-4 text-[#D4AF37]" />
                                        </div>
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            {plan.contactOnly ? (
                                <button
                                    onClick={() => window.location.href = '/contact'}
                                    className="w-full py-5 px-6 bg-[#0A192F] text-white rounded-[1.5rem] font-black text-lg transition-all hover:bg-slate-800 shadow-xl shadow-slate-200"
                                >
                                    문의하기
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        const el = document.getElementById('download-hub');
                                        el?.scrollIntoView({ behavior: 'smooth' });
                                    }}
                                    className={`w-full py-5 px-6 rounded-[1.5rem] font-black text-lg transition-all ${plan.recommended
                                            ? 'bg-[#D4AF37] text-[#0A192F] hover:bg-[#C4A030] shadow-xl shadow-[#D4AF37]/20 border-b-4 border-[#A68925]'
                                            : 'bg-slate-50 text-[#0A192F] hover:bg-slate-100 border-2 border-slate-100'
                                        }`}
                                >
                                    무료 데모 다운로드
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {/* Main Download Hub */}
                <div id="download-hub" className="bg-[#0A192F] rounded-[3.5rem] p-16 text-center text-white relative overflow-hidden shadow-2xl">
                    <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
                        <div className="absolute top-20 left-20 w-32 h-32 border-8 border-white rounded-full blur-xl"></div>
                        <div className="absolute bottom-20 right-20 w-64 h-64 border-8 border-[#D4AF37] rounded-full blur-2xl"></div>
                    </div>

                    <div className="relative z-10 max-w-3xl mx-auto">
                        <div className="flex justify-center mb-8">
                            <div className="p-4 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20">
                                <AppWindow className="w-12 h-12 text-[#D4AF37]" />
                            </div>
                        </div>
                        <h3 className="text-4xl font-black mb-6">지금 바로 시작하세요</h3>
                        <p className="text-slate-300 mb-12 text-xl leading-relaxed">
                            전문가용 AI 엔진의 강력한 성능을 직접 확인하세요. <br />
                            설치 후 프로그램 내 <span className="text-[#D4AF37] font-bold">Subscription</span> 탭을 통해 언제든 라이선스를 활성화할 수 있습니다.
                        </p>

                        <DownloadButton service={serviceType as any} />

                        <div className="mt-12 flex flex-wrap justify-center gap-8 text-sm text-slate-500 font-bold border-t border-white/10 pt-8">
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                Current Version: v1.0.0
                            </div>
                            <div>System Requirement: 8GB RAM Minimum</div>
                            <div>No Credit Card Required for Demo</div>
                        </div>
                    </div>
                </div>

                {/* In-App Subscription Info */}
                <div className="mt-20 flex flex-col items-center">
                    <div className="flex items-center gap-3 text-slate-400 font-bold mb-4">
                        <Info className="w-5 h-5 text-[#D4AF37]" />
                        구독 안내
                    </div>
                    <div className="max-w-2xl text-center text-slate-500 leading-loose bg-white p-8 rounded-3xl border border-slate-100">
                        인사이트릭스는 보안상의 이유로 웹 결제를 지원하지 않습니다.
                        모든 결제는 <strong>토스페이먼츠(Toss Payments)</strong>의 보안 모듈을 통해
                        <strong>프로그램 내부(In-App)</strong>에서 안전하게 이루어집니다.
                        구매하신 수지는 실시간으로 로컬 라이선스 키로 변환되어 즉시 적용됩니다.
                    </div>
                </div>
            </div>
        </section>
    );
};

export default PricingSection;
