"use client";
import React from "react";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { ExamType, StudentType } from "@/db/models/Exam";
import Link from "next/link";

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
  const registered = studentInExam?.status === "registered";

  const status = studentInExam?.status || "unregistered";

  const statusColor =
    status === "registered"
      ? "text-green-500"
      : status === "requested"
        ? "text-amber-500"
        : "text-rose-500";

  return (
    <div className="rounded-lg bg-white p-4 shadow-md">
      <h3 className="text-lg font-semibold">{exam.name}</h3>
      <p className="mb-1 text-gray-600">Date: {format(exam.date, "PPP")}</p>
      <p className={`mb-1 text-sm capitalize text-gray-600 ${statusColor}`}>
        {status}
      </p>
      {registered ? (
        <Link
          href={`/dashboard/exams/${exam._id}/onboarding`}
          className="h-fit rounded-md bg-green-600 px-3 py-1.5 text-sm font-medium text-white duration-200 hover:bg-green-600/90 disabled:cursor-not-allowed"
        >
          Take Exam
        </Link>
      ) : (
        <Button
          variant={"default"}
          className={`h-fit px-3 py-1.5 duration-200 disabled:cursor-not-allowed ${
            studentInExam
              ? "bg-rose-600 hover:bg-rose-600/90"
              : "bg-blue-600 hover:bg-blue-600/90"
          }`}
          size={"sm"}
          onClick={studentInExam ? handleCancelRegistration : handleRegister}
          disabled={loading || registered}
        >
          {studentInExam
            ? loading
              ? "Canceling..."
              : "Cancel Registration"
            : loading
              ? "Registering..."
              : "Register"}
        </Button>
      )}
    </div>
  );
}
