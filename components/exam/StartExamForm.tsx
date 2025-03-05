"use client";

import { startExam } from "@/actions/examActions";
import React, { useState } from "react";
import LoadingIndicator from "../LoadingIndicator";
import Error from "../Error";

export default function StartExamForm({
  examId,
  studentUserId,
}: {
  examId: string;
  studentUserId: string;
}) {
  const [matNumber, setMatNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!matNumber) return;
    setLoading(true);
    const data = await startExam(examId, studentUserId, matNumber);
    if (data?.error) {
      setError(data.error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 w-full max-w-80">
      <div className="flex w-full gap-2">
        <input
          type="text"
          value={matNumber}
          onChange={(e) => setMatNumber(e.target.value)}
          className="w-0 flex-1 rounded-md border p-2 text-sm"
          placeholder="Mat Number"
        />
        <button
          type="submit"
          disabled={loading || !matNumber}
          className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-600/90 disabled:cursor-not-allowed disabled:bg-blue-600/50"
        >
          {loading ? <LoadingIndicator color="#fff" /> : "Start Exam"}
        </button>
      </div>

      <Error message={error} />
    </form>
  );
}
