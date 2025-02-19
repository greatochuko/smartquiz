import mongoose from "mongoose";

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

export type ExamType = {
  _id: string;
  name: string;
  date: Date;
  duration: number;
  questions: QuestionType[];
} & mongoose.Document;

const ExamSchema = new mongoose.Schema<ExamType>({
  name: { type: String, required: true },
  date: { type: Date, required: true },
  duration: { type: Number, required: true },
  questions: { type: [QuestionSchema], required: true },
});

const Exam = mongoose.models?.Exam || mongoose.model("Exam", ExamSchema);

export default Exam;
