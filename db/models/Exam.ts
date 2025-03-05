import mongoose from "mongoose";
import { UserType } from "./User";
import { ResultType } from "./Result";

export type QuestionType = {
  _id: string;
  text: string;
  options: string[];
  answer: string;
};

const QuestionSchema = new mongoose.Schema<QuestionType>({
  text: { type: String, required: true },
  options: { type: [String], required: true },
  answer: { type: String, required: true },
});

export type StudentAnswerType = { questionId: string; answer: string };

export type StudentType = {
  _id: string;
  user: UserType;
  status:
    | "registered"
    | "requested"
    | "unregistered"
    | "rejected"
    | "submitted";
  examStartTime?: Date;
  result: ResultType;
  answers: StudentAnswerType[];
  score: number;
  switchTabCount: number;
  matNumber: string;
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
          result: {
            type: mongoose.SchemaTypes.ObjectId,
            required: true,
            ref: "Result",
          },
          status: {
            type: String,
            required: true,
            enum: [
              "registered",
              "requested",
              "unregistered",
              "rejected",
              "submitted",
            ],
          },
          examStartTime: { type: Date },
          answers: {
            type: [{ questionId: { type: String }, answer: { type: String } }],
            default: [],
          },
          score: { type: Number, default: 0 },
          switchTabCount: { type: Number, default: 0 },
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
