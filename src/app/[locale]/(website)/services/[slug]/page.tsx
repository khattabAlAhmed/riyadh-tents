import { getServiceBySlug, getServices } from "@/actions/website";
import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MessageCircle, Phone } from "lucide-react";

const WHATSAPP_NUMBER = '966552248896'; // Replace with actual number
const PHONE_NUMBER = '+966552248896'; // Replace with actual number

interface ServicePageProps {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateStaticParams() {
    const services = await getServices();
    const params: { slug: string }[] = [];

    for (const service of services) {
        params.push({ slug: service.slugEn });
        params.push({ slug: service.slugAr });
    }

    return params;
}

export default async function ServicePage({ params }: ServicePageProps) {
    const { slug } = await params;
    const locale = await getLocale();
    const t = await getTranslations('ServicePage');

    const service = await getServiceBySlug(slug, locale);

    if (!service) {
        notFound();
    }

    const name = locale === 'ar' ? service.nameAr : service.nameEn;
    const description = locale === 'ar' ? service.descriptionAr : service.descriptionEn;
    const ArrowIcon = locale === 'ar' ? ArrowRight : ArrowLeft;

    // Generate WhatsApp message
    const whatsappMessage = encodeURIComponent(
        locale === 'ar'
            ? `مرحباً، أريد الاستفسار عن خدمة: ${name}`
            : `Hello, I want to inquire about the service: ${name}`
    );

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section with First Image */}
            <div className="relative h-[50vh] min-h-[400px] w-full">
                <Image
                    src={service.imageUrls[0] || '/assets/placeholder.png'}
                    alt={name}
                    fill
                    sizes="100vw"
                    className="object-cover"
                    priority
                    unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                {/* Back Button */}
                <div className="absolute top-6 start-6">
                    <Link
                        href="/#services"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-colors"
                    >
                        <ArrowIcon className="w-5 h-5" />
                        {t('backToServices')}
                    </Link>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-0 start-0 end-0 p-8">
                    <div className="container mx-auto">
                        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                            {name}
                        </h1>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Description */}
                        <div className="bg-card rounded-xl p-6 border border-border">
                            <h2 className="text-2xl font-semibold text-foreground mb-4">
                                {t('aboutService')}
                            </h2>
                            <p className="text-muted-foreground leading-relaxed text-lg">
                                {description}
                            </p>
                        </div>

                        {/* Image Gallery */}
                        {service.imageUrls.length > 1 && (
                            <div className="bg-card rounded-xl p-6 border border-border">
                                <h2 className="text-2xl font-semibold text-foreground mb-6">
                                    {t('gallery')}
                                </h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {service.imageUrls.slice(1).map((url, index) => (
                                        <div
                                            key={index}
                                            className="aspect-square rounded-lg overflow-hidden relative group"
                                        >
                                            <Image
                                                src={url}
                                                alt={`${name} - ${index + 2}`}
                                                fill
                                                sizes="(max-width: 768px) 50vw, 33vw"
                                                className="object-cover transition-transform duration-300 group-hover:scale-110"
                                                unoptimized
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar - Contact Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-card rounded-xl p-6 border border-border space-y-6">
                            <h3 className="text-xl font-semibold text-foreground">
                                {t('interestedInService')}
                            </h3>
                            <p className="text-muted-foreground">
                                {t('contactUsDescription')}
                            </p>

                            <div className="space-y-3">
                                <a
                                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#25D366] text-white rounded-lg font-medium hover:bg-[#128C7E] transition-colors"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    {t('chatOnWhatsApp')}
                                </a>

                                <a
                                    href={`tel:${PHONE_NUMBER}`}
                                    className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
                                >
                                    <Phone className="w-5 h-5" />
                                    {t('callUs')}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
