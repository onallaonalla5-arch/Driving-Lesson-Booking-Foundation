import { Router, type IRouter } from "express";
import healthRouter from "./health";
import authRouter from "./auth";
import availabilityRouter from "./availability";
import bookingsRouter from "./bookings";
import studentRouter from "./student";
import instructorRouter from "./instructor";

const router: IRouter = Router();

router.use(healthRouter);
router.use(authRouter);
router.use(availabilityRouter);
router.use(bookingsRouter);
router.use(studentRouter);
router.use(instructorRouter);

export default router;
