import {
  index,
  integer,
  numeric,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { categories } from './categories.js';
import { sql } from 'drizzle-orm';

export const productStatusEnum = pgEnum('prdocut_status', [
  'draft',
  'published',
  'archived',
]);
export const products = pgTable(
  'products',
  {
    id: uuid().primaryKey(),
    categoryId: integer('category_id').references(() => categories.id, {
      onDelete: 'set null',
    }),
    sku: varchar().notNull().unique(),
    name: varchar(),
    description: text(),
    price: numeric().notNull(),
    stock: integer(),
    status: productStatusEnum(),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at'),
  },
  //indexes for looking up products
  (table) => [
    index('category_id_idx').on(table.categoryId),
    index('status_idx')
      .on(table.status)
      .where(sql`status='published'`),
  ]
);
