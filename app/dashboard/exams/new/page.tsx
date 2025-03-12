import BackButton from "@/components/BackButton";
import ExamForm from "@/components/exam/ExamForm";
import { getSession } from "@/services/authServices";

export default async function CreateExamPage() {
  const user = await getSession();

  return (
    <div className="mx-auto my-4 w-[90%] max-w-2xl rounded-md bg-white p-4 shadow sm:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Create Exam</h1>
        <BackButton />
      </div>
      <ExamForm userId={user?._id || ""} />
    </div>
  );
}
