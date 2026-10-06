import {
  integer,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { categories } from './categories.js';

export const productStatusEnum = pgEnum('status', [
  'draft',
  'published',
  'archived',
]);
export const products = pgTable('products', {
  id: uuid().primaryKey(),
  categoryId: integer('category_id').references(() => categories.id),
  sku: varchar().notNull().unique(),
  name: varchar(),
  description: text(),
  price: numeric().notNull(),
  stock: integer(),
  status: productStatusEnum(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
});
