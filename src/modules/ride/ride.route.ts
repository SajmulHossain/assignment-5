import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { validateReqBody } from "../../middleware/validateRequestBody";
import { UserRole } from "../user/user.interface";
import { RideController } from "./ride.controller";
import { createRideZodSchema, updateRideZodSchema } from "./ride.validation";

const router = Router();

router.post("/request", checkAuth(...Object.values(UserRole)),validateReqBody(createRideZodSchema), RideController.createRide);
router.patch("/:id/status",checkAuth(UserRole.driver), validateReqBody(updateRideZodSchema), RideController.updateRideStatus);

export const RideRoutes = router;