import { Router } from "express";
import { jobs as jobController } from "../controllers/Jobs.js";

export const router = Router();

router.post("/post", jobController.addJob);