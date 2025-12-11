import { pgTable, text, timestamp, real, json, integer } from "drizzle-orm/pg-core";

// ============================================
// Tent Types Table
// ============================================
export const tentType = pgTable("tent_type", {
    id: text("id").primaryKey(),
    typeNameAr: text("type_name_ar").notNull(),
    typeNameEn: text("type_name_en").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});

// ============================================
// Tents Table
// ============================================
export const tent = pgTable("tent", {
    id: text("id").primaryKey(),
    nameAr: text("name_ar").notNull(),
    nameEn: text("name_en").notNull(),
    slugAr: text("slug_ar").notNull(),
    slugEn: text("slug_en").notNull(),
    descriptionAr: text("description_ar").notNull(),
    descriptionEn: text("description_en").notNull(),
    imageUrls: json("image_urls").$type<string[]>().default([]).notNull(),
    keywordsAr: json("keywords_ar").$type<string[]>().default([]).notNull(),
    keywordsEn: json("keywords_en").$type<string[]>().default([]).notNull(),
    tagsAr: json("tags_ar").$type<string[]>().default([]).notNull(),
    tagsEn: json("tags_en").$type<string[]>().default([]).notNull(),
    tentTypeId: text("tent_type_id")
        .notNull()
        .references(() => tentType.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});

// ============================================
// Tent Sizes Table
// ============================================
export const tentSize = pgTable("tent_size", {
    id: text("id").primaryKey(),
    tentId: text("tent_id")
        .notNull()
        .references(() => tent.id, { onDelete: "cascade" }),
    typeCode: text("type_code").notNull(), // e.g., "EUR - T5", "EUR - P20"
    wide: real("wide").notNull(), // Width in meters
    eaveHeight: text("eave_height").notNull(), // May include range like "3.00m – 4.00m"
    ridgeHeight: text("ridge_height").notNull(), // May include range
    bayDistance: real("bay_distance"), // Bay distance in meters (nullable for dome tents)
    diameter: real("diameter"), // For dome tents
    centerHeight: real("center_height"), // For dome tents
    area: real("area"), // Area in m²
    capacityStand: integer("capacity_stand"), // Standing capacity
    capacitySit: integer("capacity_sit"), // Sitting capacity
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});

// ============================================
// Tent Specifications Table
// ============================================
export const tentSpecification = pgTable("tent_specification", {
    id: text("id").primaryKey(),
    tentId: text("tent_id")
        .notNull()
        .references(() => tent.id, { onDelete: "cascade" }),
    profileMaterialEn: text("profile_material_en").notNull(),
    profileMaterialAr: text("profile_material_ar").notNull(),
    connectionEn: text("connection_en").notNull(),
    connectionAr: text("connection_ar").notNull(),
    roofCoverEn: text("roof_cover_en").notNull(),
    roofCoverAr: text("roof_cover_ar").notNull(),
    propertiesEn: text("properties_en").notNull(),
    propertiesAr: text("properties_ar").notNull(),
    wallTypeEn: text("wall_type_en").notNull(),
    wallTypeAr: text("wall_type_ar").notNull(),
    doorTypeEn: text("door_type_en").notNull(),
    doorTypeAr: text("door_type_ar").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});

// ============================================
// Tent Accessories Table
// ============================================
export const tentAccessory = pgTable("tent_accessory", {
    id: text("id").primaryKey(),
    tentId: text("tent_id")
        .notNull()
        .references(() => tent.id, { onDelete: "cascade" }),
    nameEn: text("name_en").notNull(),
    nameAr: text("name_ar").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});

// ============================================
// Reviews Table
// ============================================
export const review = pgTable("review", {
    id: text("id").primaryKey(),
    authorNameEn: text("author_name_en").notNull(),
    authorNameAr: text("author_name_ar").notNull(),
    profileImageUrl: text("profile_image_url"),
    reviewContentAr: text("review_content_ar").notNull(),
    reviewContentEn: text("review_content_en").notNull(),
    stars: real("stars").notNull(), // 0 to 5 with 0.5 increments
    positionEn: text("position_en"), // e.g., "CEO of XYZ Company"
    positionAr: text("position_ar"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});

// ============================================
// Services Table
// ============================================
export const service = pgTable("service", {
    id: text("id").primaryKey(),
    nameEn: text("name_en").notNull(),
    nameAr: text("name_ar").notNull(),
    slugAr: text("slug_ar").notNull(),
    slugEn: text("slug_en").notNull(),
    imageUrls: json("image_urls").$type<string[]>().default([]).notNull(),
    descriptionAr: text("description_ar").notNull(),
    descriptionEn: text("description_en").notNull(),
    keywordsAr: json("keywords_ar").$type<string[]>().default([]).notNull(),
    keywordsEn: json("keywords_en").$type<string[]>().default([]).notNull(),
    tagsAr: json("tags_ar").$type<string[]>().default([]).notNull(),
    tagsEn: json("tags_en").$type<string[]>().default([]).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});

// ============================================
// Projects Table
// ============================================
export const project = pgTable("project", {
    id: text("id").primaryKey(),
    titleAr: text("title_ar").notNull(),
    titleEn: text("title_en").notNull(),
    slugAr: text("slug_ar").notNull(),
    slugEn: text("slug_en").notNull(),
    imageUrls: json("image_urls").$type<string[]>().default([]).notNull(),
    descriptionAr: text("description_ar").notNull(),
    descriptionEn: text("description_en").notNull(),
    keywordsAr: json("keywords_ar").$type<string[]>().default([]).notNull(),
    keywordsEn: json("keywords_en").$type<string[]>().default([]).notNull(),
    tagsAr: json("tags_ar").$type<string[]>().default([]).notNull(),
    tagsEn: json("tags_en").$type<string[]>().default([]).notNull(),
    date: timestamp("date").notNull(),
    tentId: text("tent_id").references(() => tent.id, { onDelete: "set null" }),
    tentTypeId: text("tent_type_id").references(() => tentType.id, {
        onDelete: "set null",
    }),
    reviewId: text("review_id").references(() => review.id, {
        onDelete: "set null",
    }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});
