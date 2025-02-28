import React from "react";

export default function AboutSection() {
  return (
    <section id="about" className="bg-gray-50 py-16">
      <div className="screen-container px-6 text-center">
        <h3 className="text-3xl font-bold text-gray-800">About SmartQuizz</h3>
        <p className="mx-auto mt-4 max-w-3xl text-lg text-gray-700">
          SmartQuizz is a modern online examination system designed to
          streamline assessments, automate grading, and enhance security for
          academic institutions.
        </p>
      </div>
    </section>
  );
}
