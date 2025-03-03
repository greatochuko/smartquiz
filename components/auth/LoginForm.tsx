"use client";

import { login } from "@/actions/authActions";
import Link from "next/link";
import React, { useState } from "react";
import Error from "../Error";
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
          className="mt-1 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mt-4">
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="mt-1 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <Error message={loginError} />

      <div className="mt-4 flex items-center justify-between">
        <Link href="#" className="text-sm text-blue-600 hover:underline">
          Forgot Password?
        </Link>
      </div>
      <button
        type="submit"
        disabled={cannotSubmit}
        className="mt-4 flex w-full items-center justify-center rounded-md bg-blue-600 py-2 text-white ring-blue-400 ring-offset-2 transition hover:bg-blue-700 focus-visible:ring-2 disabled:cursor-not-allowed disabled:bg-blue-300"
      >
        {loading ? <LoadingIndicator color="#fff" /> : "Login"}
      </button>
    </form>
  );
}
