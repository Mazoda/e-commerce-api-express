import {
  integer,
  numeric,
  pgTable,
  timestamp,
  uuid,
  varchar,
  pgEnum,
  decimal,
} from 'drizzle-orm/pg-core';

export const discountTypeEnum = pgEnum('discount_type', [
  'percentage', // e.g., 15.50 -> 15.5%
  'fixed_amount', // e.g., 15.50 -> $15.50
]);

export const coupons = pgTable('coupons', {
  id: uuid().primaryKey(),
  code: varchar().unique().notNull(),
  discountType: discountTypeEnum('discount_type').notNull(),
  discountValue: numeric('discount_value', {
    precision: 10,
    scale: 2,
  }).notNull(),
  minOrderAmount: decimal('min_order_amount', { precision: 10, scale: 2 }),
  expiresAt: timestamp('expires_at'),
  usageLimit: integer('usage_limit'),
  timesUsed: integer('times_used').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});
