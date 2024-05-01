"use client";

import successStoriesService from "@/api/services/successStoriesService";
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import Search from "@/components/search/Search";
import React, { useEffect, useState } from "react";
import moment from "moment"


const Page = () => {

  const [successStories, setSuccessStories] = useState([]);
  const [loading , setLoading] = useState(true)

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

      <div className="py-10  lg:w-[1100px] w-screen mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-md:w-[90%] max-md:m-auto">
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

      <Footer showNewsLetter={false} />
      </>}
    </div>
  );
};
export default Page;
