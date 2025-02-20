import StudentEnrollmentTable from "@/components/exam/StudentEnrollmentTable";
import { StudentType } from "@/db/models/Exam";
import React from "react";

const students: StudentType[] = [];

export default function ExamStudentEnrollmentPage() {
  return (
    <div className="p-6 text-sm">
      <h1 className="text-xl sm:text-2xl font-semibold ">
        Exam Students for &ldquo;as &rdquo;
      </h1>

      {students.length > 0 ? (
        <StudentEnrollmentTable students={students} />
      ) : (
        <p className="text-muted-foreground text-center p-4">
          No students have requested enrollment for this exam
        </p>
      )}
    </div>
  );
}
