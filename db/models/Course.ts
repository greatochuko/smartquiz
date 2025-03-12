import mongoose from "mongoose";
import { UserType } from "./User";

export type CourseType = {
  _id: string;
  name: string;
  user: UserType;
  createdAt: string;
  udpatedAt: string;
};

const CourseSchema = new mongoose.Schema<CourseType>(
  {
    name: { type: String, required: true },
    user: { type: mongoose.SchemaTypes.ObjectId, required: true, ref: "User" },
  },
  { timestamps: true },
);

const Course =
  mongoose.models?.Course || mongoose.model("Course", CourseSchema);

export default Course;
