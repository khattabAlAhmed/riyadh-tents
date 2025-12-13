import { pgTable, text, timestamp, json, boolean } from "drizzle-orm/pg-core";

// ============================================
// Blog Posts Table
// ============================================
export const blogPost = pgTable("blog_post", {
    id: text("id").primaryKey(),

    // Titles (bilingual)
    titleAr: text("title_ar").notNull(),
    titleEn: text("title_en").notNull(),

    // URL Slugs (bilingual)
    slugAr: text("slug_ar").notNull().unique(),
    slugEn: text("slug_en").notNull().unique(),

    // Excerpts/Summaries (bilingual)
    excerptAr: text("excerpt_ar").notNull(),
    excerptEn: text("excerpt_en").notNull(),

    // Rich Text Content (HTML string - bilingual)
    contentAr: text("content_ar").notNull(),
    contentEn: text("content_en").notNull(),

    // Images
    featuredImageUrl: text("featured_image_url").notNull(),
    imageUrls: json("image_urls").$type<string[]>().default([]).notNull(),

    // SEO Keywords (bilingual)
    keywordsAr: json("keywords_ar").$type<string[]>().default([]).notNull(),
    keywordsEn: json("keywords_en").$type<string[]>().default([]).notNull(),

    // Tags (bilingual)
    tagsAr: json("tags_ar").$type<string[]>().default([]).notNull(),
    tagsEn: json("tags_en").$type<string[]>().default([]).notNull(),

    // SEO Meta Descriptions (bilingual)
    metaDescriptionAr: text("meta_description_ar").notNull(),
    metaDescriptionEn: text("meta_description_en").notNull(),

    // Publication Status
    isPublished: boolean("is_published").default(false).notNull(),
    publishedAt: timestamp("published_at"),

    // Timestamps
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
        .defaultNow()
        .$onUpdate(() => /* @__PURE__ */ new Date())
        .notNull(),
});
