import { Pool } from 'pg';

import { drizzle } from 'drizzle-orm/node-postgres';
export const pool = new Pool({
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT) || 5432,
  user: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  // Azure Flexible Server requires SSL
  ssl: { rejectUnauthorized: false },

  // Pool Configuration Options
  max: 10, // Maximum number of connections in pool (default is 10)
  idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
  connectionTimeoutMillis: 2000, // Error timeout if pool is full and no connection opens
});

export const db = drizzle({ client: pool });
