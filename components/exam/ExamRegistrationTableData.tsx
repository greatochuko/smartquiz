import React, { useState } from "react";
import { StudentType } from "@/db/models/Exam";
import { Button } from "../ui/button";
import LoadingIndicator from "../LoadingIndicator";
import {
  acceptRegistrationRequest,
  cancelExamRegistration,
  rejectRegistrationRequest,
} from "@/actions/examActions";

export default function ExamRegistrationTableData({
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
        curr.filter((stu) => stu._id !== studentData._id)
      );
    }
    setLoading(false);
  }

  const statusColor =
    studentData.status === "registered"
      ? "text-green-500"
      : studentData.status === "requested"
      ? "text-amber-500"
      : "text-rose-500";

  return (
    <tr className="border-b">
      <td className="p-2 w-2/4">
        {studentData.user.firstName} {studentData.user.lastName}
      </td>
      <td className={`p-2 w-1/4 capitalize ${statusColor}`}>
        {studentData.status}
      </td>
      <td className="p-2 w-1/4 flex gap-2">
        {studentData.status === "requested" ? (
          <>
            <Button
              variant={"ghost"}
              className="h-fit p-2 hover:bg-green-50 text-green-600 hover:text-green-700"
              size={"sm"}
              onClick={handleAccept}
              disabled={acceptLoading}
            >
              {acceptLoading ? <LoadingIndicator color="#16a34a " /> : "Accept"}
            </Button>
            <Button
              variant={"ghost"}
              className="h-fit p-2 hover:bg-rose-50 text-rose-500 hover:text-rose-600"
              size={"sm"}
              onClick={handleReject}
              disabled={rejectLoading}
            >
              {rejectLoading ? <LoadingIndicator color="#f43f5e " /> : "Reject"}
            </Button>
          </>
        ) : (
          <Button
            variant={"ghost"}
            className="h-fit p-2 hover:bg-rose-50 text-rose-500 hover:text-rose-600"
            size={"sm"}
            onClick={handleRemoveStudent}
            disabled={loading}
          >
            {rejectLoading ? <LoadingIndicator color="#f43f5e " /> : "Remove"}
          </Button>
        )}
      </td>
    </tr>
  );
}
