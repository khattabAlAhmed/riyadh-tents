'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
    MessageCircle,
    Phone,
    Mail,
    MapPin,
    Clock,
    Send,
    CheckCircle,
    AlertCircle,
    ChevronDown
} from 'lucide-react';

const WHATSAPP_NUMBER = '966552248896';
const PHONE_NUMBER = '+966552248896';
const TELEGRAM_BOT_TOKEN = 'YOUR_BOT_TOKEN';
const TELEGRAM_CHAT_ID = 'YOUR_CHAT_ID';

export default function ContactPageClient() {
    const t = useTranslations('ContactPage');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [openFaq, setOpenFaq] = useState<string | null>(null);

    const handleWhatsApp = () => {
        window.open(`https://wa.me/${WHATSAPP_NUMBER}`, '_blank');
    };

    const handlePhoneCall = () => {
        window.location.href = `tel:${PHONE_NUMBER}`;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus('idle');

        try {
            const message = `
📬 New Contact Form Submission

👤 Name: ${formData.name}
📧 Email: ${formData.email}
📱 Phone: ${formData.phone}
📌 Subject: ${formData.subject}

💬 Message:
${formData.message}
            `.trim();

            const response = await fetch(
                `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        chat_id: TELEGRAM_CHAT_ID,
                        text: message,
                        parse_mode: 'HTML'
                    })
                }
            );

            if (response.ok) {
                setSubmitStatus('success');
                setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
            } else {
                setSubmitStatus('error');
            }
        } catch {
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        { key: 'phone', icon: Phone, action: handlePhoneCall },
        { key: 'whatsapp', icon: MessageCircle, action: handleWhatsApp },
        { key: 'email', icon: Mail, action: () => window.location.href = 'mailto:info@riyadh-tents.com' },
        { key: 'address', icon: MapPin, action: undefined },
        { key: 'hours', icon: Clock, action: undefined },
    ];

    const faqItems = ['q1', 'q2', 'q3', 'q4'];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-24 md:py-32 bg-gradient-to-br from-primary via-primary/95 to-primary/85 overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-0 start-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2" />
                    <div className="absolute bottom-0 end-0 w-96 h-96 bg-white rounded-full translate-x-1/2 translate-y-1/2" />
                </div>

                <div className="container mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                    <div className="max-w-4xl mx-auto text-center">
                        <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm text-white rounded-full text-sm font-medium mb-6">
                            {t('hero.subtitle')}
                        </span>
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                            {t('hero.title')}
                        </h1>
                        <p className="text-xl text-white/90 max-w-2xl mx-auto">
                            {t('hero.description')}
                        </p>
                    </div>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            {t('info.title')}
                        </h2>
                        <p className="text-muted-foreground text-lg">
                            {t('info.description')}
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
                        {contactInfo.map((item) => (
                            <div
                                key={item.key}
                                onClick={item.action}
                                className={`p-6 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-lg transition-all duration-300 text-center ${item.action ? 'cursor-pointer' : ''}`}
                            >
                                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                                    <item.icon className="w-7 h-7 text-primary" />
                                </div>
                                <h3 className="font-semibold text-foreground mb-2">
                                    {t(`info.${item.key}.title`)}
                                </h3>
                                <p className="text-primary font-medium mb-1" dir="ltr">
                                    {t(`info.${item.key}.value`)}
                                </p>
                                <p className="text-muted-foreground text-sm">
                                    {t(`info.${item.key}.description`)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form & Quick Contact */}
            <section className="py-16 bg-muted/50">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="grid lg:grid-cols-5 gap-12">
                        {/* Contact Form */}
                        <div className="lg:col-span-3">
                            <div className="bg-card rounded-2xl p-8 shadow-lg border border-border">
                                <h2 className="text-2xl font-bold text-foreground mb-2">
                                    {t('form.title')}
                                </h2>
                                <p className="text-muted-foreground mb-8">
                                    {t('form.description')}
                                </p>

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">
                                                {t('form.name')}
                                            </label>
                                            <Input
                                                type="text"
                                                placeholder={t('form.namePlaceholder')}
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                required
                                                className="h-12"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">
                                                {t('form.email')}
                                            </label>
                                            <Input
                                                type="email"
                                                placeholder={t('form.emailPlaceholder')}
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                required
                                                className="h-12"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">
                                                {t('form.phone')}
                                            </label>
                                            <Input
                                                type="tel"
                                                placeholder={t('form.phonePlaceholder')}
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                required
                                                className="h-12"
                                                dir="ltr"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-foreground mb-2">
                                                {t('form.subject')}
                                            </label>
                                            <Input
                                                type="text"
                                                placeholder={t('form.subjectPlaceholder')}
                                                value={formData.subject}
                                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                required
                                                className="h-12"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-foreground mb-2">
                                            {t('form.message')}
                                        </label>
                                        <Textarea
                                            placeholder={t('form.messagePlaceholder')}
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            required
                                            rows={5}
                                            className="resize-none"
                                        />
                                    </div>

                                    {submitStatus === 'success' && (
                                        <div className="flex items-center gap-2 p-4 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-lg">
                                            <CheckCircle className="w-5 h-5" />
                                            <span>{t('form.success')}</span>
                                        </div>
                                    )}

                                    {submitStatus === 'error' && (
                                        <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400 rounded-lg">
                                            <AlertCircle className="w-5 h-5" />
                                            <span>{t('form.error')}</span>
                                        </div>
                                    )}

                                    <Button
                                        type="submit"
                                        size="lg"
                                        className="w-full h-14 text-lg"
                                        disabled={isSubmitting}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="animate-spin me-2">⏳</span>
                                                {t('form.sending')}
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5 me-2" />
                                                {t('form.submit')}
                                            </>
                                        )}
                                    </Button>
                                </form>
                            </div>
                        </div>

                        {/* Quick Contact */}
                        <div className="lg:col-span-2">
                            <div className="bg-gradient-to-br from-primary to-primary/80 text-white rounded-2xl p-8 shadow-lg h-full">
                                <h2 className="text-2xl font-bold mb-4">
                                    {t('quickContact.title')}
                                </h2>
                                <p className="text-white/90 mb-8">
                                    {t('quickContact.description')}
                                </p>

                                <div className="space-y-4">
                                    <Button
                                        onClick={handleWhatsApp}
                                        size="lg"
                                        className="w-full h-14 text-lg bg-[#25D366] hover:bg-[#128C7E] text-white"
                                    >
                                        <MessageCircle className="w-5 h-5 me-3" />
                                        {t('quickContact.whatsappButton')}
                                    </Button>
                                    <Button
                                        onClick={handlePhoneCall}
                                        size="lg"
                                        variant="outline"
                                        className="w-full h-14 text-lg bg-white/10 border-white/30 text-white hover:bg-white hover:text-primary"
                                    >
                                        <Phone className="w-5 h-5 me-3" />
                                        {t('quickContact.callButton')}
                                    </Button>
                                </div>

                                {/* Decorative Elements */}
                                <div className="mt-12 pt-8 border-t border-white/20">
                                    <div className="flex items-center justify-center gap-4">
                                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                            <Clock className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="font-semibold">{t('info.hours.title')}</div>
                                            <div className="text-white/80 text-sm">{t('info.hours.value')}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-background">
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground text-center mb-12">
                            {t('faq.title')}
                        </h2>

                        <div className="space-y-4">
                            {faqItems.map((item) => (
                                <div
                                    key={item}
                                    className="bg-card rounded-xl border border-border overflow-hidden"
                                >
                                    <button
                                        onClick={() => setOpenFaq(openFaq === item ? null : item)}
                                        className="w-full flex items-center justify-between p-6 text-start hover:bg-muted/50 transition-colors"
                                    >
                                        <span className="font-semibold text-foreground">
                                            {t(`faq.items.${item}.question`)}
                                        </span>
                                        <ChevronDown
                                            className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${openFaq === item ? 'rotate-180' : ''}`}
                                        />
                                    </button>
                                    <div
                                        className={`overflow-hidden transition-all duration-300 ${openFaq === item ? 'max-h-96' : 'max-h-0'}`}
                                    >
                                        <p className="px-6 pb-6 text-muted-foreground">
                                            {t(`faq.items.${item}.answer`)}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
