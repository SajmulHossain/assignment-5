import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";
import { RideRoutes } from "../modules/ride/ride.route";
import { RiderRoutes } from "../modules/rider/rider.route";

export const router = Router();

interface IRoutes {
  path: string;
  routes: Router;
}

const routes: IRoutes[] = [
  { path: "/auth", routes: AuthRoutes },
  { path: "/users", routes: UserRoutes },
  { path: "/riders", routes: RiderRoutes },
  { path: "/rides", routes: RideRoutes }
];

routes.forEach((route) => {
  router.use(route.path, route.routes);
});
