"use client";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";

export default function BackButton() {
  const router = useRouter();

  return (
    <Button
      variant={"outline"}
      className="h-fit px-3 py-1.5 gap-1"
      onClick={() => router.back()}
    >
      <ArrowLeftIcon className="w-4 h-4" />
      Back
    </Button>
  );
}
