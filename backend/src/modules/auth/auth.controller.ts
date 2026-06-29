import { NextFunction, Request, Response } from "express";
import { loginService, registerService, verifySignupOTP } from "./auth.service";

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await registerService(req.body);

    res.status(201).json({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
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
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      token: user.token,
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
      token: user.token,
    });
  } catch (error) {
    next(error);
  }
};
