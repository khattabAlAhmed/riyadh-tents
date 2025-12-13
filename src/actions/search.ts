"use server";

import { db } from "@/lib/db/drizzle";
import { service, tent } from "@/lib/db/schema/website-schema";
import { blogPost } from "@/lib/db/schema/blog-schema";
import { eq, or, ilike } from "drizzle-orm";

// ============================================
// Type Definitions
// ============================================

export type SearchResultItem = {
    id: string;
    type: 'post' | 'tent' | 'service';
    titleAr: string;
    titleEn: string;
    slugAr: string;
    slugEn: string;
    descriptionAr: string;
    descriptionEn: string;
    imageUrl: string;
};

export type SearchResults = {
    posts: SearchResultItem[];
    tents: SearchResultItem[];
    services: SearchResultItem[];
    totalCount: number;
};

// ============================================
// Server Actions
// ============================================

/**
 * Search across posts, tents, and services
 */
export async function searchAll(query: string): Promise<SearchResults> {
    if (!query || query.trim().length < 2) {
        return { posts: [], tents: [], services: [], totalCount: 0 };
    }

    const searchTerm = `%${query.trim()}%`;

    // Search blog posts
    const postsResult = await db
        .select()
        .from(blogPost)
        .where(
            or(
                ilike(blogPost.titleAr, searchTerm),
                ilike(blogPost.titleEn, searchTerm),
                ilike(blogPost.excerptAr, searchTerm),
                ilike(blogPost.excerptEn, searchTerm)
            )
        )
        .limit(5);

    // Search tents
    const tentsResult = await db
        .select()
        .from(tent)
        .where(
            or(
                ilike(tent.nameAr, searchTerm),
                ilike(tent.nameEn, searchTerm),
                ilike(tent.descriptionAr, searchTerm),
                ilike(tent.descriptionEn, searchTerm)
            )
        )
        .limit(5);

    // Search services
    const servicesResult = await db
        .select()
        .from(service)
        .where(
            or(
                ilike(service.nameAr, searchTerm),
                ilike(service.nameEn, searchTerm),
                ilike(service.descriptionAr, searchTerm),
                ilike(service.descriptionEn, searchTerm)
            )
        )
        .limit(5);

    // Transform results
    const posts: SearchResultItem[] = postsResult.map(p => ({
        id: p.id,
        type: 'post',
        titleAr: p.titleAr,
        titleEn: p.titleEn,
        slugAr: p.slugAr,
        slugEn: p.slugEn,
        descriptionAr: p.excerptAr,
        descriptionEn: p.excerptEn,
        imageUrl: p.featuredImageUrl,
    }));

    const tents: SearchResultItem[] = tentsResult.map(t => ({
        id: t.id,
        type: 'tent',
        titleAr: t.nameAr,
        titleEn: t.nameEn,
        slugAr: t.slugAr,
        slugEn: t.slugEn,
        descriptionAr: t.descriptionAr,
        descriptionEn: t.descriptionEn,
        imageUrl: t.imageUrls[0] || '/assets/placeholder.png',
    }));

    const services: SearchResultItem[] = servicesResult.map(s => ({
        id: s.id,
        type: 'service',
        titleAr: s.nameAr,
        titleEn: s.nameEn,
        slugAr: s.slugAr,
        slugEn: s.slugEn,
        descriptionAr: s.descriptionAr,
        descriptionEn: s.descriptionEn,
        imageUrl: s.imageUrls[0] || '/assets/placeholder.png',
    }));

    return {
        posts,
        tents,
        services,
        totalCount: posts.length + tents.length + services.length,
    };
}
