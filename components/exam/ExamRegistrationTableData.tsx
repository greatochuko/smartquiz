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
    <tr className="border-b">
      <td className="w-2/4 p-2">
        {studentData.user.firstName} {studentData.user.lastName}
      </td>
      <td className={`w-1/4 p-2 capitalize ${statusColor}`}>
        {studentData.status}
      </td>
      <td className="flex w-1/4 gap-2 p-2">
        {studentData.status === "requested" ? (
          <>
            <Button
              variant={"ghost"}
              className="h-fit p-2 text-green-600 hover:bg-green-50 hover:text-green-700"
              size={"sm"}
              onClick={handleAccept}
              disabled={anyLoading}
            >
              {acceptLoading ? <LoadingIndicator color="#16a34a " /> : "Accept"}
            </Button>
            <Button
              variant={"ghost"}
              className="h-fit p-2 text-rose-500 hover:bg-rose-50 hover:text-rose-600"
              size={"sm"}
              onClick={handleReject}
              disabled={anyLoading}
            >
              {rejectLoading ? <LoadingIndicator color="#f43f5e " /> : "Reject"}
            </Button>
          </>
        ) : (
          <Button
            variant={"ghost"}
            className="h-fit p-2 text-rose-500 hover:bg-rose-50 hover:text-rose-600"
            size={"sm"}
            onClick={handleRemoveStudent}
            disabled={anyLoading}
          >
            {rejectLoading ? <LoadingIndicator color="#f43f5e " /> : "Remove"}
          </Button>
        )}
      </td>
    </tr>
  );
}
