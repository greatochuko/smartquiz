import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[90%] mx-auto max-w-md bg-white p-4 sm:p-8 rounded-lg shadow-lg">
        <Link
          href={"/"}
          className="text-lg mx-auto block w-fit font-semibold hover:underline text-center text-blue-600"
        >
          SmartQuiz
        </Link>
        <h2 className="text-2xl font-bold text-center text-blue-600">
          Login to ExamEase
        </h2>
        <p className="text-center text-gray-600 mt-2">
          Access your exams and results
        </p>

        <LoginForm />

        <p className="text-center text-gray-600 mt-4 text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
