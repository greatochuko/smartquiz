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
