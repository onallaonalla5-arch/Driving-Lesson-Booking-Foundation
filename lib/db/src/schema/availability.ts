import { createInsertSchema } from "drizzle-zod";
import { date, integer, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod/v4";
import { instructorsTable } from "./instructors";

export const availabilityStatusEnum = pgEnum("availability_status", [
  "available",
  "held",
  "booked",
  "blocked",
]);

export const lessonAvailabilityTable = pgTable("lesson_availability", {
  id: serial("id").primaryKey(),
  instructorId: integer("instructor_id").notNull().references(() => instructorsTable.id),
  scheduledDate: date("scheduled_date", { mode: "string" }).notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  status: availabilityStatusEnum("status").notNull().default("available"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertLessonAvailabilitySchema = createInsertSchema(lessonAvailabilityTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertLessonAvailability = z.infer<typeof insertLessonAvailabilitySchema>;
export type LessonAvailability = typeof lessonAvailabilityTable.$inferSelect;