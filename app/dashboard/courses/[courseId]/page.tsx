import AdminExamListPage from "@/components/exam/AdminExamListPage";
import { getSession } from "@/services/authServices";
import { getCourseById } from "@/services/courseServices";
import { getExamsByExaminerAndCourse } from "@/services/examServices";
import { notFound } from "next/navigation";

export default async function CourseExamListPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const user = await getSession();
  if (user?.role !== "Examiner") notFound();

  const { courseId } = await params;
  const { data: course } = await getCourseById(courseId);
  if (!course) notFound();

  const { data: exams } = await getExamsByExaminerAndCourse(user._id, courseId);

  return <AdminExamListPage exams={exams} course={course} />;
}
