"use client";
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
import { format } from "date-fns";
import { ArrowLeftIcon, CalendarIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type QuestionDataType = {
  _id: string;
  text: string;
  options: string[];
  answer: number;
};

export default function CreateExam() {
  const [examName, setExamName] = useState("");
  const [examDate, setExamDate] = useState<Date>();
  const [duration, setDuration] = useState("");
  const [questions, setQuestions] = useState<QuestionDataType[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

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
    value: QuestionDataType[T]
  ) {
    const updatedQuestions = questions.map((q, i) =>
      i === index ? { ...q, [field]: value } : q
    );
    setQuestions(updatedQuestions);
  }

  const cannotSubmit =
    loading ||
    !examName.trim() ||
    !examDate ||
    Number(duration) <= 0 ||
    !questions.length ||
    questions.some(
      (question) =>
        !question.text ||
        !question.answer ||
        question.options.some((option) => !option.trim())
    );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    console.log({ examName, examDate, duration, questions });
    setLoading(false);
  }

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold mb-4">Create Exam</h1>
        <button
          className="py-1.5 px-3 rounded-md duration-200 border hover:bg-zinc-100 flex items-center gap-1"
          onClick={() => router.back()}
        >
          <ArrowLeftIcon className="w-4 h-4" />
          Back
        </button>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="text"
          placeholder="Exam Name"
          className="w-full p-2 border rounded-md ring-0 focus-visible:ring-blue-400"
          value={examName}
          onChange={(e) => setExamName(e.target.value)}
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal",
                !examDate && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {examDate ? format(examDate, "PPP") : <span>Exam Date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={examDate}
              onSelect={setExamDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        <Input
          type="number"
          placeholder="Duration (minutes)"
          className="w-full p-2 border rounded-md ring-0 focus-visible:ring-blue-400"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <h2 className="text-lg font-semibold">Questions</h2>
        {questions.map((q, index) => (
          <div
            key={q._id}
            className="p-3 border rounded-md mb-2 flex flex-col gap-2"
          >
            <Textarea
              placeholder="Question Text"
              className="w-full p-2 border rounded-md ring-0 focus-visible:ring-blue-400"
              value={q.text}
              onChange={(e) =>
                handleQuestionChange(index, "text", e.target.value)
              }
            />
            {q.options.map((option, optIndex) => (
              <div className="flex gap-2 items-center" key={optIndex}>
                <input
                  type="radio"
                  name={`option-${optIndex}`}
                  id={`option-${optIndex}`}
                  checked={q.answer === optIndex}
                  onChange={() =>
                    handleQuestionChange(index, "answer", optIndex)
                  }
                  className="accent-blue-600"
                />
                <Input
                  type="text"
                  placeholder={`Option ${optIndex + 1}`}
                  className="w-full p-2 border rounded-md focus-visible:ring-blue-400"
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
        <div className="flex justify-between">
          <button
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-600/90 duration-200"
            onClick={addQuestion}
          >
            Add Question
          </button>
          <button
            disabled={cannotSubmit}
            type="submit"
            className="bg-green-600 text-white w-32 px-4 py-2 rounded-md hover:bg-green-600/90 duration-200 disabled:bg-green-600/50 disabled:cursor-not-allowed"
          >
            {loading ? <LoadingIndicator color="#fff" /> : "Create Exam"}
          </button>
        </div>
      </form>
    </div>
  );
}
