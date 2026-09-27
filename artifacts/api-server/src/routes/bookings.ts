import { Router, type IRouter } from "express";
import { ListBookingsResponse } from "@workspace/api-zod";
import { requireRole, getAppUser, getInstructorRecord, getStudentRecord } from "../middlewares/auth";
import {
  listAllBookings,
  listBookingsForInstructor,
  listBookingsForStudent,
} from "../lib/booking-data";

const router: IRouter = Router();

router.get(
  "/bookings",
  async (req, res, next): Promise<void> => {
    await requireRole(["student", "instructor", "admin"], req, res, next);
  },
  async (_req, res): Promise<void> => {
    const user = getAppUser(res);
    const bookings =
      user.role === "student"
        ? await getStudentRecord(user.id).then((record) =>
            record ? listBookingsForStudent(record.id) : [],
          )
        : user.role === "instructor"
          ? await getInstructorRecord(user.id).then((record) =>
              record ? listBookingsForInstructor(record.id) : [],
            )
          : await listAllBookings();

    res.json(ListBookingsResponse.parse(bookings));
  },
);

export default router;