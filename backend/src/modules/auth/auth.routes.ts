import { Router } from "express";
import {
  loginController,
  registerController,
  verifyLoginOTPController,
  verifySignupOTPController,
} from "./auth.controller";

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/signup/verify", verifySignupOTPController);
router.post("/login/verify", verifyLoginOTPController);

export default router;
