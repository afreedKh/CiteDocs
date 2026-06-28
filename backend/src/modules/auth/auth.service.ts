import { comparePassword, hashPassword } from "../../utils/password";
import { generateToken } from "../../utils/token";
import { findUserByEmail, saveNewUser } from "./auth.repository";
import { LoginDTO, RegisterDTO } from "./auth.types";

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

  const token = generateToken(user._id.toString());

  return {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    token,
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

  const token = generateToken(user._id.toString());

  return {
    id: user._id,
    fullName: user.fullName,
    email: payload.email,
    token,
  };
};
