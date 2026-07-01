import { NextFunction, Request, Response } from "express";
import { googleLogin } from "./google.service";

export const googleLoginController = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { idToken } = req.body;

    const response = await googleLogin(idToken);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};
