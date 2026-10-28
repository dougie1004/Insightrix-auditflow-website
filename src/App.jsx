import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import PricingSection from './components/PricingSection';
import WelcomePro from './pages/WelcomePro';
import { SiteHeader, SiteFooter } from './components/SiteChrome';

function App() {
    return <Router><SiteHeader /><main id="main"><Routes><Route path="/" element={<PricingSection />} /><Route path="/welcome-pro" element={<WelcomePro />} /></Routes></main><SiteFooter /></Router>;
}

export default App;
