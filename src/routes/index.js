import { Router } from "express";
import authMiddleware from "../app/middleware/auth";

import SessionsController from "../app/controllers/SessionsController";
import UsersController from "../app/controllers/UsersController";

const routes = Router();

routes.post("/sessions", SessionsController.create);

//
// AUTHENTICATED ROUTES
//
routes.use(authMiddleware);

routes.get("/users/me", UsersController.me);

export default routes;
