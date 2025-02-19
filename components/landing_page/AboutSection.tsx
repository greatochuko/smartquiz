import React from "react";

export default function AboutSection() {
  return (
    <section id="about" className="py-16 bg-gray-50">
      <div className="screen-container px-6 text-center">
        <h3 className="text-3xl font-bold text-gray-800">About SmartQuiz</h3>
        <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
          SmartQuiz is a modern online examination system designed to streamline
          assessments, automate grading, and enhance security for academic
          institutions.
        </p>
      </div>
    </section>
  );
}
