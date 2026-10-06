import {
  integer,
  numeric,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';
import { orders } from './orders.js';

export const paymentStatusEnum = pgEnum('status', [
  'pending',
  'requires_action',
  'authorized',
  'succeeded',
  'failed',
  'canceled',
  'refunded',
  'partially_refunded',
]);

export const payments = pgTable('payment', {
  id: uuid().primaryKey(),
  orderId: integer('order_id').references(() => orders.id),
  amount: numeric().notNull(),
  currncy: varchar().notNull(),
  status: paymentStatusEnum(),
  providerPaymentId: varchar('provider_payment_id'),
  createdAt: timestamp('created_at'),
});
