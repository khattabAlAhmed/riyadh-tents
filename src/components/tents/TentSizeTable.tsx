'use client';

import { useLocale, useTranslations } from 'next-intl';
import { TentSize } from '@/actions/website';

interface TentSizeTableProps {
    sizes: TentSize[];
    isDomeTent?: boolean;
}

export function TentSizeTable({ sizes, isDomeTent = false }: TentSizeTableProps) {
    const locale = useLocale();
    const t = useTranslations('TentPage.sizeTable');
    const isRtl = locale === 'ar';

    if (sizes.length === 0) return null;

    // Check if this is a dome tent (has diameter/area data)
    const hasDomeData = sizes.some(s => s.diameter !== null || s.area !== null);

    return (
        <div className="overflow-x-auto rounded-lg border border-border">
            <table className="w-full text-sm">
                <thead>
                    <tr className="bg-muted/50">
                        <th className={`px-4 py-3 font-semibold text-foreground ${isRtl ? 'text-right' : 'text-left'}`}>
                            {t('type')}
                        </th>
                        <th className={`px-4 py-3 font-semibold text-foreground ${isRtl ? 'text-right' : 'text-left'}`}>
                            {hasDomeData ? t('diameter') : t('width')}
                        </th>
                        <th className={`px-4 py-3 font-semibold text-foreground ${isRtl ? 'text-right' : 'text-left'}`}>
                            {hasDomeData ? t('centerHeight') : t('eaveHeight')}
                        </th>
                        {!hasDomeData && (
                            <th className={`px-4 py-3 font-semibold text-foreground ${isRtl ? 'text-right' : 'text-left'}`}>
                                {t('ridgeHeight')}
                            </th>
                        )}
                        {!hasDomeData && sizes.some(s => s.bayDistance !== null) && (
                            <th className={`px-4 py-3 font-semibold text-foreground ${isRtl ? 'text-right' : 'text-left'}`}>
                                {t('bayDistance')}
                            </th>
                        )}
                        {hasDomeData && (
                            <>
                                <th className={`px-4 py-3 font-semibold text-foreground ${isRtl ? 'text-right' : 'text-left'}`}>
                                    {t('area')}
                                </th>
                                <th className={`px-4 py-3 font-semibold text-foreground ${isRtl ? 'text-right' : 'text-left'}`}>
                                    {t('capacityStand')}
                                </th>
                                <th className={`px-4 py-3 font-semibold text-foreground ${isRtl ? 'text-right' : 'text-left'}`}>
                                    {t('capacitySit')}
                                </th>
                            </>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {sizes.map((size, index) => (
                        <tr
                            key={size.id}
                            className={`border-t border-border transition-colors hover:bg-muted/30 ${index % 2 === 0 ? 'bg-card' : 'bg-muted/10'
                                }`}
                        >
                            <td className={`px-4 py-3 font-medium text-foreground ${isRtl ? 'text-right' : 'text-left'}`}>
                                {size.typeCode}
                            </td>
                            <td className={`px-4 py-3 text-muted-foreground ${isRtl ? 'text-right' : 'text-left'}`}>
                                {hasDomeData ? size.diameter : size.wide}m
                            </td>
                            <td className={`px-4 py-3 text-muted-foreground ${isRtl ? 'text-right' : 'text-left'}`}>
                                {hasDomeData ? `${size.centerHeight}m` : size.eaveHeight}
                            </td>
                            {!hasDomeData && (
                                <td className={`px-4 py-3 text-muted-foreground ${isRtl ? 'text-right' : 'text-left'}`}>
                                    {size.ridgeHeight}
                                </td>
                            )}
                            {!hasDomeData && sizes.some(s => s.bayDistance !== null) && (
                                <td className={`px-4 py-3 text-muted-foreground ${isRtl ? 'text-right' : 'text-left'}`}>
                                    {size.bayDistance !== null ? `${size.bayDistance}m` : '-'}
                                </td>
                            )}
                            {hasDomeData && (
                                <>
                                    <td className={`px-4 py-3 text-muted-foreground ${isRtl ? 'text-right' : 'text-left'}`}>
                                        {size.area !== null ? size.area : '-'}
                                    </td>
                                    <td className={`px-4 py-3 text-muted-foreground ${isRtl ? 'text-right' : 'text-left'}`}>
                                        {size.capacityStand !== null ? size.capacityStand : '-'}
                                    </td>
                                    <td className={`px-4 py-3 text-muted-foreground ${isRtl ? 'text-right' : 'text-left'}`}>
                                        {size.capacitySit !== null ? size.capacitySit : '-'}
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
