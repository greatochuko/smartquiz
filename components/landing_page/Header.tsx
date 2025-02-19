import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header className="bg-white shadow-md">
      <div className="screen-container flex justify-between items-center py-4">
        <h1 className="text-2xl font-bold text-blue-600">SmartQuiz</h1>
        <nav>
          <ul className="flex space-x-6">
            <li className="hidden sm:block">
              <Link href="#features" className="hover:text-blue-600">
                Features
              </Link>
            </li>
            <li className="hidden sm:block">
              <Link href="#about" className="hover:text-blue-600">
                About
              </Link>
            </li>
            <li className="hidden sm:block">
              <Link href="#contact" className="hover:text-blue-600">
                Contact
              </Link>
            </li>
            <li>
              <Link
                href="/signup"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Get Started
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
