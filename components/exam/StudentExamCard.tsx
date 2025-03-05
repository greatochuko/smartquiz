"use client";
import React from "react";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { ExamType, StudentType } from "@/db/models/Exam";
import Link from "next/link";
import { getExamStatus } from "@/lib/utils";
import LoadingIndicator from "../LoadingIndicator";

export type StudentExamCardProps = {
  exam: ExamType;
  studentInExam?: StudentType;
  handleRegister(): void;
  handleCancelRegistration(): void;
  loading: boolean;
};

export default function StudentExamCard({
  exam,
  studentInExam,
  handleRegister,
  handleCancelRegistration,
  loading,
}: StudentExamCardProps) {
  const examStatus = getExamStatus(exam);

  const registered = studentInExam?.status === "registered";
  const submitted = studentInExam?.status === "submitted";

  const status = studentInExam?.status || "unregistered";

  const statusColor =
    status === "registered"
      ? "text-green-500"
      : status === "requested"
        ? "text-amber-500"
        : status === "unregistered"
          ? "text-zinc-500"
          : status === "submitted"
            ? "text-purple-500"
            : "text-rose-500";

  return (
    <div className="rounded-lg bg-white p-4 shadow-md">
      <h3 className="text-lg font-semibold">{exam.name}</h3>
      <p className="mb-1 text-gray-600">Date: {format(exam.date, "PPP")}</p>
      <p className={`mb-1 text-sm capitalize text-gray-600 ${statusColor}`}>
        {status}
      </p>
      {submitted && (
        <Link
          href={`/dashboard/results/${String(studentInExam.result)}`}
          className="inline-block h-fit rounded-md bg-purple-600 px-3 py-1.5 text-sm font-medium text-white duration-200 hover:bg-purple-50 hover:bg-purple-600/90 disabled:cursor-not-allowed"
        >
          View Result
        </Link>
      )}

      {registered &&
        !submitted &&
        (examStatus === "ready" ? (
          <Link
            href={`/dashboard/exams/${exam._id}/onboarding`}
            className="inline-block h-fit rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white duration-200 hover:bg-green-600/90 disabled:cursor-not-allowed"
          >
            Take Exam
          </Link>
        ) : (
          <button
            disabled
            className="inline-block h-fit rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white duration-200 hover:bg-green-600/90 disabled:cursor-not-allowed"
          >
            Take Exam
          </button>
        ))}

      {!registered && !submitted && (
        <Button
          variant={"ghost"}
          className={`h-fit p-2 text-white duration-200 disabled:cursor-not-allowed ${
            studentInExam
              ? "bg-rose-600 hover:bg-rose-600/90"
              : "bg-blue-600 hover:bg-blue-600/90"
          }`}
          size={"sm"}
          onClick={studentInExam ? handleCancelRegistration : handleRegister}
          disabled={examStatus !== "ready" || loading || registered}
        >
          {loading ? (
            <LoadingIndicator />
          ) : studentInExam ? (
            "Cancel Registration"
          ) : (
            "Register"
          )}
        </Button>
      )}
    </div>
  );
}
