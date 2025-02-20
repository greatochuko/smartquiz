"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { ExamType } from "@/db/models/Exam";
import { cancelExamRegistration, registerForExam } from "@/actions/examActions";
import LoadingIndicator from "../LoadingIndicator";
import Link from "next/link";

export default function StudentExamTableData({
  exam,
  userId,
}: {
  exam: ExamType;
  userId: string;
}) {
  const [examData, setExamData] = useState(exam);
  const [loading, setLoading] = useState(false);

  async function handleRegister() {
    setLoading(true);
    const { updatedExam } = await registerForExam(examData._id, userId);
    if (updatedExam) {
      setExamData(updatedExam);
    }
    setLoading(false);
  }

  async function handleCancelRegistration() {
    setLoading(true);
    const { updatedExam } = await cancelExamRegistration(examData._id, userId);
    if (updatedExam) {
      setExamData(updatedExam);
    }
    setLoading(false);
  }

  const studentInExam = examData.students.find(
    (stu) => stu.user._id === userId,
  );

  const registered = studentInExam?.status === "registered";

  const status = studentInExam?.status || "unregistered";

  const statusColor =
    status === "registered"
      ? "text-green-500"
      : status === "requested"
        ? "text-amber-500"
        : "text-rose-500";

  return (
    <tr className="border-b">
      <td className="w-2/5 p-2">{examData.name}</td>
      <td className="w-1/5 p-2">{format(examData.date, "PP")}</td>
      <td className={`w-1/5 p-2 text-sm capitalize ${statusColor}`}>
        {status}
      </td>
      <td className={`w-1/5 p-2`}>
        {registered ? (
          <Link
            href={`/exam/${exam._id}/start`}
            className="h-fit rounded-md p-2 text-sm font-medium text-green-600 duration-200 hover:bg-green-50 hover:text-green-700 disabled:cursor-not-allowed"
          >
            Take Exam
          </Link>
        ) : (
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
