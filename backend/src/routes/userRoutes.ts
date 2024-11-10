import express, { Router } from "express";
import { getUsers } from "../controllers/userController";
import { authWithBearer } from "../middleware/auth";

const router: Router = express.Router();

router.route("/").get(authWithBearer, getUsers);

export default router;