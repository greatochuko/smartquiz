import { Button } from "@/components/ui/button";
import { fetchAdminExams } from "@/services/examServices";
import { format } from "date-fns";
import { PencilIcon, TrashIcon } from "lucide-react";
import Link from "next/link";

export default async function ViewExams() {
  const { data: exams, error } = await fetchAdminExams();

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

      {/* Desktop View - Table */}
      <div className="hidden sm:block ">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="text-left p-2 font-medium">Exam Name</th>
              <th className="text-left p-2 font-medium">Date</th>
              <th className="text-left p-2 font-medium">Students</th>
              <th className="text-left p-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {exams.map((exam) => (
              <tr key={exam.id} className="border-b">
                <td className="p-2">{exam.name}</td>
                <td className="p-2">{format(exam.date, "PPP")}</td>
                <td className="p-2">{exam.students.length}</td>
                <td className="p-2 flex gap-2">
                  <Link href={`/dashboard/exams/edit/${exam._id}`}>
                    <Button
                      variant={"ghost"}
                      className="h-fit p-2 hover:bg-blue-50"
                      size={"sm"}
                    >
                      <PencilIcon className="text-blue-600 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant={"ghost"}
                    className="h-fit p-2 hover:bg-rose-50"
                    size={"sm"}
                  >
                    <TrashIcon className="text-rose-600 w-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View - Cards */}
      <div className="sm:hidden flex flex-col gap-4">
        {exams.map((exam) => (
          <div
            key={exam.id}
            className="border p-4 rounded-lg shadow-md bg-white"
          >
            <h2 className="text-lg font-semibold">{exam.name}</h2>
            <p className="text-gray-600">Date: {format(exam.date, "PPP")}</p>
            <p className="text-gray-600">Students: {exam.students.length}</p>
            <div className="mt-2 flex gap-2">
              <Link href={`/dashboard/exams/edit/${exam._id}`}>
                <Button className="bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-700 h-fit">
                  Edit
                </Button>
              </Link>
              <Button className="bg-rose-600 text-white px-3 py-1.5 rounded-md hover:bg-rose-700 h-fit">
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
