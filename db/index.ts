
import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';

// Required configuration for browser-based neon-http usage
if (typeof window !== 'undefined') {
  neonConfig.fetchConnectionCache = true;
}

// Safer database URL retrieval with a hardcoded fallback
const getDatabaseUrl = () => {
  try {
    return (typeof process !== 'undefined' && process.env?.DATABASE_URL) || 
      'postgresql://neondb_owner:npg_gD3PXqQFwi9A@ep-dawn-shadow-airu414t-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require';
  } catch (e) {
    return 'postgresql://neondb_owner:npg_gD3PXqQFwi9A@ep-dawn-shadow-airu414t-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require';
  }
};

const DATABASE_URL = getDatabaseUrl();

// Initialize the DB instance safely
let dbInstance: any = null;

try {
  const sql = neon(DATABASE_URL);
  dbInstance = drizzle(sql, { schema });
} catch (error) {
  console.error("Critical: Could not initialize Database driver", error);
}

export const db = dbInstance;

/**
 * Safe helper to ensure we have a db connection before querying
 */
export const getDb = () => {
  if (!db) {
    throw new Error("Database not connected. Please check your internet or configuration.");
  }
  return db;
};
