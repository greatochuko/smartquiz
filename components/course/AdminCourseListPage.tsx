"use client";

import React, { useState } from "react";
import BackButton from "@/components/BackButton";
import AdminCoursesTable from "@/components/course/AdminCoursesTable";
import AddCourseButton from "@/components/course/AddCourseButton";
import { CourseType } from "@/db/models/Course";

export default function AdminCourseListPage({
  courses,
}: {
  courses: CourseType[];
}) {
  const [courseList, setCourseList] = useState(courses);

  return (
    <div className="flex flex-1 flex-col gap-4 p-6 px-[5%]">
      <div className="flex items-center justify-between">
        <BackButton />
        <h1 className="text-xl font-medium sm:text-2xl">Manage Courses</h1>
        <AddCourseButton
          addNewCourse={(newCourse: CourseType) =>
            setCourseList((curr) => [newCourse, ...curr])
          }
        />
      </div>

      {courseList.length > 0 ? (
        <AdminCoursesTable courses={courseList} />
      ) : (
        <p className="rounded-md bg-white p-4 py-6 text-center text-muted-foreground shadow">
          You have not added any courses yet
        </p>
      )}
    </div>
  );
}
