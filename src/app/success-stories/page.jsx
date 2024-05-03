"use client";

import successStoriesService from "@/api/services/successStoriesService";
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import Search from "@/components/search/Search";
import React, { useEffect, useState } from "react";
import moment from "moment";
import Image from "next/image";
import worker from "/public/assets/worker.png";
import women from "/public/assets/women.png";
import contractorService from "../../api/services/contractorService";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IMAGE_PATH } from "../../api/BaseUrl";
import Link from "next/link";
import costGuideService from "../../api/services/costGuideService";
import "../../style/Home.css";



function Costgguides(props) {
  const { buttonText, title } = props;

  return (
    <div className="costguides_container">
      <div className="btn_guides">
        <p className="btn_text">{buttonText}</p>
      </div>
      <p className="cost_text">{title}</p>
    </div>
  );
}



const Page = () => {

  const [successStories, setSuccessStories] = useState([]);
  const [loading , setLoading] = useState(true)
  const [contractors, setContractors] = useState([]);
  const [costGuides, setCostGuides] = useState([]);



  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      const response = await successStoriesService
      .fetchSuccessStories().then((res) => {
        setSuccessStories(res?.successStories),
        console.log('response ' , res)
      })
      setLoading(false)
    };
    fetchData();
  },[]);

  useEffect(() => {
     const getCostGuides = async () => {
        try {
           const response = await costGuideService.fetchAll();
           setCostGuides(response.costGuides);
             } catch (error) {
              console.error(error);
           }
  }; 
  getCostGuides()
},[])


  useEffect(() => {

    const getContractors = async () => {
      try {
      
        const response = await contractorService.featured();
        setContractors(response.contractors);
      } catch (error) {
        console.error(error);
      }
    };
    getContractors()

  },[])


  const isTopHelperzzMobile =
    typeof window !== "undefined" && window.innerWidth < 768;
  const displayedTopHelperzz = isTopHelperzzMobile
    ? contractors.slice(0, 2)
    : contractors;

    const TopHelperzzsettings = {
      dots: true,
      infinite: displayedTopHelperzz.length > 1,
      speed: 500,
      slidesToShow: Math.min(3, displayedTopHelperzz.length),
      slidesToScroll: 1,
      rows: 1,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          },
        },
        {
          breakpoint: 500,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };




  return (
    <div>


      <Header />
      <div className="main-title mt-[6rem] ml-8 my-8 sm:ml-16">
        <h1 className="text-[18px]">Helperzz / Success Stories</h1>
      </div>

      <Search />
{loading ?

<div class="flex space-x-2 justify-center items-center bg-white h-screen">
<span class="sr-only">Loading...</span>
<div class="h-6 w-6 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
<div class="h-6 w-6 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
<div class="h-6 w-6 bg-black rounded-full animate-bounce"></div>
</div>
:
<>
{/* 1st section ======== */}


<div  className="lg:w-[1100px] w-screen m-auto py-10">
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






      <div className="py-10  lg:w-[1100px] w-screen mx-auto">
      <h1 className="text-[28px] font-[600] pb-7">Successfull Stories</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-md:w-[90%] max-md:m-auto">
          {successStories?.map((value, index) => (
            <div key={index} className="max-md:mt-4 ">
             <iframe
  width="560"
  height="315"
  src={value?.youtube_link}
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  className="w-full h-[320px] object-cover rounded-xl"
></iframe>
              <h1 className="mt-2 text-[16px] font-[500]">{value?.name}</h1>
              <div className="flex justify-between mt-2 pr-2">
                <p className="font-[500] text-gray-600">
                  {value.title}
                </p>
                <p className=" text-sm font-[300] text-gray-600">
                {moment(value.created_at).format("MMM Do YY")}
                </p>
              </div>
              <p className='font-[300] text-sm text-gray-500'>
                {value?.description.split(0,150)}...
                </p>
              
            </div>
          ))}
        </div>
      </div>


{/* 6th section =========== */}
<section class="text-gray-600 body-font lg:w-[1000px] w-screen mx-auto py-20">
          
            <div class="sm:w-[100%] sm:flex h-[100%] md:mx-auto">
              <div class="rounded-3xl mr-2 mb-2 sm:w-[25%] px-4 py-7  bg-[#B7E2FA]">
                <div class="h-[180px] sm:h-full flex ">
                  <div class="relative flex-grow sm:p-3 p-0">
                    <h2
                      style={{ lineHeight: 1.45 }}
                      className="text-xl pt-6  text-center sm:text-left font-bold  text-text w-full "
                    >
                      Find the
                      <span className="mx-2 text-[#0067A1]">
                        Top Rated Helperzz
                      </span>
                      for your project
                    </h2>
                    <a class="absolute bottom-[1px] left-1/2 transform -translate-x-1/2 w-[90%] shadow-lg mt-12 text-xs hover:bg-transparent hover:text-text hover:border-primary cursor-pointer transition-none text-text mt-4 justify-center border py-3 rounded-2xl font-bold bg-[#fff] inline-flex items-center mx-auto">
                      View All top Helperzz
                    </a>
                  </div>
                </div>
              </div>
              <div className="sm:w-[75%]">
                <Slider {...TopHelperzzsettings} >
                  {displayedTopHelperzz.map((value) => (
                    <div key={value.id} className="flex">
                      <div className="sm:w-[220px] w-full">
                        <div
                          class="py-3 px-2 mr-2 mb-2 border-primary border rounded-3xl relative cursor-pointer"
                          // onClick={() =>
                          //   navigate.push(
                          //     "/profile/" +
                          //       value.company_name
                          //         .replaceAll(" ", "-")
                          //         .toLowerCase()
                          //   )
                          // }
                        >
                          <div class="h-[280px]  items-start select-text">
                            <div class="flex p-3">
                              <a class="inline-flex">
                                <img
                                  alt="blog"
                                  src={`${IMAGE_PATH}${value.image}`}
                                  class="h-16 sm:w-16 rounded-full flex-shrink-0 object-cover object-center"
                                />
                                <span class="flex-grow flex flex-col pl-2  items-center">
                                  <span class="text-lg font-semibold text-gray-900 line-clamp-1 text-ellipsis">
                                    {value.company_name}
                                  </span>
                                  <span class="font-normal text-sm text-gray-900">
                                    {value.category_name}
                                  </span>
                                </span>
                              </a>

                              <div class="text-primary absolute text-sm mt-24 font-bold mb-8 flex flex-wrap gap-x-4">
                                {value.skills.split(",").map((skill, index) => (
                                  <span key={index}>{skill}</span>
                                ))}
                              </div>
                              <Link href='/create-project' class="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[70%] text-xs mt-3 cursor-pointer hover:bg-primary hover:text-white transition-none text-text mb-2 min-w-55 justify-center px-3 py-3 rounded-2xl font-bold bg-transparent border-primary border inline-flex items-center mx-auto">
                                Get A Free Quote
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
        </section>

{/* 7th section =========== */}
<div className="costguides_main sm:w-[900px] w-screen mx-auto flex justify-center align-content-center">
          <div className="container px-5 sm:py-6">
            <div className="mb-8 flex justify-between items-center flex-wrap">
              <h1 className="heading_costguides pb-3">Popular Cost Guides</h1>
            </div>
          
              <>
                <div className="mx-auto grid pr-5 mb-5 grid-cols-2 md:grid-cols-3  justify-between">
                  {costGuides.map((value) => (
                    <Costgguides
                      key={value.id}
                      buttonText={value.subtitle}
                      title={value.title}
                    />
                  ))}
                </div>
              </>
           </div>
        </div>




      <Footer />
      </>}
    </div>
  );
};
export default Page;
