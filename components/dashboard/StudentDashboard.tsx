import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import { getExams } from "@/services/examServices";
import { format } from "date-fns";

export default async function StudentDashboard() {
  const { data: exams } = await getExams();

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900 p-6">
      {/* Stats Section */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-base lg:text-lg font-medium">Total Exams</h2>
          <p className="text-3xl font-semibold mt-2">12</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-base lg:text-lg font-medium">Upcoming Exams</h2>
          <p className="text-3xl font-semibold mt-2">4</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-base lg:text-lg font-medium">Completed Exams</h2>
          <p className="text-3xl font-semibold mt-2">8</p>
        </div>
      </section>

      {/* Recent Exams */}
      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold mb-4">Recent Exams</h2>{" "}
          <Link
            href={"/dashboard/exams"}
            className="hover:underline text-blue-600"
          >
            View all
          </Link>
        </div>
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
              <p className="text-gray-600">Date: {format(exam.date, "PPP")}</p>
              <Button
                variant={"ghost"}
                className="h-fit p-2 hover:bg-blue-50 text-blue-600"
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
