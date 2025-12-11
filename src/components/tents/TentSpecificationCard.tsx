'use client';

import { useLocale, useTranslations } from 'next-intl';
import { TentSpecification } from '@/actions/website';

interface TentSpecificationCardProps {
    specification: TentSpecification;
}

export function TentSpecificationCard({ specification }: TentSpecificationCardProps) {
    const locale = useLocale();
    const t = useTranslations('TentPage.specifications');

    const specs = [
        {
            label: t('profileMaterial'),
            value: locale === 'ar' ? specification.profileMaterialAr : specification.profileMaterialEn,
        },
        {
            label: t('connection'),
            value: locale === 'ar' ? specification.connectionAr : specification.connectionEn,
        },
        {
            label: t('roofCover'),
            value: locale === 'ar' ? specification.roofCoverAr : specification.roofCoverEn,
        },
        {
            label: t('properties'),
            value: locale === 'ar' ? specification.propertiesAr : specification.propertiesEn,
        },
        {
            label: t('wallType'),
            value: locale === 'ar' ? specification.wallTypeAr : specification.wallTypeEn,
        },
        {
            label: t('doorType'),
            value: locale === 'ar' ? specification.doorTypeAr : specification.doorTypeEn,
        },
    ];

    return (
        <div className="space-y-4">
            {specs.map((spec, index) => (
                <div
                    key={index}
                    className="grid grid-cols-1 md:grid-cols-3 gap-2 py-3 border-b border-border last:border-0"
                >
                    <dt className="font-semibold text-foreground">
                        {spec.label}
                    </dt>
                    <dd className="md:col-span-2 text-muted-foreground">
                        {spec.value}
                    </dd>
                </div>
            ))}
        </div>
    );
}
