import React from "react";

const features = [
  {
    title: "Secure Login",
    desc: "Ensure only authorized users access exams.",
  },
  {
    title: "Automated Grading",
    desc: "Instant result computation for objective questions.",
  },
  {
    title: "Randomized Questions",
    desc: "Prevent cheating with dynamic question sets.",
  },
  {
    title: "Timed Exams",
    desc: "Automatic submission after time runs out.",
  },
  {
    title: "Student Dashboard",
    desc: "Track exams, results, and performance insights.",
  },
  {
    title: "Admin Control",
    desc: "Easily manage exams and students.",
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-white py-16">
      <div className="screen-container px-6">
        <h3 className="text-center text-3xl font-bold text-gray-800">
          Key Features
        </h3>
        <div className="mt-10 grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {features.map((feature, index) => (
            <div key={index} className="rounded-lg bg-blue-50 p-6 shadow">
              <h4 className="text-xl font-semibold text-blue-600">
                {feature.title}
              </h4>
              <p className="mt-2 text-gray-700">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
