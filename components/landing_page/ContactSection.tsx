import Link from "next/link";
import React from "react";

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 bg-white text-center">
      <div className="screen-container px-6">
        <h3 className="text-3xl font-bold text-gray-800">Get in Touch</h3>
        <p className="mt-4 text-lg text-gray-700">
          Have questions? Reach out to us.
        </p>
        <Link
          href="mailto:greatochuko123@gmail.com"
          className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
        >
          Contact Us
        </Link>
      </div>
    </section>
  );
}
