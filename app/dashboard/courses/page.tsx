import Link from "next/link";
import React from "react";
import BackButton from "@/components/BackButton";
import AdminCoursesTable from "@/components/course/AdminCoursesTable";
import { getCoursesByExaminer } from "@/services/courseServices";

export default async function AdminCourseListPage() {
  const { data: courses } = await getCoursesByExaminer();

  return (
    <div className="flex flex-1 flex-col gap-4 p-6 px-[5%]">
      <div className="flex items-center justify-between">
        <BackButton />
        <h1 className="text-xl font-medium sm:text-2xl">Manage Courses</h1>
        <Link
          href={"/dashboard/exams/new"}
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white duration-200 hover:bg-blue-600/90"
        >
          Add Course
        </Link>
      </div>

      {courses.length > 0 ? (
        <AdminCoursesTable courses={courses} />
      ) : (
        <p className="rounded-md bg-white p-4 py-6 text-center text-muted-foreground shadow">
          You have not added any courses yet
        </p>
      )}
    </div>
  );
}
