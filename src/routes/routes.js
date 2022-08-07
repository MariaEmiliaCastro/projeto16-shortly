import { Router } from "express";
import authorizationRoutes from "./authorizationRoutes.js";
import urlsRoutes from "./urlsRoutes.js";
import usersRoutes from "./usersRoutes.js";

const router = Router();

router.use(authorizationRoutes);
router.use(urlsRoutes);
router.use(usersRoutes);

export default router;