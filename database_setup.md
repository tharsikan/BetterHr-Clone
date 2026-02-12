
# BetterHR Pro: Database Setup Guide

## 1. Environment Variables
Create a `.env` file in your root and add the following:

```env
DATABASE_URL=postgresql://neondb_owner:npg_gD3PXqQFwi9A@ep-dawn-shadow-airu414t-pooler.c-4.us-east-1.aws.neon.tech/neondb?sslmode=require
```

## 2. Install Dependencies
Run this command in your terminal:

```bash
npm install @neondatabase/serverless drizzle-orm dotenv
npm install -D drizzle-kit
```

## 3. Sync Schema to Neon
Use the following command to push your local schema changes directly to your Neon instance. Because we use `schemaFilter` in `drizzle.config.ts`, it will recognize your Neon Auth tables.

```bash
npx drizzle-kit push
```

## 4. Multi-Tenant Usage Example
When creating a new employee profile:

```typescript
import { db } from './db';
import { employeeProfiles } from './db/schema';

async function createEmployee(data) {
  return await db.insert(employeeProfiles).values({
    userId: data.neonAuthUserId, // From Neon Auth session
    companyId: data.currentTenantId,
    fullName: data.name,
    role: data.role,
  });
}
```
