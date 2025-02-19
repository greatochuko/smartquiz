"use client";

import { login } from "@/actions/authActions";
import Link from "next/link";
import React, { useState } from "react";
import Error from "./Error";
import LoadingIndicator from "../LoadingIndicator";

export default function LoginForm() {
  const [loginError, setLoginError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const cannotSubmit = !email.trim() || !password.trim() || loading;

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (cannotSubmit) return;

    setLoginError("");
    setLoading(true);
    const response = await login(email, password);
    if (response?.error) {
      setLoginError(response.error);
    }
    setLoading(false);
  }
  return (
    <form className="mt-6 text-sm" onSubmit={handleLogin}>
      <div>
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mt-4">
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <Error message={loginError} />

      <div className="flex justify-between items-center mt-4">
        <Link href="#" className="text-sm text-blue-600 hover:underline">
          Forgot Password?
        </Link>
      </div>
      <button
        type="submit"
        disabled={cannotSubmit}
        className="w-full mt-4 bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white py-2 rounded-md hover:bg-blue-700 transition focus-visible:ring-2 ring-blue-400 ring-offset-2"
      >
        {loading ? <LoadingIndicator color="#fff" /> : "Login"}
      </button>
    </form>
  );
}
