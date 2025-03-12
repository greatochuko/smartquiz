import StudentExamListPage from "@/components/exam/StudentExamListPage";
import { getSession } from "@/services/authServices";
import { getExams } from "@/services/examServices";
import { notFound } from "next/navigation";

export default async function ExamListPage() {
  const user = await getSession();
  if (user?.role !== "Student") notFound();

  const { data: exams } = await getExams();
  return <StudentExamListPage exams={exams} />;
}
