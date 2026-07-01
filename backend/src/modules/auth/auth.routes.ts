import { Router } from "express";
import {
  forgotPasswordController,
  loginController,
  registerController,
  resetPasswordController,
  verifyForgotPasswordOTPController,
  verifyLoginOTPController,
  verifySignupOTPController,
} from "./auth.controller";
import { googleLoginController } from "./google.controller";

const router = Router();

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/signup/verify", verifySignupOTPController);
router.post("/login/verify", verifyLoginOTPController);
router.post("/forgot-password", forgotPasswordController);
router.post("/forgot-password/verify", verifyForgotPasswordOTPController);
router.post("/reset-password", resetPasswordController);
router.post("/google", googleLoginController);

export default router;
