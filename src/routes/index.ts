import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";

export const router = Router();

interface IRoutes {
  path: string;
  routes: Router;
}

const routes: IRoutes[] = [
  { path: "/auth", routes: AuthRoutes },
  { path: "/user", routes: UserRoutes },
];

routes.forEach((route) => {
  router.use(route.path, route.routes);
});
