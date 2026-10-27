import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import PricingSection from './components/PricingSection';
import WelcomePro from './pages/WelcomePro';
import insightrixLogo from '../Insightrix.png';

const navLinks = [
    ['/index.html', 'Home'],
    ['/accountingflow.html', 'AccountingFlow'],
    ['/auditflow.html', 'AuditFlow'],
    ['/operationsflow.html', 'OperationsFlow'],
    ['/company.html', 'Company'],
    ['/contact.html', 'Contact'],
    ['/app.html', '요금 및 사용 요청'],
];

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500/30 selection:text-amber-200">
                {/* Navigation */}
                <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/85 border-b border-slate-900 px-6 md:px-12 py-4 flex justify-between items-center transition-all duration-300">
                    <a href="/index.html" className="flex items-center gap-2 group">
                        <img src={insightrixLogo} alt="Insightrix Logo" className="h-8 w-auto object-contain transition-transform duration-300 group-hover:scale-105" />
                        <span className="font-extrabold text-lg tracking-wider bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 bg-clip-text text-transparent">INSIGHTRIX</span>
                    </a>
                    <div className="hidden xl:flex gap-6 items-center">
                        {navLinks.map(([href, label]) => <a key={href} href={href} className="text-sm font-semibold text-slate-400 hover:text-amber-400 transition-colors no-underline">{label}</a>)}
                    </div>
                    <details className="xl:hidden relative">
                        <summary className="cursor-pointer rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-200">메뉴</summary>
                        <div className="absolute right-0 top-full mt-2 flex w-56 flex-col gap-1 rounded-xl border border-slate-800 bg-slate-950 p-3 shadow-xl">
                            {navLinks.map(([href, label]) => <a key={href} href={href} className="rounded-lg px-3 py-2 text-sm text-slate-300 hover:bg-slate-900 hover:text-amber-400 no-underline">{label}</a>)}
                        </div>
                    </details>
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
                                <img src={insightrixLogo} alt="Insightrix Logo" className="h-7 w-auto filter brightness-90" />
                                <span className="font-bold tracking-wider text-slate-300 text-sm">INSIGHTRIX</span>
                            </div>
                            <p className="text-xs text-slate-500 max-w-sm">
                                Insightrix는 회계·감사·기업 운영 업무에서 담당자의 판단을 돕는 솔루션을 개발합니다.
                            </p>
                        </div>
                        <div className="md:col-span-6 flex flex-wrap justify-center md:justify-end gap-6 text-xs text-slate-400 font-medium">
                            <a href="/index.html" className="hover:text-amber-400 transition-colors no-underline">Home</a>
                            <a href="/accountingflow.html" className="hover:text-amber-400 transition-colors no-underline">AccountingFlow</a>
                            <a href="/auditflow.html" className="hover:text-amber-400 transition-colors no-underline">AuditFlow</a>
                            <a href="/operationsflow.html" className="hover:text-amber-400 transition-colors no-underline">OperationsFlow</a>
                            <a href="/company.html" className="hover:text-amber-400 transition-colors no-underline">Company</a>
                            <a href="/contact.html" className="hover:text-amber-400 transition-colors no-underline">Contact</a>
                            <a href="/app.html" className="hover:text-amber-400 transition-colors no-underline">요금 및 사용 요청</a>
                        </div>
                    </div>
                    <div className="max-w-7xl mx-auto border-t border-slate-900/60 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-[11px] text-slate-600 gap-4">
                        <p>© 2026 Insightrix Corp. All Rights Reserved.</p>
                        <p>소개 화면은 개발 중인 제품의 가상 예시를 보여줍니다.</p>
                    </div>
                </footer>
            </div>
        </Router>
    );
}

export default App;
