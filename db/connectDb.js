// lib/mongodb.js
import mongoose from 'mongoose';

const connectDb = async () => {
  console.log("Ready")
  if (mongoose.connection.readyState >= 1) return;
  console.log("Steady")

  return mongoose.connect(process.env.MONGODB_URI);
  console.log("Go")
};

export default connectDb;
