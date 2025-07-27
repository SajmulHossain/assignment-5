import { Router } from "express";
import { AuthController } from "./auth.controller";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.patch("/change-password", AuthController.changePassword);
router.post("/forgot-password", AuthController.forgotPassword);
router.patch("/reset-password", AuthController.resetPassword);

export const AuthRoutes = router;
