ALTER TABLE "project" ADD COLUMN "slug_ar" text NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "slug_en" text NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "keywords_ar" json DEFAULT '[]'::json NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "keywords_en" json DEFAULT '[]'::json NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "tags_ar" json DEFAULT '[]'::json NOT NULL;--> statement-breakpoint
ALTER TABLE "project" ADD COLUMN "tags_en" json DEFAULT '[]'::json NOT NULL;--> statement-breakpoint
ALTER TABLE "service" ADD COLUMN "slug_ar" text NOT NULL;--> statement-breakpoint
ALTER TABLE "service" ADD COLUMN "slug_en" text NOT NULL;--> statement-breakpoint
ALTER TABLE "service" ADD COLUMN "keywords_ar" json DEFAULT '[]'::json NOT NULL;--> statement-breakpoint
ALTER TABLE "service" ADD COLUMN "keywords_en" json DEFAULT '[]'::json NOT NULL;--> statement-breakpoint
ALTER TABLE "service" ADD COLUMN "tags_ar" json DEFAULT '[]'::json NOT NULL;--> statement-breakpoint
ALTER TABLE "service" ADD COLUMN "tags_en" json DEFAULT '[]'::json NOT NULL;--> statement-breakpoint
ALTER TABLE "tent" ADD COLUMN "slug_ar" text NOT NULL;--> statement-breakpoint
ALTER TABLE "tent" ADD COLUMN "slug_en" text NOT NULL;--> statement-breakpoint
ALTER TABLE "tent" ADD COLUMN "keywords_ar" json DEFAULT '[]'::json NOT NULL;--> statement-breakpoint
ALTER TABLE "tent" ADD COLUMN "keywords_en" json DEFAULT '[]'::json NOT NULL;--> statement-breakpoint
ALTER TABLE "tent" ADD COLUMN "tags_ar" json DEFAULT '[]'::json NOT NULL;--> statement-breakpoint
ALTER TABLE "tent" ADD COLUMN "tags_en" json DEFAULT '[]'::json NOT NULL;