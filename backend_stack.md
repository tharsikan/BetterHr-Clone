
# BetterHR Pro: Stack Blueprint (Enterprise Edition)

## 1. Core Technologies
- **Frontend**: Next.js 15 (App Router) + Tailwind CSS + Lucide Icons + Shadcn/UI (Radix UI).
- **Backend**: Node.js (NestJS) - Modular architecture with multi-tenant guards.
- **Database**: PostgreSQL (Supabase or AWS RDS).
- **ORM**: Drizzle ORM (Fast, type-safe, and perfect for multi-tenant mapping).
- **Auth**: Clerk (Identity) + Custom JWT Session in NestJS.

## 2. Drizzle Schema (Multi-tenancy via RLS)
```typescript
// schema.ts
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').unique().notNull(),
  role: text('role', { enum: ['ADMIN', 'HR', 'EMPLOYEE'] }).notNull(),
  companyId: uuid('company_id').references(() => companies.id),
  status: text('status').default('ACTIVE'),
});

export const companies = pgTable('companies', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  code: text('code').unique().notNull(),
});

// Row Level Security Policy (PostgreSQL)
// ALTER TABLE users ENABLE ROW LEVEL SECURITY;
// CREATE POLICY tenant_isolation ON users USING (company_id = current_setting('app.current_company_id')::uuid);
```

## 3. NestJS Multi-tenant Middleware
```typescript
@Injectable()
export class TenantMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const tenantId = req.headers['x-tenant-id'] || req.user?.companyId;
    if (!tenantId) throw new UnauthorizedException();
    
    // Set PostgreSQL session variable for Drizzle RLS
    await this.db.execute(sql`SET app.current_company_id = ${tenantId}`);
    next();
  }
}
```
