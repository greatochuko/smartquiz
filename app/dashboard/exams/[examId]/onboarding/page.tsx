import { getExamById } from "@/services/examServices";
import { notFound, redirect } from "next/navigation";
import { startOfDay, isAfter, isBefore } from "date-fns";
import Link from "next/link";
import { getSession } from "@/services/authServices";

export default async function ExamOnboardingPage({
  params,
}: {
  params: Promise<{ examId: string }>;
}) {
  const user = await getSession();
  if (user?.role !== "Student") redirect("/dashboard");

  const { examId } = await params;
  const { data: exam } = await getExamById(examId);

  if (!exam) notFound();

  const student = exam.students.find(
    (student) => student.user._id === user._id,
  );
  if (!student) redirect("/dashboard");

  let examStatus = "";

  const examDate = startOfDay(new Date(exam.date));
  const today = startOfDay(new Date());

  if (isAfter(examDate, today)) {
    examStatus = "This exam has already passed.";
  } else if (isBefore(examDate, today)) {
    examStatus = "The time for this exam is not yet due.";
  } else {
    examStatus = "ready";
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center bg-blue-50">
      <div className="flex aspect-video w-[90%] max-w-md flex-col items-center justify-center rounded-lg bg-white p-4 text-center shadow-lg sm:p-6">
        <h1 className="mb-4 text-2xl font-bold">{exam.name || "Exam"}</h1>
        <p className="text-gray-600">
          Scheduled Date:{" "}
          <span className="font-semibold text-zinc-800">
            {new Date(exam.date).toDateString()}
          </span>
        </p>
        <p className="text-gray-600">
          Total Questions:{" "}
          <span className="font-semibold text-zinc-800">
            {exam.questions.length}
          </span>
        </p>
        <p className="text-gray-600">
          Duration:{" "}
          <span className="font-semibold text-zinc-800">
            {exam.duration} mins
          </span>
        </p>
        {examStatus === "ready" ? (
          <Link
            href={`/dashboard/exams/${exam._id}/start`}
            className="mt-4 rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
          >
            Start Exam
          </Link>
        ) : (
          <p className="mt-4 text-red-500">{examStatus}</p>
        )}
      </div>
    </div>
  );
}
