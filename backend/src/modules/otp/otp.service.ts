import {
  createOTP,
  deleteAllOTP,
  deleteOTP,
  findLatestOTP,
} from "./otp.repository";
import { sendOTPEmail } from "../../utils/email";
import { generateAndSendOTPTypes, verifyOtpType } from "./otp.types";
import generateOTP from "../../utils/otp";
import { compareOTP, hashOtp } from "../../utils/encyption";

export const generateAndSendOTP = async ({
  userId,
  email,
  purpose,
}: generateAndSendOTPTypes) => {
  await deleteOTP({ userId, purpose });

  const otp = generateOTP();

  const otpHash = await hashOtp(otp);

  const expiredAt = new Date(Date.now() + 10 * 60 * 1000);

  await createOTP({ userId, otpHash, purpose, expiredAt });

  await sendOTPEmail(email, otp, purpose);

  return true;
};

export const verifyOtp = async ({
  userId,
  enteredOTP,
  purpose,
}: verifyOtpType) => {
  const otpRecord = await findLatestOTP({ userId, purpose });
  if (!otpRecord) {
    throw new Error("OTP not found");
  }
  if (otpRecord.expiredAt < new Date()) {
    throw new Error("OTP expired");
  }

  const isMatch = await compareOTP(enteredOTP, otpRecord.otpHash);

  if (!isMatch) {
    throw new Error("Invalid OTP");
  }

  await deleteAllOTP(userId);

  return true;
};
