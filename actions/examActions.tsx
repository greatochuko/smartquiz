"use server";

import connectDB from "@/db/connectDB";
import Exam from "@/db/models/Exam";
import { redirect } from "next/navigation";

type ExamDataType = {
  name: string;
  date: Date;
  duration: number;
  questions: {
    text: string;
    options: string[];
    answer: number;
  }[];
};

export async function createExam(examData: ExamDataType) {
  let canRedirect = false;
  try {
    await connectDB();
    await Exam.create(examData);
    canRedirect = true;
  } catch (err) {
    const error = err as Error;
    console.log("Error creating exam: ", error.message);
    return { error: "An error occured creating new exam" };
  } finally {
    if (canRedirect) redirect("/dashboard/exams");
  }
}

export async function updateExam(examId: string, examData: ExamDataType) {
  let canRedirect = false;
  try {
    await connectDB();
    const updatedExam = await Exam.findByIdAndUpdate(examId, examData);
    if (!updatedExam) throw new Error("Unable to update exam");
    canRedirect = true;
  } catch (err) {
    const error = err as Error;
    console.log("Error creating exam: ", error.message);
    return { error: "An error occured creating new exam" };
  } finally {
    if (canRedirect) redirect("/dashboard/exams");
  }
}

export async function deleteExam(examId: string) {
  try {
    await connectDB();
    const updatedExam = await Exam.findByIdAndDelete(examId);
    if (!updatedExam) throw new Error("Unable to update exam");
    return { error: null };
  } catch (err) {
    const error = err as Error;
    console.log("Error deleting exam: ", error.message);
    return { error: "An error occured deleting exam" };
  }
}
