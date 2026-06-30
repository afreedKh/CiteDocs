import { comparePassword, hashPassword } from "../../utils/encyption";
import {
  getAccessToken,
  getRefreshToken,
  getResetToken,
  verifyResetToken,
} from "../../utils/token";
import { generateAndSendOTP, verifyOtp } from "../otp/otp.service";
import {
  findUserByEmail,
  saveNewUser,
  updateUserPassword,
  verifyUserEmail,
} from "./auth.repository";
import {
  ForgotPasswordDTO,
  LoginDTO,
  RegisterDTO,
  ResetPasswordDTO,
  VerifyForgotPasswordOtpType,
  VerifyLoginOtpType,
  VerifySignupOtpType,
} from "./auth.types";

const authError = (message: string) => {
  const err: any = new Error(message);
  err.statusCode = 401;
  return err;
};

const verificationRequiredError = (message: string) => {
  const err: any = new Error(message);
  err.statusCode = 403;
  err.requiresVerification = true;
  return err;
};

export const registerService = async (payload: RegisterDTO) => {
  const existingUser = await findUserByEmail(payload.email);

  // Case 3 — already registered and verified.
  if (existingUser && existingUser.isEmailVerified) {
    throw authError("Email already registered.");
  }

  // Case 2 — exists but never verified: reuse the account, just resend the OTP.
  if (existingUser && !existingUser.isEmailVerified) {
    const otpSent = await generateAndSendOTP({
      userId: existingUser._id,
      email: existingUser.email,
      purpose: "signup",
    });

    if (!otpSent) {
      throw authError("Otp sent failed");
    }

    return {
      id: existingUser._id,
      fullName: existingUser.fullName,
      email: existingUser.email,
      message: "A new verification code has been sent to your email.",
    };
  }

  // Case 1 — brand new user.
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
    message: "Verification code sent to your email.",
  };
};

export const loginService = async (payload: LoginDTO) => {
  const user = await findUserByEmail(payload.email);

  if (!user) {
    throw authError("Invalid email or password");
  }

  const isMatch = await comparePassword(payload.password, user.password);

  if (!isMatch) {
    throw authError("Invalid email or password");
  }

  if (!user.isEmailVerified) {
    const otpSent = await generateAndSendOTP({
      userId: user._id,
      email: user.email,
      purpose: "signup",
    });

    if (!otpSent) {
      throw authError("Otp sent failed");
    }

    throw verificationRequiredError(
      "Your email is not verified. A new verification code has been sent.",
    );
  }

  const otpSent = await generateAndSendOTP({
    userId: user._id,
    email: user.email,
    purpose: "login",
  });

  if (!otpSent) {
    throw authError("Otp sent failed");
  }

  return {
    id: user._id,
    fullName: user.fullName,
    email: payload.email,
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

  await verifyUserEmail(user._id.toString());

  const accessToken = getAccessToken(user._id.toString());
  const refreshToken = getRefreshToken(user._id.toString());

  return {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    accessToken,
    refreshToken,
  };
};

export const verifyLoginOTP = async (payload: VerifyLoginOtpType) => {
  const user = await findUserByEmail(payload.email);
  if (!user) {
    throw authError("User not found");
  }

  await verifyOtp({
    userId: user._id,
    enteredOTP: payload.otp,
    purpose: "login",
  });

  const accessToken = getAccessToken(user._id.toString());
  const refreshToken = getRefreshToken(user._id.toString());

  return {
    id: user._id,
    fullName: user.fullName,
    email: payload.email,
    accessToken,
    refreshToken,
  };
};

export const forgotPasswordService = async (payload: ForgotPasswordDTO) => {
  const user = await findUserByEmail(payload.email);

  // Don't reveal whether the email exists — respond the same way either way.
  if (!user) {
    return true;
  }

  const otpSent = await generateAndSendOTP({
    userId: user._id,
    email: user.email,
    purpose: "forgot-password",
  });

  if (!otpSent) {
    throw authError("Otp sent failed");
  }

  return true;
};

export const verifyForgotPasswordOTP = async (
  payload: VerifyForgotPasswordOtpType,
) => {
  const user = await findUserByEmail(payload.email);

  if (!user) {
    throw authError("User not found");
  }

  await verifyOtp({
    userId: user._id,
    enteredOTP: payload.otp,
    purpose: "forgot-password",
  });

  const resetToken = getResetToken(user._id.toString());

  return { resetToken };
};

export const resetPasswordService = async (payload: ResetPasswordDTO) => {
  const { id } = verifyResetToken(payload.resetToken);

  const hashedPassword = await hashPassword(payload.newPassword);

  await updateUserPassword(id, hashedPassword);

  return true;
};
