import { integer, numeric, pgTable, text, uuid } from 'drizzle-orm/pg-core';
import { orders } from './orders.js';
import { products } from './products.js';

export const ordersItems = pgTable('orders_items', {
  id: uuid().primaryKey(),
  orderId: integer('order_id').references(() => orders.id),
  productId: integer('product_id').references(() => products.id),
  productNameSnapshot: text('product_name_snapshot'),
  unitPriceSnapshot: numeric('unit_price_snapshot'),
  quantity: integer(),
});
