import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "../user/user.interface";
import { DriverController } from "./driver.controller";

const router = Router();

router.get("/earning", checkAuth(UserRole.driver), DriverController.driverEarning);
router.patch("/active", checkAuth(UserRole.driver), DriverController.updateDriverActiveStatus);
router.patch("/approve/:id", checkAuth(UserRole.admin), DriverController.approveDriver);
router.patch("/suspend/:id", checkAuth(UserRole.admin), DriverController.suspendDriver);

export const DriverRoutes = router;