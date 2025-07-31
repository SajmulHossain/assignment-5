import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "../user/user.interface";
import { DriverController } from "./driver.controller";

const router = Router();



router.patch("/driver/active", checkAuth(UserRole.driver), DriverController.updateDriverActiveStatus);
router.patch("/driver/approve/:id", checkAuth(UserRole.admin), DriverController.approveDriver);
router.patch("/driver/suspend/:id", checkAuth(UserRole.admin), DriverController.suspendDriver);

export const RiderRoutes = router;