
import { pgTable, text, uuid, timestamp, pgSchema } from "drizzle-orm/pg-core";

/**
 * 1. Reference the managed Neon Auth schema
 * This is provided by Neon directly
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
  companyCode: text("company_code").notNull().unique(), 
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Projects (Within a Company)
export const projects = pgTable("projects", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyId: uuid("company_id").notNull(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Employee Profiles
export const employeeProfiles = pgTable("employee_profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull(),
  companyId: uuid("company_id").notNull(),
  projectId: uuid("project_id"),
  fullName: text("full_name").notNull(),
  role: text("role").notNull(),
  department: text("department"),
  avatarUrl: text("avatar_url"),
  phoneNumber: text("phone_number"),
  status: text("status").default("PENDING"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});
