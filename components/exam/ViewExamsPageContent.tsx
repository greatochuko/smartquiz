"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { PencilIcon, TrashIcon, UserIcon } from "lucide-react";
import { ExamType } from "@/db/models/Exam";
import Link from "next/link";
import { deleteExam } from "@/actions/examActions";
import LoadingIndicator from "../LoadingIndicator";
import Error from "../Error";

export default function ViewExamsPageContent({ exams }: { exams: ExamType[] }) {
  const [examList, setExamList] = useState(exams);
  const [examToDelete, setExamToDelete] = useState<ExamType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleDeleteExam() {
    if (!examToDelete) return;
    setLoading(true);
    const { error } = await deleteExam(examToDelete._id);
    if (error) {
      setError(error);
    } else {
      setExamList((curr) =>
        curr.filter((exam) => exam._id !== examToDelete._id)
      );
      setExamToDelete(null);
    }
    setLoading(false);
  }

  return (
    <>
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
            {examList.map((exam) => (
              <tr key={exam._id} className="border-b">
                <td className="p-2">{exam.name}</td>
                <td className="p-2">{format(exam.date, "PPP")}</td>
                <td className="p-2">{exam.students.length}</td>
                <td className="p-2 flex gap-2">
                  <Link href={`/dashboard/exams/${exam._id}/edit`}>
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
                    onClick={() => setExamToDelete(exam)}
                  >
                    <TrashIcon className="text-rose-600 w-4 h-4" />
                  </Button>
                  <Link href={`/dashboard/exams/${exam._id}/students`}>
                    <Button
                      variant={"ghost"}
                      className="h-fit p-2 hover:bg-amber-50"
                      size={"sm"}
                      onClick={() => setExamToDelete(exam)}
                    >
                      <UserIcon className="text-amber-600 w-4 h-4" />
                    </Button>{" "}
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View - Cards */}
      <div className="sm:hidden flex flex-col gap-4">
        {examList.map((exam) => (
          <div
            key={exam._id}
            className="border p-4 rounded-lg shadow-md bg-white"
          >
            <h2 className="text-lg font-semibold">{exam.name}</h2>
            <p className="text-gray-600">Date: {format(exam.date, "PPP")}</p>
            <p className="text-gray-600">Students: {exam.students.length}</p>
            <div className="mt-2 flex gap-2">
              <Link href={`/dashboard/exams/${exam._id}/edit`}>
                <Button className="bg-blue-600 text-white px-3 py-1.5 rounded-md hover:bg-blue-600/90 h-fit">
                  Edit
                </Button>
              </Link>
              <Button
                onClick={() => setExamToDelete(exam)}
                className="bg-rose-600 text-white px-3 py-1.5 rounded-md hover:bg-rose-600/90 h-fit"
              >
                Delete
              </Button>
              <Link href={`/dashboard/exams/${exam._id}/students`}>
                <Button className="bg-amber-600 text-white px-3 py-1.5 rounded-md hover:bg-amber-600/90 h-fit">
                  Students
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Course Modal */}
      {examToDelete && (
        <div className="fixed inset-0 flex items-center text-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Confirm Delete</h2>
            <p>
              Are you sure you want to delete{" "}
              <span className="font-semibold">{examToDelete.name}</span>?
            </p>
            <Error message={error} />
            <div className="mt-4 flex justify-end">
              <button
                className="bg-gray-100 hover:bg-gray-200 duration-200 border font-medium px-4 py-2 rounded mr-2"
                onClick={() => setExamToDelete(null)}
              >
                Cancel
              </button>
              <button
                disabled={loading}
                className="bg-rose-600 hover:bg-rose-600/90 duration-200 font-medium text-white px-4 py-2 rounded"
                onClick={handleDeleteExam}
              >
                {loading ? <LoadingIndicator color="#fff" /> : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
