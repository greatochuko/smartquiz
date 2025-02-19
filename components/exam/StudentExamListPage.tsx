import { ExamType } from "@/db/models/Exam";
import React from "react";
import { Button } from "../ui/button";
import { format } from "date-fns";

export default function StudentExamListPage({ exams }: { exams: ExamType[] }) {
  return (
    <div className="screen-container">
      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-4">All Exams</h2>
        <div className="bg-white p-6 rounded-lg shadow-md hidden sm:block">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b">
                <th className="text-left p-2">Exam Name</th>
                <th className="text-left p-2">Date</th>
                <th className="text-left p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {exams.slice(0, 5).map((exam, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{exam.name}</td>
                  <td className="p-2">{format(exam.date, "PPP")}</td>
                  <td className={`p-2 `}>
                    <Button
                      variant={"ghost"}
                      className="h-fit p-2 hover:bg-blue-50 text-blue-600 hover:text-blue-600"
                      size={"sm"}
                    >
                      Enroll
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="sm:hidden space-y-4">
          {exams.slice(0, 5).map((exam, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold">{exam.name}</h3>
              <p className="text-gray-600 mb-1">
                Date: {format(exam.date, "PPP")}
              </p>
              <Button
                variant={"default"}
                className="h-fit px-3 py-1.5 hover:bg-blue-600/90 bg-blue-600"
                size={"sm"}
              >
                Enroll
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
