import { MetadataRoute } from 'next';
import { db } from '@/lib/db/drizzle';
import { tent, service, project } from '@/lib/db/schema/website-schema';
import { blogPost } from '@/lib/db/schema/blog-schema';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://www.riyadh-tents.com';

// Static pages that don't require database queries
const staticPages = [
    '', // Home page
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/cookies',
    '/blog',
];

// Locales supported by the app
const locales = ['ar', 'en'];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const sitemapEntries: MetadataRoute.Sitemap = [];

    // Add static pages for both locales
    for (const locale of locales) {
        for (const page of staticPages) {
            sitemapEntries.push({
                url: `${BASE_URL}/${locale}${page}`,
                lastModified: new Date(),
                changeFrequency: page === '' ? 'daily' : 'weekly',
                priority: page === '' ? 1.0 : 0.8,
                alternates: {
                    languages: {
                        ar: `${BASE_URL}/ar${page}`,
                        en: `${BASE_URL}/en${page}`,
                    },
                },
            });
        }
    }

    // Fetch dynamic content from database
    try {
        // Fetch all tents
        const tents = await db.select({
            slugAr: tent.slugAr,
            slugEn: tent.slugEn,
            updatedAt: tent.updatedAt,
        }).from(tent);

        // Add tent pages for both locales
        for (const t of tents) {
            // English tent page
            sitemapEntries.push({
                url: `${BASE_URL}/en/tents/${t.slugEn}`,
                lastModified: t.updatedAt,
                changeFrequency: 'weekly',
                priority: 0.7,
                alternates: {
                    languages: {
                        ar: `${BASE_URL}/ar/tents/${t.slugAr}`,
                        en: `${BASE_URL}/en/tents/${t.slugEn}`,
                    },
                },
            });

            // Arabic tent page
            sitemapEntries.push({
                url: `${BASE_URL}/ar/tents/${t.slugAr}`,
                lastModified: t.updatedAt,
                changeFrequency: 'weekly',
                priority: 0.7,
                alternates: {
                    languages: {
                        ar: `${BASE_URL}/ar/tents/${t.slugAr}`,
                        en: `${BASE_URL}/en/tents/${t.slugEn}`,
                    },
                },
            });
        }

        // Fetch all services
        const services = await db.select({
            slugAr: service.slugAr,
            slugEn: service.slugEn,
            updatedAt: service.updatedAt,
        }).from(service);

        // Add service pages for both locales
        for (const s of services) {
            // English service page
            sitemapEntries.push({
                url: `${BASE_URL}/en/services/${s.slugEn}`,
                lastModified: s.updatedAt,
                changeFrequency: 'weekly',
                priority: 0.7,
                alternates: {
                    languages: {
                        ar: `${BASE_URL}/ar/services/${s.slugAr}`,
                        en: `${BASE_URL}/en/services/${s.slugEn}`,
                    },
                },
            });

            // Arabic service page
            sitemapEntries.push({
                url: `${BASE_URL}/ar/services/${s.slugAr}`,
                lastModified: s.updatedAt,
                changeFrequency: 'weekly',
                priority: 0.7,
                alternates: {
                    languages: {
                        ar: `${BASE_URL}/ar/services/${s.slugAr}`,
                        en: `${BASE_URL}/en/services/${s.slugEn}`,
                    },
                },
            });
        }

        // Fetch all blog posts
        const posts = await db.select({
            slugAr: blogPost.slugAr,
            slugEn: blogPost.slugEn,
            updatedAt: blogPost.updatedAt,
        }).from(blogPost);

        // Add blog post pages for both locales
        for (const p of posts) {
            // English blog post page
            sitemapEntries.push({
                url: `${BASE_URL}/en/blog/${p.slugEn}`,
                lastModified: p.updatedAt,
                changeFrequency: 'weekly',
                priority: 0.7,
                alternates: {
                    languages: {
                        ar: `${BASE_URL}/ar/blog/${p.slugAr}`,
                        en: `${BASE_URL}/en/blog/${p.slugEn}`,
                    },
                },
            });

            // Arabic blog post page
            sitemapEntries.push({
                url: `${BASE_URL}/ar/blog/${p.slugAr}`,
                lastModified: p.updatedAt,
                changeFrequency: 'weekly',
                priority: 0.7,
                alternates: {
                    languages: {
                        ar: `${BASE_URL}/ar/blog/${p.slugAr}`,
                        en: `${BASE_URL}/en/blog/${p.slugEn}`,
                    },
                },
            });
        }

        // Fetch all projects (if project pages exist)
        // const projects = await db.select({
        //     slugAr: project.slugAr,
        //     slugEn: project.slugEn,
        //     updatedAt: project.updatedAt,
        // }).from(project);

        // Add project pages for both locales
        // for (const p of projects) {
        //     // English project page
        //     sitemapEntries.push({
        //         url: `${BASE_URL}/en/projects/${p.slugEn}`,
        //         lastModified: p.updatedAt,
        //         changeFrequency: 'monthly',
        //         priority: 0.6,
        //         alternates: {
        //             languages: {
        //                 ar: `${BASE_URL}/ar/projects/${p.slugAr}`,
        //                 en: `${BASE_URL}/en/projects/${p.slugEn}`,
        //             },
        //         },
        //     });

        //     // Arabic project page
        //     sitemapEntries.push({
        //         url: `${BASE_URL}/ar/projects/${p.slugAr}`,
        //         lastModified: p.updatedAt,
        //         changeFrequency: 'monthly',
        //         priority: 0.6,
        //         alternates: {
        //             languages: {
        //                 ar: `${BASE_URL}/ar/projects/${p.slugAr}`,
        //                 en: `${BASE_URL}/en/projects/${p.slugEn}`,
        //             },
        //         },
        //     });
        // }

    } catch (error) {
        console.error('Error fetching dynamic sitemap data:', error);
        // Return static pages only if database fetch fails
    }

    return sitemapEntries;
}
