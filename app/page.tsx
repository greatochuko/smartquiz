export default function LandingPage() {
  return (
    <main className="min-h-screen bg-gray-100 text-gray-900">
      {/* Header */}
      <header className="bg-white shadow-md">
        <div className="container mx-auto flex justify-between items-center py-4 px-6">
          <h1 className="text-2xl font-bold text-blue-600">SmartQuiz</h1>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <a href="#features" className="hover:text-blue-600">
                  Features
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-blue-600">
                  About
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-blue-600">
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/login"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Get Started
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="text-center py-20 bg-blue-50">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-blue-700">
            Simplify Online Assessments
          </h2>
          <p className="mt-4 text-lg text-gray-700">
            A secure and automated system for seamless academic exams.
          </p>
          <a
            href="/register"
            className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-center text-gray-800">
            Key Features
          </h3>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
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
            ].map((feature, index) => (
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

      {/* About Section */}
      <section id="about" className="py-16 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl font-bold text-gray-800">About SmartQuiz</h3>
          <p className="mt-4 text-lg text-gray-700 max-w-3xl mx-auto">
            SmartQuiz is a modern online examination system designed to
            streamline assessments, automate grading, and enhance security for
            academic institutions.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 bg-white text-center">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-gray-800">Get in Touch</h3>
          <p className="mt-4 text-lg text-gray-700">
            Have questions? Reach out to us.
          </p>
          <a
            href="mailto:greatochuko123@gmail.com"
            className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
          >
            Contact Us
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center py-6">
        <p>© {new Date().getFullYear()} SmartQuiz. All Rights Reserved.</p>
      </footer>
    </main>
  );
}
