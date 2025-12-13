"use server";

import { db } from "@/lib/db/drizzle";
import { blogPost } from "@/lib/db/schema/blog-schema";
import { eq, or, desc } from "drizzle-orm";

// ============================================
// Type Definitions
// ============================================

export type BlogPost = {
    id: string;
    titleAr: string;
    titleEn: string;
    slugAr: string;
    slugEn: string;
    excerptAr: string;
    excerptEn: string;
    contentAr: string;
    contentEn: string;
    featuredImageUrl: string;
    imageUrls: string[];
    keywordsAr: string[];
    keywordsEn: string[];
    tagsAr: string[];
    tagsEn: string[];
    metaDescriptionAr: string;
    metaDescriptionEn: string;
    isPublished: boolean;
    publishedAt: Date | null;
    createdAt: Date;
};

// ============================================
// Server Actions
// ============================================

/**
 * Fetch all published blog posts, ordered by published date (newest first)
 */
export async function getPosts(): Promise<BlogPost[]> {
    const result = await db
        .select()
        .from(blogPost)
        .where(eq(blogPost.isPublished, true))
        .orderBy(desc(blogPost.publishedAt));
    return result as BlogPost[];
}

/**
 * Fetch latest N published blog posts for homepage section
 */
export async function getLatestPosts(limit: number = 3): Promise<BlogPost[]> {
    const result = await db
        .select()
        .from(blogPost)
        .where(eq(blogPost.isPublished, true))
        .orderBy(desc(blogPost.publishedAt))
        .limit(limit);
    return result as BlogPost[];
}

/**
 * Fetch a single blog post by slug (searches both Arabic and English slugs)
 */
export async function getPostBySlug(slug: string, _locale: string): Promise<BlogPost | null> {
    // Decode the slug in case it's URL-encoded (for Arabic slugs)
    const decodedSlug = decodeURIComponent(slug);

    // Search both Arabic and English slugs
    const result = await db
        .select()
        .from(blogPost)
        .where(
            or(
                eq(blogPost.slugEn, decodedSlug),
                eq(blogPost.slugAr, decodedSlug)
            )
        )
        .limit(1);

    return result.length > 0 ? (result[0] as BlogPost) : null;
}

/**
 * Fetch related posts by matching tags (excluding current post)
 */
export async function getRelatedPosts(currentPostId: string, limit: number = 3): Promise<BlogPost[]> {
    // Get all published posts except current one, ordered by date
    const result = await db
        .select()
        .from(blogPost)
        .where(eq(blogPost.isPublished, true))
        .orderBy(desc(blogPost.publishedAt));

    // Filter out current post and limit
    const filtered = result
        .filter(post => post.id !== currentPostId)
        .slice(0, limit);

    return filtered as BlogPost[];
}
