"use client";
import React, { useState } from "react";
import { StudentType } from "@/db/models/Exam";
import ExamRegistrationTableData from "./ExamRegistrationTableData";
import ExamRegistrationCard from "./ExamRegistrationCard";
import {
  acceptRegistrationRequest,
  cancelExamRegistration,
  rejectRegistrationRequest,
} from "@/actions/examActions";

export default function ExamRegistrationTable({
  students,
  examId,
}: {
  students: StudentType[];
  examId: string;
}) {
  const [studentList, setStudentList] = useState(students);
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  const anyLoading = acceptLoading || rejectLoading || loading;

  async function handleAccept(studentId: string) {
    setAcceptLoading(true);
    const { error } = await acceptRegistrationRequest(examId, studentId);
    if (error === null) {
      setStudentList((curr) =>
        curr.map((student) =>
          student.user._id === studentId
            ? { ...student, status: "registered" }
            : student,
        ),
      );
    }
    setAcceptLoading(false);
  }

  async function handleReject(studentId: string) {
    setRejectLoading(true);
    const { error } = await rejectRegistrationRequest(examId, studentId);
    if (error === null) {
      setStudentList((curr) =>
        curr.map((student) =>
          student.user._id === studentId
            ? { ...student, status: "rejected" }
            : student,
        ),
      );
    }
    setRejectLoading(false);
  }

  async function handleRemoveStudent(studentId: string) {
    setLoading(true);
    const { error } = await cancelExamRegistration(examId, studentId);
    if (error === null) {
      setStudentList((curr) =>
        curr.filter((student) => student.user._id !== studentId),
      );
    }
    setLoading(false);
  }

  if (studentList.length <= 0) {
    return (
      <p className="rounded-md bg-white p-4 py-6 text-center text-muted-foreground shadow">
        No students have requested enrollment for this exam
      </p>
    );
  }

  return (
    <>
      {/* Desktop View - Table */}
      <div className="hidden rounded-md bg-white shadow-md sm:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="p-2 pl-4 text-left font-medium">Name</th>
              <th className="p-2 text-left font-medium">Status</th>
              <th className="p-2 pr-4 text-left font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {studentList.map((student) => (
              <ExamRegistrationTableData
                student={student}
                key={student._id}
                loading={{ anyLoading, acceptLoading, rejectLoading }}
                handleReject={() => handleReject(student.user._id)}
                handleAccept={() => handleAccept(student.user._id)}
                handleRemoveStudent={() =>
                  handleRemoveStudent(student.user._id)
                }
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View - Cards */}
      <div className="flex flex-col gap-4 sm:hidden">
        {studentList.map((student) => (
          <ExamRegistrationCard
            student={student}
            key={student._id}
            loading={{ anyLoading, acceptLoading, rejectLoading }}
            handleReject={() => handleReject(student.user._id)}
            handleAccept={() => handleAccept(student.user._id)}
            handleRemoveStudent={() => handleRemoveStudent(student.user._id)}
          />
        ))}
      </div>
    </>
  );
}
