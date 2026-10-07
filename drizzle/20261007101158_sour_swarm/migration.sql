ALTER TABLE "categories" ALTER COLUMN "parent_category_id" DROP DEFAULT;--> statement-breakpoint
DROP SEQUENCE "categories_parent_category_id_seq";--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "parent_category_id" SET DATA TYPE integer USING "parent_category_id"::integer;--> statement-breakpoint
ALTER TABLE "categories" ALTER COLUMN "parent_category_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "category_id" DROP DEFAULT;--> statement-breakpoint
DROP SEQUENCE "products_category_id_seq";--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "category_id" SET DATA TYPE integer USING "category_id"::integer;--> statement-breakpoint
ALTER TABLE "products" ALTER COLUMN "category_id" DROP NOT NULL;