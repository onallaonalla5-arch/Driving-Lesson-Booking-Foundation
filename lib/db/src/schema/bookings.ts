import { createInsertSchema } from "drizzle-zod";
import { integer, pgEnum, pgTable, serial, timestamp } from "drizzle-orm/pg-core";
import { z } from "zod/v4";
import { lessonAvailabilityTable } from "./availability";
import { instructorsTable } from "./instructors";
import { studentsTable } from "./students";

export const bookingStatusEnum = pgEnum("booking_status", [
  "pending",
  "confirmed",
  "completed",
  "cancelled",
]);

export const bookingsTable = pgTable("bookings", {
  id: serial("id").primaryKey(),
  availabilityId: integer("availability_id").notNull().references(() => lessonAvailabilityTable.id),
  studentId: integer("student_id").notNull().references(() => studentsTable.id),
  instructorId: integer("instructor_id").notNull().references(() => instructorsTable.id),
  status: bookingStatusEnum("status").notNull().default("pending"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export const insertBookingSchema = createInsertSchema(bookingsTable).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Booking = typeof bookingsTable.$inferSelect;