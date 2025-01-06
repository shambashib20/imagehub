import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("Missing Mongo db uri!");
}

let cached = global.mongoose;
console.log("cached", cached);

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

export async function connectToDatabase() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    // const opts = {

    // }
    cached.promise = mongoose
      .connect(MONGODB_URI)
      .then(() => mongoose.connection);
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    cached.promise = null;
    console.error("Failed to connect to MongoDB", error);
    throw error;
  }

  return cached.conn;
}
