
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  // Crucial: Tell Drizzle to look at both the public and neon_auth schemas
  schemaFilter: ["public", "neon_auth"],
  // Optional: prevent Drizzle from trying to manage tables in neon_auth 
  // if you only want to reference them as foreign keys.
  tablesFilter: ["companies", "projects", "employee_profiles"],
});
