import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import AboutPageClient from "./AboutPageClient";

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'AboutPage.seo' });

    return {
        title: t('title'),
        description: t('description'),
        openGraph: {
            title: t('title'),
            description: t('description'),
            type: 'website',
            locale: locale,
            siteName: locale === 'ar' ? 'خيام الرياض' : 'Riyadh Tents',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('title'),
            description: t('description'),
        },
        alternates: {
            languages: {
                'en': '/en/about',
                'ar': '/ar/about',
            },
        },
    };
}

export default function AboutPage() {
    return <AboutPageClient />;
}
