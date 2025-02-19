import BackButton from "@/components/BackButton";
import ExamForm from "@/components/exam/ExamForm";
import { getSession } from "@/services/authServices";

export default async function CreateExamPage() {
  const user = await getSession();

  return (
    <div className="p-6 max-w-2xl w-[90%] mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold ">Create Exam</h1>
        <BackButton />
      </div>
      <ExamForm userId={user?._id || ""} />
    </div>
  );
}
