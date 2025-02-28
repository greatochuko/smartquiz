"use client";
import React, { useState } from "react";
import { ExamType } from "@/db/models/Exam";
import StudentExamTableData from "./StudentExamTableData";
import StudentExamCard from "./StudentExamCard";
import { registerForExam, cancelExamRegistration } from "@/actions/examActions";

export default function StudentExamsTable({
  exams,
  userId,
}: {
  exams: ExamType[];
  userId: string;
}) {
  const [examList, setExamList] = useState(exams);
  const [loading, setLoading] = useState(false);

  async function handleRegister(examId: string) {
    setLoading(true);
    const { updatedExam } = await registerForExam(examId, userId);
    if (updatedExam) {
      setExamList((curr) =>
        curr.map((exam) => (exam._id === examId ? updatedExam : exam)),
      );
    }
    setLoading(false);
  }

  async function handleCancelRegistration(examId: string) {
    setLoading(true);
    const { updatedExam } = await cancelExamRegistration(examId, userId);
    if (updatedExam) {
      setExamList((curr) =>
        curr.map((exam) => (exam._id === examId ? updatedExam : exam)),
      );
    }
    setLoading(false);
  }

  return (
    <>
      <div className="hidden rounded-lg bg-white p-6 shadow-md sm:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2 text-left font-medium">Exam Name</th>
              <th className="p-2 text-left font-medium">Date</th>
              <th className="p-2 text-left font-medium">Status</th>
              <th className="p-2 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {examList.slice(0, 5).map((exam) => (
              <StudentExamTableData
                exam={exam}
                key={exam._id}
                handleRegister={() => handleRegister(exam._id)}
                handleCancelRegistration={() =>
                  handleCancelRegistration(exam._id)
                }
                loading={loading}
                studentInExam={exam.students.find(
                  (student) => student.user._id === userId,
                )}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="space-y-4 sm:hidden">
        {examList.slice(0, 5).map((exam) => (
          <StudentExamCard
            exam={exam}
            key={exam._id}
            handleRegister={() => handleRegister(exam._id)}
            handleCancelRegistration={() => handleCancelRegistration(exam._id)}
            loading={loading}
            studentInExam={exam.students.find(
              (student) => student.user._id === userId,
            )}
          />
        ))}
      </div>
    </>
  );
}
