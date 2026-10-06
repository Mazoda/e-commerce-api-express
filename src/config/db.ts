import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL!,
  max: 10,
  ssl: {
    rejectUnauthorized: true,
  },
});

export const db = drizzle(pool);
