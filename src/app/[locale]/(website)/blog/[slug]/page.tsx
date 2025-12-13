import { getPostBySlug, getPosts, getRelatedPosts } from "@/actions/blog";
import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MessageCircle, Phone, Calendar, Tag } from "lucide-react";
import { BlogCard } from "@/components/cards/BlogCard";
import { Metadata } from "next";

const WHATSAPP_NUMBER = '966552248896';
const PHONE_NUMBER = '+966552248896';

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
}

// Force dynamic rendering (required because getLocale uses cookies/headers)
export const dynamic = 'force-dynamic';
export const dynamicParams = true;

export async function generateStaticParams() {
    const posts = await getPosts();
    const params: { slug: string }[] = [];

    for (const post of posts) {
        params.push({ slug: post.slugEn });
        params.push({ slug: post.slugAr });
    }

    return params;
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const locale = await getLocale();
    const post = await getPostBySlug(slug, locale);

    if (!post) {
        return { title: 'Post Not Found' };
    }

    const title = locale === 'ar' ? post.titleAr : post.titleEn;
    const description = locale === 'ar' ? post.metaDescriptionAr : post.metaDescriptionEn;
    const keywords = locale === 'ar' ? post.keywordsAr : post.keywordsEn;

    return {
        title: `${title} - ${locale === 'ar' ? 'خيام الرياض' : 'Riyadh Tents'}`,
        description,
        keywords: keywords.join(', '),
        openGraph: {
            title,
            description,
            type: 'article',
            locale,
            images: [post.featuredImageUrl],
        },
    };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
    const { slug } = await params;
    const locale = await getLocale();
    const t = await getTranslations('BlogPostPage');

    const post = await getPostBySlug(slug, locale);

    if (!post) {
        notFound();
    }

    const title = locale === 'ar' ? post.titleAr : post.titleEn;
    const content = locale === 'ar' ? post.contentAr : post.contentEn;
    const tags = locale === 'ar' ? post.tagsAr : post.tagsEn;
    const ArrowIcon = locale === 'ar' ? ArrowRight : ArrowLeft;

    // Format date
    const formattedDate = post.publishedAt
        ? new Intl.DateTimeFormat(locale === 'ar' ? 'ar-SA' : 'en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }).format(new Date(post.publishedAt))
        : '';

    // Get related posts
    const relatedPosts = await getRelatedPosts(post.id, 3);

    // Generate WhatsApp message
    const whatsappMessage = encodeURIComponent(
        locale === 'ar'
            ? `مرحباً، قرأت مقالة: ${title} وأريد الاستفسار`
            : `Hello, I read the article: ${title} and I want to inquire`
    );

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section with Featured Image */}
            <div className="relative h-[50vh] min-h-[400px] w-full">
                <Image
                    src={post.featuredImageUrl}
                    alt={title}
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
                        href="/blog"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-white rounded-lg hover:bg-white/20 transition-colors"
                    >
                        <ArrowIcon className="w-5 h-5" />
                        {t('backToBlog')}
                    </Link>
                </div>

                {/* Title Overlay */}
                <div className="absolute bottom-0 start-0 end-0 p-8">
                    <div className="container mx-auto">
                        {/* Date */}
                        {formattedDate && (
                            <div className="flex items-center gap-2 text-white/80 mb-4">
                                <Calendar className="w-5 h-5" />
                                <span>{t('publishedOn')}: {formattedDate}</span>
                            </div>
                        )}
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white">
                            {title}
                        </h1>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Rich Text Content */}
                        <div className="bg-card rounded-xl p-6 md:p-8 border border-border">
                            <div
                                className="prose prose-lg dark:prose-invert max-w-none blog-content"
                                dangerouslySetInnerHTML={{ __html: content }}
                                style={{
                                    '--tw-prose-headings': 'var(--foreground)',
                                    '--tw-prose-body': 'var(--muted-foreground)',
                                    '--tw-prose-links': 'var(--primary)',
                                } as React.CSSProperties}
                            />
                        </div>

                        {/* Tags */}
                        {tags.length > 0 && (
                            <div className="bg-card rounded-xl p-6 border border-border">
                                <div className="flex items-center gap-2 mb-4">
                                    <Tag className="w-5 h-5" style={{ color: 'var(--primary)' }} />
                                    <h3 className="text-lg font-semibold text-foreground">
                                        {t('tags')}
                                    </h3>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    {tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 rounded-full text-sm"
                                            style={{
                                                backgroundColor: 'var(--muted)',
                                                color: 'var(--muted-foreground)'
                                            }}
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Image Gallery */}
                        {post.imageUrls.length > 0 && (
                            <div className="bg-card rounded-xl p-6 border border-border">
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {post.imageUrls.map((url, index) => (
                                        <div
                                            key={index}
                                            className="aspect-square rounded-lg overflow-hidden relative group"
                                        >
                                            <Image
                                                src={url}
                                                alt={`${title} - ${index + 1}`}
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
                                {t('sharePost')}
                            </h3>

                            <div className="space-y-3">
                                <a
                                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${whatsappMessage}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-[#25D366] text-white rounded-lg font-medium hover:bg-[#128C7E] transition-colors"
                                >
                                    <MessageCircle className="w-5 h-5" />
                                    WhatsApp
                                </a>

                                <a
                                    href={`tel:${PHONE_NUMBER}`}
                                    className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-opacity"
                                >
                                    <Phone className="w-5 h-5" />
                                    {locale === 'ar' ? 'اتصل بنا' : 'Call Us'}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
                            {t('relatedPosts')}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {relatedPosts.map((relatedPost) => (
                                <BlogCard key={relatedPost.id} post={relatedPost} />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
