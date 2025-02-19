import ViewExamsPageContent from "@/components/exam/ViewExamsPageContent";
import { getAdminExams } from "@/services/examServices";
import Link from "next/link";

export default async function ViewExams() {
  const { data: exams } = await getAdminExams();

  return (
    <div className="p-6 text-sm">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl sm:text-2xl font-semibold ">Manage Exams</h1>
        <Link
          href={"/dashboard/exams/new"}
          className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-600/90 duration-200"
        >
          Create Exam
        </Link>
      </div>

      <ViewExamsPageContent exams={exams} />
    </div>
  );
}
