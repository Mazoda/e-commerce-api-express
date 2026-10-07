import { integer, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { products } from './products.js';

export const productImages = pgTable('product_images', {
  id: uuid().primaryKey(),
  productId: uuid('product_id').references(() => products.id, {
    onDelete: 'cascade',
  }),
  url: text(),
  position: integer(), //for display order
});
