'use client';

import { useLocale } from "next-intl";

interface ProjectCardProps {
    project?: {
        id: string;
        titleEn: string;
        titleAr: string;
        descriptionEn: string;
        descriptionAr: string;
        imageUrls: string[];
        date: Date;
    };
    isLoading?: boolean;
}

export function ProjectCard({ project, isLoading = false }: ProjectCardProps) {
    const locale = useLocale();

    if (isLoading) {
        return (
            <div className="group relative overflow-hidden rounded-xl bg-card border border-border animate-pulse">
                <div className="aspect-[16/10] bg-muted" />
                <div className="absolute inset-0 flex flex-col justify-end p-6">
                    <div className="space-y-2">
                        <div className="h-4 bg-muted/50 rounded w-24" />
                        <div className="h-6 bg-muted/50 rounded w-3/4" />
                        <div className="h-4 bg-muted/50 rounded w-full" />
                    </div>
                </div>
            </div>
        );
    }

    if (!project) return null;

    const title = locale === 'ar' ? project.titleAr : project.titleEn;
    const description = locale === 'ar' ? project.descriptionAr : project.descriptionEn;
    const imageUrl = project.imageUrls[0] || '/assets/placeholder.png';
    const formattedDate = new Date(project.date).toLocaleDateString(locale === 'ar' ? 'ar-SA' : 'en-US', {
        year: 'numeric',
        month: 'long',
    });

    return (
        <div className="group relative overflow-hidden rounded-xl bg-card border border-border shadow-sm hover:shadow-xl transition-all duration-300">
            <div className="aspect-[16/10] overflow-hidden">
                <img
                    src={imageUrl}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                <span className="text-sm text-white/80 mb-2">{formattedDate}</span>
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {title}
                </h3>
                <p className="text-white/80 text-sm line-clamp-2">
                    {description}
                </p>
            </div>
        </div>
    );
}
