"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import Image from "next/image";
import Header from "@/components/Header";
import "../../../style/category_list.css";
function CategoryList({ params }) {

  const navigate = useRouter();



  return (
    <>
      <div className="shadow-lg">
        <Header />
      </div>

      <div className="mt-32" style={{ alignItems: "center" }}>
        <h1 className="text-center text-4xl font-semibold">
          {`Service Providers in ${params.city}`}
        </h1>
        <h3 className="text-gray-500 mt-10 mx-7 mb-3">
          Looking for a trusted company in Toronto for your next home
          improvement project? Choose from thousands of verified and reviewed
          home service pros that are eager to help.
        </h3>
      </div>
      <ul className="list_container">
        <li className="flex-col">
          <h1 className="font-bold text-lg">Main Category</h1>
          <div className="py-[6px]">
            <Link
              href="/"
              className="text-[#2ab0e7] hover:text-[#177aa5] cursor-pointer"
            >
              subcategory
            </Link>
          </div>
          <div className="py-[6px]">
            <Link
              href="/"
              className="text-[#2ab0e7] hover:text-[#177aa5] cursor-pointer "
            >
              subcategory
            </Link>
          </div>
        </li>
      </ul>
    </>
  );
}

export default CategoryList;
