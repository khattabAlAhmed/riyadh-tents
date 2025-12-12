import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import CookiesPageClient from "./CookiesPageClient";

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'CookiesPage.seo' });

    return {
        title: t('title'),
        description: t('description'),
        alternates: {
            languages: {
                'en': '/en/cookies',
                'ar': '/ar/cookies',
            },
        },
    };
}

export default function CookiesPage() {
    return <CookiesPageClient />;
}
