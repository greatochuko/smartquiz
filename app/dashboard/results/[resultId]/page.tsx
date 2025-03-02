import { getResultById } from "@/services/resultServices";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

export default async function StudentResultPage({
  params,
}: {
  params: Promise<{ resultId: string }>;
}) {
  const { resultId } = await params;
  const { result } = await getResultById(resultId);
  if (!result) notFound();

  const totalQuestions = result.exam.questions.length;

  const passMark = Math.ceil(totalQuestions / 2);

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="flex w-full max-w-2xl flex-col gap-6 rounded-lg bg-white p-6 text-center shadow-lg">
        <h1 className="text-2xl font-bold">
          {result.exam.name || "Exam Results"}
        </h1>
        <p className="text-gray-600">
          Exam Date: {new Date(result.exam.date).toDateString()}
        </p>

        <div className="rounded-lg bg-gray-200 p-4">
          <p className="text-xl font-semibold">
            Score: {result.score} / {totalQuestions}
          </p>
          <p
            className={`text-lg font-semibold ${result.score >= passMark ? "text-green-600" : "text-red-600"}`}
          >
            {result.score >= passMark ? "Passed" : "Failed"}
          </p>
        </div>

        <Link
          href="/dashboard"
          className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
        >
          Back to Dashboard
        </Link>
      </div>
    </div>
  );
}
