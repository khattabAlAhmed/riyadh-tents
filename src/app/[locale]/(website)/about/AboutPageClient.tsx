'use client';

import { useTranslations, useLocale } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
    MessageCircle,
    Phone,
    Award,
    Target,
    Eye,
    Heart,
    History,
    Users,
    Clock,
    Palette,
    MapPin,
    Sparkles,
    Shield,
    Lightbulb
} from 'lucide-react';

const WHATSAPP_NUMBER = '966552248896';
const PHONE_NUMBER = '+966552248896';

export default function AboutPageClient() {
    const t = useTranslations('AboutPage');
    const locale = useLocale();

    const handleWhatsApp = () => {
        window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank');
    };

    const handlePhoneCall = () => {
        window.location.href = `tel:${PHONE_NUMBER}`;
    };

    const valueItems = [
        { key: 'quality', icon: Award },
        { key: 'integrity', icon: Shield },
        { key: 'innovation', icon: Lightbulb },
        { key: 'service', icon: Heart },
    ];

    const whyChooseUsItems = [
        { key: 'experience', icon: History },
        { key: 'quality', icon: Award },
        { key: 'team', icon: Users },
        { key: 'support', icon: Clock },
        { key: 'custom', icon: Palette },
        { key: 'coverage', icon: MapPin },
    ];

    const stats = [
        { key: 'years', value: '25+' },
        { key: 'clients', value: '5000+' },
        { key: 'projects', value: '10000+' },
        { key: 'team', value: '50+' },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-24 md:py-32 bg-gradient-to-br from-primary via-primary/95 to-primary/85 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 start-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 end-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
                    <div className="absolute top-1/2 start-1/2 w-64 h-64 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
                </div>

                <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6">
                            {t('hero.subtitle')}
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                            {t('hero.title')}
                        </h1>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto">
                            {t('hero.description')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Story Section */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Image Side */}
                        <div className={`relative ${locale === 'ar' ? 'lg:order-2' : ''}`}>
                            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                                <img
                                    src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80"
                                    alt="Premium tent event"
                                    className="w-full h-auto object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
                            </div>

                            {/* Floating Badge */}
                            <div className="absolute -bottom-6 end-6 bg-secondary text-white rounded-xl p-6 shadow-xl">
                                <div className="text-4xl font-bold">1999</div>
                                <div className="text-sm opacity-90">{t('story.subtitle')}</div>
                            </div>
                        </div>

                        {/* Content Side */}
                        <div className={locale === 'ar' ? 'lg:order-1' : ''}>
                            <span className="inline-block text-primary font-semibold mb-4 text-sm uppercase tracking-wider">
                                {t('story.subtitle')}
                            </span>
                            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                                {t('story.title')}
                            </h2>
                            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
                                <p>{t('story.paragraph1')}</p>
                                <p>{t('story.paragraph2')}</p>
                                <p>{t('story.paragraph3')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-16 bg-primary/5">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat) => (
                            <div key={stat.key} className="text-center">
                                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-muted-foreground font-medium">
                                    {t(`stats.${stat.key}`)}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission, Vision & Values */}
            <section className="py-20 bg-background">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    {/* Mission & Vision */}
                    <div className="grid md:grid-cols-2 gap-8 mb-16">
                        {/* Mission Card */}
                        <div className="relative p-8 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-white overflow-hidden group">
                            <div className="absolute top-0 end-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-500" />
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                                    <Target className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{t('mission.title')}</h3>
                                <p className="text-white/90 leading-relaxed">
                                    {t('mission.description')}
                                </p>
                            </div>
                        </div>

                        {/* Vision Card */}
                        <div className="relative p-8 rounded-2xl bg-gradient-to-br from-secondary to-secondary/80 text-white overflow-hidden group">
                            <div className="absolute top-0 end-0 w-32 h-32 bg-white/10 rounded-full translate-x-1/2 -translate-y-1/2 group-hover:scale-150 transition-transform duration-500" />
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                                    <Eye className="w-7 h-7 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{t('vision.title')}</h3>
                                <p className="text-white/90 leading-relaxed">
                                    {t('vision.description')}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Values */}
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            {t('values.title')}
                        </h2>
                    </div>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {valueItems.map((item) => (
                            <div
                                key={item.key}
                                className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 group"
                            >
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                                    <item.icon className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-lg font-semibold text-foreground mb-2">
                                    {t(`values.items.${item.key}.title`)}
                                </h3>
                                <p className="text-muted-foreground text-sm">
                                    {t(`values.items.${item.key}.description`)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 bg-muted/50">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <span className="inline-block text-primary font-semibold mb-4 text-sm uppercase tracking-wider">
                            {t('whyChooseUs.subtitle')}
                        </span>
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4">
                            {t('whyChooseUs.title')}
                        </h2>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {whyChooseUsItems.map((item) => (
                            <div
                                key={item.key}
                                className="flex items-start gap-4 p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 group"
                            >
                                <div className="flex-shrink-0 w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors">
                                    <item.icon className="w-6 h-6 text-primary group-hover:text-white transition-colors" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-foreground mb-2">
                                        {t(`whyChooseUs.items.${item.key}.title`)}
                                    </h3>
                                    <p className="text-muted-foreground text-sm">
                                        {t(`whyChooseUs.items.${item.key}.description`)}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-br from-primary via-primary/90 to-primary/80 relative overflow-hidden">
                {/* Background decorations */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 start-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 end-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
                </div>

                <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <Sparkles className="w-12 h-12 text-white/80 mx-auto mb-6" />
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                            {t('cta.title')}
                        </h2>
                        <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">
                            {t('cta.description')}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                            <Button
                                onClick={handleWhatsApp}
                                size="lg"
                                className="h-14 px-8 text-lg bg-[#25D366] hover:bg-[#128C7E] text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <MessageCircle className="w-5 h-5 me-3" />
                                {t('cta.whatsappButton')}
                            </Button>
                            <Button
                                onClick={handlePhoneCall}
                                size="lg"
                                variant="outline"
                                className="h-14 px-8 text-lg bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                            >
                                <Phone className="w-5 h-5 me-3" />
                                {t('cta.callButton')}
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
