import mongoose from "mongoose";
import { Message, messageSchema } from "./Message.model";

export interface User extends mongoose.Document {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
  verifyCode: string;
  isVerified: boolean;
  messages: Message[];
  isAcceptingMessages: boolean;
}

const UserSchema: mongoose.Schema<User> = new mongoose.Schema(
  {
    firstname: {
      type: String,
      default: "",
    },
    lastname: {
      type: String,
      default: "",
    },
    username: {
      type: String,
      required: true,
      unique: true,
      match: [/^[a-z0-9_]{3,16}$/, "Please enter a valid username"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: true,
    },
    verifyCode: {
      type: String,
      default: "",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    messages: {
      type: [messageSchema],
      default: [],
    },
    isAcceptingMessages: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);

export default UserModel;
