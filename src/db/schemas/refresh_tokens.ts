import { pgTable, text, uuid, timestamp, integer } from 'drizzle-orm/pg-core';
import { users } from './users.js';

export const refreshTokens = pgTable('refresh_tokens', {
  id: uuid().primaryKey(),
  userId: integer('user_id').references(() => users.id),
  tokenHash: text('token_hash').unique(),
  expiresAt: timestamp('expires_at'),
  revokedAt: timestamp('revoked_at'),
  createdAt: timestamp('created_at'),
});
