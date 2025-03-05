import { getExamById } from "@/services/examServices";
import { notFound, redirect } from "next/navigation";
import { startOfDay, isAfter, isBefore, differenceInSeconds } from "date-fns";
import { getSession } from "@/services/authServices";
import QuizScreen from "@/components/exam/QuizScreen";
import { getResult } from "@/services/resultServices";
import { ExamType } from "@/db/models/Exam";

export default async function ExamStartPage({
  params,
}: {
  params: Promise<{ examId: string }>;
}) {
  const user = await getSession();
  if (user?.role !== "Student") redirect("/dashboard");

  const { examId } = await params;
  const { data: exam } = await getExamById(examId);

  if (!exam) notFound();

  const student = exam.students.find(
    (student) => student.user._id === user._id,
  );
  if (!student) redirect("/dashboard");

  const { result } = await getResult(student.user._id, exam._id);
  if (result) redirect(`/dashboard/results/${result._id}`);

  const examDate = startOfDay(new Date(exam.date));
  const today = startOfDay(new Date());

  if (isAfter(examDate, today) || isBefore(examDate, today))
    redirect(`/dashboard/exams/${exam._id}/onboarding`);

  const now = new Date().getTime();

  const endTime = student.examStartTime
    ? new Date(student.examStartTime).getTime() + exam.duration * 60000
    : now + exam.duration * 60000;

  const userTimeLeft = Math.max(differenceInSeconds(endTime, now), 0);

  const scrabbledQuestions = exam.questions
    .map((question) => ({
      ...question,
      options: question.options.sort(() => Math.random() - 0.5),
    }))
    .sort(() => Math.random() - 0.5);

  const scrabbledExam = { ...exam } as ExamType;
  scrabbledExam.questions = scrabbledQuestions;

  return (
    <QuizScreen
      exam={scrabbledExam}
      studentTimeLeft={userTimeLeft}
      studentExamStartTime={student.examStartTime}
      studentUserId={student.user._id}
      studentExamAnswers={student.answers}
      studentSwitchTabCount={student.switchTabCount}
    />
  );
}
