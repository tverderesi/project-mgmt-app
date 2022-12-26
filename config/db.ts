//@ts-ignore
const mongoose = require('mongoose');

const connectDB = async () => {
  // @ts-ignore
  const conn = await mongoose.connect(process.env.MONGO_URI);
  // @ts-ignore
  console.log(`MongoDB Connected at ${conn.connection.host}`);
};

module.exports = connectDB;
