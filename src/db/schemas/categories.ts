import {
  type AnyPgColumn,
  integer,
  pgTable,
  serial,
  varchar,
} from 'drizzle-orm/pg-core';

export const categories = pgTable('categories', {
  id: serial().primaryKey(),
  name: varchar().notNull(),
  slug: varchar().unique(),
  parentCategoryId: integer('parent_category_id').references(
    (): AnyPgColumn => categories.id
  ),
});
