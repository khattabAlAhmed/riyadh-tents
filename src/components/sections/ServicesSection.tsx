'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { getServices, type Service } from '@/actions/website';
import { ServiceCard } from '@/components/cards/ServiceCard';

// Define grid positions for the repeating pattern
// Pattern: Row 1 (3 equal), Row 2 (2 stacked + 1 tall), Row 3 (3 equal), Row 4 (3 equal)
const getCardVariant = (index: number): 'default' | 'tall' | 'wide' => {
    const positionInPattern = index % 12; // 12 cards per full pattern cycle

    // Row 2 pattern: positions 3, 4 are stacked (default), position 5 is tall
    if (positionInPattern === 5) return 'tall';

    return 'default';
};

const getGridClass = (index: number): string => {
    const positionInPattern = index % 12;

    // For the second row, we need special grid positioning
    // Position 3: first small card (top-left of row 2)
    // Position 4: second small card (bottom-left of row 2)  
    // Position 5: tall card (right side of row 2, spans 2 rows)

    if (positionInPattern === 0) return 'md:col-span-2 md:row-span-2';
    if (positionInPattern === 3) return 'md:col-span-1 md:row-span-1';
    if (positionInPattern === 4) return 'md:col-span-1 md:row-span-2';
    if (positionInPattern === 5) return 'md:col-span-1 md:row-span-1';

    return '';
};

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

    const renderServices = () => {
        if (isLoading) {
            return [...Array(10)].map((_, index) => (
                <div key={index} className={getGridClass(index)}>
                    <ServiceCard isLoading variant={getCardVariant(index)} />
                </div>
            ));
        }

        if (services.length === 0) {
            return (
                <div className="col-span-full text-center py-12" style={{ color: 'var(--service-card-muted)' }}>
                    {t('noServices')}
                </div>
            );
        }

        return services.map((service, index) => (
            <div key={service.id} className={getGridClass(index)}>
                <ServiceCard service={service} variant={getCardVariant(index)} />
            </div>
        ));
    };

    return (
        <section
            className="py-20"
            style={{ backgroundColor: 'var(--service-section-bg)' }}
        >
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span
                        className="inline-block font-semibold mb-4 text-sm uppercase tracking-wider"
                        style={{ color: 'var(--service-link)' }}
                    >
                        {t('subtitle')}
                    </span>
                    <h2
                        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                        style={{ color: 'var(--service-card-text)' }}
                    >
                        {t('title')}
                    </h2>
                    <p
                        className="text-lg max-w-2xl mx-auto"
                        style={{ color: 'var(--service-card-muted)' }}
                    >
                        {t('description')}
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-auto">
                    {renderServices()}
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;

