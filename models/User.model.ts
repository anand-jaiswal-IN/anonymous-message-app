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
}

const UserSchema: mongoose.Schema<User> = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: true,
      default: "",
    },
    lastname: {
      type: String,
      required: true,
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
      nullable: true,
      default: null,
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
    messages: {
      type: [messageSchema],
      required: true,
      default: [],
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
