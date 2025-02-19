import AdminExamListPage from "@/components/exam/AdminExamListPage";
import StudentExamListPage from "@/components/exam/StudentExamListPage";
import { getSession } from "@/services/authServices";
import { getExams, getExamsByExaminer } from "@/services/examServices";
import { notFound } from "next/navigation";

export default async function ExamListPage() {
  const user = await getSession();
  if (!user) notFound();

  if (user.role === "Examiner") {
    const { data: exams } = await getExamsByExaminer(user._id);
    return <AdminExamListPage exams={exams} />;
  }

  const { data: exams } = await getExams();
  return <StudentExamListPage exams={exams} />;
}
