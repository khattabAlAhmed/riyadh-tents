CREATE TABLE "tent_accessory" (
	"id" text PRIMARY KEY NOT NULL,
	"tent_id" text NOT NULL,
	"name_en" text NOT NULL,
	"name_ar" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tent_size" (
	"id" text PRIMARY KEY NOT NULL,
	"tent_id" text NOT NULL,
	"type_code" text NOT NULL,
	"wide" real NOT NULL,
	"eave_height" text NOT NULL,
	"ridge_height" text NOT NULL,
	"bay_distance" real,
	"diameter" real,
	"center_height" real,
	"area" real,
	"capacity_stand" integer,
	"capacity_sit" integer,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tent_specification" (
	"id" text PRIMARY KEY NOT NULL,
	"tent_id" text NOT NULL,
	"profile_material_en" text NOT NULL,
	"profile_material_ar" text NOT NULL,
	"connection_en" text NOT NULL,
	"connection_ar" text NOT NULL,
	"roof_cover_en" text NOT NULL,
	"roof_cover_ar" text NOT NULL,
	"properties_en" text NOT NULL,
	"properties_ar" text NOT NULL,
	"wall_type_en" text NOT NULL,
	"wall_type_ar" text NOT NULL,
	"door_type_en" text NOT NULL,
	"door_type_ar" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "tent_accessory" ADD CONSTRAINT "tent_accessory_tent_id_tent_id_fk" FOREIGN KEY ("tent_id") REFERENCES "public"."tent"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tent_size" ADD CONSTRAINT "tent_size_tent_id_tent_id_fk" FOREIGN KEY ("tent_id") REFERENCES "public"."tent"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tent_specification" ADD CONSTRAINT "tent_specification_tent_id_tent_id_fk" FOREIGN KEY ("tent_id") REFERENCES "public"."tent"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tent" DROP COLUMN "max_width";--> statement-breakpoint
ALTER TABLE "tent" DROP COLUMN "max_height";