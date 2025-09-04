import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "../user/user.interface";
import { AnalyticController } from "./analytic.controller";

const router = Router();

router.get("/admin", checkAuth(UserRole.admin), AnalyticController.adminAnalytics);

export const AnalyticRoutes = router; 