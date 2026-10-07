import {
  index,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { products } from './products.js';
import { users } from './users.js';
import { ordersItems } from './orders_items.js';

export const reviews = pgTable('reviews', {
  id: uuid().primaryKey(),
  prodcutId: integer('product_id').references(() => products.id),
  userId: integer('user_id').references(() => users.id),
  orderItemId: integer('order_item_id')
    .references(() => ordersItems.id)
    .unique(),
  rating: integer().notNull(),
  comment: text(),
  createdAt: timestamp().defaultNow(),
});
