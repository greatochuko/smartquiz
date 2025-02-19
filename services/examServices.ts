import Exam, { ExamType } from "@/db/models/Exam";

export async function fetchAdminExams() {
  try {
    const exams: ExamType[] = await Exam.find();
    return { data: exams, error: null };
  } catch (err) {
    const error = err as Error;
    console.log("Error fetching exams: ", error.message);
    return { data: [], error: "An error occured fetching exams" };
  }
}
