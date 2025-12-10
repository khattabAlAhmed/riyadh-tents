'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { getServices, type Service } from '@/actions/website';
import { ServiceCard } from '@/components/cards/ServiceCard';

const ServicesSection = () => {
    const t = useTranslations('ServicesSection');
    const [services, setServices] = useState<Service[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const data = await getServices();
                setServices(data);
            } catch (error) {
                console.error('Failed to fetch services:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchServices();
    }, []);

    return (
        <section className="py-20 bg-muted/30">
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

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {isLoading ? (
                        // Skeleton loading
                        [...Array(6)].map((_, index) => (
                            <ServiceCard key={index} isLoading />
                        ))
                    ) : services.length > 0 ? (
                        services.map((service) => (
                            <ServiceCard key={service.id} service={service} />
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 text-muted-foreground">
                            {t('noServices')}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;
