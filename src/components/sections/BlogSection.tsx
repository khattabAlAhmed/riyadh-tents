'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { getLatestPosts, type BlogPost } from '@/actions/blog';
import { BlogCard } from '@/components/cards/BlogCard';

const BlogSection = () => {
    const t = useTranslations('BlogSection');
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const data = await getLatestPosts(3);
                setPosts(data);
            } catch (error) {
                console.error('Failed to fetch blog posts:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const renderPosts = () => {
        if (isLoading) {
            return [...Array(3)].map((_, index) => (
                <BlogCard key={index} isLoading />
            ));
        }

        if (posts.length === 0) {
            return (
                <div className="col-span-full text-center py-12" style={{ color: 'var(--service-card-muted)' }}>
                    {t('noPosts')}
                </div>
            );
        }

        return posts.map((post) => (
            <BlogCard key={post.id} post={post} />
        ));
    };

    return (
        <section
            id="blog"
            className="py-20"
            style={{ backgroundColor: 'var(--blog-section-bg)' }}
        >
            <div className="container mx-auto px-4 md:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span
                        className="inline-block font-semibold mb-4 text-sm uppercase tracking-wider"
                        style={{ color: 'var(--service-link)' }}
                    >
                        {t('subtitle')}
                    </span>
                    <h2
                        className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
                        style={{ color: 'var(--service-card-text)' }}
                    >
                        {t('title')}
                    </h2>
                    <p
                        className="text-lg max-w-2xl mx-auto"
                        style={{ color: 'var(--service-card-muted)' }}
                    >
                        {t('description')}
                    </p>
                </div>

                {/* Blog Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {renderPosts()}
                </div>
            </div>
        </section>
    );
};

export default BlogSection;
