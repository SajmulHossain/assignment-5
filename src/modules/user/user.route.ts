import { Router } from "express";
import { UserController } from "./user.controller";

const router = Router();

router.get("/", UserController.getAllUser);
router.get("/:id", UserController.getSingleUser);

export const UserRoutes = router;
