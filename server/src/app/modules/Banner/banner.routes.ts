import express from "express";
import * as bannerController from "./banner.controller";
import { uploadFields } from "../../utils/uploadFields";
import auth from "../Auth/auth";
import { USER_ROLE } from "../Auth/auth.routes";

const bannerRoutes = express.Router();

bannerRoutes.post("/create",uploadFields([
    { name: 'BannerImage', maxCount: 1 , }
  ]),auth(USER_ROLE.admin), bannerController.createBanner);
  
bannerRoutes.get("/", bannerController.getAll);
bannerRoutes.put("/:id", uploadFields([
    { name: 'BannerImage', maxCount: 1 , }
  ]),auth(USER_ROLE.admin),auth(USER_ROLE.admin), bannerController.update);
bannerRoutes.delete(
  "/:id",
  auth(USER_ROLE.admin),
  bannerController.remove
);

// bannerRoutes.delete("/:id", bannerController.remove);

export default bannerRoutes;
