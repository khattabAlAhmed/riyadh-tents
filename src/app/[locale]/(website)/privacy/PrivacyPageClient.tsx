'use client';

import { useTranslations } from 'next-intl';
import { Shield } from 'lucide-react';

export default function PrivacyPageClient() {
    const t = useTranslations('PrivacyPage');

    const sections = ['intro', 'collection', 'usage', 'sharing', 'security', 'rights', 'contact'];
    const listSections = ['collection', 'usage'];

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
                            <Shield className="w-8 h-8 text-white" />
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
                            {sections.map((section) => (
                                <div key={section} className="mb-10">
                                    <h2 className="text-2xl font-bold text-foreground mb-4">
                                        {t(`sections.${section}.title`)}
                                    </h2>
                                    <p className="text-muted-foreground leading-relaxed mb-4">
                                        {t(`sections.${section}.content`)}
                                    </p>

                                    {listSections.includes(section) && (
                                        <ul className="list-disc list-inside space-y-2 text-muted-foreground ms-4">
                                            {(t.raw(`sections.${section}.items`) as string[]).map((item: string, index: number) => (
                                                <li key={index}>{item}</li>
                                            ))}
                                        </ul>
                                    )}

                                    {section === 'contact' && (
                                        <div className="mt-4 space-y-1 text-muted-foreground">
                                            <p>{t(`sections.${section}.email`)}</p>
                                            <p dir="ltr" className="text-start">{t(`sections.${section}.phone`)}</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
