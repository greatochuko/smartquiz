import React from "react";

export default function Error({ message }: { message?: string | null }) {
  if (!message) return null;

  return <p className="text-red-500 mt-1 text-sm">{message}</p>;
}
