import React, { useState, useEffect } from 'react';
import { Monitor, Apple, Download, ShieldCheck } from 'lucide-react';

interface DownloadButtonProps {
    service: 'accounting' | 'audit';
    variant?: 'primary' | 'secondary';
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ service, variant = 'primary' }) => {
    const [os, setOs] = useState<'windows' | 'mac' | 'other'>('windows');
    const [downloadUrl, setDownloadUrl] = useState('');
    const [fileSize, setFileSize] = useState('');
    const [lastUpdated, setLastUpdated] = useState('2026.02.01');

    useEffect(() => {
        const userAgent = window.navigator.userAgent.toLowerCase();
        if (userAgent.indexOf('win') > -1) {
            setOs('windows');
        } else if (userAgent.indexOf('mac') > -1) {
            setOs('mac');
        } else {
            setOs('other');
        }
    }, []);

    useEffect(() => {
        // Mocking URLs and metadata
        const metadata = {
            accounting: {
                windows: { url: '/downloads/AccountingFlow_Setup_v1.0.0.exe', size: '124MB' },
                mac: { url: '/downloads/AccountingFlow_v1.0.0.dmg', size: '118MB' }
            },
            audit: {
                windows: { url: '/downloads/AuditFlow_Setup_v1.0.0.exe', size: '156MB' },
                mac: { url: '/downloads/AuditFlow_v1.0.0.dmg', size: '142MB' }
            }
        };

        const currentOs = os === 'other' ? 'windows' : os; // Default to windows for others
        const info = metadata[service][currentOs];
        setDownloadUrl(info.url);
        setFileSize(info.size);
    }, [os, service]);

    const baseStyles = "inline-flex items-center justify-center px-8 py-4 rounded-2xl font-bold text-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg group";
    const variantStyles = variant === 'primary'
        ? "bg-[#D4AF37] text-[#0A192F] hover:bg-white hover:text-[#0A192F]"
        : "bg-white text-[#0A192F] hover:bg-[#D4AF37] border-2 border-[#D4AF37]/20";

    return (
        <div className="flex flex-col items-center gap-4">
            <a href={downloadUrl} className={`${baseStyles} ${variantStyles}`}>
                {os === 'mac' ? <Apple className="mr-2 w-6 h-6" /> : <Monitor className="mr-2 w-6 h-6" />}
                <span className="mr-2">
                    {service === 'accounting' ? 'AccountingFlow' : 'AuditFlow'} {os === 'mac' ? 'for Mac' : 'for Windows'}
                </span>
                <Download className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
            </a>

            <div className="flex items-center gap-6 text-sm font-medium text-slate-400">
                <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-green-500" />
                    Verified Safe
                </div>
                <div>Size: <span className="text-slate-200">{fileSize}</span></div>
                <div>Updated: <span className="text-slate-200">{lastUpdated}</span></div>
            </div>

            {os === 'other' && (
                <p className="text-xs text-[#D4AF37]/70 mt-1">
                    * Windows 버전을 기본으로 제공합니다.
                </p>
            )}
        </div>
    );
};

export default DownloadButton;
