'use client';

import { useTranslations } from 'next-intl';
import { Cookie } from 'lucide-react';

export default function CookiesPageClient() {
    const t = useTranslations('CookiesPage');

    const cookieTypes = ['essential', 'analytics', 'functional'];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-br from-primary via-primary/95 to-primary/85 overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 start-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 end-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
                </div>

                <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Cookie className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            {t('title')}
                        </h1>
                        <p className="text-white/80">
                            {t('lastUpdated')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Content */}
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            {/* What Are Cookies */}
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-foreground mb-4">
                                    {t('sections.intro.title')}
                                </h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    {t('sections.intro.content')}
                                </p>
                            </div>

                            {/* Types of Cookies */}
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-foreground mb-6">
                                    {t('sections.types.title')}
                                </h2>
                                <div className="grid gap-4">
                                    {cookieTypes.map((type) => (
                                        <div key={type} className="p-6 rounded-xl bg-card border border-border">
                                            <h3 className="text-lg font-semibold text-foreground mb-2">
                                                {t(`sections.types.${type}.title`)}
                                            </h3>
                                            <p className="text-muted-foreground">
                                                {t(`sections.types.${type}.content`)}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Managing Cookies */}
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-foreground mb-4">
                                    {t('sections.manage.title')}
                                </h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    {t('sections.manage.content')}
                                </p>
                            </div>

                            {/* Updates */}
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-foreground mb-4">
                                    {t('sections.updates.title')}
                                </h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    {t('sections.updates.content')}
                                </p>
                            </div>

                            {/* Contact */}
                            <div className="mb-10">
                                <h2 className="text-2xl font-bold text-foreground mb-4">
                                    {t('sections.contact.title')}
                                </h2>
                                <p className="text-muted-foreground leading-relaxed">
                                    {t('sections.contact.content')}
                                </p>
                                <div className="mt-4 space-y-1 text-muted-foreground">
                                    <p>{t('sections.contact.email')}</p>
                                    <p dir="ltr" className="text-start">{t('sections.contact.phone')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
