"use client";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { format } from "date-fns";
import { ExamType } from "@/db/models/Exam";
import { registerForExam, cancelExamRegistration } from "@/actions/examActions";
import Link from "next/link";

export default function StudentExamCard({
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
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold">{exam.name}</h3>
      <p className="text-gray-600 mb-1">Date: {format(exam.date, "PPP")}</p>
      <p className={`text-gray-600 mb-1 capitalize text-sm ${statusColor}`}>
        {status}
      </p>
      {registered ? (
        <Link
          href={`/exam/${exam._id}/start`}
          className="h-fit text-white text-sm rounded-md font-medium disabled:cursor-not-allowed px-3 py-1.5 duration-200 bg-green-600 hover:bg-green-600/90"
        >
          Take Exam
        </Link>
      ) : (
        <Button
          variant={"default"}
          className={`h-fit disabled:cursor-not-allowed px-3 py-1.5 duration-200 ${
            studentInExam
              ? "hover:bg-rose-600/90 bg-rose-600"
              : "hover:bg-blue-600/90 bg-blue-600"
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
