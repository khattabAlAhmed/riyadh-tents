CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" text NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" text PRIMARY KEY NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" text NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"image" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" text PRIMARY KEY NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "project" (
	"id" text PRIMARY KEY NOT NULL,
	"title_ar" text NOT NULL,
	"title_en" text NOT NULL,
	"image_urls" json DEFAULT '[]'::json NOT NULL,
	"description_ar" text NOT NULL,
	"description_en" text NOT NULL,
	"date" timestamp NOT NULL,
	"tent_id" text,
	"tent_type_id" text,
	"review_id" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "review" (
	"id" text PRIMARY KEY NOT NULL,
	"author_name_en" text NOT NULL,
	"author_name_ar" text NOT NULL,
	"profile_image_url" text,
	"review_content_ar" text NOT NULL,
	"review_content_en" text NOT NULL,
	"stars" real NOT NULL,
	"position_en" text,
	"position_ar" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "service" (
	"id" text PRIMARY KEY NOT NULL,
	"name_en" text NOT NULL,
	"name_ar" text NOT NULL,
	"image_urls" json DEFAULT '[]'::json NOT NULL,
	"description_ar" text NOT NULL,
	"description_en" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tent" (
	"id" text PRIMARY KEY NOT NULL,
	"name_ar" text NOT NULL,
	"name_en" text NOT NULL,
	"image_urls" json DEFAULT '[]'::json NOT NULL,
	"max_width" real NOT NULL,
	"max_height" real NOT NULL,
	"tent_type_id" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tent_type" (
	"id" text PRIMARY KEY NOT NULL,
	"type_name_ar" text NOT NULL,
	"type_name_en" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_tent_id_tent_id_fk" FOREIGN KEY ("tent_id") REFERENCES "public"."tent"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_tent_type_id_tent_type_id_fk" FOREIGN KEY ("tent_type_id") REFERENCES "public"."tent_type"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project" ADD CONSTRAINT "project_review_id_review_id_fk" FOREIGN KEY ("review_id") REFERENCES "public"."review"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "tent" ADD CONSTRAINT "tent_tent_type_id_tent_type_id_fk" FOREIGN KEY ("tent_type_id") REFERENCES "public"."tent_type"("id") ON DELETE cascade ON UPDATE no action;