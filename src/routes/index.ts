import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";

export const router = Router();

interface IRoutes {
  path: string;
  routes: Router;
}

const routes: IRoutes[] = [
  {
    path: "/user",
    routes: UserRoutes,
  },
];

routes.forEach((route) => {
  router.use(route.path, route.routes);
});
