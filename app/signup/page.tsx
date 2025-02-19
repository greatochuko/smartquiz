import SignupForm from "@/components/auth/SignupForm";
import Link from "next/link";

export default function SignupPage() {
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
          Create an Account
        </h2>
        <p className="text-center text-gray-600 mt-2">
          Start managing your exams effortlessly
        </p>

        <SignupForm />

        <p className="text-center text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
