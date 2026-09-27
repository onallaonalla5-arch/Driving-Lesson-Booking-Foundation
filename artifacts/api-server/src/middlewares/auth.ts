import type { NextFunction, Request, Response } from "express";
import { clerkClient, getAuth } from "@clerk/express";
import { and, eq } from "drizzle-orm";
import {
  appUsersTable,
  db,
  instructorsTable,
  studentsTable,
  type AppUser,
} from "@workspace/db";

export type ApplicationRole = "student" | "instructor" | "admin";

export function getClerkUserId(req: Request): string | null {
  return getAuth(req).userId ?? null;
}

export async function getOrCreateAppUser(
  clerkUserId: string,
): Promise<AppUser | null> {
  const [existingUser] = await db
    .select()
    .from(appUsersTable)
    .where(eq(appUsersTable.clerkUserId, clerkUserId))
    .limit(1);

  if (existingUser) {
    return existingUser;
  }

  const clerkUser = await clerkClient.users.getUser(clerkUserId);
  const email =
    clerkUser.primaryEmailAddress?.emailAddress ??
    clerkUser.emailAddresses[0]?.emailAddress;

  if (!email) {
    return null;
  }

  const displayName =
    clerkUser.fullName ??
    [clerkUser.firstName, clerkUser.lastName].filter(Boolean).join(" ") ??
    email;

  const [createdUser] = await db
    .insert(appUsersTable)
    .values({
      clerkUserId,
      email,
      displayName: displayName || email,
      role: "student",
    })
    .onConflictDoNothing({ target: appUsersTable.clerkUserId })
    .returning();

  const user =
    createdUser ??
    (
      await db
        .select()
        .from(appUsersTable)
        .where(eq(appUsersTable.clerkUserId, clerkUserId))
        .limit(1)
    )[0];

  if (user?.role === "student") {
    await db
      .insert(studentsTable)
      .values({ userId: user.id })
      .onConflictDoNothing({ target: studentsTable.userId });
  }

  return user ?? null;
}

export async function requireRole(
  roles: ApplicationRole | ApplicationRole[],
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  const clerkUserId = getClerkUserId(req);
  if (!clerkUserId) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }

  const user = await getOrCreateAppUser(clerkUserId);
  const allowedRoles = Array.isArray(roles) ? roles : [roles];
  if (!user || !allowedRoles.includes(user.role)) {
    res.status(403).json({ error: "Insufficient role" });
    return;
  }

  res.locals.appUser = user;
  next();
}

export async function requireStudent(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  await requireRole("student", req, res, next);
}

export async function requireInstructor(
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> {
  await requireRole(["instructor", "admin"], req, res, next);
}

export function getAppUser(res: Response): AppUser {
  return res.locals.appUser as AppUser;
}

export async function getStudentRecord(userId: number) {
  return (
    await db
      .select()
      .from(studentsTable)
      .where(eq(studentsTable.userId, userId))
      .limit(1)
  )[0];
}

export async function getInstructorRecord(userId: number) {
  return (
    await db
      .select()
      .from(instructorsTable)
      .where(eq(instructorsTable.userId, userId))
      .limit(1)
  )[0];
}