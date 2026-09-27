import { and, eq, sql } from "drizzle-orm";
import {
  appUsersTable,
  bookingsTable,
  db,
  instructorsTable,
  lessonAvailabilityTable,
  studentsTable,
} from "@workspace/db";

export async function listAvailability() {
  return db
    .select({
      id: lessonAvailabilityTable.id,
      instructorId: lessonAvailabilityTable.instructorId,
      date: lessonAvailabilityTable.scheduledDate,
      startTime: lessonAvailabilityTable.startTime,
      endTime: lessonAvailabilityTable.endTime,
      status: lessonAvailabilityTable.status,
    })
    .from(lessonAvailabilityTable)
    .orderBy(lessonAvailabilityTable.scheduledDate, lessonAvailabilityTable.startTime);
}

export async function listBookingsForStudent(studentId: number) {
  return db
    .select({
      id: bookingsTable.id,
      availabilityId: bookingsTable.availabilityId,
      studentId: bookingsTable.studentId,
      instructorId: bookingsTable.instructorId,
      date: lessonAvailabilityTable.scheduledDate,
      startTime: lessonAvailabilityTable.startTime,
      endTime: lessonAvailabilityTable.endTime,
      status: bookingsTable.status,
    })
    .from(bookingsTable)
    .innerJoin(
      lessonAvailabilityTable,
      eq(bookingsTable.availabilityId, lessonAvailabilityTable.id),
    )
    .where(eq(bookingsTable.studentId, studentId))
    .orderBy(lessonAvailabilityTable.scheduledDate, lessonAvailabilityTable.startTime);
}

export async function listBookingsForInstructor(instructorId: number) {
  return db
    .select({
      id: bookingsTable.id,
      availabilityId: bookingsTable.availabilityId,
      studentId: bookingsTable.studentId,
      instructorId: bookingsTable.instructorId,
      date: lessonAvailabilityTable.scheduledDate,
      startTime: lessonAvailabilityTable.startTime,
      endTime: lessonAvailabilityTable.endTime,
      status: bookingsTable.status,
    })
    .from(bookingsTable)
    .innerJoin(
      lessonAvailabilityTable,
      eq(bookingsTable.availabilityId, lessonAvailabilityTable.id),
    )
    .where(eq(bookingsTable.instructorId, instructorId))
    .orderBy(lessonAvailabilityTable.scheduledDate, lessonAvailabilityTable.startTime);
}

export async function listAllBookings() {
  return db
    .select({
      id: bookingsTable.id,
      availabilityId: bookingsTable.availabilityId,
      studentId: bookingsTable.studentId,
      instructorId: bookingsTable.instructorId,
      date: lessonAvailabilityTable.scheduledDate,
      startTime: lessonAvailabilityTable.startTime,
      endTime: lessonAvailabilityTable.endTime,
      status: bookingsTable.status,
    })
    .from(bookingsTable)
    .innerJoin(
      lessonAvailabilityTable,
      eq(bookingsTable.availabilityId, lessonAvailabilityTable.id),
    )
    .orderBy(lessonAvailabilityTable.scheduledDate, lessonAvailabilityTable.startTime);
}

export async function getInstructorCounts(instructorId?: number) {
  const [studentCount] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(studentsTable);

  const [bookingCount] = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(bookingsTable)
    .where(
      instructorId
        ? eq(bookingsTable.instructorId, instructorId)
        : undefined,
    );

  return {
    studentCount: studentCount?.count ?? 0,
    bookingCount: bookingCount?.count ?? 0,
  };
}

export async function listInstructorAvailability(instructorId?: number) {
  if (!instructorId) {
    return [];
  }

  return db
    .select({
      id: lessonAvailabilityTable.id,
      instructorId: lessonAvailabilityTable.instructorId,
      date: lessonAvailabilityTable.scheduledDate,
      startTime: lessonAvailabilityTable.startTime,
      endTime: lessonAvailabilityTable.endTime,
      status: lessonAvailabilityTable.status,
    })
    .from(lessonAvailabilityTable)
    .where(eq(lessonAvailabilityTable.instructorId, instructorId))
    .orderBy(lessonAvailabilityTable.scheduledDate, lessonAvailabilityTable.startTime);
}