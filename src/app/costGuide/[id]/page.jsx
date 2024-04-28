"use client";
import Header from "@/components/Header";
import React, { useState, useEffect } from "react";
import costGuideService from "@/api/services/costGuideService";
import Link from "next/link";
import moment from "moment";
import {IMAGE_PATH} from "@/api/BaseUrl";

function CostGuide({ params }) {
  const [costGuide, setCostGuide] = useState();
  const [ID, setID] = useState();

  const getCostGuide = async () => {
    try {
      const response = await costGuideService.fetchByID(ID);
      console.log('response',response);
      setCostGuide(response.costGuide);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => { 
    setID(params.id);
    console.log(params.id);
    console.log(ID);
  }, [ID]);

  useEffect(() => {
    if (ID) {
        getCostGuide();
    }
}, [ID]);
  return (
        <>
            <Header/>
            <div className="flex flex-col gap-5 lg:gap-10 py-44 justify-center items-center min-h-[100vh] ">
                <div className="flex flex-wrap lg:flex-nowrap gap-5 w-full max-w-[1500px] mx-auto">
                    <div className='flex flex-col gap-7 w-full'>
                        <h6 className="text-lg max-w-[1300px] w-full mx-auto">Helperzz / Blog</h6>
                        <div className="flex justify-between bg-[#F7F9FB] w-full max-w-[1500px] mx-auto">
                            <div className='flex justify-between max-w-[1300px] mx-auto w-full  py-10 px-4'>
                                <div className="flex flex-col gap-3">
                                    <h3 className="font-bold text-3xl max-w-2xl leading-relaxed">{costGuide?.title}</h3>
                                    <p>By <Link className="inline text-black" href='#'>{costGuide?.author}</Link></p>
                                    <p>Updated {moment(costGuide?.created_date).format("ll")}</p>
                                </div>
                            </div>

                        </div>
                        <div className="flex flex-wrap lg:flex-nowrap gap-5 w-full max-w-[1300px] mx-auto">
                            <div className="flex text-lg flex-col gap-3 lg:w-[60%] w-screen p-4">
                                <h4 className="font-bold text-2xl">{costGuide?.subtitle}</h4>
                                <div className='relative w-full h-[600px]'>
                                    <img src={`${IMAGE_PATH}${costGuide?.image}`} className="object-cover" fill alt='Blog Image'/>
                                </div>
                                <p className={``} dangerouslySetInnerHTML={{
                                    __html: costGuide?.content,
                                }}/>
                            </div>
                            <div className='relative flex flex-col lg:w-[40%] w-full gap-10 -mt-24'>
                                <GetQuotes/>
                                <MoreGuides/>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
            <footer className="text-gray-800 bg-[#E8E8E8] body-font">
                <div
                    className="container px-14 sm:px-0 sm:py-24 mx-auto flex  md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
                    <div className="flex-grow flex flex-wrap  -mb-10 md:mt-0 mt-10 md:text-left  text-left">
                        <div className="footer_col_1 lg:w-1/4 md:w-1/2 w-full px-8">
                            <h2 className="title-font font-bold text-gray-900 text-base mb-3 text-transform: uppercase">
                                Homeowners
                            </h2>
                            <nav className="list-none mb-10">
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Browse Categories
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Browse Tasks
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Write A Review
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Homeowner FAQ
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Review Guidelines
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Homeowner Trust
                                    </a>
                                </li>
                            </nav>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 w-full">
                            <h2 className="title-font font-bold text-gray-900 text-base mb-3">
                                CONTRACTORS
                            </h2>
                            <nav className="list-none mb-10">
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Join Helperzz
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Home Professional FAQ
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Building Trust
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Home Professional Terms
                                    </a>
                                </li>
                            </nav>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 w-full">
                            <h2 className="title-font font-bold text-gray-900 text-base mb-3">
                                HELPERZZ
                            </h2>
                            <nav className="list-none mb-10">
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Careers at Helperzz
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Careers at Helperzz
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Contact Us
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Terms of Use
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Privacy{" "}
                                    </a>
                                </li>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="text-center  text-base text-transform: uppercase font-bold text-text">
                    Helperzz.com
                </div>
                <p className="text-center text-sm  pb-4">2024</p>
            </footer>
        </>
  );
}

const GuideCard = (props) => {
    return (
    <div className="flex bg-secondary rounded-3xl bg-opacity-10 overflow-hidden select-text">
        <img
            className="object-cover w-[40%] h-[250px] object-center rounded-3xl"
            src={`/cali-constructions.png`}
            alt="blog"
        />
        <div className="flex-1 flex flex-col gap-5 p-3">
            <h2 className="title-font text-lg font-bold text-gray-900 mb-3 select-text">
                Successful Contractor Life
            </h2>
            <div className="flex justify-between">
                <p className="text-sm text-[#26262699]">By: Helperzz</p>
                <p className="text-sm text-[#26262699]">July 6, 2024</p>
            </div>
            <p className="text-sm mb-3 overflow-ellipsis select-text">
                A modern, renovated deck combines beauty and function to create the perfect entertaining space...
            </p>
            <a href='' className="text-secondary text-sm font-bold transition-all inline-flex items-center md:mb-2 lg:mb-0 sm:w-auto w-full sm:justify-start justify-center">
                Read more
            </a>
        </div>
    </div>
    )
}
export const GetQuotes = (props) => {
    return (
    <div className="sticky top-10 flex flex-col gap-5 lg:w-[80%] w-full bg-secondary text-white rounded-3xl p-8">
        <h1 className="text-center font-bold text-[20px] capitalize">
            Ready to start your deck design?
        </h1>
        <p className="font-medium">Find top local pros.</p>
        <button
            type="submit"
            className="bg-white text-black  w-full hover:bg-opacity-70 font-semibold p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-white"
        >
            Get Quotes
        </button>
    </div>
    )
}
const MoreGuides = (props) => {
    const [guides, setGuides] = useState()


    const getGuides = async () => {
        try {
            const response = await costGuideService.fetchAll();
            setGuides(response.guides);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getGuides();
    }, []);
    return (
        <div className="flex flex-col gap-5 w-full p-4">
            <h4 className="font-bold text-2xl">You may also like</h4>
            {
                Array.from({ length:5}).slice(0,5).map((_, i) => (
                    <GuideCard key={i}/>
                ))
            }
        </div>
    )
}

export default CostGuide;
