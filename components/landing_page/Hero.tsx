import Link from "next/link";
import React from "react";

export default function Hero() {
  return (
    <section className="text-center py-20 bg-blue-50">
      <div className="screen-container px-6">
        <h2 className="text-4xl font-extrabold text-blue-700">
          Simplify Online Assessments
        </h2>
        <p className="mt-4 text-lg text-gray-700">
          A secure and automated system for seamless academic exams.
        </p>
        <Link
          href="/signup"
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Get Started
        </Link>
      </div>
    </section>
  );
}
