import { z } from "zod";

export const verifySignupOtpSchema = z.object({
  email: z.string().email(),
  otp: z.string().length(6),
});
