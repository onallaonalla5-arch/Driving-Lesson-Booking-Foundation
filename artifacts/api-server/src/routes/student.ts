import { Router, type IRouter } from "express";
import { GetStudentDashboardResponse } from "@workspace/api-zod";
import {
  getAppUser,
  getStudentRecord,
  requireStudent,
} from "../middlewares/auth";
import {
  listAvailability,
  listBookingsForStudent,
} from "../lib/booking-data";

const router: IRouter = Router();

router.get(
  "/student/dashboard",
  async (req, res, next): Promise<void> => {
    await requireStudent(req, res, next);
  },
  async (_req, res): Promise<void> => {
    const student = await getStudentRecord(getAppUser(res).id);
    const [availableSlots, upcomingBookings] = await Promise.all([
      listAvailability(),
      student ? listBookingsForStudent(student.id) : [],
    ]);

    res.json(
      GetStudentDashboardResponse.parse({
        availableSlots: availableSlots.filter((slot) => slot.status === "available"),
        upcomingBookings,
      }),
    );
  },
);

export default router;