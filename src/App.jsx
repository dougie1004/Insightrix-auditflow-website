import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import PricingSection from './components/PricingSection';
import WelcomePro from './pages/WelcomePro';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
                {/* Navigation */}
                <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/85 border-b border-slate-900 px-6 md:px-12 py-4 flex justify-between items-center transition-all duration-300">
                    <a href="/index.html" className="flex items-center gap-2 group">
                        <img src="/Insightrix.png" alt="Insightrix Logo" className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
                        <span className="font-extrabold text-lg tracking-wider bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 bg-clip-text text-transparent">INSIGHTRIX</span>
                    </a>
                    <div className="hidden md:flex gap-8 items-center">
                        <a href="/index.html" className="text-sm font-semibold text-slate-400 hover:text-amber-400 transition-colors duration-200 no-underline">Home</a>
                        <a href="/accountingflow.html" className="text-sm font-semibold text-slate-400 hover:text-amber-400 transition-colors duration-200 no-underline">AccountingFlow</a>
                        <a href="/auditflow.html" className="text-sm font-semibold text-slate-400 hover:text-amber-400 transition-colors duration-200 no-underline">AuditFlow</a>
                        <a href="/company.html" className="text-sm font-semibold text-slate-400 hover:text-amber-400 transition-colors duration-200 no-underline">Company</a>
                        <a href="/contact.html" className="text-sm font-semibold text-slate-400 hover:text-amber-400 transition-colors duration-200 no-underline">Contact</a>
                        <a href="/app.html" className="text-sm font-semibold text-amber-400 border-b-2 border-amber-400 pb-1 no-underline">Pricing & Download</a>
                    </div>
                </nav>

                <main className="flex-grow">
                    <Routes>
                        <Route path="/" element={<PricingSection />} />
                        <Route path="/welcome-pro" element={<WelcomePro />} />
                    </Routes>
                </main>

                {/* Footer */}
                <footer className="bg-slate-950 border-t border-slate-900 py-16 px-6 md:px-12 text-center md:text-left">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                        <div className="md:col-span-6 space-y-4">
                            <div className="flex justify-center md:justify-start items-center gap-2">
                                <img src="/Insightrix.png" alt="Insightrix Logo" className="h-7 w-auto filter brightness-90" />
                                <span className="font-bold tracking-wider text-slate-300 text-sm">INSIGHTRIX</span>
                            </div>
                            <p className="text-xs text-slate-500 max-w-sm">
                                Insightrix는 인공지능이 인간의 영역을 지배적으로 판단하지 않는 안전하고 검증 가능한 투명 금융 엔지니어링 생태계를 만듭니다.
                            </p>
                        </div>
                        <div className="md:col-span-6 flex flex-wrap justify-center md:justify-end gap-6 text-xs text-slate-400 font-medium">
                            <a href="/index.html" className="hover:text-amber-400 transition-colors no-underline">Home</a>
                            <a href="/accountingflow.html" className="hover:text-amber-400 transition-colors no-underline">AccountingFlow</a>
                            <a href="/auditflow.html" className="hover:text-amber-400 transition-colors no-underline">AuditFlow</a>
                            <a href="/company.html" className="hover:text-amber-400 transition-colors no-underline">Company</a>
                            <a href="/contact.html" className="hover:text-amber-400 transition-colors no-underline">Contact</a>
                            <a href="/app.html" className="hover:text-amber-400 transition-colors no-underline">Pricing</a>
                        </div>
                    </div>
                    <div className="max-w-7xl mx-auto border-t border-slate-900/60 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-[11px] text-slate-600 gap-4">
                        <p>© 2026 Insightrix Corp. All Rights Reserved.</p>
                        <p>본 플랫폼의 시스템 검증 기능은 특허 기술 및 독자적인 분산 Ledger 추적 기술을 기반으로 작동합니다.</p>
                    </div>
                </footer>
            </div>
        </Router>
    );
}

export default App;
