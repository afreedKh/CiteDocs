import Otp from "../../database/Otp";
import { deleteAllOTPType, deleteOtpType, findLatestOTPType, IOtp } from "./otp.types";

export const createOTP = async ({
  userId,
  otpHash,
  purpose,
  expiredAt,
}: IOtp) => {
  return await new Otp({ userId, otpHash, purpose, expiredAt });
};

export const findLatestOTP = async ({ userId, purpose }: findLatestOTPType) => {
  return await Otp.findOne({ userId, purpose }).sort({ createdAt: -1 });
};

export const deleteOTP = async ({ userId, purpose }: deleteOtpType) => {
  return await Otp.deleteMany({ userId, purpose });
};

export const deleteAllOTP = async (userId: deleteAllOTPType) => {
  return await Otp.deleteMany({ userId });
};
