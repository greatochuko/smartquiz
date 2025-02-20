import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { PencilIcon, TrashIcon, UserIcon } from "lucide-react";
import { StudentType } from "@/db/models/Exam";

export default function StudentEnrollmentTable({
  students,
}: {
  students: StudentType[];
}) {
  return (
    <>
      {/* Desktop View - Table */}
      <div className="hidden sm:block ">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="text-left p-2 font-medium">Name</th>
              <th className="text-left p-2 font-medium">Status</th>
              <th className="text-left p-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.user._id} className="border-b">
                <td className="p-2">
                  {student.user.firstName} {student.user.lastName}
                </td>
                <td className="p-2">{student.status}</td>
                <td className="p-2 flex gap-2">
                  <Link href={`/dashboard/exams/${student.user._id}/edit`}>
                    <Button
                      variant={"ghost"}
                      className="h-fit p-2 hover:bg-blue-50"
                      size={"sm"}
                    >
                      <PencilIcon className="text-blue-600 w-4 h-4" />
                    </Button>
                  </Link>
                  <Button
                    variant={"ghost"}
                    className="h-fit p-2 hover:bg-rose-50"
                    size={"sm"}
                  >
                    <TrashIcon className="text-rose-600 w-4 h-4" />
                  </Button>
                  <Link href={`/dashboard/exams/${student.user._id}/students`}>
                    <Button
                      variant={"ghost"}
                      className="h-fit p-2 hover:bg-amber-50"
                      size={"sm"}
                    >
                      <UserIcon className="text-amber-600 w-4 h-4" />
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile View - Cards */}
      <div className="sm:hidden flex flex-col gap-4">
        {students.map((student) => (
          <div
            key={student.user._id}
            className="border p-4 rounded-lg shadow-md bg-white"
          >
            <h2 className="text-lg font-semibold">
              {student.user.firstName} {student.user.lastName}
            </h2>
            <p className="text-gray-600">Status: {student.status}</p>
            <div className="mt-2 flex gap-2">
              <Link href={`/dashboard/exams/${student.user._id}/edit`}>
                <Button className="bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-600/90 h-fit">
                  Edit
                </Button>
              </Link>
              <Button className="bg-rose-600 text-white px-3 py-1.5 rounded-md hover:bg-rose-600/90 h-fit">
                Delete
              </Button>
              <Link href={`/dashboard/exams/${student.user._id}/edit`}>
                <Button className="bg-amber-600 text-white px-3 py-1.5 rounded-md hover:bg-amber-600/90 h-fit">
                  Students
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
