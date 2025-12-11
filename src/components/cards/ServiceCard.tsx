'use client';

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight, ArrowLeft } from "lucide-react";

type CardVariant = 'default' | 'tall' | 'wide';

interface ServiceCardProps {
    service?: {
        id: string;
        nameEn: string;
        nameAr: string;
        slugEn: string;
        slugAr: string;
        descriptionEn: string;
        descriptionAr: string;
        imageUrls: string[];
    };
    isLoading?: boolean;
    variant?: CardVariant;
}

const variantStyles: Record<CardVariant, { aspectRatio: string; imageHeight: string }> = {
    default: { aspectRatio: 'aspect-[4/3]', imageHeight: 'h-48' },
    tall: { aspectRatio: 'aspect-[3/4]', imageHeight: 'h-64' },
    wide: { aspectRatio: 'aspect-[16/9]', imageHeight: 'h-40' },
};

export function ServiceCard({ service, isLoading = false, variant = 'default' }: ServiceCardProps) {
    const locale = useLocale();
    const t = useTranslations('common');

    if (isLoading) {
        return (
            <div
                className="group relative overflow-hidden rounded-xl animate-pulse h-full flex flex-col"
                style={{
                    backgroundColor: 'var(--service-card-bg)',
                    border: '1px solid var(--service-card-border)'
                }}
            >
                <div className="flex-grow bg-muted min-h-[12rem]" />
                <div className="p-5 space-y-3 shrink-0">
                    <div className="h-5 bg-muted rounded w-3/4" />
                    <div className="space-y-2">
                        <div className="h-3 bg-muted rounded w-full" />
                        <div className="h-3 bg-muted rounded w-5/6" />
                    </div>
                    <div className="h-4 bg-muted rounded w-24 mt-3" />
                </div>
            </div>
        );
    }

    if (!service) return null;

    const name = locale === 'ar' ? service.nameAr : service.nameEn;
    const description = locale === 'ar' ? service.descriptionAr : service.descriptionEn;
    const slug = locale === 'ar' ? service.slugAr : service.slugEn;
    const imageUrl = service.imageUrls[0] || '/assets/placeholder.png';
    const ArrowIcon = locale === 'ar' ? ArrowLeft : ArrowRight;

    return (
        <div
            className="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col"
            style={{
                backgroundColor: 'var(--service-card-bg)',
                border: '1px solid var(--service-card-border)'
            }}
        >
            <div className="flex-grow overflow-hidden relative min-h-[12rem]">
                <img
                    src={imageUrl}
                    alt={name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>
            <div className="p-5 flex flex-col shrink-0">
                <h3
                    className="text-lg font-semibold mb-2 group-hover:opacity-80 transition-opacity line-clamp-1"
                    style={{ color: 'var(--service-card-text)' }}
                >
                    {name}
                </h3>
                <p
                    className="text-sm line-clamp-2 mb-4"
                    style={{ color: 'var(--service-card-muted)' }}
                >
                    {description}
                </p>
                <Link
                    href={`/services/${slug}`}
                    className="inline-flex items-center justify-center gap-2 font-medium text-sm px-5 py-2 rounded-full transition-all duration-300 hover:opacity-90 hover:scale-105 text-white"
                    style={{
                        background: 'linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%)'
                    }}
                >
                    {t('showMore')}
                    <ArrowIcon className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}

