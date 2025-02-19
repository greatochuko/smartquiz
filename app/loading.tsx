import LoadingIndicator from "@/components/LoadingIndicator";
import React from "react";

export default function loading() {
  return (
    <div className="flex-1 flex items-center justify-center ">
      <LoadingIndicator size={28} color="#2563eb" />
    </div>
  );
}
