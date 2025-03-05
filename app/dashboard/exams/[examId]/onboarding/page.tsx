import { getExamById } from "@/services/examServices";
import { redirect } from "next/navigation";
import Link from "next/link";
import { getSession } from "@/services/authServices";
import { getExamStatus } from "@/lib/utils";
import StartExamForm from "@/components/exam/StartExamForm";

export default async function ExamOnboardingPage({
  params,
}: {
  params: Promise<{ examId: string }>;
}) {
  const user = await getSession();
  if (user?.role !== "Student") redirect("/dashboard");

  const { examId } = await params;
  const { data: exam } = await getExamById(examId);

  if (!exam) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center bg-red-50">
        <div className="flex aspect-video w-[90%] max-w-md flex-col items-center justify-center rounded-lg bg-white p-4 text-center shadow-lg sm:p-6">
          <h1 className="mb-4 text-2xl font-bold">Exam Not Found</h1>
          <p className="text-gray-600">
            The exam you are looking for does not exist or has been removed.
          </p>
          <Link
            href="/dashboard"
            className="mt-4 rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const student = exam.students.find(
    (student) => student.user._id === user._id,
  );
  if (!student) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center bg-red-50">
        <div className="flex aspect-video w-[90%] max-w-md flex-col items-center justify-center rounded-lg bg-white p-4 text-center shadow-lg sm:p-6">
          <h1 className="mb-4 text-2xl font-bold">Access Denied</h1>
          <p className="text-gray-600">
            You are not enrolled in this exam. Please contact your instructor
            for more information.
          </p>
          <Link
            href="/dashboard"
            className="mt-4 rounded-lg bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
          >
            Go to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  const examStatus = getExamStatus(exam);

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
          <StartExamForm examId={exam._id} studentUserId={user._id} />
        ) : (
          <p className="mt-4 text-red-500">
            {student.status === "submitted"
              ? "You have already taken this exam"
              : examStatus === "not-due"
                ? "This exam is not yet due."
                : "This exam has already passed."}
          </p>
        )}
      </div>
    </div>
  );
}
