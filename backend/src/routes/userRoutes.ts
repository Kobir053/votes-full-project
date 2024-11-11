import express, { Router } from "express";
import { getUsers } from "../controllers/userController";
import { authWithBearer } from "../middleware/auth";
import { isAdminMiddleware } from "../middleware/adminMiddleware";

const router: Router = express.Router();

router.use("/", authWithBearer);

router.route("/").get(isAdminMiddleware, getUsers);

export default router;