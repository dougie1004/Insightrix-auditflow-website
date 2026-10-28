interface DownloadButtonProps {
    service: 'accounting' | 'audit' | 'operations';
    variant?: 'primary' | 'secondary';
}

const names = { accounting: 'AccountingFlow', audit: 'AuditFlow', operations: 'OperationsFlow' };

export default function DownloadButton({ service, variant = 'primary' }: DownloadButtonProps) {
    return <a href="/contact.html" aria-label={names[service] + ' 파일럿 참여 문의'} className={'button ' + (variant === 'primary' ? 'button-dark' : 'button-outline')}>파일럿 참여 문의<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></a>;
}
