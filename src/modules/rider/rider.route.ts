import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "../user/user.interface";
import { UserController } from "../user/user.controller";

const router = Router();


router.patch("/driver/approve/:id", checkAuth(UserRole.admin), UserController.driverAccessUpdate);
router.patch("/driver/suspend/:id", checkAuth(UserRole.admin), UserController.driverAccessUpdate);

export const RiderRoutes = router;