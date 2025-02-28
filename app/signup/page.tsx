import SignupForm from "@/components/auth/SignupForm";
import Link from "next/link";

export default function SignupPage() {
  return (
    <div
      className="relative flex min-h-screen items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/hero-background.jpg')" }}
    >
      <div className="mx-auto w-[90%] max-w-md rounded-lg bg-white p-4 shadow-lg sm:py-6">
        <Link
          href={"/"}
          className="mx-auto block w-fit text-center text-lg font-semibold text-blue-600 hover:underline"
        >
          SmartQuizz
        </Link>
        <h2 className="text-center text-2xl font-bold text-blue-600">
          Create an Account
        </h2>
        <p className="mt-2 text-center text-gray-600">
          Start managing your exams effortlessly
        </p>

        <SignupForm />

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
