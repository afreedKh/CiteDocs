import { comparePassword, hashPassword } from "../../utils/encyption";
import { generateToken } from "../../utils/token";
import { generateAndSendOTP, verifyOtp } from "../otp/otp.service";
import { findUserByEmail, saveNewUser } from "./auth.repository";
import { LoginDTO, RegisterDTO, VerifySignupOtpType } from "./auth.types";

const authError = (message: string) => {
  const err: any = new Error(message);
  err.statusCode = 401;
  return err;
};

export const registerService = async (payload: RegisterDTO) => {
  const userExists = await findUserByEmail(payload.email);

  if (userExists) {
    throw authError("Email already exist");
  }

  const hashedPassword = await hashPassword(payload.password);

  const user = await saveNewUser(payload, hashedPassword);

  const otpSent = await generateAndSendOTP({
    userId: user._id,
    email: user.email,
    purpose: "signup",
  });

  if (!otpSent) {
    throw authError("Otp sent failed");
  }

  return {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
  };
};

export const loginService = async (payload: LoginDTO) => {
  const user = await findUserByEmail(payload.email);

  if (!user) {
    throw authError("Invalid email or password");
  }

  if (!user.isEmailVerified) {
    throw authError("Please verify your email first");
  }

  const isMatch = await comparePassword(payload.password, user.password);

  if (!isMatch) {
    throw authError("Invalid email or password");
  }

  const otpSent = await generateAndSendOTP({
    userId: user._id,
    email: user.email,
    purpose: "login",
  });

  if (!otpSent) {
    throw authError("Otp sent failed");
  }

  const token = generateToken(user._id.toString());

  return {
    id: user._id,
    fullName: user.fullName,
    email: payload.email,
    token,
  };
};

export const verifySignupOTP = async (payload: VerifySignupOtpType) => {
  const user = await findUserByEmail(payload.email);

  if (!user) {
    throw authError("User not found");
  }

  await verifyOtp({
    userId: user._id,
    enteredOTP: payload.otp,
    purpose: "signup",
  });

  const token = generateToken(user._id.toString());

  return {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    token,
  };
};

