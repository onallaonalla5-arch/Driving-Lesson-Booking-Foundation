import { Router, type IRouter } from "express";
import { GetInstructorDashboardResponse } from "@workspace/api-zod";
import {
  getAppUser,
  getInstructorRecord,
  requireInstructor,
} from "../middlewares/auth";
import {
  getInstructorCounts,
  listBookingsForInstructor,
  listInstructorAvailability,
} from "../lib/booking-data";

const router: IRouter = Router();

router.get(
  "/instructor/dashboard",
  async (req, res, next): Promise<void> => {
    await requireInstructor(req, res, next);
  },
  async (_req, res): Promise<void> => {
    const user = getAppUser(res);
    const instructor = await getInstructorRecord(user.id);
    const [availability, upcomingBookings, counts] = await Promise.all([
      listInstructorAvailability(instructor?.id),
      instructor ? listBookingsForInstructor(instructor.id) : [],
      getInstructorCounts(instructor?.id),
    ]);

    res.json(
      GetInstructorDashboardResponse.parse({
        availability,
        upcomingBookings,
        ...counts,
      }),
    );
  },
);

export default router;