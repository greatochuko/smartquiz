import mongoose from "mongoose";
import { UserType } from "./User";

export type QuestionType = {
  _id: string;
  text: string;
  options: string[];
  answer: number;
};

const QuestionSchema = new mongoose.Schema<QuestionType>({
  text: { type: String, required: true },
  options: { type: [String], required: true },
  answer: { type: Number, required: true },
});

export type StudentType = {
  _id: string;
  user: UserType;
  status: "registered" | "requested" | "unregistered" | "rejected";
  examStartTime?: Date;
};

export type ExamType = {
  _id: string;
  name: string;
  date: Date;
  duration: number;
  questions: QuestionType[];
  students: StudentType[];
  examiner: UserType;
  createdAt: string;
  updatedAt: string;
} & mongoose.Document;

const ExamSchema = new mongoose.Schema<ExamType>(
  {
    name: { type: String, required: true },
    date: { type: Date, required: true },
    duration: { type: Number, required: true },
    questions: { type: [QuestionSchema], required: true },
    students: {
      type: [
        {
          user: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
            ref: "User",
          },
          status: {
            type: String,
            required: true,
            enum: ["registered", "requested", "unregistered", "rejected"],
          },
          examStartTime: { type: Date },
        },
      ],
      default: [],
    },
    examiner: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true },
);

const Exam = mongoose.models?.Exam || mongoose.model("Exam", ExamSchema);

export default Exam;
