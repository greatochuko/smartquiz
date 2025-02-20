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
    const { updatedExam, error } = await registerForExam(examData._id, userId);
    if (error === null) {
      setExamData(updatedExam);
    }
    setLoading(false);
  }

  async function handleCancelRegistration() {
    setLoading(true);
    const { updatedExam, error } = await cancelExamRegistration(
      examData._id,
      userId
    );
    if (error === null) {
      setExamData(updatedExam);
    }
    setLoading(false);
  }

  const studentInExam = examData.students.find(
    (stu) => stu.user._id === userId
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
      <td className="p-2 w-2/5">{examData.name}</td>
      <td className="p-2 w-1/5">{format(examData.date, "PP")}</td>
      <td className={`p-2 w-1/5 text-sm capitalize ${statusColor}`}>
        {status}
      </td>
      <td className={`p-2 w-1/5 `}>
        {registered ? (
          <Link
            href={`/exam/${exam._id}/start`}
            className="h-fit hover:bg-green-50 text-green-600 text-sm rounded-md font-medium disabled:cursor-not-allowed p-2 duration-200 hover:text-green-700"
          >
            Take Exam
          </Link>
        ) : (
          <Button
            variant={"ghost"}
            className={`h-fit p-2 disabled:cursor-not-allowed duration-200 ${
              studentInExam
                ? "text-rose-500 hover:text-rose-600 hover:bg-rose-50"
                : "text-blue-600 hover:text-blue-700 hover:bg-blue-50"
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
