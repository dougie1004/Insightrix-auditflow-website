import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import PricingSection from './components/PricingSection';
import WelcomePro from './pages/WelcomePro';

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-white">
                {/* Navigation (Hybrid Link to HTML pages) */}
                <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 py-4 flex justify-between items-center">
                    <a href="index.html" className="text-2xl font-black text-[#0A192F] flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#0A192F] rounded-lg"></div>
                        Insightrix
                    </a>
                    <div className="hidden md:flex space-x-8 font-bold text-[#0A192F]">
                        <a href="index.html" className="hover:text-[#D4AF37] transition">Home</a>
                        <a href="accountingflow.html" className="hover:text-[#D4AF37] transition">AccountingFlow</a>
                        <a href="auditflow.html" className="hover:text-[#D4AF37] transition">AuditFlow</a>
                        <a href="company.html" className="hover:text-[#D4AF37] transition">Company</a>
                        <a href="contact.html" className="hover:text-[#D4AF37] transition">Contact</a>
                        <a href="#" className="text-[#D4AF37]">Pricing & Download</a>
                    </div>
                </nav>

                <Routes>
                    <Route path="/" element={<PricingSection />} />
                    <Route path="/welcome-pro" element={<WelcomePro />} />
                </Routes>

                <footer className="bg-[#0A192F] text-white py-16 px-8 border-t border-white/10">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-left">
                        <div>
                            <h3 className="text-2xl font-black mb-6">Insightrix</h3>
                            <p className="text-slate-400 leading-relaxed">
                                혁신적인 AI 엔진으로 기업 경영의 미래를 설계합니다. 회계 처리를 넘어 자율 경영의 시대를 엽니다.
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6 text-[#D4AF37]">Solutions</h4>
                            <ul className="space-y-4 text-slate-400">
                                <li><a href="accountingflow.html" className="hover:text-white">AccountingFlow</a></li>
                                <li><a href="auditflow.html" className="hover:text-white">AuditFlow</a></li>
                                <li>AI Tax Engine</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6 text-[#D4AF37]">Support</h4>
                            <ul className="space-y-4 text-slate-400">
                                <li><a href="app.html#/" className="hover:text-white">Download Center</a></li>
                                <li>API Documentation</li>
                                <li><a href="contact.html" className="hover:text-white">Contact Us</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-16 pt-8 border-t border-white/5 text-slate-500 text-sm">
                        © 2026 Insightrix Corp. All Rights Reserved.
                    </div>
                </footer>
            </div>
            <Analytics />
        </Router>
    );
}

export default App;
