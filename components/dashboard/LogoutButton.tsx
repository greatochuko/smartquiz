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
        className="bg-rose-600 text-white px-4 py-2 rounded-lg hover:bg-rose-600/90"
        onClick={() => setIsModalOpen(true)}
      >
        Logout
      </button>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center  justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center w-[90%] max-w-80">
            <p className="mb-4">Are you sure you want to logout?</p>
            <div className="flex gap-4">
              <button
                className="bg-rose-600 duration-200 flex-1 text-white px-4 py-2 rounded-lg hover:bg-rose-600/90"
                onClick={handleLogout}
              >
                {loading ? <LoadingIndicator color="#fff" /> : "Yes, Logout"}
              </button>
              <button
                className="bg-gray-200 duration-200 px-4 flex-1 py-2 rounded-lg hover:bg-gray-300 "
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
