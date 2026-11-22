import { showcaseProducts, type ProductId } from '../site-config';

interface DownloadButtonProps {
    service: ProductId;
    variant?: 'primary' | 'secondary';
}

export default function DownloadButton({ service, variant = 'primary' }: DownloadButtonProps) {
    const product = showcaseProducts.find(item => item.id === service);
    if (!product) return null;
    return <a href={'/contact.html?product=' + encodeURIComponent(product.slug)} aria-label={product.name + ' 파일럿 참여 문의'} className={'button ' + (variant === 'primary' ? 'button-dark' : 'button-outline')}>파일럿 참여 문의<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg></a>;
}
