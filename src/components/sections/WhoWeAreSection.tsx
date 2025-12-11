'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Users, Award, Shield, Clock } from 'lucide-react';

const WhoWeAreSection = () => {
    const t = useTranslations('WhoWeAreSection');
    const locale = useLocale();

    const features = [
        {
            icon: Users,
            key: 'experience',
        },
        {
            icon: Award,
            key: 'quality',
        },
        {
            icon: Shield,
            key: 'trust',
        },
        {
            icon: Clock,
            key: 'delivery',
        },
    ];

    return (
        <section className="py-20 bg-background">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Content Side */}
                    <div className={locale === 'ar' ? 'lg:order-2' : ''}>
                        <span className="inline-block text-primary font-semibold mb-4 text-xl uppercase tracking-wider">
                            {t('subtitle')}
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                            {t('title')}
                        </h2>
                        <p className="text-muted-foreground text-lg leading-relaxed mb-8">
                            {t('description')}
                        </p>

                        {/* Features Grid */}
                        <div className="grid grid-cols-2 gap-6">
                            {features.map((feature) => (
                                <div
                                    key={feature.key}
                                    className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
                                >
                                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                                        <feature.icon className="w-6 h-6 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-foreground mb-1">
                                            {t(`features.${feature.key}.title`)}
                                        </h3>
                                        <p className="text-sm text-muted-foreground">
                                            {t(`features.${feature.key}.description`)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Image Side */}
                    <div className={`relative ${locale === 'ar' ? 'lg:order-1' : ''}`}>
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80"
                                alt={t('imageAlt')}
                                className="w-full h-auto object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                        </div>

                        {/* Experience Badge */}
                        <div className="absolute -bottom-6 start-6 bg-primary text-primary-foreground rounded-xl p-6 shadow-xl">
                            <div className="text-4xl font-bold">25+</div>
                            <div className="text-sm opacity-90">{t('yearsBadge')}</div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhoWeAreSection;
