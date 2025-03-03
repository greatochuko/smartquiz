"use server";

import connectDB from "@/db/connectDB";
import Exam, { ExamType, StudentAnswerType } from "@/db/models/Exam";
import Result, { ResultType } from "@/db/models/Result";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

type ExamDataType = {
  name: string;
  date: Date;
  duration: number;
  questions: {
    text: string;
    options: string[];
    answer: string;
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
    const updatedExam: ExamType | null = await Exam.findByIdAndUpdate(
      examId,
      examData,
    );
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
    const updatedExam: ExamType | null = await Exam.findByIdAndDelete(examId);
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
    );
    if (!examToUpdated) throw new Error("Unable to register for exam");

    const updatedExam: ExamType | null = JSON.parse(
      JSON.stringify(
        await Exam.findById(examId).populate({
          path: "students.user",
          select: "firstName lastName",
        }),
      ),
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

export async function cancelExamRegistration(
  examId: string,
  studentUserId: string,
) {
  try {
    await connectDB();
    const examToUpdate = await Exam.findByIdAndUpdate(
      examId,
      { $pull: { students: { user: studentUserId } } },
      { new: true },
    );

    if (!examToUpdate)
      throw new Error("Unable to cancel registeration for exam");

    const updatedExam: ExamType | null = JSON.parse(
      JSON.stringify(
        await Exam.findById(examId).populate({
          path: "students.user",
          select: "firstName lastName",
        }),
      ),
    );
    revalidatePath("/", "layout");
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

export async function acceptRegistrationRequest(
  examId: string,
  studentUserId: string,
) {
  try {
    await connectDB();
    const updatedExam = await Exam.findOneAndUpdate(
      { _id: examId, "students.user": studentUserId },
      { $set: { "students.$.status": "registered" } },
      { new: true },
    );

    if (!updatedExam) throw new Error("Unable to accept registration for exam");

    revalidatePath("/", "layout");
    return { error: null };
  } catch (err) {
    const error = err as Error;
    console.log("Error accepting registration: ", error.message);
    return {
      error: "An error occured accepting exam registration",
    };
  }
}

export async function rejectRegistrationRequest(
  examId: string,
  studentUserId: string,
) {
  try {
    await connectDB();
    const updatedExam = await Exam.findOneAndUpdate(
      { _id: examId, "students.user": studentUserId },
      { $set: { "students.$.status": "rejected" } },
      { new: true },
    );

    if (!updatedExam) throw new Error("Unable to reject registration for exam");

    revalidatePath("/", "layout");
    return { error: null };
  } catch (err) {
    const error = err as Error;
    console.log("Error rejecting registration: ", error.message);
    return {
      error: "An error occured rejecting exam registration",
    };
  }
}

export async function saveStudentExamStartTime(
  examId: string,
  studentUserId: string,
) {
  try {
    await connectDB();
    const updatedExam = await Exam.findOneAndUpdate(
      { _id: examId, "students.user": studentUserId },
      { $set: { "students.$.examStartTime": new Date() } },
      { new: true },
    );

    if (!updatedExam) throw new Error("Unable to save student exam start time");

    revalidatePath("/", "layout");
    return { error: null };
  } catch (err) {
    const error = err as Error;
    console.log("Error saving student start time to database: ", error.message);
    return {
      error: "An error occured saving student start time to database",
    };
  }
}

export async function updateStudentAnswers(
  examId: string,
  studentUserId: string,
  answers: StudentAnswerType[],
) {
  try {
    await connectDB();
    const examToUpdate: ExamType | null = await Exam.findById(examId);
    if (!examToUpdate) throw new Error("Invalid exam Id");

    let score = 0;
    for (let i = 0; i < answers.length; i++) {
      const answer = answers[i];
      const correctAnswer = examToUpdate.questions.find(
        (q) => q._id.toString() === answer.questionId,
      )?.answer;
      if (answer.answer === correctAnswer) {
        score++;
      }
    }

    const updatedExam = await Exam.findOneAndUpdate(
      { _id: examId, "students.user": studentUserId },
      {
        $set: { "students.$.answers": answers, "students.$.score": score },
      },
      { new: true },
    );
    if (!updatedExam) throw new Error("Unable to update student answers");
    return { error: null, data: JSON.parse(JSON.stringify(updatedExam)) };
  } catch (err) {
    const error = err as Error;
    console.log("Error updating student answers: ", error.message);
    return { error: "Error updating student answers", data: null };
  }
}

export async function submitExam(examId: string, studentUserId: string) {
  let redirectUrl;
  try {
    await connectDB();
    const prevResult: ResultType | null = await Result.findOne({
      exam: examId,
      student: studentUserId,
    });

    if (prevResult) {
      redirectUrl = `/dashboard/results/${prevResult._id}`;
    } else {
      const exam: ExamType | null = await Exam.findById(examId);
      if (!exam) throw new Error("Exam not found");

      const studentInExam = exam.students.find(
        (student) => String(student.user) === studentUserId,
      );
      if (!studentInExam) throw new Error("Student not registered for exam");

      studentInExam.status = "submitted";

      const newResult = await Result.create({
        exam: exam._id,
        student: studentUserId,
        score: studentInExam.score,
        answers: studentInExam.answers,
        examiner: exam.examiner,
        totalQuestions: exam.questions.length,
      });

      studentInExam.result = newResult._id;
      await exam.save();

      redirectUrl = `/dashboard/results/${newResult._id}`;
    }
  } catch (err) {
    const error = err as Error;
    console.log("Error submitting exam: ", error.message);
    return {
      error: "An error occurred submitting exam",
    };
  } finally {
    if (redirectUrl) redirect(redirectUrl);
  }
}
