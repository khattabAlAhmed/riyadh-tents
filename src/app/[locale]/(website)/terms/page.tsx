import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import TermsPageClient from "./TermsPageClient";

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'TermsPage.seo' });

    return {
        title: t('title'),
        description: t('description'),
        alternates: {
            languages: {
                'en': '/en/terms',
                'ar': '/ar/terms',
            },
        },
    };
}

export default function TermsPage() {
    return <TermsPageClient />;
}
