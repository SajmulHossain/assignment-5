import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { validateReqBody } from "../../middleware/validateRequestBody";
import { UserRole } from "../user/user.interface";
import { RideController } from "./ride.controller";
import { createRideZodSchema, updateRideZodSchema } from "./ride.validation";

const router = Router();

router.post("/request", checkAuth(...Object.values(UserRole)),validateReqBody(createRideZodSchema), RideController.createRide);
router.get("/get-rides/me", checkAuth(...Object.values(UserRole)), RideController.getRideForUser);
router.patch("/:id/status",checkAuth(...Object.values(UserRole)), validateReqBody(updateRideZodSchema), RideController.updateRideStatus);

export const RideRoutes = router;