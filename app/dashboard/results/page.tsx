import BackButton from "@/components/BackButton";
import { getSession } from "@/services/authServices";
import { getExaminerResults } from "@/services/resultServices";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function ExaminerResultsPage() {
  const user = await getSession();
  if (!user) redirect("/login");

  const { results } = await getExaminerResults(user._id);

  return (
    <div className="flex flex-1 flex-col py-4 sm:py-6">
      <div className="screen-container w-full max-w-4xl flex-1 rounded-md bg-white p-4 text-center shadow-md sm:p-6">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-xl font-semibold sm:text-2xl">
            All Exam Results
          </h1>
          <BackButton />
        </div>

        {/* Desktop View - Table */}
        <table className="hidden w-full overflow-hidden rounded-md sm:table">
          <thead>
            <tr className="bg-zinc-100 text-zinc-700">
              <th className="p-2 text-left font-medium">Student</th>
              <th className="p-2 text-left font-medium">Exam</th>
              <th className="p-2 font-medium">Score</th>
              <th className="p-2 font-medium">Pass/Fail</th>
              <th className="p-2 font-medium">View Details</th>
            </tr>
          </thead>
          <tbody>
            {results.map((result, index) => {
              const totalQuestions = result.totalQuestions;
              const passMark = Math.ceil(totalQuestions / 2);

              return (
                <tr key={index} className="border-b">
                  <td className="p-2 text-left">
                    {result.student.firstName} {result.student.lastName}
                  </td>
                  <td className="p-2 text-left">{result.exam.name}</td>
                  <td className="p-2">
                    {result.score} / {totalQuestions}
                  </td>
                  <td
                    className={`p-2 ${result.score >= passMark ? "text-green-600" : "text-red-600"}`}
                  >
                    {result.score >= passMark ? "Passed" : "Failed"}
                  </td>
                  <td className="p-2">
                    <Link
                      href={`/dashboard/results/${result._id}`}
                      className="inline-block rounded-md bg-blue-600 px-3 py-1.5 text-sm text-white hover:bg-blue-600/90"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* Mobile View Cards */}
        <div className="mt-6 flex w-full max-w-4xl flex-col gap-4 sm:hidden">
          {results.map((result, index) => {
            const totalQuestions = result.totalQuestions;
            const passMark = Math.ceil(totalQuestions / 2);
            return (
              <div
                key={index}
                className="flex flex-col gap-1 rounded-lg border bg-white p-4 text-left text-sm font-medium text-zinc-800"
              >
                <p>
                  <span className="font-normal text-zinc-500">
                    Student Name:
                  </span>{" "}
                  {result.student.firstName} {result.student.lastName}
                </p>
                <p>
                  <span className="font-normal text-zinc-500">Exam:</span>{" "}
                  {result.exam.name}
                </p>
                <p>
                  <span className="font-normal text-zinc-500">Score:</span>{" "}
                  {result.score} / {result.totalQuestions}
                </p>
                <p
                  className={`text-sm font-medium ${result.score >= passMark ? "text-green-600" : "text-red-600"}`}
                >
                  <span className="font-normal text-zinc-500">Remark:</span>{" "}
                  {result.score >= passMark ? "Passed" : "Failed"}
                </p>
                <div className="mt-2 flex gap-2">
                  <Link
                    href={`/dashboard/results/${result._id}`}
                    className="h-fit rounded-md bg-blue-500 px-3 py-1.5 text-sm text-white hover:bg-blue-500/90"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
