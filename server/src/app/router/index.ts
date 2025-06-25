import express from "express";
import bannerRoutes from "../modules/Banner/banner.routes";
import { authRoutes } from "../modules/Auth/auth.routes";
import ourServiceRoutes from "../modules/ourService/ourservice.router";
// import bannerRoutes from "../modules/banner/banner.routes";

const router = express.Router();

router.use("/banners", bannerRoutes);
router.use("/services", ourServiceRoutes);
router.use("/auth", authRoutes);

export default router;
