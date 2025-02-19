import BackButton from "@/components/BackButton";
import ExamForm from "@/components/exam/ExamForm";

export default function CreateExam() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold ">Create Exam</h1>
        <BackButton />
      </div>
      <ExamForm />
    </div>
  );
}
