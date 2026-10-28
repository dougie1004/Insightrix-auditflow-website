export type ProductId = 'accounting' | 'audit' | 'operations';

export interface SiteProduct {
    readonly id: ProductId;
    readonly slug: string;
    readonly name: string;
    readonly short: string;
    readonly number: string;
    readonly category: string;
    readonly accent: string;
    readonly tint: string;
    readonly heading: string;
    readonly summary: string;
    readonly shortDescription: string;
    readonly steps: ReadonlyArray<readonly [string, string]>;
    readonly tags: ReadonlyArray<string>;
}

export const developmentNotice: string;
export const siteProducts: ReadonlyArray<SiteProduct>;
export const navigation: ReadonlyArray<readonly [string, string]>;
