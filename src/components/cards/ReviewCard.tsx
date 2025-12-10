'use client';

import { useLocale } from "next-intl";
import { Star } from "lucide-react";

interface ReviewCardProps {
    review?: {
        id: string;
        authorNameEn: string;
        authorNameAr: string;
        profileImageUrl: string | null;
        reviewContentEn: string;
        reviewContentAr: string;
        stars: number;
        positionEn: string | null;
        positionAr: string | null;
    };
    isLoading?: boolean;
}

export function ReviewCard({ review, isLoading = false }: ReviewCardProps) {
    const locale = useLocale();

    if (isLoading) {
        return (
            <div className="relative overflow-hidden rounded-xl bg-card border border-border p-6 animate-pulse">
                <div className="flex items-start gap-4 mb-4">
                    <div className="w-14 h-14 rounded-full bg-muted shrink-0" />
                    <div className="flex-1 space-y-2">
                        <div className="h-5 bg-muted rounded w-32" />
                        <div className="h-4 bg-muted rounded w-24" />
                    </div>
                </div>
                <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                        <div key={i} className="w-5 h-5 bg-muted rounded" />
                    ))}
                </div>
                <div className="space-y-2">
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-full" />
                    <div className="h-4 bg-muted rounded w-3/4" />
                </div>
            </div>
        );
    }

    if (!review) return null;

    const authorName = locale === 'ar' ? review.authorNameAr : review.authorNameEn;
    const content = locale === 'ar' ? review.reviewContentAr : review.reviewContentEn;
    const position = locale === 'ar' ? review.positionAr : review.positionEn;
    const profileImage = review.profileImageUrl || '/assets/avatar-placeholder.png';

    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 0; i < 5; i++) {
            if (i < fullStars) {
                stars.push(
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                );
            } else if (i === fullStars && hasHalfStar) {
                stars.push(
                    <div key={i} className="relative w-5 h-5">
                        <Star className="absolute w-5 h-5 text-muted-foreground/30" />
                        <div className="absolute overflow-hidden w-1/2">
                            <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        </div>
                    </div>
                );
            } else {
                stars.push(
                    <Star key={i} className="w-5 h-5 text-muted-foreground/30" />
                );
            }
        }
        return stars;
    };

    return (
        <div className="relative overflow-hidden rounded-xl bg-card border border-border p-6 shadow-sm hover:shadow-lg transition-all duration-300">
            {/* Quote decoration */}
            <div className="absolute top-4 end-4 text-6xl text-primary/10 font-serif leading-none">
                "
            </div>

            <div className="flex items-start gap-4 mb-4">
                <img
                    src={profileImage}
                    alt={authorName}
                    className="w-14 h-14 rounded-full object-cover border-2 border-primary/20"
                />
                <div>
                    <h4 className="font-semibold text-foreground">{authorName}</h4>
                    {position && (
                        <p className="text-sm text-muted-foreground">{position}</p>
                    )}
                </div>
            </div>

            <div className="flex gap-1 mb-4">
                {renderStars(review.stars)}
            </div>

            <p className="text-muted-foreground leading-relaxed relative z-10">
                {content}
            </p>
        </div>
    );
}
