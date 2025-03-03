import BackButton from "@/components/BackButton";
import { getGrade } from "@/lib/utils";
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

  const totalQuestions = result.totalQuestions;
  const scorePercentage = Math.floor((result.score / totalQuestions) * 100);

  const examIsPassed = scorePercentage >= 50;

  return (
    <div className="flex flex-1 flex-col items-center justify-center p-4">
      <div className="flex w-full max-w-2xl flex-col gap-6 rounded-lg bg-white p-4 text-center shadow-lg sm:p-6">
        <div className="flex-col gap-2 font-medium">
          <h1 className="text-lg sm:text-xl">
            Exam Results for {result.student.firstName}{" "}
            {result.student.lastName}
          </h1>
          <p>
            <span className="font-normal text-gray-600">Exam:</span>{" "}
            {result.exam.name}
          </p>
          <p>
            <span className="font-normal text-gray-600">Exam Date:</span>{" "}
            {new Date(result.exam.date).toDateString()}
          </p>
        </div>

        <div
          className={`rounded-lg p-4 text-lg font-medium ${examIsPassed ? "bg-green-100" : "bg-red-100"}`}
        >
          <p>
            <span className="font-normal text-gray-600">Score:</span>{" "}
            {result.score} / {totalQuestions}
          </p>
          <p>
            <span className="font-normal text-gray-600">Percentage:</span>{" "}
            {scorePercentage}%
          </p>
          <p className={` ${examIsPassed ? "text-green-600" : "text-red-600"}`}>
            {examIsPassed ? "Passed" : "Failed"}
          </p>
          <p>
            <span className="font-normal text-gray-600">Grade:</span>{" "}
            {getGrade(scorePercentage)}
          </p>
        </div>

        <div className="flex justify-between gap-4">
          <BackButton />
          <Link
            href="/dashboard"
            className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
          >
            Back to Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
