import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { validateReqBody } from "../../middleware/validateRequestBody";
import { UserRole } from "../user/user.interface";
import { createUserZodSchema } from "../user/user.validation";
import { AuthController } from "./auth.controller";
import { loginZodSchema } from "./auth.validation";

const router = Router();

router.post("/register",validateReqBody(createUserZodSchema), AuthController.register);
router.post("/login", validateReqBody(loginZodSchema), AuthController.login);
router.post("/logout", checkAuth(...Object.values(UserRole)), AuthController.logout)

export const AuthRoutes = router;
