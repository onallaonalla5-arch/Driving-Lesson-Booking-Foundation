import { Router, type IRouter } from "express";
import { ListLessonAvailabilityResponse } from "@workspace/api-zod";
import { listAvailability } from "../lib/booking-data";

const router: IRouter = Router();

router.get("/availability", async (_req, res): Promise<void> => {
  const availability = await listAvailability();
  res.json(ListLessonAvailabilityResponse.parse(availability));
});

export default router;