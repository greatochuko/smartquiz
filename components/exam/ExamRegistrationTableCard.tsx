import React, { useState } from "react";
import { StudentType } from "@/db/models/Exam";
import { Button } from "../ui/button";
import {
  acceptRegistrationRequest,
  cancelExamRegistration,
  rejectRegistrationRequest,
} from "@/actions/examActions";

export default function ExamRegistrationTableCard({
  student,
  examId,
  setStudentList,
}: {
  student: StudentType;
  examId: string;
  setStudentList: React.Dispatch<React.SetStateAction<StudentType[]>>;
}) {
  const [studentData, setStudentData] = useState(student);
  const [acceptLoading, setAcceptLoading] = useState(false);
  const [rejectLoading, setRejectLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleAccept() {
    setAcceptLoading(true);
    const { error } = await acceptRegistrationRequest(examId, student.user._id);
    if (error === null) {
      setStudentData((curr) => ({ ...curr, status: "registered" }));
    }
    setAcceptLoading(false);
  }

  async function handleReject() {
    setRejectLoading(true);
    const { error } = await rejectRegistrationRequest(examId, student.user._id);
    if (error === null) {
      setStudentData((curr) => ({ ...curr, status: "rejected" }));
    }
    setRejectLoading(false);
  }

  async function handleRemoveStudent() {
    setLoading(true);
    const { error } = await cancelExamRegistration(examId, student.user._id);
    if (error === null) {
      setStudentList((curr) =>
        curr.filter((stu) => stu._id !== studentData._id),
      );
    }
    setLoading(false);
  }

  const anyLoading = acceptLoading || rejectLoading || loading;

  const statusColor =
    studentData.status === "registered"
      ? "text-green-500"
      : studentData.status === "requested"
        ? "text-amber-500"
        : "text-rose-500";

  return (
    <div
      key={student.user._id}
      className="rounded-lg border bg-white p-4 shadow-md"
    >
      <h2 className="text-lg font-semibold">
        {student.user.firstName} {student.user.lastName}
      </h2>
      <p className="text-gray-600">
        Status:{" "}
        <span className={`p-2 font-medium capitalize ${statusColor}`}>
          {student.status}
        </span>
      </p>
      <div className="mt-2 flex gap-2">
        {studentData.status === "requested" ? (
          <>
            <Button
              className="h-fit bg-green-600 px-3 py-1.5 hover:bg-green-600/90"
              size={"sm"}
              onClick={handleAccept}
              disabled={anyLoading}
            >
              {acceptLoading ? "Accepting..." : "Accept"}
            </Button>
            <Button
              className="h-fit bg-rose-600 px-3 py-1.5 hover:bg-rose-600/90"
              size={"sm"}
              onClick={handleReject}
              disabled={anyLoading}
            >
              {rejectLoading ? "Rejecting..." : "Reject"}
            </Button>
          </>
        ) : (
          <Button
            onClick={handleRemoveStudent}
            disabled={anyLoading}
            className="h-fit rounded-md bg-rose-600 px-3 py-1.5 text-white hover:bg-rose-600/90"
          >
            {loading ? "Removing..." : "Remove"}
          </Button>
        )}
      </div>
    </div>
  );
}
