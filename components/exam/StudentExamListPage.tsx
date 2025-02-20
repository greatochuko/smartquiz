import { ExamType } from "@/db/models/Exam";
import React from "react";
import StudentExamsTable from "./StudentExamsTable";
import { getSession } from "@/services/authServices";
import { redirect } from "next/navigation";

export default async function StudentExamListPage({
  exams,
}: {
  exams: ExamType[];
}) {
  const user = await getSession();
  if (!user) redirect("/login");

  return (
    <div className="screen-container">
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">All Exams</h2>
        <StudentExamsTable exams={exams} userId={user._id} />
      </section>
    </div>
  );
}
