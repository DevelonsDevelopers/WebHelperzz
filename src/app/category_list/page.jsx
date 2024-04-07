"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Image from "next/image";
import Header from "@/components/Header";

function GetQuotes() {
  const navigate = useRouter();

  return (
    <>
      <div className="shadow-lg">
        <Header />
      </div>

      <div className="mt-32" style={{ alignItems: "center" }}>
        <h1 className="text-center text-4xl font-semibold">
          Service Providers in Toronto, Ontario
        </h1>
        <h3 className="text-gray-500 mt-10 mx-7 mb-3">
          Looking for a trusted company in Toronto for your next home
          improvement project? Choose from thousands of verified and reviewed
          home service pros that are eager to help.
        </h3>
      </div>
      <div className="flex-col p-2 border-[1px] border-gray-500 mx-7 max-h-[200px] mb-10">
        <div>
          <h1 className="font-bold text-lg">col1</h1>
          <Link
            href="/"
            className="text-[#2ab0e7] hover:text-[#177aa5] cursor-pointer"
          >
            endkj
          </Link>
          <p>endkj</p>
          <p>endkj</p>
        </div>
        <div>
          <h1 className="font-bold text-lg">col1</h1>
          <Link
            href="/"
            className="text-[#2ab0e7] hover:text-[#177aa5] cursor-pointer"
          >
            endkj
          </Link>
          <p>endkj</p>
          <p>endkj</p>
        </div>
        <div>
          <h1 className="font-bold text-lg">col1</h1>
          <Link
            href="/"
            className="text-[#2ab0e7] hover:text-[#177aa5] cursor-pointer"
          >
            endkj
          </Link>
          <p>endkj</p>
          <p>endkj</p>
        </div>
        <div>
          <h1 className="font-bold text-lg">col1</h1>
          <Link
            href="/"
            className="text-[#2ab0e7] hover:text-[#177aa5] cursor-pointer"
          >
            endkj
          </Link>
          <p>endkj</p>
          <p>endkj</p>
        </div>
      </div>
    </>
  );
}

export default GetQuotes;
