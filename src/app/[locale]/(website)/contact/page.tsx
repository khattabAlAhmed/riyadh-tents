import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import ContactPageClient from "./ContactPageClient";

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'ContactPage.seo' });

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
                'en': '/en/contact',
                'ar': '/ar/contact',
            },
        },
    };
}

export default function ContactPage() {
    return <ContactPageClient />;
}
