import mongoose, { Document, ObjectId, Schema, Types } from "mongoose";

export interface IOtp extends Document {
  userId: Types.ObjectId;
  otpHash: string;
  purpose: "signup" | "login" | "forgot-password";
  expiredAt: Date;
}

const otpSchema:Schema = new mongoose.Schema<IOtp>(
  {
    userId:{
        type: Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    otpHash:{
        type:String,
        required:true
    },
    purpose:{
        type:String,
        enum: ["signup", "login", "forgot-password"],
        required:true
    },
    expiredAt:{
        type:Date,
        required:true
    }
  },
  {
    timestamps: true,
  },
);

otpSchema.index(
    {expiredAt: 1},
    {expireAfterSeconds: 0}
)

export default mongoose.model<IOtp>("Otp", otpSchema);
