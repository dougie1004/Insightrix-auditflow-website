import React, { useState } from 'react';
import { Check, Info, ShieldAlert, Sparkles, AppWindow, ArrowRight, ShieldCheck } from 'lucide-react';
import DownloadButton from './DownloadButton';

const PricingSection = () => {
    const [serviceType, setServiceType] = useState('accounting'); // 'accounting' | 'audit'

    return (
        <section className="py-24 bg-slate-50 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* 🎯 Premise Section */}
                <div className="max-w-4xl mx-auto text-center mb-20">
                    <div className="inline-block px-6 py-2 bg-[#0A192F] text-[#D4AF37] rounded-full text-sm font-black mb-8 tracking-widest uppercase">
                        Definition of Service
                    </div>
                    <div className="space-y-4">
                        <p className="text-2xl md:text-3xl font-bold text-[#0A192F] leading-tight break-keep">
                            Insightrix의 요금제는 기능 묶음이 아닙니다.<br />
                            <span className="text-[#D4AF37]">책임과 자동화의 경계를 명확히 정의한 계약 구조</span>입니다.
                        </p>
                    </div>
                </div>

                {/* 🟦 Hero Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl md:text-6xl font-black text-[#0A192F] mb-8 tracking-tighter">
                        Pricing by Responsibility
                    </h1>
                    <p className="max-w-3xl mx-auto text-xl text-slate-500 leading-relaxed font-medium break-keep">
                        Insightrix는 모든 자동화를 제공하지 않습니다.<br />
                        각 요금제는 <strong className="text-[#0A192F]">시스템이 책임지는 영역</strong>과 <strong className="text-[#0A192F]">사람이 책임져야 하는 영역</strong>을 명확히 구분합니다.
                    </p>
                </div>

                {/* 🧩 Common Principles Block */}
                <div className="bg-white p-12 rounded-[3rem] max-w-4xl mx-auto mb-20 border border-slate-100 shadow-2xl shadow-slate-200/50 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-bl-full -z-0 opacity-50"></div>
                    <div className="relative z-10">
                        <h3 className="text-2xl font-black text-[#0A192F] mb-8 flex items-center gap-3">
                            <ShieldCheck className="w-8 h-8 text-[#D4AF37]" />
                            공통 원칙
                        </h3>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                "Insightrix는 판단 결과를 자동 확정하지 않습니다.",
                                "모든 출력은 재현 가능해야 합니다.",
                                "최종 판단과 법적 책임은 항상 사용자에게 귀속됩니다.",
                                "요금제는 기능이 아니라 책임 범위에 따라 구분됩니다."
                            ].map((text, i) => (
                                <li key={i} className="flex items-start gap-3 text-slate-600 font-bold leading-snug">
                                    <div className="mt-1.5 w-1.5 h-1.5 bg-[#D4AF37] rounded-full shrink-0"></div>
                                    {text}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Tab Switcher */}
                <div className="flex justify-center mb-16">
                    <div className="bg-[#0A192F]/5 p-2 rounded-2xl flex space-x-2">
                        <button
                            onClick={() => setServiceType('accounting')}
                            className={`px-10 py-4 rounded-xl font-black transition-all duration-300 flex items-center gap-2 ${serviceType === 'accounting'
                                ? 'bg-[#0A192F] text-white shadow-xl'
                                : 'text-slate-400 hover:bg-white hover:text-[#0A192F]'
                                }`}
                        >
                            AccountingFlow
                        </button>
                        <button
                            onClick={() => setServiceType('audit')}
                            className={`px-10 py-4 rounded-xl font-black transition-all duration-300 flex items-center gap-2 ${serviceType === 'audit'
                                ? 'bg-[#0A192F] text-white shadow-xl'
                                : 'text-slate-400 hover:bg-white hover:text-[#0A192F]'
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
                            <div className="bg-white rounded-[3.5rem] p-12 md:p-16 border border-slate-100 shadow-xl">
                                <h2 className="text-4xl font-black text-[#0A192F] mb-6">AccountingFlow – Verified Core</h2>
                                <p className="text-xl text-slate-500 mb-12 max-w-2xl leading-relaxed break-keep">
                                    회계 자동화를 제공하되, 회계 판단의 책임은 사용자에게 남기는 기본 플랜입니다.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                                    <div className="bg-emerald-50/50 p-8 rounded-[2.5rem] border border-emerald-100">
                                        <h4 className="text-emerald-700 font-black text-lg mb-6 flex items-center gap-2">
                                            <Check className="w-5 h-5" /> 시스템이 책임지는 영역
                                        </h4>
                                        <ul className="space-y-4">
                                            {["복식부기 규칙 강제 적용", "차대 불일치 전표 저장 불가", "증빙–전표 간 연결 구조 유지", "동일 입력 → 동일 전표 결과 보장"].map((item, i) => (
                                                <li key={i} className="text-slate-700 font-bold flex gap-3 text-sm">
                                                    <span className="text-emerald-500">•</span> {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-amber-50/50 p-8 rounded-[2.5rem] border border-amber-100">
                                        <h4 className="text-amber-700 font-black text-lg mb-6 flex items-center gap-2">
                                            <ShieldAlert className="w-5 h-5" /> 사용자가 책임지는 영역
                                        </h4>
                                        <ul className="space-y-4">
                                            {["계정과목 최종 승인", "비용/자산/수익 분류에 대한 판단", "세무 신고 및 외부 보고"].map((item, i) => (
                                                <li key={i} className="text-slate-700 font-bold flex gap-3 text-sm">
                                                    <span className="text-amber-500">•</span> {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-slate-100">
                                    <div className="text-center md:text-left">
                                        <p className="text-slate-400 text-sm font-bold mb-1">※ AccountingFlow는 회계 판단을 자동화하지 않습니다.</p>
                                        <p className="text-slate-400 text-sm font-bold">모든 전표는 사용자 승인 전까지 임시 상태로 유지됩니다.</p>
                                    </div>
                                    <div className="bg-slate-50 px-8 py-4 rounded-2xl text-center">
                                        <p className="text-[#0A192F] font-black text-xl mb-1">전표 생성량 기반 과금</p>
                                        <p className="text-slate-400 text-sm font-bold">(상담 후 기업 규모별 적용)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-12 animate-in fade-in duration-700">
                            {/* AuditFlow Header */}
                            <div className="bg-white rounded-[3.5rem] p-12 md:p-16 border border-slate-100 shadow-xl">
                                <h2 className="text-4xl font-black text-[#0A192F] mb-6">AuditFlow – Judgment Support</h2>
                                <p className="text-xl text-slate-500 mb-12 max-w-2xl leading-relaxed break-keep">
                                    감사 판단을 대신하지 않고, 판단에 필요한 근거와 재현 구조를 제공하는 분석 플랜입니다.
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
                                    <div className="bg-emerald-50/50 p-8 rounded-[2.5rem] border border-emerald-100">
                                        <h4 className="text-emerald-700 font-black text-lg mb-6 flex items-center gap-2">
                                            <Check className="w-5 h-5" /> 시스템이 책임지는 영역
                                        </h4>
                                        <ul className="space-y-4">
                                            {["규칙 기반 이상 시나리오 탐지", "판단 근거(룰·데이터 경로) 자동 생성", "Judgment-Only Replay 지원", "감사 Trail 구조 유지"].map((item, i) => (
                                                <li key={i} className="text-slate-700 font-bold flex gap-3 text-sm">
                                                    <span className="text-emerald-500">•</span> {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                    <div className="bg-amber-50/50 p-8 rounded-[2.5rem] border border-amber-100">
                                        <h4 className="text-amber-700 font-black text-lg mb-6 flex items-center gap-2">
                                            <ShieldAlert className="w-5 h-5" /> 감사인이 책임지는 영역
                                        </h4>
                                        <ul className="space-y-4">
                                            {["이상 여부에 대한 최종 판단", "조치 필요성 결정", "감사 의견 및 보고서 서명"].map((item, i) => (
                                                <li key={i} className="text-slate-700 font-bold flex gap-3 text-sm">
                                                    <span className="text-amber-500">•</span> {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="flex flex-col md:flex-row justify-between items-center gap-8 pt-8 border-t border-slate-100">
                                    <div className="text-center md:text-left">
                                        <p className="text-slate-400 text-sm font-bold mb-1">※ AuditFlow는 감사 판단을 제공하지 않습니다.</p>
                                        <p className="text-slate-400 text-sm font-bold">본 시스템은 의사결정을 보조하기 위한 인프라입니다.</p>
                                    </div>
                                    <div className="bg-slate-50 px-8 py-4 rounded-2xl text-center">
                                        <p className="text-[#0A192F] font-black text-xl mb-1">프로젝트 단위 / 데이터 규모 기반</p>
                                        <p className="text-slate-400 text-sm font-bold">(파일럿 → 단계적 확장)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Enterprise Section */}
                    <div className="mt-12 bg-slate-100/50 rounded-[3rem] p-12 border border-slate-200/50">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                            <div>
                                <h2 className="text-3xl font-black text-[#0A192F] mb-4">Enterprise & Custom</h2>
                                <ul className="space-y-2 mb-4">
                                    {["내부 규정 맞춤 Rule Engine", "온프레미스 / 하이브리드 구성", "감사 기준 고정 및 버전 관리"].map((text, i) => (
                                        <li key={i} className="flex items-center gap-2 text-slate-600 font-bold text-sm">
                                            <ArrowRight className="w-4 h-4 text-[#D4AF37]" /> {text}
                                        </li>
                                    ))}
                                </ul>
                                <p className="text-xs text-slate-400 font-black tracking-wider uppercase">※ 책임 범위는 계약서에 별도 명시됩니다.</p>
                            </div>
                            <button
                                onClick={() => window.location.href = '/contact.html'}
                                className="px-12 py-5 bg-[#0A192F] text-white rounded-2xl font-black text-lg transition-all hover:scale-105 active:scale-95 shadow-xl"
                            >
                                구축 상담하기
                            </button>
                        </div>
                    </div>
                </div>

                {/* 🟥 Responsibility Notice Block */}
                <div className="mt-32 max-w-5xl mx-auto p-12 md:p-16 bg-[#0A192F] text-slate-300 rounded-[3.5rem] border border-white/5 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                    <div className="relative z-10">
                        <h3 className="text-[#D4AF37] text-2xl font-black mb-8 flex items-center gap-3 tracking-widest uppercase">
                            <Info className="w-8 h-8" /> Responsibility Notice
                        </h3>
                        <div className="space-y-6 text-xl md:text-2xl font-bold leading-relaxed break-keep text-white/90">
                            <p>Insightrix는 재무, 세무, 감사에 대한 <span className="text-[#D4AF37]">법적 판단을 제공하지 않습니다.</span></p>
                            <p>모든 자동화는 설명 가능성과 재현 가능성을 전제로 하며,<br />
                                최종 판단과 책임은 사용자에게 귀속됩니다.</p>
                        </div>
                    </div>
                </div>

                {/* Main Download Hub (Optional but kept for functionality) */}
                <div id="download-hub" className="mt-32 bg-white rounded-[3.5rem] p-16 text-center border border-slate-100 shadow-2xl relative overflow-hidden">
                    <div className="relative z-10 max-w-3xl mx-auto text-slate-900">
                        <div className="flex justify-center mb-8">
                            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                <AppWindow className="w-12 h-12 text-[#0A192F]" />
                            </div>
                        </div>
                        <h3 className="text-4xl font-black mb-6">Demo Version Download</h3>
                        <p className="text-slate-500 mb-12 text-xl leading-relaxed font-medium">
                            AI가 판단하지 않는 검증 가능한 시스템을 직접 확인하세요. <br />
                            프로그램 내에서 정식 라이선스를 활성화할 수 있습니다.
                        </p>

                        <DownloadButton service={serviceType as any} />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default PricingSection;
