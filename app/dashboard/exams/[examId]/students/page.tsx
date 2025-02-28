import BackButton from "@/components/BackButton";
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
    <div className="flex flex-col gap-4 p-6 px-[5%] text-sm">
      <div className="flex justify-between gap-4">
        <h1 className="text-xl font-medium sm:text-2xl">
          Exam Students for <span className="font-bold">{exam.name}</span>
        </h1>
        <BackButton />
      </div>

      <ExamRegistrationTable students={exam.students} examId={exam._id} />
    </div>
  );
}
