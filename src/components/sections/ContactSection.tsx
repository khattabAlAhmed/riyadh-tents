'use client';

import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { MessageCircle, Phone, Mail, MapPin } from 'lucide-react';

const WHATSAPP_NUMBER = '966552248896'; // Replace with actual number
const PHONE_NUMBER = '+966552248896'; // Replace with actual number

const ContactSection = () => {
    const t = useTranslations('ContactSection');

    const handleWhatsApp = () => {
        window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank');
    };

    const handlePhoneCall = () => {
        window.location.href = `tel:${PHONE_NUMBER}`;
    };

    return (
        <section className="py-20 bg-gradient-to-br from-primary via-primary/90 to-primary/80 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 start-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 end-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
            </div>

            <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    {/* Section Header */}
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        {t('title')}
                    </h2>
                    <p className="text-white/90 text-lg mb-12 max-w-2xl mx-auto">
                        {t('description')}
                    </p>

                    {/* CTA Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                        <Button
                            onClick={handleWhatsApp}
                            size="lg"
                            className="h-16 px-10 text-lg bg-[#25D366] hover:bg-[#128C7E] text-white shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                        >
                            <MessageCircle className="w-6 h-6 me-3" />
                            {t('whatsappButton')}
                        </Button>
                        <Button
                            onClick={handlePhoneCall}
                            size="lg"
                            variant="outline"
                            className="h-16 px-10 text-lg bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
                        >
                            <Phone className="w-6 h-6 me-3" />
                            {t('callButton')}
                        </Button>
                    </div>

                    {/* Contact Info */}
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-xl">
                            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-4">
                                <Phone className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-white font-semibold mb-2">{t('phoneTitle')}</h3>
                            <p className="text-white/80 text-sm" dir="ltr">+966552248896</p>
                        </div>
                        <div className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-xl">
                            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-4">
                                <Mail className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-white font-semibold mb-2">{t('emailTitle')}</h3>
                            <p className="text-white/80 text-sm">info@riyadhtents.com</p>
                        </div>
                        <div className="flex flex-col items-center p-6 bg-white/10 backdrop-blur-sm rounded-xl">
                            <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mb-4">
                                <MapPin className="w-6 h-6 text-white" />
                            </div>
                            <h3 className="text-white font-semibold mb-2">{t('addressTitle')}</h3>
                            <p className="text-white/80 text-sm">{t('addressValue')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
