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
      role: formEntries.role as "Examiner" | "Student",
    });
    if (response?.error) {
      setSignupError(response.error);
    }
    setLoading(false);
  }

  return (
    <form className="mt-6 text-sm" onSubmit={handleSignup}>
      <div className="flex gap-4">
        <div>
          <label className="block text-gray-700">First Name</label>
          <input
            type="text"
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
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700">Last Name</label>
          <input
            type="text"
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
            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="mt-4">
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
          className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mt-4">
        <label className="block text-gray-700">Password</label>
        <input
          type="password"
          name="password"
          value={formEntries.password}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "password",
              value: e.target.value,
            })
          }
          placeholder="Create a password"
          className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Error message={passwordError} />
      </div>
      <div className="mt-4">
        <label className="block text-gray-700">Confirm Password</label>
        <input
          type="password"
          name="confirm-password"
          value={formEntries.confirmPassword}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "confirmPassword",
              value: e.target.value,
            })
          }
          placeholder="Re-enter password"
          className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <Error message={confirmPasswordError} />
      </div>
      <div className="mt-4">
        <label className="block text-gray-700">Role</label>
        <select
          name="role"
          id="role"
          value={formEntries.role}
          onChange={(e) =>
            dispatch({
              type: "SET_FIELD",
              field: "role",
              value: e.target.value,
            })
          }
          className="p-2 rounded-md border mt-1 w-full focus:ring-2 ring-blue-500 ring-offset-2"
        >
          <option value="Student">Student</option>
          <option value="Examiner">Examiner</option>
        </select>
      </div>
      <Error message={signupError} />
      <button
        disabled={cannotSubmit}
        type="submit"
        className="w-full mt-4 bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed text-white py-2 rounded-md hover:bg-blue-700 transition focus-visible:ring-2 ring-blue-400 ring-offset-2"
      >
        {loading ? <LoadingIndicator color="#fff" /> : "Sign Up"}
      </button>
    </form>
  );
}
