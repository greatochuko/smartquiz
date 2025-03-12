import Exam, { ExamType } from "@/db/models/Exam";
import { parseJSONResponse } from "@/lib/utils";

export async function getExams() {
  try {
    const exams: ExamType[] = await Exam.find()
      .populate({
        path: "students.user",
        select: "firstName lastName",
      })
      .sort({ createdAt: -1 });
    return { data: parseJSONResponse(exams), error: null };
  } catch (err) {
    const error = err as Error;
    console.log("Error fetching exams: ", error.message);
    return { data: [], error: "An error occured fetching exams" };
  }
}

export async function getExamsByExaminer(userId: string) {
  try {
    const exams: ExamType[] = await Exam.find({ examiner: userId })
      .populate({
        path: "students.user",
        select: "firstName lastName",
      })
      .sort({ createdAt: -1 });
    return { data: parseJSONResponse(exams), error: null };
  } catch (err) {
    const error = err as Error;
    console.log("Error fetching exams: ", error.message);
    return { data: [], error: "An error occured fetching exams" };
  }
}

export async function getExamsByExaminerAndCourse(
  userId: string,
  courseId: string,
) {
  try {
    const exams: ExamType[] = await Exam.find({
      examiner: userId,
      course: courseId,
    })
      .populate({
        path: "students.user",
        select: "firstName lastName",
      })
      .sort({ createdAt: -1 });
    return { data: parseJSONResponse(exams), error: null };
  } catch (err) {
    const error = err as Error;
    console.log("Error fetching exams: ", error.message);
    return { data: [], error: "An error occured fetching exams" };
  }
}

export async function getExamById(examId: string) {
  try {
    const exam: ExamType | null = await Exam.findById(examId).populate({
      path: "students.user",
      select: "firstName lastName",
    });
    return { data: parseJSONResponse(exam), error: null };
  } catch (err) {
    const error = err as Error;
    console.log("Error fetching exam: ", error.message);
    return { data: null, error: "An error occured fetching exam" };
  }
}
