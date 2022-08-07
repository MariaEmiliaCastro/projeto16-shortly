import { Router } from "express";
import validateAuth from "../middlewares/authorizationMiddleware.js";
import usersController from "../controllers/usersController.js";

const usersRoutes = Router();

usersRoutes.get("/users/me", validateAuth.validateAuthorizationHeader, usersController.getUserData);

export default usersRoutes;