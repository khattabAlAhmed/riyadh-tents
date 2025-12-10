'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { getReviews, type Review } from '@/actions/website';
import { ReviewCard } from '@/components/cards/ReviewCard';

const TestimonialsSection = () => {
    const t = useTranslations('TestimonialsSection');
    const [reviews, setReviews] = useState<Review[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const data = await getReviews();
                setReviews(data);
            } catch (error) {
                console.error('Failed to fetch reviews:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchReviews();
    }, []);

    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="inline-block text-primary font-semibold mb-4 text-sm uppercase tracking-wider">
                        {t('subtitle')}
                    </span>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                        {t('title')}
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        {t('description')}
                    </p>
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isLoading ? (
                        // Skeleton loading
                        [...Array(3)].map((_, index) => (
                            <ReviewCard key={index} isLoading />
                        ))
                    ) : reviews.length > 0 ? (
                        reviews.map((review) => (
                            <ReviewCard key={review.id} review={review} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-muted-foreground">
                            {t('noReviews')}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
