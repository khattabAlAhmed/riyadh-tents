'use client';

import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";
import { ArrowRight, ArrowLeft, Calendar } from "lucide-react";

interface BlogCardProps {
    post?: {
        id: string;
        titleEn: string;
        titleAr: string;
        slugEn: string;
        slugAr: string;
        excerptEn: string;
        excerptAr: string;
        featuredImageUrl: string;
        publishedAt: Date | null;
    };
    isLoading?: boolean;
}

export function BlogCard({ post, isLoading = false }: BlogCardProps) {
    const locale = useLocale();
    const t = useTranslations('BlogSection');

    if (isLoading) {
        return (
            <div
                className="group relative overflow-hidden rounded-xl animate-pulse h-full flex flex-col"
                style={{
                    backgroundColor: 'var(--blog-card-bg)',
                    border: '1px solid var(--blog-card-border)'
                }}
            >
                <div className="flex-grow bg-muted min-h-[12rem]" />
                <div className="p-5 space-y-3 shrink-0">
                    <div className="h-3 bg-muted rounded w-24" />
                    <div className="h-5 bg-muted rounded w-3/4" />
                    <div className="space-y-2">
                        <div className="h-3 bg-muted rounded w-full" />
                        <div className="h-3 bg-muted rounded w-5/6" />
                    </div>
                    <div className="h-4 bg-muted rounded w-28 mt-3" />
                </div>
            </div>
        );
    }

    if (!post) return null;

    const title = locale === 'ar' ? post.titleAr : post.titleEn;
    const excerpt = locale === 'ar' ? post.excerptAr : post.excerptEn;
    const slug = locale === 'ar' ? post.slugAr : post.slugEn;
    const ArrowIcon = locale === 'ar' ? ArrowLeft : ArrowRight;

    // Format date
    const formattedDate = post.publishedAt
        ? new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(post.publishedAt))
        : '';

    return (
        <div
            className="group relative overflow-hidden rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col"
            style={{
                backgroundColor: 'var(--blog-card-bg)',
                border: '1px solid var(--blog-card-border)'
            }}
        >
            <div className="flex-grow overflow-hidden relative min-h-[12rem]">
                <img
                    src={post.featuredImageUrl}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>
            <div className="p-5 flex flex-col shrink-0">
                {/* Date */}
                {formattedDate && (
                    <div
                        className="flex items-center gap-2 text-sm mb-2"
                        style={{ color: 'var(--blog-date-color)' }}
                    >
                        <Calendar className="w-4 h-4" />
                        <span>{formattedDate}</span>
                    </div>
                )}

                <h3
                    className="text-lg font-semibold mb-2 group-hover:opacity-80 transition-opacity line-clamp-2"
                    style={{ color: 'var(--service-card-text)' }}
                >
                    {title}
                </h3>
                <p
                    className="text-sm line-clamp-2 mb-4"
                    style={{ color: 'var(--service-card-muted)' }}
                >
                    {excerpt}
                </p>
                <Link
                    href={`/blog/${slug}`}
                    className="inline-flex items-center justify-center gap-2 font-medium text-sm px-5 py-2 rounded-full transition-all duration-300 hover:opacity-90 hover:scale-105 text-white"
                    style={{
                        background: 'linear-gradient(90deg, var(--primary) 0%, var(--secondary) 100%)'
                    }}
                >
                    {t('readMore')}
                    <ArrowIcon className="w-4 h-4" />
                </Link>
            </div>
        </div>
    );
}
