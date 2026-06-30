export interface RegisterDTO {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface VerifySignupOtpType {
  email: string;
  otp: string;
}

export interface VerifyLoginOtpType extends VerifySignupOtpType {}

export interface ForgotPasswordType {
  email: string;
}

export interface VerifyForgotPasswordOTPType extends VerifySignupOtpType {}

export interface ResetPasswordType {
  resetToken: string;
  newPassword: string;
}
