import { Router } from "express";
import validateAuth from "../middlewares/authorizationMiddleware.js";
import urlsController from "../controllers/urlsController.js";
import urlsMiddleware from "../middlewares/urlsMiddleware.js";


const urlsRoutes = Router();

urlsRoutes.post("/urls/shorten", validateAuth.validateAuthorizationHeader, urlsMiddleware.validateUrl, urlsController.shortenUrl);
urlsRoutes.get("/urls/:id", urlsController.getShortUrlById);
urlsRoutes.delete("/urls/:id", validateAuth.validateAuthorizationHeader, urlsController.deleteShortUrl);

export default urlsRoutes;