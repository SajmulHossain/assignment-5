import { Router } from "express";
import { AuthController } from "./auth.controller";
import { validateReqBody } from "../../middleware/validateRequestBody";
import { createUserZodSchema } from "../user/user.validation";

const router = Router();

router.post("/register",validateReqBody(createUserZodSchema), AuthController.register);
router.post("/login", AuthController.login);
router.patch("/change-password", AuthController.changePassword);
router.post("/forgot-password", AuthController.forgotPassword);
router.patch("/reset-password", AuthController.resetPassword);

export const AuthRoutes = router;
