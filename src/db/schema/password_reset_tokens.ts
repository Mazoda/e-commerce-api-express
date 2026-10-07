import { integer, pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core';
import { users } from './users.js';

export const passwordResetTokens = pgTable('password_resset_tokens', {
  id: uuid().primaryKey(),
  userId: integer('user_id').references(() => users.id, {
    onDelete: 'cascade',
  }),
  tokenHash: text('token_hash').notNull(),
  expiresAt: timestamp('expires_at'),
  usedAt: timestamp('used_at'),
});
