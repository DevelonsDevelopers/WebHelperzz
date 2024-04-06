"use client";

import React, { useEffect, useState } from "react";
import { LocationIcon, SearchIcon } from "@/components/svg";
import { Posts } from "@/components/Post";

import axios from "axios";
import Select from "react-select";
import Header from "../components/Header";
import { Footer } from "../components/Footer";
// import "./Home.css";
import categoryService from "../api/services/categoryService";
import costGuideService from "../api/services/costGuideService";
import blogService from "../api/services/blogService";
import testimonialService from "../api/services/testimonialService";
import contractorService from "../api/services/contractorService";
import { useRouter } from "next/navigation";

function Page() {


  const router = useRouter();

  const [zipcode, setZipcode] = useState("");
  const [zipcodeData, setZipcodeData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [costGuides, setCostGuides] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [contractors, setContractors] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedError, setSelectedError] = useState(false);

  const [isValidPostalCode, setIsValidPostalCode] = useState(true);
  const [postalCode, setPostalCode] = useState("M1M 1W1");

  const handleSelectChange = (selectedOption) => {
    setSelectedOption(selectedOption);
    setSelectedError(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedOption) {
      setSelectedError(true);
      return;
    }

    const postalCoderegex = /^[A-Z]\d[A-Z] \d[A-Z]\d$/;
    setIsValidPostalCode(postalCoderegex.test(postalCode));

    if (!postalCoderegex.test(postalCode)) {
      return;
    }
    if (selectedOption && isValidPostalCode) {
      console.log(selectedOption);
      router.push(
        "/getquote?id=" +
          selectedOption.value +
          "&c=" +
          selectedOption.label +
          "&p=" +
          postalCode
      );
    }
  };

  const handlePostalChange = (e) => {
    const inputPostal = e.target.value;
    setPostalCode(inputPostal);
  };

  const options = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  console.log("zipcode", zipcode);

  const getCategories = async () => {
    try {
      const response = await categoryService.fetchAll();
      setCategories(response.categories);
    } catch (error) {
      console.error(error);
    }
  };

  const getCostGuides = async () => {
    try {
      const response = await costGuideService.fetchAll();
      setCostGuides(response.costGuides);
    } catch (error) {
      console.error(error);
    }
  };

  const getBlogs = async () => {
    try {
      const response = await blogService.fetchAll();
      setBlogs(response.blogs);
    } catch (error) {
      console.error(error);
    }
  };

  const getTestimonials = async () => {
    try {
      const response = await testimonialService.fetchAll();
      setTestimonials(response.testimonials);
    } catch (error) {
      console.error(error);
    }
  };

  const getContractors = async () => {
    try {
      const response = await contractorService.featured();
      setContractors(response.contractors);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategories();
    getBlogs();
    getCostGuides();
    getTestimonials();
    getContractors();
  }, []);

  return (
    <>
      <Header />
      <main className="hero_image h-[70vh] max-sm:h-[800px] px-4  w-[100%] ">
        <div className="main_home pl-[3.5rem] max-md:pl-0  max-sm:mt-[80px] max-w-[650px] mx-auto">
          <h1 className="font-semibold sm:mt-3 mt-32 text-2xl text-transform: capitalize">
            The best place <br />
            to Find Professionals
          </h1>
          <h2 className="text-lg mt-4">
            Thousands of homeowners connect with the right pro every week for
            their remodeling projects. Ready to find yours?
          </h2>
          <div className="mt-8  sm:hidden min-h-9 items-center rounded-3xl w-full">
            <div className="">
              <div className="w-full items-center  flex  gap-2 p-3 rounded-full bg-white shadow-md">
                <SearchIcon />
                <Select
                  styles={{
                    border: "none",
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      // borderColor: state.isFocused ? "grey" : "red",
                    }),
                  }}
                  options={options}
                  placeholder="What service do you need?"
                  isSearchable={true}
                  className="placeholder:text-[#696969] sm:w-[230px] w-[100%] text-black font-semibold ml-2 h-full outline-none border-none"
                  onChange={(e) => handleSelectChange(e)}
                />
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 gap-3">
              <div className="w-1/2 s flex shadow-md items-center gap-2 p-3 rounded-full bg-white  font-bold text-[#888888]   text-sm sm:text-base">
                <LocationIcon />
                <input
                  type="text"
                  placeholder="Postal Code"
                  value={postalCode}
                  onChange={(e) => handlePostalChange(e)}
                  className=" placeholder:text-[#696969]   font-semibold ml-2 h-full outline-none max-w-28"
                />
              </div>
              <div className="w-1/2">
                <button
                  onClick={(e) => handleSubmit(e)}
                  className="bg-primary  cursor-pointer hover:bg-white hover:text-white transition-none w-full  text-white rounded-3xl ml-auto p-3 text-transform : uppercase font-bold px-4 text-sm sm:text-base"
                >
                  Get Quotes
                </button>
              </div>
            </div>
          </div>
          <div className="mt-8 sm:flex bg-white min-h-9 items-center  rounded-[20px] shadow-md w-full hidden ">
            <div className="pl-4">
              <SearchIcon />
            </div>
            <Select
              styles={{
                border: "none",
                control: (baseStyles, state) => ({
                  ...baseStyles,
                }),
              }}
              options={options}
              placeholder="What service do you need?"
              isSearchable={true}
              className="placeholder:text-[#696969] text-black select_bar sm:w-[230px] w-[100%]  font-medium ml-2 h-full outline-none"
              onChange={(e) => handleSelectChange(e)}
            />
            <div className=" font-bold text-[#696969] ml-6 flex items-center gap-2 text-sm sm:text-base">
              <LocationIcon />
              <input
                type="text"
                placeholder="Postal Code"
                value={postalCode}
                onChange={(e) => handlePostalChange(e)}
                className=" placeholder:text-[#696969] font-medium ml-2 h-full outline-none max-w-28"
              />
            </div>
            <button
              onClick={(e) => handleSubmit(e)}
              className="bg-primary cursor-pointer hover:bg-white hover:text-primary transition-none border-2 border-primary text-white rounded-[20px] ml-auto p-3 text-transform : uppercase font-bold px-5 text-sm sm:text-base"
            >
              Get Quotes
            </button>
          </div>

          <div className="flex w-[100%]">
            {selectedError && (
              <p className="mt-2 ml-12 text-sm text-red-600 dark:text-red-500">
                Please select category!
              </p>
            )}
            {!isValidPostalCode && (
              <p className="mt-2 ml-[19rem] text-sm text-red-600 dark:text-red-500">
                Please enter a valid postal code!
              </p>
            )}
          </div>

          <div className="mt-8 flex gap-3 items-center flex-col sm:flex-row sm:pb-0 pb-80">
            <h5 className="font-bold text-xl">Hire a pro:</h5>
            <div className="flex flex-wrap gap-2 sm:gap-8">
              <button className="text-[12px] sm:text-base py-2 sm:py-4 px-4 sm:px-6 bg-transparent border border-text rounded-full text-text font-bold">
                Contractors
              </button>
              <button className="text-[12px] sm:text-base py-2 sm:py-4 px-4 sm:px-6 bg-transparent border border-text rounded-full text-text font-bold">
                Architects
              </button>
              <button className="text-[12px] sm:text-base py-2 sm:py-4 px-4 sm:px-6 bg-transparent border border-text rounded-full text-text font-bold">
                See more
              </button>
            </div>
          </div>



        </div>
      </main>
      <Posts
        categories={categories}
        costGuides={costGuides}
        blogs={blogs}
        contractors={contractors}
      />
      <Footer />
    </>
  );
}

export default Page;
