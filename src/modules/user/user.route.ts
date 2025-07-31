import { Router } from "express";
import { UserController } from "./user.controller";
import { validateReqBody } from "../../middleware/validateRequestBody";
import { updateUserZodSchema } from "./user.validation";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "./user.interface";

const router = Router();

router.get("/", checkAuth(UserRole.admin), UserController.getAllUser);
router.patch("/driver/active", checkAuth(UserRole.driver), UserController.updateDriverActiveStatus);
router.get("/:id", checkAuth(UserRole.admin), UserController.getSingleUser);
router.patch("/driver/approve/:id", checkAuth(UserRole.admin), UserController.driverAccessUpdate);
router.patch("/driver/suspend/:id", checkAuth(UserRole.admin), UserController.driverAccessUpdate);
router.patch("/block/:id", checkAuth(UserRole.admin), UserController.userBlockUpdate);
router.patch("/update/:email",checkAuth(...Object.values(UserRole)), validateReqBody(updateUserZodSchema), UserController.updateUser)

export const UserRoutes = router;