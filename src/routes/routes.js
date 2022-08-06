import { Router } from "express";
import authorizationRoutes from "./authorizationRoutes.js";

const router = Router();

router.use(authorizationRoutes);

export default router;