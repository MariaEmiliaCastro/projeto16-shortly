import { Router } from "express";
import authorizationController from "../controllers/authorizationController.js";
import validateAuth from "../middlewares/authorizationMiddleware.js";

const authorizationRoutes = Router();

authorizationRoutes.post("/signup", validateAuth.validateSignUp, authorizationController.signUp);
authorizationRoutes.post("/signin", validateAuth.validateSignIn, authorizationController.signIn);

export default authorizationRoutes;