"use client";
import React, { useState } from "react";
import Error from "@/components/Error";
import LoadingIndicator from "@/components/LoadingIndicator";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { format, isPast, isToday } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { createExam, updateExam } from "@/actions/examActions";
import { ExamType } from "@/db/models/Exam";

type QuestionDataType = {
  _id: string;
  text: string;
  options: string[];
  answer: number;
};

export default function ExamForm({
  exam,
  userId,
}: {
  exam?: ExamType;
  userId: string;
}) {
  const [name, setName] = useState(exam?.name || "");
  const [date, setDate] = useState(exam?.date);
  const [duration, setDuration] = useState(exam?.duration.toString() || "");
  const [questions, setQuestions] = useState<QuestionDataType[]>(
    exam?.questions || [
      { _id: "1", text: "", options: ["", "", "", ""], answer: 0 },
    ],
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        _id: (questions.length + 1).toString(),
        text: "",
        options: ["", "", "", ""],
        answer: 0,
      },
    ]);
  };

  function handleQuestionChange<T extends keyof QuestionDataType>(
    index: number,
    field: T,
    value: QuestionDataType[T],
  ) {
    const updatedQuestions = questions.map((q, i) =>
      i === index ? { ...q, [field]: value } : q,
    );
    setQuestions(updatedQuestions);
  }

  const cannotSubmit =
    loading ||
    !name.trim() ||
    !date ||
    Number(duration) <= 0 ||
    !questions.length ||
    questions.some(
      (question) =>
        !question.text || question.options.some((option) => !option.trim()),
    );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (cannotSubmit) return;
    setLoading(true);
    setError("");
    const examData = {
      name,
      date,
      duration: Number(duration),
      questions: questions.map((q) => ({
        text: q.text,
        options: q.options,
        answer: q.answer,
      })),
    };
    const data = exam
      ? await updateExam(exam._id, examData)
      : await createExam(userId, examData);
    if (data?.error) setError(data.error);
    setLoading(false);
  }
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        placeholder="Exam Name"
        className="w-full rounded-md border p-2 ring-0 focus-visible:ring-blue-400"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal focus-visible:ring-blue-400",
              !date && "text-muted-foreground",
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>Exam Date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            disabled={(date) => isPast(date) && !isToday(date)}
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
      <Input
        type="number"
        placeholder="Duration (minutes)"
        className="w-full rounded-md border p-2 ring-0 focus-visible:ring-blue-400"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
      />
      <h2 className="text-lg font-semibold">Questions</h2>
      {questions.map((q, index) => (
        <div
          key={q._id}
          className="mb-2 flex flex-col gap-2 rounded-md border p-3"
        >
          <div className="flex items-center justify-between">
            <h4>Question {index + 1}</h4>
            {questions.length > 1 && (
              <Button
                variant={"destructive"}
                className="h-fit"
                onClick={() =>
                  setQuestions((curr) => curr.filter((_, i) => index !== i))
                }
              >
                Delete
              </Button>
            )}
          </div>
          <Textarea
            placeholder="Question Text"
            className="w-full rounded-md border p-2 ring-0 focus-visible:ring-blue-400"
            value={q.text}
            onChange={(e) =>
              handleQuestionChange(index, "text", e.target.value)
            }
          />
          {q.options.map((option, optIndex) => (
            <div className="flex items-center gap-2" key={optIndex}>
              <input
                type="radio"
                name={`option-${optIndex}`}
                id={`option-${optIndex}`}
                checked={q.answer === optIndex}
                onChange={() => handleQuestionChange(index, "answer", optIndex)}
                className="accent-blue-600"
              />
              <Input
                type="text"
                placeholder={`Option ${optIndex + 1}`}
                className="w-full rounded-md border p-2 focus-visible:ring-blue-400"
                value={option}
                onChange={(e) => {
                  const updatedOptions = [...q.options];
                  updatedOptions[optIndex] = e.target.value;
                  handleQuestionChange(index, "options", updatedOptions);
                }}
              />
            </div>
          ))}
        </div>
      ))}
      <Error message={error} />
      <div className="flex justify-between">
        <button
          type="button"
          className="rounded-md bg-blue-600 px-4 py-2 font-medium text-white duration-200 hover:bg-blue-600/90"
          onClick={addQuestion}
        >
          Add Question
        </button>
        <button
          disabled={cannotSubmit}
          type="submit"
          className="w-32 rounded-md bg-green-600 px-4 py-2 font-medium text-white duration-200 hover:bg-green-600/90 disabled:cursor-not-allowed disabled:bg-green-600/50"
        >
          {loading ? (
            <LoadingIndicator color="#fff" />
          ) : exam ? (
            "Update Exam"
          ) : (
            "Create Exam"
          )}
        </button>
      </div>
    </form>
  );
}
