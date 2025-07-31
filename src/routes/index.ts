import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { DriverRoutes } from "../modules/driver/driver.route";
import { RideRoutes } from "../modules/ride/ride.route";
import { UserRoutes } from "../modules/user/user.route";
import { FeedbackRoutes } from "../modules/feedback/feedback.route";

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
];

routes.forEach((route) => {
  router.use(route.path, route.routes);
});
