"use client";
import React, { useState } from "react";
import { StudentType } from "@/db/models/Exam";
import ExamRegistrationTableData from "./ExamRegistrationTableData";
import ExamRegistrationTableCard from "./ExamRegistrationTableCard";

export default function ExamRegistrationTable({
  students,
  examId,
}: {
  students: StudentType[];
  examId: string;
}) {
  const [studentList, setStudentList] = useState(students);

  return (
    <>
      {/* Desktop View - Table */}
      <div className="hidden sm:block ">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b bg-gray-100">
              <th className="text-left p-2 font-medium">Name</th>
              <th className="text-left p-2 font-medium">Status</th>
              <th className="text-left p-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {studentList.map((student) => (
              <ExamRegistrationTableData
                student={student}
                key={student._id}
                examId={examId}
                setStudentList={setStudentList}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View - Cards */}
      <div className="sm:hidden flex flex-col gap-4">
        {studentList.map((student) => (
          <ExamRegistrationTableCard
            student={student}
            key={student._id}
            examId={examId}
            setStudentList={setStudentList}
          />
        ))}
      </div>
    </>
  );
}
