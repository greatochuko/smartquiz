import React from "react";
import { ExamType } from "@/db/models/Exam";
import StudentExamTableData from "./StudentExamTableData";
import StudentExamCard from "./StudentExamCard";

export default function StudentExamsTable({
  exams,
  userId,
}: {
  exams: ExamType[];
  userId: string;
}) {
  return (
    <>
      <div className="bg-white p-6 rounded-lg shadow-md hidden sm:block">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="text-left p-2">Exam Name</th>
              <th className="text-left p-2">Date</th>
              <th className="text-left p-2">Status</th>
              <th className="text-left p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {exams.slice(0, 5).map((exam) => (
              <StudentExamTableData
                exam={exam}
                key={exam._id}
                userId={userId}
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View */}
      <div className="sm:hidden space-y-4">
        {exams.slice(0, 5).map((exam) => (
          <StudentExamCard exam={exam} key={exam._id} userId={userId} />
        ))}
      </div>
    </>
  );
}
