"use client";
import { logout } from "@/actions/authActions";
import { useState } from "react";
import LoadingIndicator from "../LoadingIndicator";

export default function LogoutButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);
    await logout();
    setLoading(false);
  }

  return (
    <>
      <button
        className="rounded-lg bg-rose-600 px-3 py-1.5 font-medium text-white hover:bg-rose-600/90"
        onClick={() => setIsModalOpen(true)}
      >
        Logout
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
          <div className="w-[90%] max-w-80 rounded-lg bg-white p-6 text-center shadow-lg">
            <p className="mb-4">Are you sure you want to logout?</p>
            <div className="flex gap-4">
              <button
                className="flex-1 rounded-lg bg-rose-600 px-4 py-2 text-white duration-200 hover:bg-rose-600/90"
                onClick={handleLogout}
              >
                {loading ? <LoadingIndicator color="#fff" /> : "Yes, Logout"}
              </button>
              <button
                className="flex-1 rounded-lg bg-gray-200 px-4 py-2 duration-200 hover:bg-gray-300"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
