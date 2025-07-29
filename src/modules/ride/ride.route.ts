import { Router } from "express";
import { validateReqBody } from "../../middleware/validateRequestBody";
import { createRideZodSchema } from "./user.validation";
import { RideController } from "./ride.controller";

const router = Router();

router.post("/request", validateReqBody(createRideZodSchema), RideController.createRide);

export const RideRoutes = router;