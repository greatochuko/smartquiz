import mongoose from "mongoose";

export type UserType = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: "Examiner" | "Student";
  createdAt: string;
  updatedAt: string;
} & mongoose.Document;

const UserSchema = new mongoose.Schema<UserType>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      required: true,
      default: "Student",
      enum: ["Examiner", "Student"],
    },
  },
  { timestamps: true }
);

const User = mongoose.models?.User || mongoose.model("User", UserSchema);

export default User;
