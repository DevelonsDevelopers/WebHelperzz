"use client";

import React, { useState } from "react";
import Header from "../../components/Header";

import Image from "next/image";

import worker from "/public/assets/worker.png";
import women from "/public/assets/women.png";

const points = [
  { name: "Featured" },
  { name: "Improvements" },
  { name: "Design" },
  { name: "Updates" },
];

const design = [
  {
    name: "2024 Kitchen Ideas: Unlock the Top Trends of the Year!",
    image: "../../../public/assets/Rectangle 120.png",
  },
  {
    name: "New Year, New You: Decor & Design Trends to Add to Your Home",
    image: "../../../public/assets/Rectangle 120.png",
  },
  {
    name: "5 Reasons To Install A Backyard Storage Shed This Season",
    image: "../../../public/assets/Rectangle 120.png",
  },
];

const improvements = [
  {
    name: "2024 Kitchen Ideas: Unlock the Top Trends of the Year!",
    image: "../../../public/assets/Rectangle 120.png",
  },
  {
    name: "New Year, New You: Decor & Design Trends to Add to Your Home",
    image: "../../../public/assets/Rectangle 120.png",
  },
  {
    name: "5 Reasons To Install A Backyard Storage Shed This Season",
    image: "../../../public/assets/Rectangle 120.png",
  },
];

const helperz = [
  {
    name: "Gitano",
    experties: "Roofting",
    image: "../../../public/assets/Rectangle 120.png",
    point: [
      { name: "Roofting Repair" },
      { name: "Roof Inspection" },
      { name: "Roof Maintenance" },
    ],
  },
  {
    name: "Remodel",
    experties: "Bathroom Renovation",
    image: "../../../public/assets/Rectangle 120.png",
    point: [
      { name: "Bathroom Renovation" },
      { name: "Plumbing" },
      { name: "Cabinetry and Storage" },
    ],
  },
  {
    name: "Erevan",
    experties: "Painting",
    image: "../../../public/assets/Rectangle 120.png",
    point: [
      { name: "Surface Preparation" },
      { name: "Protection" },
      { name: "Paint Selection" },
      { name: "Cleanup" },
    ],
  },
];

const cost = [
  { name: "Kitchen Remodel Cost", description: "Tiles, fixtures, plumbing" },
  {
    name: "Cost to buid a house",
    description: "Roofing materials and installation.",
  },
  {
    name: "Roof replacement cost ",
    description: "Brush, canvas, palette, easel.",
  },
  {
    name: "water heater replacement",
    description: "Bathroom kitchen plumbing",
  },
  {
    name: "bathrom remodel cost",
    description: "Electrical installation or testing",
  },
  { name: "solar panel cost", description: "Gas boiler - installation" },
];

const updates = [
  {
    name: "What Are the HomeStars Best of Awards?",
    description:
      "If you've ever used Helperzz to connect with a home service professional, or have browsed…",
  },
  {
    name: "How helperzz Best of Awards help you hire better",
    description:
      "The Helperzz Best of Awards are given every year to recognize and celebrate the success of…",
  },
  {
    name: "3 Reasons To Hire A helperzz Best of Award Winner",
    description:
      "If you've ever used Helperzz to connect with a home service professional, or have browsed…",
  },
];

