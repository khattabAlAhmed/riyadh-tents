'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { getTents, type Tent } from '@/actions/website';
import { TentCard } from '@/components/cards/TentCard';

const TentsSection = () => {
    const t = useTranslations('TentsSection');
    const [tents, setTents] = useState<Tent[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTents = async () => {
            try {
                const data = await getTents();
                setTents(data);
            } catch (error) {
                console.error('Failed to fetch tents:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTents();
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

                {/* Tents Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isLoading ? (
                        // Skeleton loading
                        [...Array(6)].map((_, index) => (
                            <TentCard key={index} isLoading />
                        ))
                    ) : tents.length > 0 ? (
                        tents.map((tent) => (
                            <TentCard key={tent.id} tent={tent} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-muted-foreground">
                            {t('noTents')}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default TentsSection;
