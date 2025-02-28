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

export default function AdminExamsTable({ exams }: { exams: ExamType[] }) {
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
        curr.filter((exam) => exam._id !== examToDelete._id),
      );
      setExamToDelete(null);
    }
    setLoading(false);
  }

  const getRegisteredStudents = (exam: ExamType) => {
    return exam.students.filter((student) => student.status === "registered")
      .length;
  };

  const getUnRegisteredStudents = (exam: ExamType) => {
    return exam.students.filter((student) => student.status !== "registered")
      .length;
  };

  return (
    <>
      {/* Desktop View - Table */}
      <div className="hidden rounded-md bg-white shadow-md sm:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="w-1/5 p-2 pl-4 text-left font-medium">
                Exam Name
              </th>
              <th className="w-1/5 p-2 text-left font-medium">Date</th>
              <th className="w-1/5 p-2 text-left font-medium">
                Registered Students
              </th>
              <th className="w-1/5 p-2 text-left font-medium">
                Pending Students
              </th>
              <th className="w-1/5 p-2 pr-4 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {examList.map((exam) => (
              <tr key={exam._id} className="border-b">
                <td className="p-2 pl-4">
                  <span className="line-clamp-1">{exam.name}</span>
                </td>
                <td className="p-2">{format(exam.date, "PPP")}</td>
                <td className="p-2">{getRegisteredStudents(exam)}</td>
                <td className="p-2">{getUnRegisteredStudents(exam)}</td>
                <td className="flex gap-2 p-2 pr-4">
                  <Link href={`/dashboard/exams/${exam._id}/edit`}>
                    <Button
                      variant={"ghost"}
                      className="h-fit p-2 hover:bg-blue-50"
                      size={"sm"}
                    >
                      <PencilIcon className="h-4 w-4 text-blue-600" />
                    </Button>
                  </Link>
                  <Button
                    variant={"ghost"}
                    className="h-fit p-2 hover:bg-rose-50"
                    size={"sm"}
                    onClick={() => setExamToDelete(exam)}
                  >
                    <TrashIcon className="h-4 w-4 text-rose-600" />
                  </Button>
                  <Link href={`/dashboard/exams/${exam._id}/students`}>
                    <Button
                      variant={"ghost"}
                      className="h-fit p-2 hover:bg-amber-50"
                      size={"sm"}
                    >
                      <UserIcon className="h-4 w-4 text-amber-600" />
                    </Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View - Cards */}
      <div className="flex flex-col gap-4 sm:hidden">
        {examList.map((exam) => (
          <div
            key={exam._id}
            className="flex flex-col gap-1 rounded-lg border bg-white p-4 shadow-md"
          >
            <h2 className="text-lg font-medium">{exam.name}</h2>
            <p className="text-gray-600">Date: {format(exam.date, "PPP")}</p>
            <p className="text-gray-600">Students: {exam.students.length}</p>
            <div className="mt-2 flex gap-2">
              <Link href={`/dashboard/exams/${exam._id}/edit`}>
                <Button className="h-fit rounded-md bg-blue-500 px-3 py-1.5 text-white hover:bg-blue-500/90">
                  Edit
                </Button>
              </Link>
              <Button
                onClick={() => setExamToDelete(exam)}
                className="h-fit rounded-md bg-rose-500 px-3 py-1.5 text-white hover:bg-rose-500/90"
              >
                Delete
              </Button>
              <Link href={`/dashboard/exams/${exam._id}/edit`}>
                <Button className="h-fit rounded-md bg-amber-500 px-3 py-1.5 text-white hover:bg-amber-500/90">
                  Students
                </Button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Course Modal */}
      {examToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 text-center">
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Confirm Delete</h2>
            <p>
              Are you sure you want to delete{" "}
              <span className="font-semibold">{examToDelete.name}</span>?
            </p>
            <Error message={error} />
            <div className="mt-4 flex justify-end">
              <button
                className="mr-2 rounded border bg-gray-100 px-4 py-2 font-medium duration-200 hover:bg-gray-200"
                onClick={() => setExamToDelete(null)}
              >
                Cancel
              </button>
              <button
                disabled={loading}
                className="rounded bg-rose-600 px-4 py-2 font-medium text-white duration-200 hover:bg-rose-600/90"
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
