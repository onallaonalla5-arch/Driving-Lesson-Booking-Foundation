import { createInsertSchema } from "drizzle-zod";
import { integer, pgTable, serial, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { z } from "zod/v4";
import { appUsersTable } from "./users";

export const instructorsTable = pgTable(
  "instructors",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(() => appUsersTable.id),
    phone: text("phone"),
    bio: text("bio"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
  },
  (table) => [uniqueIndex("instructors_user_id_idx").on(table.userId)],
);

export const insertInstructorSchema = createInsertSchema(instructorsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertInstructor = z.infer<typeof insertInstructorSchema>;
export type Instructor = typeof instructorsTable.$inferSelect;