const Blog = () => {
  const [selected, setSelected] = useState(0);

  return (
    <>
      <Header />
      <div className="mx-auto justify-center items-center mt-28">
        <div className="flex ml-[9%] mt-8 max-w-[1100px] w-screen">
          <h1 className="cursor-pointer">Helperzz /</h1>
          <h1 className="cursor-pointer pl-2"> Blog </h1>
        </div>
        <div className="bg-[#12937C1A]  mx-auto justify-center items-center">
          <div className="grid grid-cols-4 max-md:grid-cols-2 lg:w-[1100px] w-screen m-auto mt-6 p-4 gap-10">
            {points?.map((value, index) => (
              <h1
                key={index}
                className={` font-[500] text-[1.1rem] text-center p-[4px] rounded-xl cursor-pointer ${
                  index === selected ? "bg-white text-[#12937C]" : ""
                }  `}
                onClick={() => setSelected(index)}
              >
                {value?.name}
              </h1>
            ))}
          </div>
        </div>

        <div className="lg:w-[1100px] w-screen m-auto py-10">
          <h1 className="text-[28px] font-bold pb-7">Featured</h1>

          <div className="flex max-md:flex-col flex-wrap w-full md:w-[100%] gap-10">
            <div className="w-[50%] max-lg:w-[95%] max-md:m-auto">
              <Image
                className="w-full h-[460px] max-lg:h-[250px]"
                src={worker}
              />
              <h1 className="text-[20px] font-[600] mt-[-38px] max-md:text-[13px] text-white text-center">
                Moving Company Spotlight: Let&apos;s Get Moving,
              </h1>
            </div>
            <div className="flex flex-col flex-wrap gap-3 w-[45%] hidden lg:block">
              <div className="flex bg-[#E8F5F2] gap-4 rounded-2xl  h-[220px]">
                <Image
                  src={women}
                  alt="women"
                  className="w-[50%] h-[220px] object-cover rounded-l-2xl"
                />
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <h1 className="font-[600] text-[15.5px]">
                      Celebrating women in construction day: the home
                      improvements group
                    </h1>
                    <div className="flex justify-between mt-2">
                      <h1 className="font-[400] text-[12px] text-gray-500">
                        By: Magan Sulivan
                      </h1>
                      <h1 className="font-[400] text-[12px] text-gray-500">
                        February 16, 2024
                      </h1>
                    </div>
                    <h1 className="font-[400] text-[13px] text-gray-800 mt-4 line-clamp-2 text-ellipsis">
                      The National Construction Day (November 30th) Aims to
                      Celebrate the Dedicated, Hard-Working...
                    </h1>
                  </div>
                  <h1 className="font-[400] text-[14px] text-[#12937C] cursor-pointer ">
                    Read More
                  </h1>
                </div>
              </div>

              <div className="flex bg-[#E8F5F2] gap-4 rounded-2xl  mt-4 h-[220px]">
                <Image
                  src={women}
                  alt="women"
                  className="w-[50%] h-[220px] object-cover rounded-l-2xl"
                />
                <div className="p-4 flex flex-col justify-between">
                  <div>
                    <h1 className="font-[600] text-[15.5px]">
                      Did you claim your home renovation tax credit?
                    </h1>
                    <div className="flex justify-between mt-2">
                      <h1 className="font-[400] text-[12px] text-gray-500">
                        By: Magan Sulivan
                      </h1>
                      <h1 className="font-[400] text-[12px] text-gray-500">
                        February 16, 2024
                      </h1>
                    </div>
                    <h1 className="font-[400] text-[13px] text-gray-800 mt-4 line-clamp-2 text-ellipsis">
                      The National Construction Day (November 30th) Aims to
                      Celebrate the Dedicated, Hard-Working...
                    </h1>
                  </div>

                  <h1 className="font-[400] text-[14px] text-[#12937C] cursor-pointer ">
                    Read More
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2nd section ========== */}
        <div className="bg-[#12937C] flex justify-center max-md:flex-col p-4 gap-6 align-center my-6">
          <h1 className="text-white font-[600] text-[19px] mt-[4px] text-center">
            Get FREE Qoutes From Trusted Pros
          </h1>
          <div className="flex gap-4 max-md:mt-[-5px] justify-center">
            <input
              type="text"
              className="bg-white rounded-md text-[14px] pl-4 py-2 w-[14rem] max-md:w-[12rem] outline-none"
              placeholder="Enter Your Postal Code*"
            />
            <button className="bg-white px-2 py-[3px] rounded-md font-[300] text-[14px]">
              Get Free Quote
            </button>
          </div>
        </div>

        {/* 3rd section ======== */}

        <div className="py-10  lg:w-[1100px] w-screen mx-auto">
          <h1 className="text-[28px] font-[600] pb-7">Design</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-md:w-[90%] max-md:m-auto">
            {design?.map((value, index) => (
              <div key={index} className="max-md:mt-4 ">
                <img
                  src={value?.image}
                  alt="image"
                  className="w-full h-[320px] object-cover rounded-xl"
                />
                <h1 className="mt-2 text-[16px] font-[500]">{value?.name}</h1>
                <div className="flex justify-between mt-2 pr-2">
                  <p className=" text-sm font-[300] text-gray-600">
                    By:Megan Sulivan
                  </p>
                  <p className=" text-sm font-[300] text-gray-600">
                    February 16,2024
                  </p>
                </div>
                <button className="border border-[#12937C] text-[#12937C] font-[500] text-sm p-2 rounded-xl mt-4">
                  Read More
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 4rd section ======== */}

        <div className="py-10 lg:w-[1100px] w-screen mx-auto">
          <h1 className="text-[28px] font-[600] pb-7">Improvement</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-md:w-[90%] max-md:m-auto">
            {improvements?.map((value, index) => (
              <div key={index} className="max-md:mt-4 ">
                <img
                  src={value?.image}
                  alt="image"
                  className="w-full h-[320px] object-cover rounded-xl"
                />
                <h1 className="mt-2 text-[16px] font-[500]">{value?.name}</h1>
                <div className="flex justify-between mt-2 pr-2">
                  <p className=" text-sm font-[300] text-gray-600">
                    By:Megan Sulivan
                  </p>
                  <p className=" text-sm font-[300] text-gray-600">
                    February 16,2024
                  </p>
                </div>
                <button className="border border-[#12937C] text-[#12937C] font-[500] text-sm p-2 rounded-xl mt-4">
                  Read More
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* 5th section ======== */}
        <div className="py-6 my-10 bg-[#F7F9FB] ">
          <div className="flex justify-between max-md:flex-col gap-10  m-auto align-center items-center lg:w-[900px] w-screen">
            <div className="font-semibold">
              <h1 className="text-[28px] text-[#12937C]">
                Get Leads From Reviewed Pros
              </h1>
              <h1 className="text-[28px] ">+ 3500 Pros </h1>
            </div>
            <div className="bg-[#12937C] rounded-xl p-6 ">
              <h1 className="text-center text-white font-[500] pb-6 text-[20px] capitalize">
                Get leads from reviewed pros
              </h1>
              <div className="flex flex-col gap-2">
                <select
                  name=""
                  id=""
                  className="rounded-xl p-3 px-2 text-gray-500 w-[18rem] text-[14px] outline-none"
                >
                  <option value="select Category" selected disabled>
                    Select Category
                  </option>
                  <option value="Painting">Painting</option>
                  <option value="Painting">Cleaning</option>
                </select>
                <input
                  type="text"
                  placeholder="Postal Code"
                  className="rounded-xl py-[9px] pl-3 text-gray-500 w-[18rem] mt-2 text-[14px] outline-none"
                />
                <input
                  type="submit"
                  value="Get Qoutes"
                  className="rounded-xl py-[9px] pl-2 text-gray-900 w-[18rem] font-semibold mt-2 text-[16px] outline-none bg-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 6th section =========== */}

        {/* 7th section =========== */}

        {/* 8th section =========== */}

        <div className="bg-[#F7F9FB] py-10 my-10 ">
          <div className="grid grid-cols-4 max-md:grid-cols-1 lg:w-[1100px] w-screen m-auto gap-6">
            <div className="bg-[#12937C] rounded-xl p-4 flex flex-col justify-between  ">
              <h1 className="text-[27px] text-white uppercase text-center max-md:text-[20px]">
                Helperzz Updates
              </h1>
              <div className="flex justify-center flex-grow"></div>
              <center>
                <button className="bg-white rounded-lg shadow-md capitalize w-[10rem] max-md:w-[7rem] border-[1px] border-[#12937C] mt-4 text-gray-600 text-[14px] py-[5px]">
                  view all
                </button>
              </center>
            </div>

            {updates?.map((value, index) => (
              <div
                key={index}
                className="bg-gradient-to-b from-[#FFFFFF39] to-[#12937C28] p-4 border-[1px] border-[#12937C] rounded-xl flex flex-col justify-between min-h-[220px]"
              >
                <div>
                  <h1 className="font-[600] text-gray-700 text-[18px]">
                    {value?.name}
                  </h1>
                  <h1 className="font-[200] text-[14px] text-gray-500  mt-4">
                    {value?.description}
                  </h1>
                </div>
                <div className="flex justify-center flex-grow"></div>
                <center>
                  <button className="bg-transparent rounded-lg shadow-md max-md:w-[7rem] capitalize w-[10rem] border-[1px] border-[#12937C] mt-4 text-gray-600 text-[14px] py-[5px]">
                    view all
                  </button>
                </center>
              </div>
            ))}
          </div>
        </div>

        {/* 9th section ========= */}

        <div className="py-6 my-10 bg-[#F7F9FB] ">
          <div className="flex max-md:flex-col-reverse max-md:flex-col gap-12 lg:w-[900px] w-screen m-auto align-center items-center">
            <div className="bg-[#12937C] rounded-xl p-6 ">
              <h1 className="text-center text-white font-[500] text-[20px] capitalize">
                Sign up for articles, hiring
              </h1>
              <h1 className="text-center text-white font-[500] pb-6 text-[20px] capitalize">
                tips, cost guides and more
              </h1>
              <div className="flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="First Name *"
                  className="rounded-xl py-[7px] pl-2 text-gray-500 w-[18rem] mt-2 text-[14px] outline-none"
                />
                <input
                  type="text"
                  placeholder="Last Name *"
                  className="rounded-xl py-[7px] pl-2 text-gray-500 w-[18rem] mt-2 text-[14px] outline-none"
                />
                <input
                  type="email"
                  placeholder="Email Address *"
                  className="rounded-xl py-[7px] pl-2 text-gray-500 w-[18rem] mt-2 text-[14px] outline-none"
                />
                <input
                  type="submit"
                  value="Sign Up"
                  className="rounded-xl py-[5px] pl-2 text-gray-900 w-[18rem] font-[500] mt-2 text-[16px] outline-none bg-white"
                />
              </div>
            </div>

            <div>
              <h1 className="text-[28px] text-[#12937C] capitalize">
                Sign Up for articles,hiring
              </h1>
              <h1 className="text-[28px] capitalize">
                tips, cost guids and more{" "}
              </h1>
            </div>
          </div>
        </div>
      </div>
      {/* <Footer /> */}]
    </>
  );
};

export default Blog;
