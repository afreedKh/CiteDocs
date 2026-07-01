import mongoose, { Document } from "mongoose";

export interface IUser extends Document {
  fullName: string;
  email: string;
  password?: string ;
  isEmailVerified: boolean;
  provider: "local" | "google";
  googleId?:string;
  profilePicture?:string;
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
      required: function () {
        return this.provider === "local";
      },
    },
    isEmailVerified:{
      type: Boolean,
      default: false
    },
    provider:{
      type:String,
      enum:["local","google"],
      default:"local"
    },
    googleId:{
      type:String,
      default:null
    },
    profilePicture:{
      type:String,
      default:null
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IUser>("User", userSchema);
