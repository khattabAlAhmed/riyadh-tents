'use client';

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";

interface TentCardProps {
    tent?: {
        id: string;
        nameEn: string;
        nameAr: string;
        slugEn: string;
        slugAr: string;
        descriptionEn: string;
        descriptionAr: string;
        imageUrls: string[];
        maxWidth: number;
        maxHeight: number;
        tentType?: {
            typeNameEn: string;
            typeNameAr: string;
        };
    };
    isLoading?: boolean;
}

export function TentCard({ tent, isLoading = false }: TentCardProps) {
    const locale = useLocale();
    const t = useTranslations('TentsSection');
    const tCommon = useTranslations('common');

    if (isLoading) {
        return (
            <div className="group relative overflow-hidden rounded-xl bg-card border border-border animate-pulse">
                <div className="aspect-[4/3] bg-muted" />
                <div className="p-6 space-y-3">
                    <div className="h-5 bg-muted rounded w-1/3" />
                    <div className="h-6 bg-muted rounded w-3/4" />
                    <div className="space-y-2">
                        <div className="h-4 bg-muted rounded w-full" />
                        <div className="h-4 bg-muted rounded w-5/6" />
                    </div>
                    <div className="flex gap-4 pt-2">
                        <div className="h-4 bg-muted rounded w-20" />
                        <div className="h-4 bg-muted rounded w-20" />
                    </div>
                    <div className="h-9 bg-muted rounded w-28 mt-4" />
                </div>
            </div>
        );
    }

    if (!tent) return null;

    const name = locale === 'ar' ? tent.nameAr : tent.nameEn;
    const description = locale === 'ar' ? tent.descriptionAr : tent.descriptionEn;
    const slug = locale === 'ar' ? tent.slugAr : tent.slugEn;
    const typeName = tent.tentType
        ? (locale === 'ar' ? tent.tentType.typeNameAr : tent.tentType.typeNameEn)
        : '';
    const imageUrl = tent.imageUrls[0] || '/assets/placeholder.png';
    const ArrowIcon = locale === 'ar' ? ArrowLeft : ArrowRight;

    return (
        <div className="group relative overflow-hidden rounded-xl bg-card border border-border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="aspect-[4/3] overflow-hidden relative">
                <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                {typeName && (
                    <span className="absolute top-3 start-3 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full">
                        {typeName}
                    </span>
                )}
            </div>
            <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {name}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                    {description}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                        </svg>
                        {t('maxWidth')}: {tent.maxWidth}m
                    </span>
                    <span className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                        </svg>
                        {t('maxHeight')}: {tent.maxHeight}m
                    </span>
                </div>
                <Link
                    href={`/tents/${slug}`}
                    className="inline-flex items-center gap-2 text-primary font-medium hover:underline transition-colors"
                >
                    {tCommon('showMore')}
                    <ArrowIcon className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}
