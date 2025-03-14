"use client";

import { useState, useEffect } from "react";
import { ExamType, StudentAnswerType } from "@/db/models/Exam";
import LoadingIndicator from "../LoadingIndicator";
import {
  saveStudentExamStartTime,
  submitExam,
  updateStudentAnswers,
} from "@/actions/examActions";
import useBrowserLockdown from "@/hooks/useBrowserLockdown";
import WarningModal from "./WarningModal";

export default function QuizScreen({
  exam,
  studentTimeLeft,
  studentExamStartTime,
  studentUserId,
  studentSwitchTabCount,
  studentExamAnswers,
}: {
  exam: ExamType;
  studentTimeLeft: number;
  studentExamStartTime?: Date;
  studentUserId: string;
  studentSwitchTabCount: number;
  studentExamAnswers: StudentAnswerType[];
}) {
  const [timeLeft, setTimeLeft] = useState(studentTimeLeft);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(studentExamAnswers || []);
  const [status, setStatus] = useState<
    "exam-ongoing" | "submit-modal" | "submitting"
  >(studentTimeLeft ? "exam-ongoing" : "submitting");

  const handleSubmit = () => {
    setStatus("submitting");
    submitExam(exam._id, studentUserId);
  };

  const { isTabSwitched, setIsTabSwitched, switchTabCount } =
    useBrowserLockdown({
      examId: exam._id,
      studentUserId,
      studentSwitchTabCount,
      studentTimeLeft,
      handleSubmitExam: handleSubmit,
    });

  const currentQuestion = exam.questions[currentIndex];

  useEffect(() => {
    if (status === "submitting") {
      submitExam(exam._id, studentUserId);
    }

    const updateTimer = () => {
      setTimeLeft((curr) => {
        if (curr > 0) {
          return curr - 1;
        } else {
          setStatus("submitting");
          return curr;
        }
      });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, [answers, exam._id, status, studentUserId]);

  useEffect(() => {
    if (studentExamStartTime) return;
    saveStudentExamStartTime(exam._id, studentUserId);
  }, [exam._id, studentExamStartTime, studentUserId]);

  const handleAnswerSelect = (questionId: string, option: string) => {
    const existingAnswerIndex = answers.findIndex(
      (answer) => answer.questionId === questionId,
    );

    let updatedAnswers;
    if (existingAnswerIndex !== -1) {
      updatedAnswers = [...answers];
      updatedAnswers[existingAnswerIndex].answer = option;
    } else {
      updatedAnswers = [...answers, { questionId, answer: option }];
    }

    setAnswers(updatedAnswers);
    updateStudentAnswers(exam._id, studentUserId, updatedAnswers);
  };

  const hasNextQuestion = exam.questions.length > currentIndex + 1;

  const showNextQuestion = () => {
    if (hasNextQuestion) {
      setCurrentIndex((curr) => curr + 1);
    }
  };

  const hasPrevQuestion = currentIndex > 0;

  const showPrevQuestion = () => {
    if (hasPrevQuestion) {
      setCurrentIndex((curr) => curr - 1);
    }
  };

  const getQuestionAnswer = (questionId: string) => {
    return answers.find((answer) => answer.questionId === questionId)?.answer;
  };

  return (
    <>
      <div className="relative flex flex-1 flex-col items-center justify-center bg-blue-50 p-4">
        <div className="flex w-full max-w-2xl flex-col gap-4 rounded-lg bg-white p-6 shadow-lg">
          <h1 className="text-2xl font-bold">{exam.name || "Exam"}</h1>
          <p className="text-zinc-600">
            Time Left:{" "}
            <span
              className={`font-medium ${timeLeft > 60 ? "text-zinc-600" : "text-rose-500"}`}
            >
              {timeLeft > 3600 ? `${Math.floor(timeLeft / 3600)}:` : null}
              {Math.floor((timeLeft % 3600) / 60)
                .toString()
                .padStart(2, "0")}
              :{(timeLeft % 60).toString().padStart(2, "0")}
            </span>
          </p>

          <div key={currentQuestion._id} className="">
            <p className="font-semibold">
              <span className="text-zinc-500">{currentIndex + 1}.</span>{" "}
              {currentQuestion.text}
            </p>
            <div className="mt-2 flex flex-col gap-2">
              {currentQuestion.options.map((option, idx) => (
                <label
                  key={idx}
                  className="flex cursor-pointer items-center gap-2 rounded-lg border p-2 duration-200 hover:bg-blue-100"
                >
                  <input
                    type="radio"
                    name={`question-${currentQuestion._id}`}
                    value={option}
                    checked={getQuestionAnswer(currentQuestion._id) === option}
                    onChange={() =>
                      handleAnswerSelect(currentQuestion._id, option)
                    }
                  />
                  <p>{["A", "B", "C", "D"][idx]}</p>
                  {option}
                </label>
              ))}
            </div>
          </div>

          <div className="flex justify-between gap-4">
            <button
              onClick={showPrevQuestion}
              disabled={!hasPrevQuestion}
              className="w-full rounded-lg bg-blue-600 px-6 py-2 text-white duration-200 hover:bg-blue-600/90 disabled:cursor-not-allowed disabled:bg-blue-600/50"
            >
              Previous Question
            </button>
            <button
              onClick={showNextQuestion}
              disabled={!hasNextQuestion}
              className="w-full rounded-lg bg-blue-600 px-6 py-2 text-white duration-200 hover:bg-blue-600/90 disabled:cursor-not-allowed disabled:bg-blue-600/50"
            >
              Next Question
            </button>
          </div>
        </div>
        <button
          onClick={() => setStatus("submit-modal")}
          //   className="absolute bottom-4 right-4 w-fit rounded-lg bg-rose-600 px-6 py-2 text-white duration-200 hover:bg-rose-600/90"
          className="absolute bottom-4 right-4 w-fit rounded-lg border border-rose-600 bg-white px-6 py-2 font-medium text-rose-600 duration-200 hover:bg-rose-50"
        >
          Submit Exam
        </button>
      </div>
      {status === "submitting" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="flex aspect-video w-[90%] max-w-80 items-center justify-center gap-4 rounded-lg bg-white p-6 text-center shadow-lg">
            <LoadingIndicator /> Submitting...
          </div>
        </div>
      )}
      {status === "submit-modal" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="flex aspect-video w-[90%] max-w-80 flex-col justify-center gap-4 rounded-lg bg-white p-6 text-center shadow-lg">
            <p className="mb-4">Are you sure you want to Submit?</p>
            <div className="flex gap-4">
              <button
                className="flex-1 rounded-lg bg-rose-600 px-4 py-2 text-white duration-200 hover:bg-rose-600/90"
                onClick={handleSubmit}
              >
                Yes, Submit
              </button>
              <button
                className="flex-1 rounded-lg border bg-gray-100 px-4 py-2 duration-200 hover:bg-gray-200"
                onClick={() => setStatus("exam-ongoing")}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {!!studentTimeLeft && switchTabCount <= 1 && (
        <WarningModal
          isOpen={isTabSwitched}
          onClose={() => {
            setIsTabSwitched(false);
          }}
        />
      )}
    </>
  );
}
