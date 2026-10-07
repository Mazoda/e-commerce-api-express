import {
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const roleEnum = pgEnum('role', ['admin', 'customer']);

export const users = pgTable('users', {
  id: uuid().primaryKey(),
  email: varchar().notNull().unique(),
  passwordHash: varchar('password_hash').notNull(),
  fullName: text('full_name'),
  role: roleEnum().notNull(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at'),
});
