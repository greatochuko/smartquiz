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
      className="h-fit gap-1 px-3 py-1.5"
      onClick={() => router.back()}
    >
      <ArrowLeftIcon className="h-4 w-4" />
      Back
    </Button>
  );
}
