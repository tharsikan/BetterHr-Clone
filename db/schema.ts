
import { pgTable, text, uuid, timestamp, pgSchema, foreignKey } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

/**
 * 1. Reference the managed Neon Auth schema
 * Neon Auth typically stores user data in the 'neon_auth' or 'auth' schema.
 */
export const neonAuthSchema = pgSchema("neon_auth");

export const authUsers = neonAuthSchema.table("users", {
  id: uuid("id").primaryKey(),
  email: text("email").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

/**
 * 2. Public Schema Tables (BetterHR Business Logic)
 */

// Companies (Tenants)
export const companies = pgTable("companies", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  companyCode: text("company_code").notNull().unique(), // e.g., 'CORE-123'
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Projects (Within a Company)
export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyId: uuid("company_id")
    .notNull()
    .references(() => companies.id, { onDelete: "cascade" }),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Employee Profiles (Link between Auth User and HR Data)
export const employeeProfiles = pgTable("employee_profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  // Link to Neon Auth User
  userId: uuid("user_id")
    .notNull()
    .references(() => authUsers.id, { onDelete: "cascade" }),
  // Multi-tenant links
  companyId: uuid("company_id")
    .notNull()
    .references(() => companies.id, { onDelete: "cascade" }),
  projectId: uuid("project_id")
    .references(() => projects.id, { onDelete: "set null" }),
  
  fullName: text("full_name").notNull(),
  role: text("role").notNull(), // e.g., 'Senior Product Designer'
  department: text("department"),
  avatarUrl: text("avatar_url"),
  phoneNumber: text("phone_number"),
  
  status: text("status", { enum: ["ACTIVE", "INACTIVE", "PENDING"] }).default("PENDING"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
