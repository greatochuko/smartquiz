import ExamRegistrationTable from "@/components/exam/ExamRegistrationTable";
import { getExamById } from "@/services/examServices";
import { notFound } from "next/navigation";
import React from "react";

export default async function ExamStudentEnrollmentPage({
  params,
}: {
  params: Promise<{ examId: string }>;
}) {
  const { examId } = await params;
  const { data: exam } = await getExamById(examId);

  if (!exam) notFound();

  return (
    <div className="p-6 text-sm">
      <h1 className="text-xl sm:text-2xl font-medium mb-4">
        Exam Students for <span className="font-bold">{exam.name}</span>
      </h1>

      {exam.students.length > 0 ? (
        <ExamRegistrationTable students={exam.students} examId={exam._id} />
      ) : (
        <p className="text-muted-foreground text-center p-4">
          No students have requested enrollment for this exam
        </p>
      )}
    </div>
  );
}
