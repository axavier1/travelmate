import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "";

if (!MONGODB_URI) {
  throw new Error("Please define the MONGODB_URI environment variable");
}

let cached = (global as any).mongoose || { conn: null, promise: null };

async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
    }).catch(err => {
      console.error("❌ Error connecting to MongoDB:", err.message);
      throw err;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default connectDB;
