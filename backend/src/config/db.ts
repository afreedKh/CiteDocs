import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    await mongoose.connection.on("connected", () => {
      console.log(`Database Connected Successfull ✅`);
    });

    await mongoose.connect(process.env.MONGO_URI as string);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

export default connectDB;
