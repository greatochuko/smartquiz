import Exam, { ExamType } from "@/db/models/Exam";

export async function getAdminExams() {
  try {
    const exams: ExamType[] = JSON.parse(JSON.stringify(await Exam.find()));
    return { data: exams, error: null };
  } catch (err) {
    const error = err as Error;
    console.log("Error fetching exams: ", error.message);
    return { data: [], error: "An error occured fetching exams" };
  }
}

export async function getExamById(examId: string) {
  try {
    const exam: ExamType | null = JSON.parse(
      JSON.stringify(await Exam.findById(examId))
    );
    return { data: exam, error: null };
  } catch (err) {
    const error = err as Error;
    console.log("Error fetching exam: ", error.message);
    return { data: null, error: "An error occured fetching exam" };
  }
}
