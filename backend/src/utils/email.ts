import nodemailer from "nodemailer";
import { purposeType } from "../modules/otp/otp.types";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOTPEmail = async (
  email: string,
  otp: string,
  purpose: purposeType,
) => {
  let subject = "";
  let heading = "";

  switch (purpose) {
    case "signup":
      subject = "Verify your email";
      heading = "Email Verification";
      break;
    case "login":
      subject = "Login Verification";
      heading = "Login OTP";
      break;
    case "forgot-password":
      subject = "Reset Password";
      heading = "Password Reset OTP";
      break;
    default:
      break;
  }

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject,
    html: `
        <div style="font-family:Arial;padding:20px">

                <h2>${heading}</h2>

                <p>Your verification code is</p>

                <h1>${otp}</h1>

                <p>This OTP expires in 10 minutes.</p>

            </div>
        `,
  });
};

export default transporter;
