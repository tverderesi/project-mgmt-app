import mongoose from "mongoose";
import dotenv from "dotenv";

export const connectDB = async () => {
  const conn = await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDB Connected at ${conn.connection.host}:${conn.connection.port}`);
};
