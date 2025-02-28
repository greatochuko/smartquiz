import BackButton from "@/components/BackButton";
import ExamForm from "@/components/exam/ExamForm";
import { getSession } from "@/services/authServices";
import { getExamById } from "@/services/examServices";
import { notFound } from "next/navigation";

export default async function EditExamPage({
  params,
}: {
  params: Promise<{ examId: string }>;
}) {
  const user = await getSession();

  const { examId } = await params;
  const { data: exam } = await getExamById(examId);

  if (!exam) notFound();

  return (
    <div className="mx-auto my-4 w-[90%] max-w-2xl rounded-md bg-white p-4 shadow sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Edit Exam</h1>
        <BackButton />
      </div>
      <ExamForm exam={exam} userId={user?._id || ""} />
    </div>
  );
}
