import {
  index,
  integer,
  numeric,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from 'drizzle-orm/pg-core';
import { users } from './users.js';
import { coupons } from './coupons.js';

export const orderStatusEnum = pgEnum('order_status', [
  'pending_payment',
  'processing',
  'shipped',
  'delivered',
  'cancelled',
  'refunded',
  'failed',
]);

export const orders = pgTable(
  'orders',
  {
    id: uuid().primaryKey(),
    userId: uuid('user_id').references(() => users.id, {
      onDelete: 'cascade',
    }),
    copounID: uuid('copoun_id').references(() => coupons.id),
    status: orderStatusEnum().default('pending_payment'),
    subTotal: numeric('sub_total'),
    discountTotal: numeric('discount_total'),
    total: numeric(),
    shippingAddress: text('shipping_adress'),
    createdAt: timestamp('created_at').defaultNow(),
    updatedAt: timestamp('updated_at'),
  },
  (table) => [
    index('orders_user_id_idx').on(table.userId),
    index('orders_status_idx').on(table.status),
  ]
);
