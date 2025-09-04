import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { DriverRoutes } from "../modules/driver/driver.route";
import { RideRoutes } from "../modules/ride/ride.route";
import { UserRoutes } from "../modules/user/user.route";
import { FeedbackRoutes } from "../modules/feedback/feedback.route";
import { AnalyticRoutes } from "../modules/analytics/analytic.route";

export const router = Router();

interface IRoutes {
  path: string;
  routes: Router;
}

const routes: IRoutes[] = [
  { path: "/auth", routes: AuthRoutes },
  { path: "/users", routes: UserRoutes },
  { path: "/rides", routes: RideRoutes },
  { path: "/drivers", routes: DriverRoutes },
  { path: "/feedbacks", routes: FeedbackRoutes },
  { path: "/analytics", routes: AnalyticRoutes }
];

routes.forEach((route) => {
  router.use(route.path, route.routes);
});
