import React from "react";
import { StudentType } from "@/db/models/Exam";
import { Button } from "../ui/button";

type ExamRegistrationTableCardProps = {
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

export default function ExamRegistrationCard({
  student,
  handleAccept,
  handleReject,
  handleRemoveStudent,
  loading,
}: ExamRegistrationTableCardProps) {
  const { acceptLoading, anyLoading, rejectLoading } = loading;

  const statusColor =
    student.status === "registered"
      ? "text-green-500"
      : student.status === "requested"
        ? "text-amber-500"
        : student.status === "submitted"
          ? "text-purple-500"
          : "text-rose-500";

  return (
    <div
      key={student.user._id}
      className="rounded-lg border bg-white p-4 shadow-md"
    >
      <h2 className="text-lg font-medium">
        {student.user.firstName} {student.user.lastName}
      </h2>
      <p className="text-gray-600">
        Status:{" "}
        <span className={`p-2 font-medium capitalize ${statusColor}`}>
          {student.status}
        </span>
      </p>
      <div className="mt-2 flex gap-2">
        {student.status === "requested" ? (
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
            disabled={anyLoading || student.status === "submitted"}
            className="h-fit rounded-md bg-rose-600 px-3 py-1.5 text-white hover:bg-rose-600/90 disabled:cursor-not-allowed"
          >
            {anyLoading ? "Removing..." : "Remove"}
          </Button>
        )}
      </div>
    </div>
  );
}
