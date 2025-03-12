"use client";

import React, { useState } from "react";
import CreateCourseModal from "./CreateCourseModal";
import { CourseType } from "@/db/models/Course";

export default function AddCourseButton({
  addNewCourse,
}: {
  addNewCourse: (newCourse: CourseType) => void;
}) {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setModalIsOpen(true)}
        className="rounded-lg bg-blue-600 px-4 py-2 text-sm text-white duration-200 hover:bg-blue-600/90"
      >
        Add Course
      </button>
      <CreateCourseModal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        addNewCourse={addNewCourse}
      />
    </>
  );
}
