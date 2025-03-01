import LoginForm from "@/components/auth/LoginForm";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div
      className="relative flex flex-1 items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/hero-background.jpg')" }}
    >
      <div className="mx-auto w-[90%] max-w-md rounded-lg bg-white p-4 shadow-lg sm:p-8">
        <Link
          href={"/"}
          className="mx-auto block w-fit text-center text-lg font-semibold text-blue-600 hover:underline"
        >
          SmartQuizz
        </Link>
        <h2 className="text-center text-2xl font-bold text-blue-600">Login</h2>
        <p className="mt-2 text-center text-gray-600">
          Access your exams and results
        </p>

        <LoginForm />

        <p className="mt-4 text-center text-sm text-gray-600">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
