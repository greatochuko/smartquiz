import { createCourse } from "@/actions/courseActions";
import { CourseType } from "@/db/models/Course";
import React, { useState } from "react";

export default function CreateCourseModal({
  isOpen,
  onClose,
  addNewCourse,
}: {
  isOpen: boolean;
  onClose: () => void;
  addNewCourse: (newCourse: CourseType) => void;
}) {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    const { newCourse } = await createCourse(name);
    if (newCourse) {
      addNewCourse(newCourse);
      setName("");
      onClose();
    }
    setLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <form
        className="w-[90%] max-w-md rounded-lg bg-white p-6 text-center shadow-lg"
        onSubmit={handleCreateCourse}
      >
        <h2 className="text-xl font-bold text-gray-800">Create Course</h2>
        <div className="mt-4">
          <label htmlFor="courseName" className="block text-left text-gray-600">
            Course Name
          </label>
          <input
            type="text"
            id="courseName"
            name="courseName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 w-full rounded border border-gray-300 p-2"
            required
          />
        </div>
        <div className="mt-6 flex justify-end space-x-4">
          <button
            type="button"
            className="rounded bg-gray-500 px-4 py-2 text-white duration-200 hover:bg-gray-600"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="rounded bg-blue-500 px-4 py-2 text-white duration-200 hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-600/50"
          >
            Add Course
          </button>
        </div>
      </form>
    </div>
  );
}
