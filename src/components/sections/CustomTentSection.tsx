'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { getTentTypes, type TentType } from '@/actions/website';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '966XXXXXXXXX'; // Replace with actual number

const CustomTentSection = () => {
    const t = useTranslations('CustomTentSection');
    const locale = useLocale();
    const [tentTypes, setTentTypes] = useState<TentType[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedTentTypeId, setSelectedTentTypeId] = useState<string>('');
    const [width, setWidth] = useState<string>('');
    const [height, setHeight] = useState<string>('');

    useEffect(() => {
        const fetchTentTypes = async () => {
            try {
                const data = await getTentTypes();
                setTentTypes(data);
                if (data.length > 0) {
                    setSelectedTentTypeId(data[0].id);
                }
            } catch (error) {
                console.error('Failed to fetch tent types:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchTentTypes();
    }, []);

    const getSelectedTentTypeName = () => {
        const selected = tentTypes.find(t => t.id === selectedTentTypeId);
        if (!selected) return '';
        return locale === 'ar' ? selected.typeNameAr : selected.typeNameEn;
    };

    const handleWhatsAppOrder = () => {
        const tentTypeName = getSelectedTentTypeName();
        let message = '';

        if (locale === 'ar') {
            message = `مرحباً، أود طلب خيمة من نوع "${tentTypeName}" بمقاسات ${width}م × ${height}م`;
        } else {
            message = `Hello, I would like to order a "${tentTypeName}" tent with dimensions ${width}m x ${height}m`;
        }

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    };

    const isFormValid = selectedTentTypeId && width && height && parseFloat(width) > 0 && parseFloat(height) > 0;

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
                            {/* Tent Type Select */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-foreground">
                                    {t('tentTypeLabel')}
                                </label>
                                {isLoading ? (
                                    <div className="h-12 bg-muted animate-pulse rounded-lg" />
                                ) : (
                                    <select
                                        value={selectedTentTypeId}
                                        onChange={(e) => setSelectedTentTypeId(e.target.value)}
                                        className="w-full h-12 px-4 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                                    >
                                        {tentTypes.map((type) => (
                                            <option key={type.id} value={type.id}>
                                                {locale === 'ar' ? type.typeNameAr : type.typeNameEn}
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
