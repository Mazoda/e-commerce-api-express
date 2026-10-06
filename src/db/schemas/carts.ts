import { pgTable, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from './users.js';

export const carts = pgTable('carts', {
  id: uuid().primaryKey(),
  userId: uuid().references(() => users.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
});
