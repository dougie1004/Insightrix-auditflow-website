import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import PricingSection from './components/PricingSection';
import WelcomePro from './pages/WelcomePro';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-white">
                {/* Navigation */}
                <nav className="sticky top-0 z-50 bg-white/98 backdrop-blur-md border-b border-[#f1f5f9] px-10 flex justify-between items-center min-h-[100px]">
                    <a href="/index.html" className="flex items-center pt-8">
                        <img src="/Insightrix.png" alt="Insightrix Logo" style={{ height: '200px', width: 'auto' }} className="object-contain" />
                    </a>
                    <div className="hidden md:flex items-center gap-8">
                        <a href="/index.html" className="text-[15px] font-bold text-[#0A192F] hover:text-[#D4AF37] transition no-underline">Home</a>
                        <a href="/accountingflow.html" className="text-[15px] font-bold text-[#0A192F] hover:text-[#D4AF37] transition no-underline">AccountingFlow</a>
                        <a href="/auditflow.html" className="text-[15px] font-bold text-[#0A192F] hover:text-[#D4AF37] transition no-underline">AuditFlow</a>
                        <a href="/company.html" className="text-[15px] font-bold text-[#0A192F] hover:text-[#D4AF37] transition no-underline">Company</a>
                        <a href="/contact.html" className="text-[15px] font-bold text-[#0A192F] hover:text-[#D4AF37] transition no-underline">Contact</a>
                        <a href="/app.html" className="text-[15px] font-bold text-[#D4AF37] hover:text-[#D4AF37] transition no-underline">Pricing & Download</a>
                    </div>
                </nav>

                <Routes>
                    <Route path="/" element={<PricingSection />} />
                    <Route path="/welcome-pro" element={<WelcomePro />} />
                </Routes>

                <footer className="bg-[#0A192F] text-slate-400 py-16 px-8 text-center">
                    <div className="mb-6 flex justify-center">
                        <img src="/Insightrix.png" alt="Insightrix Logo" className="h-9 brightness-0 invert opacity-80" />
                    </div>
                    <p className="text-sm mb-4">
                        Insightrix는 AI가 판단하지 않는 검증 가능한 시스템을 설계합니다.
                    </p>
                    <p className="text-sm">
                        © 2026 Insightrix Corp. All Rights Reserved.
                    </p>
                </footer>
            </div>
        </Router>
    );
}

export default App;
