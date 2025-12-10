'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { getTents, type Tent } from '@/actions/website';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '966552248896'; // Replace with actual number

const CustomTentSection = () => {
    const t = useTranslations('CustomTentSection');
    const locale = useLocale();
    const [tents, setTents] = useState<Tent[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTentId, setSelectedTentId] = useState<string>('');
    const [width, setWidth] = useState<string>('');
    const [height, setHeight] = useState<string>('');

    useEffect(() => {
        const fetchTents = async () => {
            try {
                const data = await getTents();
                setTents(data);
                if (data.length > 0) {
                    setSelectedTentId(data[0].id);
                }
            } catch (error) {
                console.error('Failed to fetch tents:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTents();
    }, []);

    const getSelectedTentName = () => {
        const selected = tents.find(t => t.id === selectedTentId);
        if (!selected) return '';
        return locale === 'ar' ? selected.nameAr : selected.nameEn;
    };

    const handleWhatsAppOrder = () => {
        const tentName = getSelectedTentName();
        let message = '';

        if (locale === 'ar') {
            message = `مرحباً، أود طلب خيمة "${tentName}" بمقاسات ${width}م × ${height}م`;
        } else {
            message = `Hello, I would like to order a "${tentName}" tent with dimensions ${width}m x ${height}m`;
        }

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    };

    const isFormValid = selectedTentId && width && height && parseFloat(width) > 0 && parseFloat(height) > 0;

    return (
        <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-primary/10">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="max-w-4xl mx-auto">
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

                    {/* Form Card */}
                    <div className="bg-card border border-border rounded-2xl p-8 shadow-xl">
                        <div className="grid md:grid-cols-3 gap-6 mb-8">
                            {/* Tent Select */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-foreground">
                                    {t('tentLabel')}
                                </label>
                                {isLoading ? (
                                    <div className="h-12 bg-muted animate-pulse rounded-lg" />
                                ) : (
                                    <select
                                        value={selectedTentId}
                                        onChange={(e) => setSelectedTentId(e.target.value)}
                                        className="w-full h-12 px-4 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                                    >
                                        {tents.map((tent) => (
                                            <option key={tent.id} value={tent.id}>
                                                {locale === 'ar' ? tent.nameAr : tent.nameEn}
                                            </option>
                                        ))}
                                    </select>
                                )}
                            </div>

                            {/* Width Input */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-foreground">
                                    {t('widthLabel')}
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        min="1"
                                        step="0.5"
                                        value={width}
                                        onChange={(e) => setWidth(e.target.value)}
                                        placeholder={t('widthPlaceholder')}
                                        className="w-full h-12 px-4 pe-12 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                                    />
                                    <span className="absolute end-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                                        {t('meters')}
                                    </span>
                                </div>
                            </div>

                            {/* Height Input */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-foreground">
                                    {t('heightLabel')}
                                </label>
                                <div className="relative">
                                    <input
                                        type="number"
                                        min="1"
                                        step="0.5"
                                        value={height}
                                        onChange={(e) => setHeight(e.target.value)}
                                        placeholder={t('heightPlaceholder')}
                                        className="w-full h-12 px-4 pe-12 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                                    />
                                    <span className="absolute end-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                                        {t('meters')}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Order Button */}
                        <Button
                            onClick={handleWhatsAppOrder}
                            disabled={!isFormValid}
                            size="lg"
                            className="w-full h-14 text-lg bg-[#25D366] hover:bg-[#128C7E] text-white disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <MessageCircle className="w-6 h-6 me-2" />
                            {t('orderButton')}
                        </Button>

                        <p className="text-center text-sm text-muted-foreground mt-4">
                            {t('orderNote')}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CustomTentSection;
