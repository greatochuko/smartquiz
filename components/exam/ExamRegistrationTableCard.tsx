import React from "react";
import { StudentType } from "@/db/models/Exam";
import Link from "next/link";
import { Button } from "../ui/button";

export default function ExamRegistrationTableCard({
  student,
}: {
  student: StudentType;
}) {
  const statusColor =
    student.status === "registered"
      ? "text-green-500"
      : student.status === "requested"
      ? "text-amber-500"
      : "text-rose-500";
  return (
    <div
      key={student.user._id}
      className="border p-4 rounded-lg shadow-md bg-white"
    >
      <h2 className="text-lg font-semibold">
        {student.user.firstName} {student.user.lastName}
      </h2>
      <p className="text-gray-600">
        Status:{" "}
        <span className={`p-2 capitalize ${statusColor}`}>
          {student.status}
        </span>
      </p>
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
  );
}
