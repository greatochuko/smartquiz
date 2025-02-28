import Link from "next/link";
import React from "react";

export default function Hero() {
  return (
    <section
      className="relative bg-cover bg-center text-center"
      style={{ backgroundImage: "url('/hero-background.jpg')" }}
    >
      <div className="bg-white/30 px-[5%] py-20">
        <h2 className="text-4xl font-extrabold text-blue-700">
          Simplify Online Assessments
        </h2>
        <p className="mt-4 text-lg text-gray-700">
          A secure and automated system for seamless academic exams.
        </p>
        <Link
          href="/signup"
          className="mt-6 inline-block rounded-lg bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
}
