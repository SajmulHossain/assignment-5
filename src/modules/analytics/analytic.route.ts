import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "../user/user.interface";
import { AnalyticController } from "./analytic.controller";

const router = Router();

router.get("/admin", checkAuth(UserRole.admin), AnalyticController.adminAnalytics);
router.get("/driver", checkAuth(UserRole.driver), AnalyticController.driverAnalytics);

export const AnalyticRoutes = router; 