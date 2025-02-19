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
    <div className="p-6 max-w-2xl w-[90%] mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold ">Edit Exam</h1>
        <BackButton />
      </div>
      <ExamForm exam={exam} userId={user?._id || ""} />
    </div>
  );
}
