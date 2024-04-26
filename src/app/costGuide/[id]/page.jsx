"use client";
import Header from "@/components/Header";
import React, { useState, useEffect } from "react";
import costGuideService from "@/api/services/costGuideService";
import { GetQuotesForm, GuideCard } from "@/app/blog/[id]/page"
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
            <div className="flex flex-col gap-5 lg:gap-10 py-44 justify-center items-center bg-gray-100 min-h-[100vh] ">
                <div className="flex flex-wrap lg:flex-nowrap gap-5 w-full max-w-[1500px] mx-auto">
                    <div className="flex text-lg flex-col gap-10 lg:w-[72%] w-screen p-4">
                        <div
                          className="my-28 flex flex-col"
                          key={costGuide?.id}
                        >
                          <h1 className="text-3xl font-bold ">{costGuide?.title}</h1>
                          <h2 className="text-xl font-semibold ">{costGuide?.subtitle}</h2>
                          <h4
                            className="text-xl font-semibold"
                            dangerouslySetInnerHTML={{
                              __html: costGuide?.content,
                            }}
                          />
                        </div>
                    </div>
                    <div className="flex flex-col gap-5 lg:w-[28%] w-full mt-20">
                        <GetQuotesForm/>
                        <GuideCard/>
                        <GuideCard/>
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

export default CostGuide;
