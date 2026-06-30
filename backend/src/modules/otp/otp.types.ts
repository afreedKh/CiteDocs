import { Types } from "mongoose";

export interface IOtp {
  userId: Types.ObjectId;
  otpHash: string;
  purpose: "signup" | "login" | "forgot-password";
  expiredAt: Date;
}

export type purposeType = IOtp["purpose"];

export type findLatestOTPType = Pick<IOtp, "purpose" | "userId">;

export type deleteOtpType = Pick<IOtp, "purpose" | "userId">;

export type generateAndSendOTPTypes = Pick<IOtp, "userId" | "purpose"> & {
  email: string;
};

export type verifyOtpType = Pick<IOtp, "userId" | "purpose"> & {
  enteredOTP: string;
};

export type deleteAllOTPType = IOtp["userId"];
