import React from "react";
import { getCoursesByExaminer } from "@/services/courseServices";
import AdminCourseListPage from "@/components/course/AdminCourseListPage";

export default async function page() {
  const { data: courses } = await getCoursesByExaminer();

  return <AdminCourseListPage courses={courses} />;
}
