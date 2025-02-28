import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 py-6 text-center text-white">
      <p>© {new Date().getFullYear()} SmartQuizz. All Rights Reserved.</p>
    </footer>
  );
}
