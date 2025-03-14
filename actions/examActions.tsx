"use server";

import connectDB from "@/db/connectDB";
import Exam, { ExamType, StudentAnswerType } from "@/db/models/Exam";
import Result, { ResultType } from "@/db/models/Result";
import { parseJSONResponse } from "@/lib/utils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createActivity } from "./activityActions";
import { getSession } from "@/services/authServices";

type ExamDataType = {
  name: string;
  date: Date;
  duration: number;
  questions: {
    text: string;
    options: string[];
    answer: string;
  }[];
  percentage: number;
  type: string;
};

export async function createExam(
  userId: string,
  courseId: string,
  examData: ExamDataType,
) {
  let canRedirect = false;
  try {
    await connectDB();
    const newExam: ExamType = await Exam.create({
      ...examData,
      examiner: userId,
      course: courseId,
    });

    await createActivity("create-exam", newExam._id);

    canRedirect = true;
  } catch (err) {
    const error = err as Error;
    console.log("Error creating exam: ", error.message);
    return { error: "An error occured creating new exam" };
  } finally {
    if (canRedirect) redirect(`/dashboard/courses/${courseId}`);
  }
}

export async function updateExam(
  examId: string,
  courseId: string,
  examData: ExamDataType,
) {
  let canRedirect = false;
  try {
    await connectDB();
    const updatedExam: ExamType | null = await Exam.findByIdAndUpdate(
      examId,
      examData,
    );
    if (!updatedExam) throw new Error("Unable to update exam");

    await createActivity("update-exam", updatedExam._id);

    canRedirect = true;
  } catch (err) {
    const error = err as Error;
    console.log("Error creating exam: ", error.message);
    return { error: "An error occured creating new exam" };
  } finally {
    if (canRedirect) redirect(`/dashboard/courses/${courseId}`);
  }
}

export async function deleteExam(examId: string) {
  try {
    await connectDB();
    await Exam.findByIdAndDelete(examId);

    await createActivity("delete-exam", examId);

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

    const updatedExam: ExamType | null = await Exam.findById(examId).populate({
      path: "students.user",
      select: "firstName lastName",
    });
    return { updatedExam: parseJSONResponse(updatedExam), error: null };
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

    const updatedExam: ExamType | null = await Exam.findById(examId).populate({
      path: "students.user",
      select: "firstName lastName",
    });

    await createActivity("remove-student", examToUpdate._id, studentUserId);

    revalidatePath("/", "layout");
    return { updatedExam: parseJSONResponse(updatedExam), error: null };
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

    await createActivity("register-student", updatedExam._id, studentUserId);

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

export async function startExam(
  examId: string,
  studentUserId: string,
  matNumber: string,
) {
  let redirectUrl = "";
  try {
    await connectDB();

    const user = await getSession();
    if (!user) throw new Error("User not authenticated");

    if (user.matNumber?.toLowerCase() !== matNumber.toLowerCase())
      throw new Error("Invalid Mat Number");

    const updatedExam = await Exam.findOneAndUpdate(
      { _id: examId, "students.user": studentUserId },
      { $set: { "students.$.matNumber": matNumber } },
      { new: true },
    );
    if (!updatedExam) throw new Error("Unable to save student exam start time");

    redirectUrl = `/dashboard/exams/${examId}/start`;
  } catch (err) {
    const error = err as Error;
    console.log("Error starting exam: ", error.message);
    return { error: error.message };
  } finally {
    if (redirectUrl) redirect(redirectUrl);
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

export async function updateStudentSwitchTabCount(
  examId: string,
  studentUserId: string,
) {
  try {
    await connectDB();
    const updatedExam = await Exam.findOneAndUpdate(
      { _id: examId, "students.user": studentUserId },
      { $inc: { "students.$.switchTabCount": 1 } },
      { new: true },
    );

    if (!updatedExam)
      throw new Error("Unable to update student switch tab count");

    revalidatePath("/", "layout");
    return { error: null };
  } catch (err) {
    const error = err as Error;
    console.log("Error updating student switch tab count: ", error.message);
    return {
      error: "An error occured updating student switch tab count",
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
    return { error: null, data: parseJSONResponse(updatedExam) };
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
