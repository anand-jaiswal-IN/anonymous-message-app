import mongoose from "mongoose";

export interface Message extends mongoose.Document {
  message: string;
  createdAt: Date;
}

export const messageSchema: mongoose.Schema<Message> = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
