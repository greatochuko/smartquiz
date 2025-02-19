import Link from "next/link";
import React from "react";
import ViewExamsPageContent from "./ViewExamsPageContent";
import { ExamType } from "@/db/models/Exam";

export default function AdminExamListPage({ exams }: { exams: ExamType[] }) {
  return (
    <div className="p-6 text-sm">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl sm:text-2xl font-semibold ">Manage Exams</h1>
        <Link
          href={"/dashboard/exams/new"}
          className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-600/90 duration-200"
        >
          Create Exam
        </Link>
      </div>

      {exams.length > 0 ? (
        <ViewExamsPageContent exams={exams} />
      ) : (
        <p className="text-muted-foreground text-center">
          You have not created any exams yet
        </p>
      )}
    </div>
  );
}
