"use client";
import React, { useState, useEffect, useRef } from "react";
import Header from "../../components/Header";
import Image from "next/image";
import contractorService from "../../api/services/contractorService";
import { IMAGE_PATH } from "../../api/BaseUrl";
import "../../style/Home.css";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import searchIcon from "/public/assets/newImages/search-svgrepo-com.svg";
import { GrLocation } from "react-icons/gr";
import { IoSearch } from "react-icons/io5";
// import trustsealing from "../../../../../../public/assets/trustsealbadge.png";
import trustsealing from '/public/assets/trustsealbadge.png'

import {
  Pagination,
  Stack,
  ThemeProvider,
  createTheme,
  PaginationItem
} from "@mui/material";


const rating = [{value:'1' , name:'1 Star'} ,{value:'2' , name:'2 Star'} ,{value:'3' , name:'3 Star'} ,{value:'4' , name:'4 Star'} ,{value:'5' , name:'5 Star'} , ]


const Page = () => {

  const [categoryOpen, setCategoryOpen] = useState(true);
  const [bussinessHighlightsOpen, setBussinessHighlightsOpen] = useState(true);
  const [languagesOpen, setLanguagesOpen] = useState(true);
  const [ratingOpen, setRatingOpen] = useState(true);

  const [filterData, setFilterData] = useState();
  const [contractors , setContractors] = useState([])


  useEffect(() => {
    const fetchActive = async () => {
      const response = await contractorService.fetchAllActive()
      console.log('response' , response)
      setContractors(response?.contractors)
    }
    fetchActive()
  },[])

  useEffect(() => {
    const fetchFilter = async () => {
      const response = await contractorService.filters().then((res) =>{
        setFilterData(res?.data)
      })
    }
    fetchFilter()
  },[])



  const itemsPerPage = 9;
  const [currentPage, setCurrentPage] = useState(1);
  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const [paginatedData, setPaginatedData] = useState([]);

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedData(contractors.slice(startIndex, endIndex));
  }, [currentPage, contractors]);

  const theme = createTheme({ palette: { primary: { main: '#E0EFEE', contrastText: '#EEE' } } })

  return (
    <>
      <Header />
      <div className="mt-[7rem]">
          <div className="main-title mt-[6rem] ml-8 my-8 sm:ml-16">
        <h1 className="text-[18px]">Helperzz / Contractor / Plumbing</h1>
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
    <div className="max-w-[1200px] m-auto my-10">
      <p className="text-[2rem] text-gray-900 font-[600]">Plumbing</p>
      <p className="text-sm text-gray-600 font-[400] max-w-[600px]">Some projects are just better left for the professionals - hire a plumbing professional to help install or repair your water , sewage and natural gas pipes.</p>
    </div>

<div className="flex max-w-[1200px] gap-8 m-auto">
<div className="w-[25%] max-md:hidden ">
                  <div className="bg-[#E8F5F2] p-4 rounded-lg ">
                    <h5 className="text-[1.3rem] font-[600] ">Location</h5>

                    <input
                      type="search"
                      // value={inputCity}
                      // onChange={handleInputChange}
                      className="bg-[#F7F9FB] border-[1px] border-[#12937C]  mt-4 py-1 px-4 rounded-lg focus:outline-none w-full pl-10 max-md:rounded-r-lg placeholder:text-[.8rem] align-items-center "
                      placeholder="Toronto ||"
                    />
                    <GrLocation
                      className="ml-3 mt-[-28px] text-gray-600"
                      size={20}
                    />

                    <button
                      // onClick={handleCitySubmit}
                      className="py-1 px-5 mt-4 bg-[#12937C] text-white text-[15px] rounded-[10px] w-full cursor-pointer hover:bg-opacity-80 font-[550]"
                    >
                      Filter City
                    </button>
                  </div>
                  <div className="bg-[#E8F5F2] p-2 rounded-lg mt-5">
                     
                    <div class="w-full border-gray-300  py-5 rounded-t border-b">
                      <div
                        onClick={() => setCategoryOpen(!categoryOpen)}
                        class="mb-3 p-1 bg-transparent flex items-center  rounded transition-all ease-in-out duration-500 "
                      >
                        <div class="p-1 text-lg md:text-md font-[500] w-full text-gray-800 cursor-pointer">
                          Professional Category
                        </div>
                        <div class="text-black w-8 py-1 pl-2 pr-1  flex items-center">
                          {categoryOpen ? (
                            <button class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                              <FaAngleUp />
                            </button>
                          ) : (
                            <button class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                              <FaAngleDown />
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="w-[100%] max-md:w-[100%]">
                        <input
                          type="search"
                          className="bg-transparent border-[1px] border-gray-400 py-1 px-4 rounded-xl focus:outline-none w-full pl-10 placeholder:text-xs max-md:rounded-lg"
                          placeholder="Search Professional Category"
                        />
                        <IoSearch
                          className="ml-2 mt-[-28px] text-gray-500"
                          size={20}
                        />
                      </div>
                      {categoryOpen && (
                        <div class="w-full items-center flex mx-3 mt-6">
                          <form action="" className="flex flex-col gap-2">
                            {filterData?.categories?.map((value, index) => (
                              <div
                                key={index}
                                className="flex items-center cursor-pointer"
                              >
                                <input
                                  type="radio"
                                  id="categories"
                                  name="categories"
                                  value={value.name}
                                  // onChange={handleRadioChange}
                                  className="cursor-pointer form-checkbox w-[13px] h-[13px] border-[1px] border-gray-500 rounded-lg bg-transparent checked:bg-[#12937C] checked:border-green-600"
                                />
                                <label
                                  for="category"
                                  className="ml-2 text-sm font-[400] text-gray-500"
                                >
                                  {value.name}
                                </label>
                              </div>
                            ))}
                          </form>
                        </div>
                      )}
                    </div>
                  
                    <div class="w-full border-gray-300  py-5 rounded-t border-b">
                      <div
                        onClick={() => setBussinessHighlightsOpen(!bussinessHighlightsOpen)}
                        class="mb-3 p-1 bg-transparent flex items-center  rounded transition-all ease-in-out duration-500 "
                      >
                        <div class="p-1 px-2 text-[1.2rem] font-[500] w-full text-gray-800 cursor-pointer">
                          Business Highlights
                        </div>
                        <div class="text-black w-8 py-1 pl-2 pr-1  flex items-center">
                          {bussinessHighlightsOpen ? (
                            <button class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                              <FaAngleUp />
                            </button>
                          ) : (
                            <button class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                              <FaAngleDown />
                            </button>
                          )}
                        </div>
                      </div>
                      {bussinessHighlightsOpen && (
                        <div class="w-full items-center flex mx-3 -mt-1">
                          <form action="" className="flex flex-col gap-2">
                          {filterData?.highlights?.map((value, index) => (
  <div key={index} className="flex items-center cursor-pointer">
    <input
      type="checkbox"
      id={`highlight-${index}`} 
      name="highlights"
      value={value.highlight}
      // onChange={handleCheckboxChange} 
      className="cursor-pointer"
    />
    <label
      htmlFor={`highlight-${index}`}
      className="ml-2 text-[.9rem] font-[400] text-gray-500 cursor-pointer"
    >
      {value.highlight}
    </label>
  </div>
))}

                          </form>
                        </div>
                      )}
                    </div>
                    <div class="w-full border-gray-300  py-5 rounded-t border-b">
                      <div
                        onClick={() => setLanguagesOpen(!languagesOpen)}
                        class="mb-3 p-1 bg-transparent flex items-center  rounded transition-all ease-in-out duration-500 "
                      >
                        <div class="p-1 px-2 text-[1.2rem] font-[500] w-full text-gray-800 cursor-pointer">
                          Languages
                        </div>
                        <div class="text-black w-8 py-1 pl-2 pr-1  flex items-center">
                          {languagesOpen ? (
                            <button class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                              <FaAngleUp />
                            </button>
                          ) : (
                            <button class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                              <FaAngleDown />
                            </button>
                          )}
                        </div>
                      </div>
                      {languagesOpen && (
                        <div class="w-full items-center flex mx-3 -mt-1">
                          <form action="" className="flex flex-col gap-2">
                          {filterData?.languages?.map((value, index) => (
  <div key={index} className="flex items-center cursor-pointer">
    <input
      type="checkbox"
      id={`language-${index}`}
      name="languages"
      value={value.language}
      className="cursor-pointer"
      // onChange={handleCheckboxChange} 
    />
    <label
      htmlFor={`language-${index}`} 
      className="ml-2 text-[.9rem] font-[400] text-gray-500 cursor-pointer" 
    >
      {value.language}
    </label>
  </div>
))}

                          </form>
                        </div>
                      )}
                    </div>
                    <div class="w-full border-gray-300  py-5 rounded-t border-b">
                      <div
                        onClick={() => setRatingOpen(!ratingOpen)}
                        class="mb-3 p-1 bg-transparent flex items-center  rounded transition-all ease-in-out duration-500 "
                      >
                        <div class="p-1 px-2 text-[1.2rem] font-[500] w-full text-gray-800 cursor-pointer">
                          Rating
                        </div>
                        <div class="text-black w-8 py-1 pl-2 pr-1  flex items-center">
                          {ratingOpen ? (
                            <button class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                              <FaAngleUp />
                            </button>
                          ) : (
                            <button class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                              <FaAngleDown />
                            </button>
                          )}
                        </div>
                      </div>
                      {ratingOpen && (
                        <div class="w-full items-center flex mx-3 -mt-1">
                          <form action="" className="flex flex-col gap-2">
                            {rating?.map((value, index) => (
                              <div
                                key={index}
                                className="flex items-center cursor-pointer"
                              >
                                <input
                                  type="checkbox"
                                  id={`review-${index}`}
                                  name="review"
                                  value={value.name}
                                  className="cursor-pointer"
                                  // onChange={handleRadioChange}
                                />
                                <label
                                  for={`review-${index}`}
                                  className="ml-2 text-[.9rem] font-[400] text-gray-500"
                                >
                                  {value.name}
                                </label>
                              </div>
                            ))}
                          </form>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

<div className="w-[75%]">
<div className="grid grid-cols-3 gap-4 max-w-[1000px]">
{paginatedData?.map((value, index) => (
  // value?.category_name === "Electronic Repairs" && (
    <div key={index} className='border-2 border-[#64B6E3] p-4 rounded-xl flex flex-col min-h-[300px] bg-[#F7F9FB] '>
      <div className="flex gap-4">
        <img src={`${IMAGE_PATH}${value?.image}`} alt="image" className="w-12 h-12 rounded-full" />
        <div className='mt-2'>
          <h1 className='font-semibold text-sm'>{value?.company_name}</h1>  
          <h1 className=' text-xs mt-2 font-[500] text-gray-600'>{value?.category_name}</h1> 
        </div>
        
      </div>
      {value.trust_seal === 1 && (
        <Image
             src={trustsealing}
             width={120}
             height={20}
             alt="trustSeal badge"
             className="mt-2"
          />

      )}
      <div className='mt-4 flex flex-wrap gap-2 mb-6'>
      {value?.skills?.split(',').map((skill, index) => (
  <h1 key={index} className='font-medium text-[15px] text-[#119DED] font-[700] ml-2'>{skill.trim()}</h1>
))}
      </div>
      <div className='flex-grow'></div>
      <button className='font-semibold hover:bg-primary  text-sm px-4 max-md:mt-2 py-2 rounded-xl bg-white capitalize shadow-sm relative border-[1px] border-[#119DED] hover:border-[#B7E2FA] hover:text-white ml-auto mr-auto'>
        Get a free quote
      </button>
    </div>
  // )
))}

</div>
<ThemeProvider theme={theme}>
        <Stack direction="row" justifyContent="center" marginTop={2}>
          <Pagination
            count={Math.ceil(contractors.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            renderItem={(item) => (
              <PaginationItem
              components={{
                previous: (props) => <button {...props} className="display-none"> </button>,
                next: (props) => <button {...props} className=" p-[4px] !bg-[#12937C] px-4 rounded-md" >Next</button>,
              }}
              style={{    
              paddingTop: '1.5rem',
              paddingBottom: '1.5rem',
              fontSize: '0.875rem', 
              color: '#333', 
            padding:'15px'
           }} 
              {...item}
            />
            )}
  
          />
        </Stack>
      </ThemeProvider>
</div>


</div>

      </div>
      <div className="mt-[5rem]">
      <Footer />
        </div>
    </>
  );
};

export default Page;
