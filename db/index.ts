
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

/**
 * Initialize connection using the neon-http driver.
 * This is preferred for Next.js 15 App Router/Server Actions 
 * as it avoids the overhead of persistent WebSockets/TCP in serverless functions.
 */
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set');
}

const sql = neon(process.env.DATABASE_URL);

export const db = drizzle(sql, { schema });

// Helper for multi-tenant queries (Conceptual)
export const getTenantDb = (companyId: string) => {
  // In a real implementation, you might use Drizzle's 'with' or 
  // custom wrappers to ensure companyId is always appended to 'where' clauses.
  return db; 
};
