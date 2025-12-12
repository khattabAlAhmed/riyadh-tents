import { MetadataRoute } from 'next';
import { db } from '@/lib/db';
import { tent, service, project } from '@/lib/db/schema/website-schema';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://riyadh-tents.com';

// Static pages that don't require database queries
const staticPages = [
    '', // Home page
    '/about',
    '/contact',
    '/privacy',
    '/terms',
    '/cookies',
];

// Locales supported by the app
const locales = ['en', 'ar'];

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
                        en: `${BASE_URL}/en${page}`,
                        ar: `${BASE_URL}/ar${page}`,
                    },
                },
            });
        }
    }

    // Fetch dynamic content from database
    try {
        // Fetch all tents
        const tents = await db.select({
            slugEn: tent.slugEn,
            slugAr: tent.slugAr,
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
                        en: `${BASE_URL}/en/tents/${t.slugEn}`,
                        ar: `${BASE_URL}/ar/tents/${t.slugAr}`,
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
                        en: `${BASE_URL}/en/tents/${t.slugEn}`,
                        ar: `${BASE_URL}/ar/tents/${t.slugAr}`,
                    },
                },
            });
        }

        // Fetch all services
        const services = await db.select({
            slugEn: service.slugEn,
            slugAr: service.slugAr,
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
                        en: `${BASE_URL}/en/services/${s.slugEn}`,
                        ar: `${BASE_URL}/ar/services/${s.slugAr}`,
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
                        en: `${BASE_URL}/en/services/${s.slugEn}`,
                        ar: `${BASE_URL}/ar/services/${s.slugAr}`,
                    },
                },
            });
        }

        // Fetch all projects (if project pages exist)
        const projects = await db.select({
            slugEn: project.slugEn,
            slugAr: project.slugAr,
            updatedAt: project.updatedAt,
        }).from(project);

        // Add project pages for both locales
        for (const p of projects) {
            // English project page
            sitemapEntries.push({
                url: `${BASE_URL}/en/projects/${p.slugEn}`,
                lastModified: p.updatedAt,
                changeFrequency: 'monthly',
                priority: 0.6,
                alternates: {
                    languages: {
                        en: `${BASE_URL}/en/projects/${p.slugEn}`,
                        ar: `${BASE_URL}/ar/projects/${p.slugAr}`,
                    },
                },
            });

            // Arabic project page
            sitemapEntries.push({
                url: `${BASE_URL}/ar/projects/${p.slugAr}`,
                lastModified: p.updatedAt,
                changeFrequency: 'monthly',
                priority: 0.6,
                alternates: {
                    languages: {
                        en: `${BASE_URL}/en/projects/${p.slugEn}`,
                        ar: `${BASE_URL}/ar/projects/${p.slugAr}`,
                    },
                },
            });
        }

    } catch (error) {
        console.error('Error fetching dynamic sitemap data:', error);
        // Return static pages only if database fetch fails
    }

    return sitemapEntries;
}
