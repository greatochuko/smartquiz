import mongoose from "mongoose";
import { ExamType } from "./Exam";
import { UserType } from "./User";

export type ActivityActionType =
  | "create-exam"
  | "update-exam"
  | "delete-exam"
  | "remove-student"
  | "register-student";

export type ActivityType = {
  _id: string;
  action: ActivityActionType;
  student: UserType;
  exam: ExamType;
  user: UserType;
  createdAt: Date;
  updatedAt: Date;
};

const ActivitySchema = new mongoose.Schema<ActivityType>(
  {
    exam: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: "Exam" },
    student: { type: mongoose.SchemaTypes.ObjectId, ref: "User" },
    user: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: "User" },
    action: { type: String, required: true },
  },
  { timestamps: true },
);

const Activity =
  mongoose.models.Activity ||
  mongoose.model<ActivityType>("Activity", ActivitySchema);

export default Activity;
