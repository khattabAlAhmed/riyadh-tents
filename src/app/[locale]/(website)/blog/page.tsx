import { Metadata } from "next";
import { getTranslations, getLocale } from "next-intl/server";
import { getPosts } from "@/actions/blog";
import { BlogCard } from "@/components/cards/BlogCard";

export async function generateMetadata({
    params
}: {
    params: Promise<{ locale: string }>
}): Promise<Metadata> {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'BlogPage.seo' });

    return {
        title: t('title'),
        description: t('description'),
        openGraph: {
            title: t('title'),
            description: t('description'),
            type: 'website',
            locale: locale,
        },
    };
}

export default async function BlogPage() {
    const locale = await getLocale();
    const t = await getTranslations('BlogPage');
    const posts = await getPosts();

    return (
        <div className="min-h-screen bg-background">
            {/* Hero Section */}
            <section
                className="py-20 md:py-28"
                style={{
                    background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)'
                }}
            >
                <div className="container mx-auto px-4 text-center">
                    <span className="inline-block text-white/80 font-semibold mb-4 text-sm uppercase tracking-wider">
                        {t('hero.subtitle')}
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                        {t('hero.title')}
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
                        {t('hero.description')}
                    </p>
                </div>
            </section>

            {/* Blog Posts Grid */}
            <section className="py-16 md:py-20" style={{ backgroundColor: 'var(--blog-section-bg)' }}>
                <div className="container mx-auto px-4 md:px-6 lg:px-8">
                    {posts.length === 0 ? (
                        <div
                            className="text-center py-12"
                            style={{ color: 'var(--service-card-muted)' }}
                        >
                            {t('noPosts')}
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {posts.map((post) => (
                                <BlogCard key={post.id} post={post} />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
