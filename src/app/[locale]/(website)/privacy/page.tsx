import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import PrivacyPageClient from "./PrivacyPageClient";

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'PrivacyPage.seo' });

    return {
        title: t('title'),
        description: t('description'),
        alternates: {
            languages: {
                'en': '/en/privacy',
                'ar': '/ar/privacy',
            },
        },
    };
}

export default function PrivacyPage() {
    return <PrivacyPageClient />;
}
