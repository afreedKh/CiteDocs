import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const generateToken = (id: string) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET as string,
    {
      expiresIn: "7d"
    }
  );
};

export const registerUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { fullName, email, password } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({
        message: "User already exists"
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(
      password,
      10
    );

    const user = await new User({
      fullName,
      email,
      password: hashedPassword
    }).save();
    
    console.log("User created:", user); // Log the created user for debugging

    res.status(201).json({
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      token: generateToken(user._id.toString())
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error"
    });
  }
};

export const loginUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (
      user &&
      (await bcrypt.compare(
        password,
        user.password
      ))
    ) {
      res.json({
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        token: generateToken(
          user._id.toString()
        )
      });
    } else {
      res.status(401).json({
        message: "Invalid credentials"
      });
    }
  } catch {
    res.status(500).json({
      message: "Server Error"
    });
  }
};