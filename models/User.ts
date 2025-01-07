import mongoose, { Schema, model, models, Types } from "mongoose";
import bcrypt from "bcryptjs";
import { unique } from "next/dist/build/utils";

export interface IUser {
  email: string;
  password: string;
  role: "user" | "admin";
  _id?: Types.ObjectId;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },

  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

const User = models?.User || model<IUser>("User", userSchema);

export default User;
