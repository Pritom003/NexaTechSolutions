import express from "express";
import { uploadFields } from "../../utils/uploadFields";
import auth from "../Auth/auth";
import { USER_ROLE } from "../Auth/auth.routes";
import {
  createBanner,
  getAll,
  update,
  remove
} from "./ourservice.controller";

const ourServiceRoutes = express.Router();

ourServiceRoutes.post(
  "/create",
  uploadFields([{ name: 'ourServiceImage', maxCount: 1 }]),
  auth(USER_ROLE.admin),
  createBanner
);

ourServiceRoutes.get("/", getAll);

ourServiceRoutes.put(
  "/:id",
  uploadFields([{ name: 'ourServiceImage', maxCount: 1 }]),
  auth(USER_ROLE.admin),
  update
);

ourServiceRoutes.delete("/:id", auth(USER_ROLE.admin), remove);

export default ourServiceRoutes;
