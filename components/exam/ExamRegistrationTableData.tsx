import React from "react";
import { StudentType } from "@/db/models/Exam";
import { Button } from "../ui/button";
import LoadingIndicator from "../LoadingIndicator";

type ExamRegistrationTableDataProps = {
  loading: {
    acceptLoading: boolean;
    rejectLoading: boolean;
    anyLoading: boolean;
  };
  handleAccept(): void;
  handleReject(): void;
  handleRemoveStudent(): void;
  student: StudentType;
};

export default function ExamRegistrationTableData({
  student,
  handleAccept,
  handleReject,
  handleRemoveStudent,
  loading,
}: ExamRegistrationTableDataProps) {
  const { acceptLoading, anyLoading, rejectLoading } = loading;

  const statusColor =
    student.status === "registered"
      ? "bg-green-500"
      : student.status === "requested"
        ? "bg-amber-500"
        : student.status === "submitted"
          ? "bg-purple-500"
          : "bg-rose-500";

  return (
    <tr className="border-b">
      <td className="w-2/4 p-2 pl-4">
        {student.user.firstName} {student.user.lastName}
      </td>
      <td className="w-1/4 p-2">
        <span
          className={`rounded-full p-1 px-2 text-sm capitalize text-white ${statusColor}`}
        >
          {student.status}
        </span>
      </td>
      <td className="flex w-1/4 gap-2 p-2 pr-4">
        {student.status === "requested" ? (
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
            className="h-fit p-2 text-rose-500 hover:bg-rose-50 hover:text-rose-600 disabled:cursor-not-allowed"
            size={"sm"}
            onClick={handleRemoveStudent}
            disabled={anyLoading || student.status === "submitted"}
          >
            {rejectLoading ? <LoadingIndicator color="#f43f5e " /> : "Remove"}
          </Button>
        )}
      </td>
    </tr>
  );
}
