import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  isEmailVerified: boolean;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isEmailVerified:{
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IUser>("User", userSchema);
