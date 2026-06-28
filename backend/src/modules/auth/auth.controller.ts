import { NextFunction, Request, Response } from "express";
import { loginService, registerService } from "./auth.service";

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
      token: user.token,
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
