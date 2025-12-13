import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import HeroSection from "@/components/sections/HeroSection";
import WhoWeAreSection from "@/components/sections/WhoWeAreSection";
import ServicesSection from "@/components/sections/ServicesSection";
import TentsSection from "@/components/sections/TentsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import CustomTentSection from "@/components/sections/CustomTentSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import BlogSection from "@/components/sections/BlogSection";
import ContactSection from "@/components/sections/ContactSection";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'HomePage.seo' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
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
        'en': '/en',
        'ar': '/ar',
      },
    },
  };
}

export default function Home() {
  return (
    <div>
      <main>
        <HeroSection />
        <WhoWeAreSection />
        <ServicesSection />
        <TentsSection />
        <ProjectsSection />
        <CustomTentSection />
        <TestimonialsSection />
        <BlogSection />
        <ContactSection />
      </main>
    </div>
  );
}
