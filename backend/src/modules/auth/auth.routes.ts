import { Router } from "express";
import {
  loginController,
  registerController,
  verifySignupOTPController,
} from "./auth.controller";

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/signup/verify", verifySignupOTPController);

export default router;
