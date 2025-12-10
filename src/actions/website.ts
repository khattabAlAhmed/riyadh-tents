"use server";

import { db } from "@/lib/db/drizzle";
import { service, tent, tentType, project, review } from "@/lib/db/schema/website-schema";
import { eq } from "drizzle-orm";

// ============================================
// Type Definitions
// ============================================

export type Service = {
    id: string;
    nameEn: string;
    nameAr: string;
    slugEn: string;
    slugAr: string;
    descriptionEn: string;
    descriptionAr: string;
    imageUrls: string[];
    createdAt: Date;
};

export type TentType = {
    id: string;
    typeNameEn: string;
    typeNameAr: string;
};

export type Tent = {
    id: string;
    nameEn: string;
    nameAr: string;
    slugEn: string;
    slugAr: string;
    descriptionEn: string;
    descriptionAr: string;
    imageUrls: string[];
    maxWidth: number;
    maxHeight: number;
    tentTypeId: string;
    tentType?: TentType;
    createdAt: Date;
};

export type Project = {
    id: string;
    titleEn: string;
    titleAr: string;
    slugEn: string;
    slugAr: string;
    descriptionEn: string;
    descriptionAr: string;
    imageUrls: string[];
    date: Date;
    tentId: string | null;
    tentTypeId: string | null;
    reviewId: string | null;
    createdAt: Date;
};

export type Review = {
    id: string;
    authorNameEn: string;
    authorNameAr: string;
    profileImageUrl: string | null;
    reviewContentEn: string;
    reviewContentAr: string;
    stars: number;
    positionEn: string | null;
    positionAr: string | null;
    createdAt: Date;
};

// ============================================
// Server Actions
// ============================================

/**
 * Fetch all services
 */
export async function getServices(): Promise<Service[]> {
    const result = await db.select().from(service);
    return result as Service[];
}

/**
 * Fetch all tent types
 */
export async function getTentTypes(): Promise<TentType[]> {
    const result = await db.select().from(tentType);
    return result as TentType[];
}

/**
 * Fetch all tents with their tent type information
 */
export async function getTents(): Promise<Tent[]> {
    const tents = await db.select().from(tent);
    const types = await db.select().from(tentType);

    const typesMap = new Map(types.map(t => [t.id, t]));

    return tents.map(t => ({
        ...t,
        tentType: typesMap.get(t.tentTypeId) ? {
            id: typesMap.get(t.tentTypeId)!.id,
            typeNameEn: typesMap.get(t.tentTypeId)!.typeNameEn,
            typeNameAr: typesMap.get(t.tentTypeId)!.typeNameAr,
        } : undefined,
    })) as Tent[];
}

/**
 * Fetch all projects
 */
export async function getProjects(): Promise<Project[]> {
    const result = await db.select().from(project);
    return result as Project[];
}

/**
 * Fetch all reviews
 */
export async function getReviews(): Promise<Review[]> {
    const result = await db.select().from(review);
    return result as Review[];
}
