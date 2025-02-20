"use server";

import connectDB from "@/db/connectDB";
import Exam, { ExamType } from "@/db/models/Exam";
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

export async function createExam(userId: string, examData: ExamDataType) {
  let canRedirect = false;
  try {
    await connectDB();
    await Exam.create({ ...examData, examiner: userId });
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

export async function registerForExam(examId: string, userId: string) {
  try {
    await connectDB();
    const examToUpdated: ExamType | null = await Exam.findByIdAndUpdate(
      examId,
      {
        $push: { students: { user: userId, status: "requested" } },
      },
      { new: true }
    );
    if (!examToUpdated) throw new Error("Unable to register for exam");

    const updatedExam = JSON.parse(
      JSON.stringify(
        await Exam.findById(examId).populate({
          path: "students.user",
          select: "firstName lastName",
        })
      )
    );
    return { updatedExam, error: null };
  } catch (err) {
    const error = err as Error;
    console.log("Error requesting registration: ", error.message);
    return {
      updatedExam: null,
      error: "An error occured requesting exam registration",
    };
  }
}

export async function cancelExamRegistration(examId: string, userId: string) {
  try {
    await connectDB();
    const examToUpdate: ExamType | null = await Exam.findByIdAndUpdate(
      examId,
      {
        $pull: { students: { user: userId } },
      },
      { new: true }
    );
    if (!examToUpdate)
      throw new Error("Unable to cancel registeration for exam");

    const updatedExam = JSON.parse(
      JSON.stringify(
        await Exam.findById(examId).populate({
          path: "students.user",
          select: "firstName lastName",
        })
      )
    );
    return { updatedExam, error: null };
  } catch (err) {
    const error = err as Error;
    console.log("Error requesting registration: ", error.message);
    return {
      updatedExam: null,
      error: "An error occured requesting exam registration",
    };
  }
}
