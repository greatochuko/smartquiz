import Link from "next/link";
import React from "react";
import AdminExamsTable from "./AdminExamsTable";
import { ExamType } from "@/db/models/Exam";
import BackButton from "../BackButton";
import { CourseType } from "@/db/models/Course";

export default function AdminExamListPage({
  exams,
  course,
}: {
  exams: ExamType[];
  course: CourseType;
}) {
  return (
    <div className="flex flex-1 flex-col gap-4 p-6 px-[5%]">
      <div className="flex items-center justify-between">
        <BackButton />
        <h1 className="text-xl font-medium sm:text-2xl">
          Manage Exams for {course.name}
        </h1>
        <Link
          href={`/dashboard/courses/${course._id}/new`}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white duration-200 hover:bg-blue-600/90"
        >
          Create Exam
        </Link>
      </div>

      {exams.length > 0 ? (
        <AdminExamsTable exams={exams} courseId={course._id} />
      ) : (
        <p className="rounded-md bg-white p-4 py-6 text-center text-muted-foreground shadow">
          You have not created any exams yet
        </p>
      )}
    </div>
  );
}
