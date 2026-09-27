import { createInsertSchema } from "drizzle-zod";
import { integer, pgEnum, pgTable, serial, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { z } from "zod/v4";

export const userRoleEnum = pgEnum("user_role", ["student", "instructor", "admin"]);

export const appUsersTable = pgTable(
  "app_users",
  {
    id: serial("id").primaryKey(),
    clerkUserId: text("clerk_user_id").notNull(),
    email: text("email").notNull(),
    role: userRoleEnum("role").notNull().default("student"),
    displayName: text("display_name").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
  },
  (table) => [uniqueIndex("app_users_clerk_user_id_idx").on(table.clerkUserId)],
);

export const insertAppUserSchema = createInsertSchema(appUsersTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertAppUser = z.infer<typeof insertAppUserSchema>;
export type AppUser = typeof appUsersTable.$inferSelect;