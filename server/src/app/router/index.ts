import express from "express";
import bannerRoutes from "../modules/Banner/banner.routes";
import { authRoutes } from "../modules/Auth/auth.routes";
// import bannerRoutes from "../modules/banner/banner.routes";

const router = express.Router();

router.use("/banners", bannerRoutes);
router.use("/auth", authRoutes);

export default router;
