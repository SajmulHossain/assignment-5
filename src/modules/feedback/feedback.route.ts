import { Router } from "express";
import { checkAuth } from "../../middleware/checkAuth";
import { UserRole } from "../user/user.interface";
import { validateReqBody } from "../../middleware/validateRequestBody";
import { createFeedbackZodSchema } from "./feedback.validation";
import { FeedbackController } from "./feedback.controller";

const router = Router();

router.post("", validateReqBody(createFeedbackZodSchema), checkAuth(...Object.values(UserRole)), FeedbackController.createFeedback);
router.get("/:id", checkAuth(...Object.values(UserRole)), FeedbackController.getFeedback)

export const FeedbackRoutes = router;