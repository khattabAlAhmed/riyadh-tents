'use client';

import { useLocale } from 'next-intl';
import { TentAccessory } from '@/actions/website';
import { Check } from 'lucide-react';

interface TentAccessoriesListProps {
    accessories: TentAccessory[];
}

export function TentAccessoriesList({ accessories }: TentAccessoriesListProps) {
    const locale = useLocale();

    if (accessories.length === 0) return null;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {accessories.map((accessory) => (
                <div
                    key={accessory.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-muted/30 border border-border hover:border-primary/50 transition-colors"
                >
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Check className="w-4 h-4 text-primary" />
                    </div>
                    <span className="text-foreground font-medium">
                        {locale === 'ar' ? accessory.nameAr : accessory.nameEn}
                    </span>
                </div>
            ))}
        </div>
    );
}
