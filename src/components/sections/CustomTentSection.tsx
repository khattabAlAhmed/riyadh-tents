'use client';

import { useEffect, useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { getTents, getTentSizes, type Tent, type TentSize } from '@/actions/website';
import { Button } from '@/components/ui/button';
import { MessageCircle, ChevronRight, ChevronLeft, Check } from 'lucide-react';

const WHATSAPP_NUMBER = '966552248896';

const CustomTentSection = () => {
    const t = useTranslations('CustomTentSection');
    const locale = useLocale();
    const isRtl = locale === 'ar';

    const [tents, setTents] = useState<Tent[]>([]);
    const [tentSizes, setTentSizes] = useState<TentSize[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentStep, setCurrentStep] = useState(1);

    // Form state
    const [selectedTentId, setSelectedTentId] = useState<string>('');
    const [selectedSizeId, setSelectedSizeId] = useState<string>('');
    const [isCustomSize, setIsCustomSize] = useState(false);
    const [customWidth, setCustomWidth] = useState<string>('');
    const [customHeight, setCustomHeight] = useState<string>('');

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

    // Fetch sizes when tent is selected
    useEffect(() => {
        if (selectedTentId) {
            const fetchSizes = async () => {
                try {
                    const sizes = await getTentSizes(selectedTentId);
                    setTentSizes(sizes);
                    setSelectedSizeId('');
                    setIsCustomSize(false);
                } catch (error) {
                    console.error('Failed to fetch tent sizes:', error);
                }
            };
            fetchSizes();
        }
    }, [selectedTentId]);

    const getSelectedTent = () => tents.find(t => t.id === selectedTentId);
    const getSelectedSize = () => tentSizes.find(s => s.id === selectedSizeId);

    const handleTentSelect = (tentId: string) => {
        setSelectedTentId(tentId);
        setCurrentStep(2);
    };

    const handleSizeSelect = (sizeId: string) => {
        setSelectedSizeId(sizeId);
        setIsCustomSize(false);
        setCustomWidth('');
        setCustomHeight('');
    };

    const handleCustomSizeToggle = () => {
        setIsCustomSize(true);
        setSelectedSizeId('');
    };

    const handleWhatsAppOrder = () => {
        const tent = getSelectedTent();
        if (!tent) return;

        const tentName = locale === 'ar' ? tent.nameAr : tent.nameEn;
        let message = '';

        if (isCustomSize) {
            if (locale === 'ar') {
                message = `مرحباً، أود طلب خيمة "${tentName}" بمقاسات مخصصة: العرض ${customWidth}م × الارتفاع ${customHeight}م`;
            } else {
                message = `Hello, I would like to order a "${tentName}" tent with custom dimensions: Width ${customWidth}m x Height ${customHeight}m`;
            }
        } else {
            const size = getSelectedSize();
            if (!size) return;

            if (locale === 'ar') {
                message = `مرحباً، أود طلب خيمة "${tentName}" - نوع ${size.typeCode}، العرض ${size.wide}م، ارتفاع القمة ${size.ridgeHeight}`;
            } else {
                message = `Hello, I would like to order a "${tentName}" tent - Type ${size.typeCode}, Width ${size.wide}m, Ridge Height ${size.ridgeHeight}`;
            }
        }

        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
        window.open(whatsappUrl, '_blank');
    };

    const isFormValid = () => {
        if (!selectedTentId) return false;
        if (isCustomSize) {
            return customWidth && customHeight && parseFloat(customWidth) > 0 && parseFloat(customHeight) > 0;
        }
        return !!selectedSizeId;
    };

    const ArrowIcon = isRtl ? ChevronLeft : ChevronRight;
    const BackArrowIcon = isRtl ? ChevronRight : ChevronLeft;

    return (
        <section id="custom-tent" className="py-20 bg-gradient-to-br from-primary/5 via-background to-primary/10">
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                <div className="max-w-5xl mx-auto">
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

                    {/* Steps Indicator */}
                    <div className="flex items-center justify-center gap-4 mb-8">
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${currentStep >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                            }`}>
                            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                                {currentStep > 1 ? <Check className="w-4 h-4" /> : '1'}
                            </span>
                            <span className="font-medium hidden sm:inline">{t('step1Title')}</span>
                        </div>
                        <div className="w-8 h-0.5 bg-border" />
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${currentStep >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                            }`}>
                            <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                                2
                            </span>
                            <span className="font-medium hidden sm:inline">{t('step2Title')}</span>
                        </div>
                    </div>

                    {/* Form Card */}
                    <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-xl">
                        {/* Step 1: Select Tent */}
                        {currentStep === 1 && (
                            <div className="space-y-6">
                                <h3 className="text-xl font-semibold text-foreground mb-4">
                                    {t('selectTentTitle')}
                                </h3>

                                {isLoading ? (
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {[...Array(8)].map((_, i) => (
                                            <div key={i} className="aspect-square bg-muted animate-pulse rounded-xl" />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {tents.map((tent) => {
                                            const name = locale === 'ar' ? tent.nameAr : tent.nameEn;
                                            const imageUrl = tent.imageUrls[0] || '/assets/placeholder.png';
                                            const isSelected = selectedTentId === tent.id;

                                            return (
                                                <button
                                                    key={tent.id}
                                                    onClick={() => handleTentSelect(tent.id)}
                                                    className={`group relative aspect-square rounded-xl overflow-hidden border-2 transition-all duration-300 ${isSelected
                                                        ? 'border-primary ring-2 ring-primary/30 scale-[1.02]'
                                                        : 'border-border hover:border-primary/50 hover:scale-[1.02]'
                                                        }`}
                                                >
                                                    <img
                                                        src={imageUrl}
                                                        alt={name}
                                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                                                    <div className="absolute bottom-0 start-0 end-0 p-3">
                                                        <p className="text-white font-medium text-sm text-center line-clamp-2">
                                                            {name}
                                                        </p>
                                                    </div>
                                                    {isSelected && (
                                                        <div className="absolute top-2 end-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                                            <Check className="w-4 h-4 text-primary-foreground" />
                                                        </div>
                                                    )}
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Step 2: Select Size */}
                        {currentStep === 2 && (
                            <div className="space-y-6">
                                {/* Back Button */}
                                <button
                                    onClick={() => setCurrentStep(1)}
                                    className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <BackArrowIcon className="w-4 h-4" />
                                    {t('backToTents')}
                                </button>

                                {/* Selected Tent Info */}
                                {getSelectedTent() && (
                                    <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-xl">
                                        <img
                                            src={getSelectedTent()?.imageUrls[0] || '/assets/placeholder.png'}
                                            alt={locale === 'ar' ? getSelectedTent()?.nameAr : getSelectedTent()?.nameEn}
                                            className="w-16 h-16 rounded-lg object-cover"
                                        />
                                        <div>
                                            <p className="text-sm text-muted-foreground">{t('selectedTent')}</p>
                                            <p className="font-semibold text-foreground">
                                                {locale === 'ar' ? getSelectedTent()?.nameAr : getSelectedTent()?.nameEn}
                                            </p>
                                        </div>
                                    </div>
                                )}

                                <h3 className="text-xl font-semibold text-foreground">
                                    {t('selectSizeTitle')}
                                </h3>

                                {/* Available Sizes */}
                                {tentSizes.length > 0 && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                        {tentSizes.map((size) => {
                                            const isSelected = selectedSizeId === size.id;
                                            return (
                                                <button
                                                    key={size.id}
                                                    onClick={() => handleSizeSelect(size.id)}
                                                    className={`p-4 rounded-xl border-2 text-start transition-all ${isSelected
                                                        ? 'border-primary bg-primary/5'
                                                        : 'border-border hover:border-primary/50'
                                                        }`}
                                                >
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="font-bold text-foreground">{size.typeCode}</span>
                                                        {isSelected && (
                                                            <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                                                                <Check className="w-3 h-3 text-primary-foreground" />
                                                            </div>
                                                        )}
                                                    </div>
                                                    <div className="text-sm text-muted-foreground space-y-1">
                                                        <p>{t('width')}: {size.wide}m</p>
                                                        <p>{t('ridgeHeight')}: {size.ridgeHeight}</p>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}

                                {/* Custom Size Option */}
                                <div className="pt-4 border-t border-border">
                                    <button
                                        onClick={handleCustomSizeToggle}
                                        className={`w-full p-4 rounded-xl border-2 text-start transition-all ${isCustomSize
                                            ? 'border-primary bg-primary/5'
                                            : 'border-dashed border-border hover:border-primary/50'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="font-semibold text-foreground">{t('customSizeOption')}</span>
                                            {isCustomSize && (
                                                <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                                                    <Check className="w-3 h-3 text-primary-foreground" />
                                                </div>
                                            )}
                                        </div>
                                    </button>

                                    {/* Custom Size Inputs */}
                                    {isCustomSize && (
                                        <div className="grid grid-cols-2 gap-4 mt-4">
                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-foreground">
                                                    {t('widthLabel')}
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        step="0.5"
                                                        value={customWidth}
                                                        onChange={(e) => setCustomWidth(e.target.value)}
                                                        placeholder={t('widthPlaceholder')}
                                                        className="w-full h-12 px-4 pe-12 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                                                    />
                                                    <span className="absolute end-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                                                        {t('meters')}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="block text-sm font-medium text-foreground">
                                                    {t('heightLabel')}
                                                </label>
                                                <div className="relative">
                                                    <input
                                                        type="number"
                                                        min="1"
                                                        step="0.5"
                                                        value={customHeight}
                                                        onChange={(e) => setCustomHeight(e.target.value)}
                                                        placeholder={t('heightPlaceholder')}
                                                        className="w-full h-12 px-4 pe-12 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                                                    />
                                                    <span className="absolute end-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                                                        {t('meters')}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Order Button */}
                                <Button
                                    onClick={handleWhatsAppOrder}
                                    disabled={!isFormValid()}
                                    size="lg"
                                    className="w-full h-14 text-lg bg-[#25D366] hover:bg-[#128C7E] text-white disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <MessageCircle className="w-6 h-6 me-2" />
                                    {t('orderButton')}
                                </Button>

                                <p className="text-center text-sm text-muted-foreground">
                                    {t('orderNote')}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CustomTentSection;
