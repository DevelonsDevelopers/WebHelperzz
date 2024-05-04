"use client";
import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/Header";
import Image from "next/image";
import worker from "/public/assets/worker.png";
import women from "/public/assets/women.png";
import Loading from "../../components/loading";
import costGuideService from "../../api/services/costGuideService";
import contractorService from "../../api/services/contractorService";
import blogService from "../../api/services/blogService";
import { IMAGE_PATH } from "../../api/BaseUrl";
import "../../style/Home.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import moment from "moment";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Search from "@/components/search/Search";
import mapIcon from "/public/assets/newImages/map-tag-svgrepo-com.svg";
import searchIcon from "/public/assets/newImages/search-svgrepo-com.svg";

const Blog = () => {

  return (
    <>
      <Header />
      <div className="mt-[7rem]">
          <div className="main-title mt-[6rem] ml-8 my-8 sm:ml-16">
        <h1 className="text-[18px]">Helperzz / Success Stories</h1>
      </div>
      <div className="w-full bg-[#12937C] flex justify-center ">
      <div className="search-container  h-[204px] width-100 flex flex-col justify-center items-center ">
        <div className="search-text">
          <h1 className="text-[20px]  sm:text-[28px] font-[500] mb-5 text-[white] text-center">
            Search Top Contractor
          </h1>
        </div>
        <div className="search-input">
          <div className="relative bg-white rounded-[20px] shadow-md h-[45px] flex items-center">
            <div className="mr-2 pl-3 sm:pl-6">
              <Image
                src={searchIcon}
                alt="Search Icon"
                width={20}
                height={20}
              />
            </div>
            <input
              type="text"
              placeholder="Search By Category"
              className="focus:outline-none flex-grow text-black text-[10px] sm:text-[16px]   sm:w-[350px]"
            />
            <button className="bg-[#129DED] text-white px-3 text-[8px] sm:text-[14px] sm:px-5 h-[45px] rounded-[20px] ml-2">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
      <div className="h-[10rem] w-full px-10 py-5" >
        <div className="flex justify-between" >
            <p className="text-[1.4rem] font-[600] " >Plumbering</p>
            <button className="bg-green-100 text-black font-[600] p-2 rounded-xl " > 
                View All 
            </button>
        </div>

<div className="grid grid-cols-4 ">

        <div  className='border-[1px] border-[#64B6E3] p-4 rounded-xl flex flex-col'>
 <div className="flex gap-4">
     {/* <img src={value?.image} alt="image" className="w-12 h-12" /> */}
     <img  alt="image" className="w-12 h-12" />
     <div className='mt-2'>
         <h1 className='font-semibold text-sm'>name</h1>
         <h1 className='font-normal text-xs'>experties</h1>
     </div>
 </div>
 <div className='mt-4 flex flex-wrap gap-2 mb-6'>
     {/* {value?.point?.map((item, index) => ( */}
         {/* <h1 key={index} className='font-medium text-[15px] text-[#119DED] ml-2'>{item?.name}</h1> */}
         <h1 className='font-medium text-[15px] text-[#119DED] ml-2'>name</h1>
         <h1 className='font-medium text-[15px] text-[#119DED] ml-2'>name</h1>
         <h1 className='font-medium text-[15px] text-[#119DED] ml-2'>name</h1>
     {/* ))} */}
 </div>
 <div className='flex-grow'></div>
 <button className='font-semibold text-sm px-4 max-md:mt-2 py-2 rounded-xl bg-white capitalize shadow-sm relative border-[1px] border-[#119DED] hover:bg-[#B7E2FA] hover:border-[#B7E2FA] hover:text-white ml-auto mr-auto'>
     Get a free quote
 </button>
</div>

</div>

      </div>
      </div>
      <Footer />
    </>
  );
};

export default Blog;
