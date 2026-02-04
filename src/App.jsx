import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PricingSection from './components/PricingSection';
import WelcomePro from './pages/WelcomePro';

// Placeholder components for existing pages
const Home = () => (
    <div className="py-20 text-center">
        <h1 className="text-5xl font-black text-[#0A192F] mb-8">AI CFO for Autonomous Management</h1>
        <p className="text-xl text-slate-500 mb-12">Insightrix AI engine automates accounting, compliance, and tax reporting.</p>
        <Link to="/pricing" className="bg-[#0A192F] text-white px-10 py-4 rounded-2xl font-bold text-lg hover:shadow-xl transition-all">
            Get Started
        </Link>
    </div>
);

const AccountingFlow = () => <div className="p-20 text-center text-2xl font-bold">AccountingFlow Page</div>;
const AuditFlow = () => <div className="p-20 text-center text-2xl font-bold">AuditFlow Page</div>;
const Company = () => <div className="p-20 text-center text-2xl font-bold">Company Page</div>;
const Contact = () => <div className="p-20 text-center text-2xl font-bold">Contact Page</div>;

function App() {
    return (
        <Router>
            <div className="min-h-screen bg-white">
                {/* Navigation */}
                <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 py-4 flex justify-between items-center">
                    <Link to="/" className="text-2xl font-black text-[#0A192F] flex items-center gap-2">
                        <div className="w-8 h-8 bg-[#0A192F] rounded-lg"></div>
                        Insightrix
                    </Link>
                    <div className="hidden md:flex space-x-8 font-bold text-[#0A192F]">
                        <Link to="/" className="hover:text-[#D4AF37] transition">Home</Link>
                        <Link to="/accounting" className="hover:text-[#D4AF37] transition">AccountingFlow</Link>
                        <Link to="/audit" className="hover:text-[#D4AF37] transition">AuditFlow</Link>
                        <Link to="/pricing" className="text-[#D4AF37]">Pricing & Download</Link>
                        <Link to="/company" className="hover:text-[#D4AF37] transition">Company</Link>
                        <Link to="/contact" className="hover:text-[#D4AF37] transition">Contact</Link>
                    </div>
                </nav>

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/accounting" element={<AccountingFlow />} />
                    <Route path="/audit" element={<AuditFlow />} />
                    <Route path="/pricing" element={<PricingSection />} />
                    <Route path="/company" element={<Company />} />
                    <Route path="/contact" element={<Contact />} />
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
                                <li>AccountingFlow</li>
                                <li>AuditFlow</li>
                                <li>AI Tax Engine</li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-6 text-[#D4AF37]">Support</h4>
                            <ul className="space-y-4 text-slate-400">
                                <li>Download Center</li>
                                <li>API Documentation</li>
                                <li>Contact Us</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mt-16 pt-8 border-t border-white/5 text-slate-500 text-sm">
                        © 2026 Insightrix Corp. All Rights Reserved.
                    </div>
                </footer>
            </div>
        </Router>
    );
}

export default App;
