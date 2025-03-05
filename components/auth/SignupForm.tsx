"use client";
import React, { useReducer, useState } from "react";
import Error from "../Error";
import { signup } from "@/actions/authActions";
import LoadingIndicator from "../LoadingIndicator";

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "",
};

type ActionType =
  | { type: "SET_FIELD"; field: keyof typeof initialState; value: string }
  | { type: "RESET_FIELDS" };

function reducer(state: typeof initialState, action: ActionType) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };

    case "RESET_FIELDS":
      return initialState;

    default:
      return state;
  }
}

export default function SignupForm() {
  const [signupError, setSignupError] = useState("");
  const [loading, setLoading] = useState(false);
  const [matNumber, setMatNumber] = useState("");

  const [formEntries, dispatch] = useReducer(reducer, initialState);

  const passwordError =
    formEntries.password && formEntries.password.length < 8
      ? "Password must be at least 8 characters"
      : null;
  const confirmPasswordError =
    formEntries.confirmPassword &&
    formEntries.password !== formEntries.confirmPassword
      ? "Passwords do not match"
      : null;

  const cannotSubmit =
    Object.values(formEntries).some((field) => !field.trim()) ||
    (formEntries.role === "Student" && !matNumber) ||
    !!passwordError ||
    !!confirmPasswordError ||
    loading;

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    if (cannotSubmit) return;

    setSignupError("");
    setLoading(true);
    const response = await signup({
      ...formEntries,
      matNumber,
      role: formEntries.role as "Examiner" | "Student",
    });
    if (response?.error) {
      setSignupError(response.error);
    }
    setLoading(false);
  }

  return (
    <form className="mt-6 flex flex-col gap-3 text-sm" onSubmit={handleSignup}>
      <div className="flex gap-4">
        <div>
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
            required
            placeholder="John"
            name="firstName"
            value={formEntries.firstName}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "firstName",
                value: e.target.value,
              })
            }
            className="mt-1 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
            required
            placeholder="Doe"
            name="lastName"
            value={formEntries.lastName}
            onChange={(e) =>
              dispatch({
                type: "SET_FIELD",
                field: "lastName",
                value: e.target.value,
              })
            }
            className="mt-1 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div>
        <label className="block text-gray-700">Email</label>
        <input
          type="email"
          name="email"
          value={formEntries.email}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "email",
              value: e.target.value,
            })
          }
          placeholder="Enter your email"
          className="mt-1 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div>
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          required
          value={formEntries.password}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "password",
              value: e.target.value,
            })
          }
          placeholder="Create a password"
          className="mt-1 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Error message={passwordError} />
      </div>
      <div>
        <label className="block text-gray-700">Confirm Password</label>
        <input
          type="password"
          name="confirm-password"
          required
          value={formEntries.confirmPassword}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "confirmPassword",
              value: e.target.value,
            })
          }
          placeholder="Re-enter password"
          className="mt-1 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Error message={confirmPasswordError} />
      </div>
      <div>
        <label className="block text-gray-700">Role</label>
        <select
          name="role"
          id="role"
          required
          value={formEntries.role}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "role",
              value: e.target.value,
            })
          }
          className="mt-1 w-full rounded-md border p-2 ring-blue-500 ring-offset-2 focus:ring-2"
        >
          <option hidden>Select a role</option>
          <option value="Student">Student</option>
          <option value="Examiner">Examiner</option>
        </select>
      </div>
      {formEntries.role === "Student" && (
        <div>
          <label className="block text-gray-700">Mat Number</label>
          <input
            type="text"
            required
            name="matNumber"
            value={matNumber}
            onChange={(e) => setMatNumber(e.target.value)}
            placeholder="Enter your mat number"
            className="mt-1 w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      )}
      <Error message={signupError} />
      <button
        disabled={cannotSubmit}
        type="submit"
        className="mt-4 flex w-full items-center justify-center rounded-md bg-blue-600 py-2 text-white ring-blue-400 ring-offset-2 transition hover:bg-blue-700 focus-visible:ring-2 disabled:cursor-not-allowed disabled:bg-blue-300"
      >
        {loading ? <LoadingIndicator color="#fff" /> : "Sign Up"}
      </button>
    </form>
  );
}
