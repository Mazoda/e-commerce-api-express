import { index, integer, numeric, pgTable, uuid } from 'drizzle-orm/pg-core';
import { carts } from './carts.js';
import { products } from './products.js';

export const cartItems = pgTable(
  'cart_items',
  {
    id: uuid().primaryKey(),
    cartId: integer('cart_id').references(() => carts.id),
    productId: integer('product_id').references(() => products.id, {
      onDelete: 'cascade',
    }),
    quantity: integer(),
    unitPriceSnapshot: numeric('unit_price_snapshot'),
  },
  (table) => [index('cart_id_idx').on(table.cartId)]
);
