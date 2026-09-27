import { createInsertSchema } from "drizzle-zod";
import { integer, pgTable, serial, text, timestamp, uniqueIndex } from "drizzle-orm/pg-core";
import { z } from "zod/v4";
import { appUsersTable } from "./users";

export const studentsTable = pgTable(
  "students",
  {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(() => appUsersTable.id),
    phone: text("phone"),
    notes: text("notes"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
  },
  (table) => [uniqueIndex("students_user_id_idx").on(table.userId)],
);

export const insertStudentSchema = createInsertSchema(studentsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertStudent = z.infer<typeof insertStudentSchema>;
export type Student = typeof studentsTable.$inferSelect;