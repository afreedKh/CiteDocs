import { NextFunction, Request, Response } from "express";
import {
  forgotPasswordService,
  loginService,
  registerService,
  resetPasswordService,
  verifyForgotPasswordOTP,
  verifyLoginOTP,
  verifySignupOTP,
} from "./auth.service";

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await registerService(req.body);

    res.status(201).json({
      success: true,
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      message: user.message,
    });
  } catch (error) {
    next(error);
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await loginService(req.body);

    res.json({
      success: true,
      id: user.id,
      fullName: user.fullName,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
};

export const verifySignupOTPController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await verifySignupOTP(req.body);

    res.status(200).json({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

export const verifyLoginOTPController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await verifyLoginOTP(req.body);
    res.status(200).json({
      fullName: user.fullName,
      id: user.id,
      email: user.email,
      accessToken: user.accessToken,
      refreshToken: user.refreshToken,
    });
  } catch (error) {
    next(error);
  }
};

export const forgotPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await forgotPasswordService(req.body);
    res
      .status(200)
      .json({ message: "If that email exists, an OTP has been sent" });
  } catch (error) {
    next(error);
  }
};

export const verifyForgotPasswordOTPController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { resetToken } = await verifyForgotPasswordOTP(req.body);
    res.status(200).json({ resetToken });
  } catch (error) {
    next(error);
  }
};

export const resetPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    await resetPasswordService(req.body);
    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    next(error);
  }
};
