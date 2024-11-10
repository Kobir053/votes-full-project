import express, { Router } from "express";
import { getCandidates } from "../controllers/candidateController";
import { authWithBearer } from "../middleware/auth";

const router: Router = express.Router();

router.route("/").get(authWithBearer, getCandidates);

export default router;