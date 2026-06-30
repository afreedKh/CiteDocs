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

export interface ForgotPasswordDTO {
  email: string;
}

export interface VerifyForgotPasswordOtpType extends VerifySignupOtpType {}

export interface ResetPasswordDTO {
  resetToken: string;
  newPassword: string;
}
