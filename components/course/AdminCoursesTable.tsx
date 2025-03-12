"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { TrashIcon } from "lucide-react";
import Link from "next/link";
import { deleteExam } from "@/actions/examActions";
import LoadingIndicator from "../LoadingIndicator";
import Error from "../Error";
import { CourseType } from "@/db/models/Course";

export default function AdminCoursesTable({
  courses,
}: {
  courses: CourseType[];
}) {
  const [courseList, setCourseList] = useState(courses);
  const [courseToDelete, setCourseToDelete] = useState<CourseType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleDeleteCourse() {
    if (!courseToDelete) return;
    setLoading(true);
    const { error } = await deleteExam(courseToDelete._id);
    if (error) {
      setError(error);
    } else {
      setCourseList((curr) =>
        curr.filter((exam) => exam._id !== courseToDelete._id),
      );
      setCourseToDelete(null);
    }
    setLoading(false);
  }
  return (
    <>
      {/* Desktop View - Table */}
      <div className="hidden rounded-md bg-white shadow-md sm:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2 pl-4 text-left font-medium">Course Name</th>
              <th className="p-2 text-left font-medium">Date Created</th>

              <th className="p-2 pr-4 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courseList.map((course) => (
              <tr key={course._id} className="border-b">
                <td className="p-2 pl-4">
                  <span className="line-clamp-1">
                    <Link
                      href={`/dashboard/courses/${course._id}`}
                      className="font-medium hover:underline"
                    >
                      {course.name}
                    </Link>
                  </span>
                </td>
                <td className="p-2">{format(course.createdAt, "PPP")}</td>
                <td className="flex items-center gap-2 p-2 pr-4">
                  <Button
                    variant={"ghost"}
                    className="h-fit p-2 hover:bg-rose-50"
                    size={"sm"}
                    onClick={() => setCourseToDelete(course)}
                  >
                    <TrashIcon className="h-4 w-4 text-rose-600" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View - Cards */}
      <div className="flex flex-col gap-4 sm:hidden">
        {courseList.map((exam) => (
          <div
            key={exam._id}
            className="flex flex-col gap-1 rounded-lg border bg-white p-4 shadow-md"
          >
            <h2 className="text-lg font-medium">{exam.name}</h2>
            <p className="text-gray-600">
              Date Created: {format(exam.createdAt, "PPP")}
            </p>
            <div className="mt-2 flex gap-2">
              <Link href={`/dashboard/exams/${exam._id}/edit`}>
                <Button className="h-fit rounded-md bg-blue-500 px-3 py-1.5 text-white hover:bg-blue-500/90">
                  Edit
                </Button>
              </Link>
              <Button
                onClick={() => setCourseToDelete(exam)}
                className="h-fit rounded-md bg-rose-500 px-3 py-1.5 text-white hover:bg-rose-500/90"
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Delete Course Modal */}
      {courseToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 text-center">
          <div className="rounded-lg bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-semibold">Confirm Delete</h2>
            <p>
              Are you sure you want to delete{" "}
              <span className="font-semibold">{courseToDelete.name}</span>?
            </p>
            <Error message={error} />
            <div className="mt-4 flex justify-end">
              <button
                className="mr-2 rounded border bg-gray-100 px-4 py-2 font-medium duration-200 hover:bg-gray-200"
                onClick={() => setCourseToDelete(null)}
              >
                Cancel
              </button>
              <button
                disabled={loading}
                className="rounded bg-rose-600 px-4 py-2 font-medium text-white duration-200 hover:bg-rose-600/90"
                onClick={handleDeleteCourse}
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
