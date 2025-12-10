'use client';

import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";

interface ServiceCardProps {
    service?: {
        id: string;
        nameEn: string;
        nameAr: string;
        descriptionEn: string;
        descriptionAr: string;
        imageUrls: string[];
    };
    isLoading?: boolean;
}

export function ServiceCard({ service, isLoading = false }: ServiceCardProps) {
    const locale = useLocale();

    if (isLoading) {
        return (
            <div className="group relative overflow-hidden rounded-xl bg-card border border-border animate-pulse">
                <div className="aspect-[4/3] bg-muted" />
                <div className="p-6 space-y-3">
                    <div className="h-6 bg-muted rounded w-3/4" />
                    <div className="space-y-2">
                        <div className="h-4 bg-muted rounded w-full" />
                        <div className="h-4 bg-muted rounded w-5/6" />
                    </div>
                </div>
            </div>
        );
    }

    if (!service) return null;

    const name = locale === 'ar' ? service.nameAr : service.nameEn;
    const description = locale === 'ar' ? service.descriptionAr : service.descriptionEn;
    const imageUrl = service.imageUrls[0] || '/assets/placeholder.png';

    return (
        <div className="group relative overflow-hidden rounded-xl bg-card border border-border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
            <div className="aspect-[4/3] overflow-hidden">
                <img
                    src={imageUrl}
                    alt={name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {name}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-3">
                    {description}
                </p>
            </div>
        </div>
    );
}
