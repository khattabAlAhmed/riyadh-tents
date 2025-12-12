'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Cookie, X } from 'lucide-react';

const COOKIE_CONSENT_KEY = 'cookie-consent';

export default function CookieConsent() {
    const t = useTranslations('CookieConsent');
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
        if (!consent) {
            // Show banner after a short delay
            const timer = setTimeout(() => {
                setIsVisible(true);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAcceptAll = () => {
        localStorage.setItem(COOKIE_CONSENT_KEY, 'all');
        setIsVisible(false);
    };

    const handleAcceptEssential = () => {
        localStorage.setItem(COOKIE_CONSENT_KEY, 'essential');
        setIsVisible(false);
    };

    const handleClose = () => {
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-0 start-0 end-0 z-50 p-4 md:p-6">
            <div className="container mx-auto max-w-4xl">
                <div className="bg-card border border-border rounded-2xl shadow-2xl p-6 relative">
                    {/* Close Button */}
                    <button
                        onClick={handleClose}
                        className="absolute top-4 end-4 p-1 text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5" />
                    </button>

                    <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                        {/* Icon */}
                        <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                            <Cookie className="w-6 h-6 text-primary" />
                        </div>

                        {/* Content */}
                        <div className="flex-1">
                            <p className="text-foreground text-sm md:text-base leading-relaxed">
                                {t('message')}
                            </p>
                            <Link
                                href="/cookies"
                                className="text-primary text-sm hover:underline font-medium inline-block mt-2"
                            >
                                {t('learnMore')} →
                            </Link>
                        </div>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
                            <Button
                                onClick={handleAcceptEssential}
                                variant="outline"
                                className="whitespace-nowrap"
                            >
                                {t('acceptEssential')}
                            </Button>
                            <Button
                                onClick={handleAcceptAll}
                                className="whitespace-nowrap"
                            >
                                {t('acceptAll')}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
