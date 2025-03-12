import mongoose from "mongoose";

type connectionObject = {
  isConnected?: number;
};

const connection: connectionObject = {};

async function dbConnect(): Promise<void> {
  if (connection.isConnected) {
    return;
  }
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI as string);
    connection.isConnected = conn.connections[0].readyState;
    console.log(`MongoDB Connected:`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
}
export default dbConnect;
