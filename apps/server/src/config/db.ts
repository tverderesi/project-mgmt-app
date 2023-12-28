import { logger } from "@/utils/logger";
import mongoose from "mongoose";

export const connectDB = async () => {
  if (!process.env.MONGO_URI) {
    throw new Error("No Mongo URI found");
  }
  const conn = await mongoose.connect(`${process.env.MONGO_URI}`);

  logger.verbose(`MongoDB Connected at ${conn.connection.host}:${conn.connection.port}`);
};
