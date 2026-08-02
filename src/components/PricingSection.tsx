import React, { useState } from 'react';
import { Check, Info, ShieldAlert, Sparkles, AppWindow, ArrowRight, ShieldCheck } from 'lucide-react';
import DownloadButton from './DownloadButton';

const PricingSection = () => {
    const [serviceType, setServiceType] = useState('accounting'); // 'accounting' | 'audit'

    return (
        <section className="py-20 bg-slate-950 min-h-screen text-slate-100 relative overflow-hidden">
            {/* Background Glow */}
            <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none"></div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

                {/* 🎯 Premise Section */}
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-xs font-semibold text-amber-400 tracking-wider uppercase mb-6 shadow-inner">
                        Definition of Service
                    </div>
                    <div className="space-y-4">
                        <p className="text-xl md:text-3xl font-extrabold text-white leading-relaxed break-keep">
                            Insightrix의 요금제는 단순한 기능 묶음이 아닙니다.<br />
                            <span className="bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 bg-clip-text text-transparent text-glow">책임과 자동화의 경계를 명확히 정의한 계약 구조</span>입니다.
                        </p>
                    </div>
                </div>

                {/* 🟦 Hero Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">
                        Pricing by Responsibility
                    </h1>
                    <p className="max-w-2xl mx-auto text-sm md:text-base text-slate-400 leading-relaxed break-keep">
                        Insightrix는 모든 자동화를 독단적으로 승인하지 않습니다.<br />
                        각 요금제는 <strong className="text-amber-400 font-semibold">시스템이 책임지는 영역</strong>과 <strong className="text-slate-200 font-semibold">사람이 책임져야 하는 영역</strong>을 명확히 구분합니다.
                    </p>
                </div>

                {/* 🧩 Common Principles Block */}
                <div className="glass-panel p-8 md:p-12 rounded-3xl max-w-4xl mx-auto mb-16 border border-slate-900 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-slate-900 rounded-bl-full -z-0 opacity-50"></div>
                    <div className="relative z-10">
                        <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-3">
                            <ShieldCheck className="w-6 h-6 text-amber-400" />
                            공통 원칙
                        </h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm text-slate-400">
                            {[
                                "Insightrix는 판단 결과를 자동 확정하지 않습니다.",
                                "모든 출력은 재현 가능해야 합니다.",
                                "최종 판단과 법적 책임은 항상 사용자에게 귀속됩니다.",
                                "요금제는 기능이 아니라 책임 범위에 따라 구분됩니다."
                            ].map((text, i) => (
                                <li key={i} className="flex items-start gap-3 font-semibold leading-relaxed">
                                    <div className="mt-2 w-1.5 h-1.5 bg-amber-400 rounded-full shrink-0"></div>
                                    {text}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Tab Switcher */}
                <div className="flex justify-center mb-12">
                    <div className="bg-slate-900 border border-slate-800 p-1.5 rounded-2xl flex space-x-1">
                        <button
                            onClick={() => setServiceType('accounting')}
                            className={`px-8 py-3.5 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 text-sm ${serviceType === 'accounting'
                                ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 shadow-lg shadow-amber-500/10'
                                : 'text-slate-400 hover:text-slate-200'
                                }`}
                        >
                            AccountingFlow
                        </button>
                        <button
                            onClick={() => setServiceType('audit')}
                            className={`px-8 py-3.5 rounded-xl font-bold transition-all duration-300 flex items-center gap-2 text-sm ${serviceType === 'audit'
                                ? 'bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 shadow-lg shadow-amber-500/10'
                                : 'text-slate-400 hover:text-slate-200'
                                }`}
                        >
                            AuditFlow
                        </button>
                    </div>
                </div>

                {/* Responsibility-Based Pricing Design */}
                <div className="max-w-5xl mx-auto">
                    {serviceType === 'accounting' ? (
                        <div className="space-y-12 animate-in fade-in duration-700">
                            {/* AccountingFlow Header */}
                            <div className="glass-panel rounded-3xl p-8 md:p-12 border border-slate-900 shadow-xl">
                                <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">AccountingFlow – Verified Core</h2>
                                <p className="text-sm md:text-base text-slate-400 mb-8 max-w-2xl leading-relaxed break-keep">
                                    회계 자동화를 제공하되, 회계 판단의 책임은 사용자에게 남기는 기본 플랜입니다.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div className="bg-emerald-500/5 p-6 rounded-2xl border border-emerald-500/10">
                                        <h4 className="text-emerald-400 font-bold text-sm md:text-base mb-4 flex items-center gap-2">
                                            <Check className="w-4 h-4" /> 시스템이 책임지는 영역
                                        </h4>
                                        <ul className="space-y-3 text-xs md:text-sm text-slate-400">
                                            {["복식부기 규칙 강제 적용", "차대 불일치 전표 저장 불가", "증빙–전표 간 연결 구조 유지", "동일 입력 → 동일 전표 결과 보장"].map((item, i) => (
                                                <li key={i} className="flex gap-2 items-center font-semibold">
                                                    <span className="text-emerald-400">•</span> {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-amber-500/5 p-6 rounded-2xl border border-amber-500/10">
                                        <h4 className="text-amber-400 font-bold text-sm md:text-base mb-4 flex items-center gap-2">
                                            <ShieldAlert className="w-4 h-4" /> 사용자가 책임지는 영역
                                        </h4>
                                        <ul className="space-y-3 text-xs md:text-sm text-slate-400">
                                            {["계정과목 최종 승인", "비용/자산/수익 분류에 대한 판단", "세무 신고 및 외부 보고"].map((item, i) => (
                                                <li key={i} className="flex gap-2 items-center font-semibold">
                                                    <span className="text-amber-400">•</span> {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-6 border-t border-slate-900">
                                    <div className="text-center md:text-left">
                                        <p className="text-slate-500 text-xs font-semibold mb-1">※ AccountingFlow는 회계 판단을 자동화하지 않습니다.</p>
                                        <p className="text-slate-500 text-xs font-semibold">모든 전표는 사용자 승인 전까지 임시 상태로 유지됩니다.</p>
                                    </div>
                                    <div className="bg-slate-900 border border-slate-800 px-6 py-3.5 rounded-xl text-center">
                                        <p className="text-white font-extrabold text-base mb-1">전표 생성량 기반 과금</p>
                                        <p className="text-slate-500 text-xs font-semibold">(상담 후 기업 규모별 적용)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-12 animate-in fade-in duration-700">
                            {/* AuditFlow Header */}
                            <div className="glass-panel rounded-3xl p-8 md:p-12 border border-slate-900 shadow-xl">
                                <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">AuditFlow – Judgment Support</h2>
                                <p className="text-sm md:text-base text-slate-400 mb-8 max-w-2xl leading-relaxed break-keep">
                                    감사 판단을 대신하지 않고, 판단에 필요한 근거와 재현 구조를 제공하는 분석 플랜입니다.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                    <div className="bg-emerald-500/5 p-6 rounded-2xl border border-emerald-500/10">
                                        <h4 className="text-emerald-400 font-bold text-sm md:text-base mb-4 flex items-center gap-2">
                                            <Check className="w-4 h-4" /> 시스템이 책임지는 영역
                                        </h4>
                                        <ul className="space-y-3 text-xs md:text-sm text-slate-400">
                                            {["규칙 기반 이상 시나리오 탐지", "판단 근거(룰·데이터 경로) 자동 생성", "Judgment-Only Replay 지원", "감사 Trail 구조 유지"].map((item, i) => (
                                                <li key={i} className="flex gap-2 items-center font-semibold">
                                                    <span className="text-emerald-400">•</span> {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-amber-500/5 p-6 rounded-2xl border border-amber-500/10">
                                        <h4 className="text-amber-400 font-bold text-sm md:text-base mb-4 flex items-center gap-2">
                                            <ShieldAlert className="w-4 h-4" /> 감사인이 책임지는 영역
                                        </h4>
                                        <ul className="space-y-3 text-xs md:text-sm text-slate-400">
                                            {["이상 여부에 대한 최종 판단", "조치 필요성 결정", "감사 의견 및 보고서 서명"].map((item, i) => (
                                                <li key={i} className="flex gap-2 items-center font-semibold">
                                                    <span className="text-amber-400">•</span> {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-6 border-t border-slate-900">
                                    <div className="text-center md:text-left">
                                        <p className="text-slate-500 text-xs font-semibold mb-1">※ AuditFlow는 감사 판단을 제공하지 않습니다.</p>
                                        <p className="text-slate-500 text-xs font-semibold">본 시스템은 의사결정을 보조하기 위한 인프라입니다.</p>
                                    </div>
                                    <div className="bg-slate-900 border border-slate-800 px-6 py-3.5 rounded-xl text-center">
                                        <p className="text-white font-extrabold text-base mb-1">프로젝트 단위 / 데이터 규모 기반</p>
                                        <p className="text-slate-500 text-xs font-semibold">(파일럿 → 단계적 확장)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Enterprise Section */}
                    <div className="mt-8 bg-slate-900/30 rounded-3xl p-8 border border-slate-900">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                            <div>
                                <h2 className="text-xl md:text-2xl font-bold text-white mb-3">Enterprise & Custom</h2>
                                <ul className="space-y-1.5 mb-3 text-xs md:text-sm text-slate-400">
                                    {["내부 규정 맞춤 Rule Engine", "온프레미스 / 하이브리드 구성", "감사 기준 고정 및 버전 관리"].map((text, i) => (
                                        <li key={i} className="flex items-center gap-2 font-semibold">
                                            <ArrowRight className="w-3.5 h-3.5 text-amber-400" /> {text}
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-[11px] text-slate-500 font-bold uppercase">※ 책임 범위는 계약서에 별도 명시됩니다.</p>
                            </div>
                            <button
                                onClick={() => window.location.href = '/contact.html'}
                                className="px-8 py-3.5 bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 text-slate-950 rounded-xl font-bold text-sm transition-all hover:scale-[1.02] shadow-xl shadow-amber-500/10"
                            >
                                구축 상담하기
                            </button>
                        </div>
                    </div>
                </div>

                {/* 🟥 Responsibility Notice Block */}
                <div className="mt-20 max-w-5xl mx-auto p-8 md:p-12 bg-slate-900/40 text-slate-400 rounded-3xl border border-slate-900 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl pointer-events-none"></div>
                    <div className="relative z-10">
                        <h3 className="text-amber-400 text-lg font-bold mb-4 flex items-center gap-3 uppercase">
                            <Info className="w-6 h-6" /> Responsibility Notice
                        </h3>
                        <div className="space-y-4 text-sm md:text-base font-semibold leading-relaxed break-keep text-slate-300">
                            <p>Insightrix는 재무, 세무, 감사에 대한 <span className="text-amber-400">결과적 법적 판단을 제공하지 않습니다.</span></p>
                            <p>모든 자동화는 설명 가능성과 재현 가능성을 전제(Explainable & Reproducible)로 작동하며,<br />
                                최종 판단과 책임은 사용자에게 귀속됩니다.</p>
                        </div>
                    </div>
                </div>

                {/* Main Download Hub */}
                <div id="download-hub" className="mt-20 glass-panel rounded-3xl p-12 text-center border border-slate-900 relative overflow-hidden">
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <div className="flex justify-center mb-6">
                            <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl">
                                <AppWindow className="w-10 h-10 text-amber-400" />
                            </div>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-extrabold mb-4 text-white">Demo Version Download</h3>
                        <p className="text-slate-400 mb-8 text-sm md:text-base leading-relaxed font-semibold">
                            AI가 독단적 결정을 내리지 않는 투명 검증 시스템을 직접 로컬에서 기동해 보세요. <br />
                            프로그램 내에서 라이선스 키를 간편히 매핑할 수 있습니다.
                        </p>

                        <DownloadButton service={serviceType as any} />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default PricingSection;
