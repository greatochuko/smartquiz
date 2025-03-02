"use client";
import React from "react";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { ExamType, StudentType } from "@/db/models/Exam";
import LoadingIndicator from "../LoadingIndicator";
import Link from "next/link";

export type StudentExamTableDataProps = {
  exam: ExamType;
  studentInExam?: StudentType;
  handleRegister(): void;
  handleCancelRegistration(): void;
  loading: boolean;
};

export default function StudentExamTableData({
  exam,
  handleCancelRegistration,
  handleRegister,
  loading,
  studentInExam,
}: StudentExamTableDataProps) {
  const registered = studentInExam?.status === "registered";

  const submitted = studentInExam?.status === "submitted";

  const status = studentInExam?.status || "unregistered";

  console.log({ status });

  const statusColor =
    status === "registered"
      ? "bg-green-500"
      : status === "requested"
        ? "bg-amber-500"
        : status === "unregistered"
          ? "bg-zinc-500"
          : status === "submitted"
            ? "bg-purple-500"
            : "bg-rose-500";

  return (
    <tr className="border-b">
      <td className="w-2/5 p-2">{exam.name}</td>
      <td className="w-1/5 p-2">{format(exam.date, "PP")}</td>
      <td className="w-1/5 p-2">
        <span
          className={`rounded-full p-1 px-2 text-sm capitalize text-white ${statusColor}`}
        >
          {status}
        </span>
      </td>
      <td className={`w-1/5 p-2`}>
        {submitted && (
          <Link
            href={`/dashboard/result`}
            className="h-fit rounded-md p-2 text-sm font-medium text-purple-600 duration-200 hover:bg-purple-50 hover:text-purple-700 disabled:cursor-not-allowed"
          >
            View Result
          </Link>
        )}

        {registered && !submitted && (
          <Link
            href={`/dashboard/exams/${exam._id}/onboarding`}
            className="h-fit rounded-md p-2 text-sm font-medium text-green-600 duration-200 hover:bg-green-50 hover:text-green-700 disabled:cursor-not-allowed"
          >
            Take Exam
          </Link>
        )}

        {!registered && !submitted && (
          <Button
            variant={"ghost"}
            className={`h-fit p-2 duration-200 disabled:cursor-not-allowed ${
              studentInExam
                ? "text-rose-500 hover:bg-rose-50 hover:text-rose-600"
                : "text-blue-600 hover:bg-blue-50 hover:text-blue-700"
            }`}
            size={"sm"}
            onClick={studentInExam ? handleCancelRegistration : handleRegister}
            disabled={loading || registered}
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
      </td>
    </tr>
  );
}
