import User from "../../database/User";
import { RegisterDTO } from "./auth.types";

export const findUserByEmail = async (email: string) => {
  const user = await User.findOne({ email });
  return user;
};

export const saveNewUser = async (
  payload: RegisterDTO,
  hashedPassword: string,
) => {
  const user = await new User({
    fullName: payload.fullName,
    email: payload.email,
    password: hashedPassword,
  }).save();

  return user;
};

export const verifyUserEmail = async (userId: string) => {
  return await User.findByIdAndUpdate(
    userId,
    { isEmailVerified: true },
    { new: true },
  );
};
