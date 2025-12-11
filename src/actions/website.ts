"use server";

import { db } from "@/lib/db/drizzle";
import { service, tent, tentType, project, review, tentSize, tentSpecification, tentAccessory } from "@/lib/db/schema/website-schema";
import { eq, or, max } from "drizzle-orm";

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

export type TentSize = {
    id: string;
    tentId: string;
    typeCode: string;
    wide: number;
    eaveHeight: string;
    ridgeHeight: string;
    bayDistance: number | null;
    diameter: number | null;
    centerHeight: number | null;
    area: number | null;
    capacityStand: number | null;
    capacitySit: number | null;
};

export type TentSpecification = {
    id: string;
    tentId: string;
    profileMaterialEn: string;
    profileMaterialAr: string;
    connectionEn: string;
    connectionAr: string;
    roofCoverEn: string;
    roofCoverAr: string;
    propertiesEn: string;
    propertiesAr: string;
    wallTypeEn: string;
    wallTypeAr: string;
    doorTypeEn: string;
    doorTypeAr: string;
};

export type TentAccessory = {
    id: string;
    tentId: string;
    nameEn: string;
    nameAr: string;
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
    tentTypeId: string;
    tentType?: TentType;
    sizes?: TentSize[];
    specification?: TentSpecification;
    accessories?: TentAccessory[];
    maxWidth?: number;
    maxHeight?: number;
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
 * Fetch a single service by slug (searches both Arabic and English slugs)
 */
export async function getServiceBySlug(slug: string, _locale: string): Promise<Service | null> {
    // Decode the slug in case it's URL-encoded (for Arabic slugs)
    const decodedSlug = decodeURIComponent(slug);

    // Search both Arabic and English slugs
    const result = await db.select().from(service).where(
        or(
            eq(service.slugEn, decodedSlug),
            eq(service.slugAr, decodedSlug)
        )
    ).limit(1);

    return result.length > 0 ? (result[0] as Service) : null;
}

/**
 * Fetch all tent types
 */
export async function getTentTypes(): Promise<TentType[]> {
    const result = await db.select().from(tentType);
    return result as TentType[];
}

/**
 * Fetch all tents with their tent type information and max sizes from tent_size table
 */
export async function getTents(): Promise<Tent[]> {
    const tents = await db.select().from(tent);
    const types = await db.select().from(tentType);
    const sizes = await db.select().from(tentSize);

    const typesMap = new Map(types.map(t => [t.id, t]));

    // Group sizes by tentId and calculate max width and height
    const sizesMap = new Map<string, { maxWidth: number; maxHeight: number }>();
    for (const size of sizes) {
        const existing = sizesMap.get(size.tentId);
        const ridgeHeightNum = parseFloat(size.ridgeHeight.split('–')[0].replace('m', '').trim()) || 0;
        if (!existing) {
            sizesMap.set(size.tentId, {
                maxWidth: size.wide,
                maxHeight: ridgeHeightNum
            });
        } else {
            sizesMap.set(size.tentId, {
                maxWidth: Math.max(existing.maxWidth, size.wide),
                maxHeight: Math.max(existing.maxHeight, ridgeHeightNum)
            });
        }
    }

    return tents.map(t => {
        const typeInfo = typesMap.get(t.tentTypeId);
        const sizeInfo = sizesMap.get(t.id);
        return {
            ...t,
            tentType: typeInfo ? {
                id: typeInfo.id,
                typeNameEn: typeInfo.typeNameEn,
                typeNameAr: typeInfo.typeNameAr,
            } : undefined,
            maxWidth: sizeInfo?.maxWidth ?? 0,
            maxHeight: sizeInfo?.maxHeight ?? 0,
        };
    }) as Tent[];
}

/**
 * Fetch a single tent by slug with all related data
 */
export async function getTentBySlug(slug: string, _locale: string): Promise<Tent | null> {
    const decodedSlug = decodeURIComponent(slug);

    const result = await db.select().from(tent).where(
        or(
            eq(tent.slugEn, decodedSlug),
            eq(tent.slugAr, decodedSlug)
        )
    ).limit(1);

    if (result.length === 0) return null;

    const tentData = result[0];

    // Fetch related data
    const [types, sizes, specs, accessories] = await Promise.all([
        db.select().from(tentType).where(eq(tentType.id, tentData.tentTypeId)),
        db.select().from(tentSize).where(eq(tentSize.tentId, tentData.id)),
        db.select().from(tentSpecification).where(eq(tentSpecification.tentId, tentData.id)).limit(1),
        db.select().from(tentAccessory).where(eq(tentAccessory.tentId, tentData.id))
    ]);

    const typeInfo = types[0];

    // Calculate max sizes
    let maxWidth = 0;
    let maxHeight = 0;
    for (const size of sizes) {
        maxWidth = Math.max(maxWidth, size.wide);
        const ridgeHeightNum = parseFloat(size.ridgeHeight.split('–')[0].replace('m', '').trim()) || 0;
        maxHeight = Math.max(maxHeight, ridgeHeightNum);
    }

    return {
        ...tentData,
        tentType: typeInfo ? {
            id: typeInfo.id,
            typeNameEn: typeInfo.typeNameEn,
            typeNameAr: typeInfo.typeNameAr,
        } : undefined,
        sizes: sizes as TentSize[],
        specification: specs[0] as TentSpecification | undefined,
        accessories: accessories as TentAccessory[],
        maxWidth,
        maxHeight,
    } as Tent;
}

/**
 * Fetch tent sizes by tent ID
 */
export async function getTentSizes(tentId: string): Promise<TentSize[]> {
    const result = await db.select().from(tentSize).where(eq(tentSize.tentId, tentId));
    return result as TentSize[];
}

/**
 * Fetch tent specification by tent ID
 */
export async function getTentSpecification(tentId: string): Promise<TentSpecification | null> {
    const result = await db.select().from(tentSpecification).where(eq(tentSpecification.tentId, tentId)).limit(1);
    return result.length > 0 ? (result[0] as TentSpecification) : null;
}

/**
 * Fetch tent accessories by tent ID
 */
export async function getTentAccessories(tentId: string): Promise<TentAccessory[]> {
    const result = await db.select().from(tentAccessory).where(eq(tentAccessory.tentId, tentId));
    return result as TentAccessory[];
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
