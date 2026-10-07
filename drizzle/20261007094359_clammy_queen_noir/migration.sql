CREATE TYPE "discount_type" AS ENUM('percentage', 'fixed_amount');--> statement-breakpoint
CREATE TYPE "order_status" AS ENUM('pending_payment', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded', 'failed');--> statement-breakpoint
CREATE TYPE "payment_status" AS ENUM('pending', 'requires_action', 'authorized', 'succeeded', 'failed', 'canceled', 'refunded', 'partially_refunded');--> statement-breakpoint
CREATE TYPE "prdocut_status" AS ENUM('draft', 'published', 'archived');--> statement-breakpoint
CREATE TYPE "role" AS ENUM('admin', 'customer');--> statement-breakpoint
CREATE TABLE "carts" (
	"id" uuid PRIMARY KEY,
	"userId" uuid UNIQUE,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "cart_items" (
	"id" uuid PRIMARY KEY,
	"cart_id" uuid,
	"product_id" uuid,
	"quantity" integer,
	"unit_price_snapshot" numeric
);
--> statement-breakpoint
CREATE TABLE "categories" (
	"id" serial PRIMARY KEY,
	"name" varchar NOT NULL,
	"slug" varchar UNIQUE,
	"parent_category_id" serial
);
--> statement-breakpoint
CREATE TABLE "coupons" (
	"id" uuid PRIMARY KEY,
	"code" varchar NOT NULL UNIQUE,
	"discount_type" "discount_type" NOT NULL,
	"discount_value" numeric(10,2) NOT NULL,
	"min_order_amount" numeric(10,2),
	"expires_at" timestamp,
	"usage_limit" integer,
	"times_used" integer DEFAULT 0,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" uuid PRIMARY KEY,
	"user_id" uuid,
	"copoun_id" uuid,
	"status" "order_status" DEFAULT 'pending_payment'::"order_status",
	"sub_total" numeric,
	"discount_total" numeric,
	"total" numeric,
	"shipping_adress" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "orders_items" (
	"id" uuid PRIMARY KEY,
	"order_id" uuid,
	"product_id" uuid,
	"product_name_snapshot" text,
	"unit_price_snapshot" numeric,
	"quantity" integer
);
--> statement-breakpoint
CREATE TABLE "password_resset_tokens" (
	"id" uuid PRIMARY KEY,
	"user_id" uuid,
	"token_hash" text NOT NULL,
	"expires_at" timestamp,
	"used_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "payment" (
	"id" uuid PRIMARY KEY,
	"order_id" uuid UNIQUE,
	"amount" numeric NOT NULL,
	"currncy" varchar NOT NULL,
	"status" "payment_status",
	"provider_payment_id" varchar,
	"created_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "products" (
	"id" uuid PRIMARY KEY,
	"category_id" serial,
	"sku" varchar NOT NULL UNIQUE,
	"name" varchar,
	"description" text,
	"price" numeric NOT NULL,
	"stock" integer,
	"status" "prdocut_status",
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "product_images" (
	"id" uuid PRIMARY KEY,
	"product_id" uuid,
	"url" text,
	"position" integer
);
--> statement-breakpoint
CREATE TABLE "refresh_tokens" (
	"id" uuid PRIMARY KEY,
	"user_id" uuid,
	"token_hash" text UNIQUE,
	"expires_at" timestamp,
	"revoked_at" timestamp,
	"created_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "reviews" (
	"id" uuid PRIMARY KEY,
	"product_id" uuid,
	"user_id" uuid,
	"order_item_id" uuid UNIQUE,
	"rating" integer NOT NULL,
	"comment" text,
	"createdAt" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY,
	"email" varchar NOT NULL UNIQUE,
	"password_hash" varchar NOT NULL,
	"full_name" text,
	"role" "role" NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE INDEX "cart_id_idx" ON "cart_items" ("cart_id");--> statement-breakpoint
CREATE INDEX "orders_user_id_idx" ON "orders" ("user_id");--> statement-breakpoint
CREATE INDEX "orders_status_idx" ON "orders" ("status");--> statement-breakpoint
CREATE INDEX "order_items_order_id_idx" ON "orders_items" ("order_id");--> statement-breakpoint
CREATE INDEX "order_id_idx" ON "payment" ("order_id");--> statement-breakpoint
CREATE INDEX "category_id_idx" ON "products" ("category_id");--> statement-breakpoint
CREATE INDEX "status_idx" ON "products" ("status") WHERE status='published';--> statement-breakpoint
ALTER TABLE "carts" ADD CONSTRAINT "carts_userId_users_id_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_cart_id_carts_id_fkey" FOREIGN KEY ("cart_id") REFERENCES "carts"("id");--> statement-breakpoint
ALTER TABLE "cart_items" ADD CONSTRAINT "cart_items_product_id_products_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_category_id_categories_id_fkey" FOREIGN KEY ("parent_category_id") REFERENCES "categories"("id");--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_copoun_id_coupons_id_fkey" FOREIGN KEY ("copoun_id") REFERENCES "coupons"("id");--> statement-breakpoint
ALTER TABLE "orders_items" ADD CONSTRAINT "orders_items_order_id_orders_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "orders_items" ADD CONSTRAINT "orders_items_product_id_products_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "password_resset_tokens" ADD CONSTRAINT "password_resset_tokens_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "payment" ADD CONSTRAINT "payment_order_id_orders_id_fkey" FOREIGN KEY ("order_id") REFERENCES "orders"("id");--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL;--> statement-breakpoint
ALTER TABLE "product_images" ADD CONSTRAINT "product_images_product_id_products_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "refresh_tokens" ADD CONSTRAINT "refresh_tokens_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_product_id_products_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id");--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "reviews" ADD CONSTRAINT "reviews_order_item_id_orders_items_id_fkey" FOREIGN KEY ("order_item_id") REFERENCES "orders_items"("id");