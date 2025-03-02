import mongoose from "mongoose";
import { UserType } from "./User";
import { ExamType, StudentAnswerType } from "./Exam";

export type ResultType = {
  _id: string;
  student: UserType;
  exam: ExamType;
  score: number;
  answers: StudentAnswerType[];
  createdAt: string;
  updatedAt: string;
} & mongoose.Document;

const ResultSchema = new mongoose.Schema<ResultType>(
  {
    exam: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "Exam",
    },
    student: {
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: "User",
    },
    score: { type: Number },
    answers: {
      type: [{ questionId: { type: String }, answer: { type: String } }],
      default: [],
    },
  },
  { timestamps: true },
);

const Result =
  mongoose.models?.Result || mongoose.model("Result", ResultSchema);

export default Result;
