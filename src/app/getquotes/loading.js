"use client";
import React from "react";

export default function Loading() {
  return (
    <>
      <div class="flex space-x-2 justify-center items-center bg-white h-screen">
        <span class="sr-only">Loading...</span>
        <div class="h-6 w-6 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div class="h-6 w-6 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div class="h-6 w-6 bg-black rounded-full animate-bounce"></div>
      </div>
    </>
  );
}
