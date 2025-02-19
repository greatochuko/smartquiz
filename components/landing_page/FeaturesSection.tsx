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
    <section id="features" className="py-16 bg-white">
      <div className="screen-container px-6">
        <h3 className="text-3xl font-bold text-center text-gray-800">
          Key Features
        </h3>
        <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-100 p-6 rounded-lg shadow">
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
