import { Router } from "express";
import { user as userController } from "../controllers/Users.js";
export const router = Router();

router.post("/signup", userController.signup);