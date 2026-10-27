import React from 'react';
import { ArrowRight } from 'lucide-react';

interface DownloadButtonProps {
    service: 'accounting' | 'audit';
    variant?: 'primary' | 'secondary';
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ service, variant = 'primary' }) => {
    const baseStyles = "inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-sm transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-amber-500/5 group";
    const variantStyles = variant === 'primary'
        ? "bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 text-slate-950"
        : "bg-slate-900 text-slate-300 hover:text-white border border-slate-800";

    return (
        <a href="/contact.html" aria-label={(service === 'accounting' ? 'AccountingFlow' : 'AuditFlow') + ' 사용 요청'} className={baseStyles + ' ' + variantStyles}>
            <span className="mr-2">사용 요청</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </a>
    );
};

export default DownloadButton;
