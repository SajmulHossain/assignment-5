import { Router } from "express";
import { UserController } from "./user.controller";
import { validateReqBody } from "../../middleware/validateRequestBody";
import { updateUserZodSchema } from "./user.validation";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "./user.interface";

const router = Router();

router.get("/", UserController.getAllUser);
router.get("/:id", UserController.getSingleUser);
router.patch("/update/:email",checkAuth(...Object.values(UserRole)), validateReqBody(updateUserZodSchema), UserController.updateUser)

export const UserRoutes = router;
