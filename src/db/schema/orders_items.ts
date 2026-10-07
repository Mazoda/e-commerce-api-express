import {
  index,
  integer,
  numeric,
  pgTable,
  text,
  uuid,
} from 'drizzle-orm/pg-core';
import { orders } from './orders.js';
import { products } from './products.js';

export const ordersItems = pgTable(
  'orders_items',
  {
    id: uuid().primaryKey(),
    orderId: uuid('order_id').references(() => orders.id, {
      onDelete: 'cascade',
    }),
    productId: uuid('product_id').references(() => products.id, {
      onDelete: 'cascade',
    }),
    productNameSnapshot: text('product_name_snapshot'),
    unitPriceSnapshot: numeric('unit_price_snapshot'),
    quantity: integer(),
  },
  (table) => [index('order_items_order_id_idx').on(table.orderId)]
);
