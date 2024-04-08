"use client";
import React from "react";
import "../../../style/GetQuotes.css";
import Link from "next/link";
import imgLogo from "/public/assets/logo.png";
import Image from "next/image";

export default function SentRequest() {
  return (
    <div>
      <header>
        <Link href="/">
          <div className="w-32 md:mr-10 select-text logo p-4  h-[5vh] ">
            <Image src={imgLogo} alt="" width={150} height={100} />
          </div>
        </Link>
      </header>
      <div className=" items-center text-center justify-center  flex flex-col w-full mx-auto ">
        <div className="h-[55vh] bg-gray-50 w-full">
          <div className="flex-col flex justify-center mt-10 max-auto items-center">
            <div className="text-3xl font-bold mt-10 mb-3">
              Your Service Request Was Sent!
            </div>
            <div className="text-md font-medium my-3 text-gray-500 md:w-[600px] w-full">
              We're matching you with qualified pros. You'll receive an
              <span className="font-bold text-gray-600"> email</span> when they
              respond. Complete your account setup to chat with pros in your
              HomeStars{" "}
              <span className="font-bold text-gray-600">dashboard</span>
            </div>
            <div className="mt-3 md:mt-5 flex justify-center text-center">
              <a class=" hover:bg-[#12937C]  bg-[#12936C] transition-all cursor-pointer text-white   text-sm md:text-lg justify-center rounded-md px-5  py-3  font-bold text-transform: uppercase">
                complete profile
              </a>
            </div>
          </div>
        </div>
        <div>
          <div className="text-2xl font-bold mt-12">What Happens Next?</div>
          <div className="flex md:flex-row mt-10 xl:gap-36 lg:gap-28 flex-col mb-20">
            <div className="flex flex-row md:flex-col justify-center max-auto items-center mt-4 md:mt-0">
              <div>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAgElEQVR4nO2U0QqAIAxF708o9f9/lA99zg2hoHyxdM0WOzAQRHfchoDjOFeoFN8XeAsXYGsLKNRruwJS2BXg6BZwtIAUdgXY+8ebF5DCBXi3BazECmA+nQsAFolZYYPE0+TdMxYBpP2iVKzzngqheHWuxqSVvJQYkvwgapYdv2QD7Lz4EYXceEwAAAAASUVORK5CYII=" />
              </div>
              <div className="text-lg md:font-normal font-bold mt-2 ml-3">
                1. Connect with pros
              </div>
            </div>
            <div className="flex flex-row md:flex-col justify-center max-auto items-center  mt-4 md:mt-0">
              <div>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAACXBIWXMAAAsTAAALEwEAmpwYAAACTklEQVR4nO2XzU4UQRDHf8YDaFh38Q1WRF9A8SvRRPAJMCa8BqIHo0ej3BTRuxrCU8BqeANUDhoPwAFRWC8e1o+spk11Uil7ZnqmZ+OFf9KZ7NZH/7u6uroaDjBYjPKfMA7cAlaBbeA78Fu+W8CKyE8OksQ54LVMHDteARN1kjgGLAP9jAn3gY/yDcmd3RLQSCVyAnhrnO8Bj4FJYNjou99TwILoabs3QDuFyGflrAfcB5qR9i3ggdh5H7tVCDWAdeXkC3CZargA7ChfGyUW9BfLyvhTSnhVlHeVT5dDUTivkrUnK6sDl9SW9WNPmT6+LkfqxEPlu1OkfMrkSTNh4sPAMxPZlikBuYXxtlJ8lEjkufj5ZpL/iZrjZp6TjlK8mkDkhakxc0o+FbtVmyrBhmsicsfoHDUFNIhDwA9V4lO2xo97GbpdpTMUUmgqhfc5hKtGROOD0jueNZFvB7oB+Q25hRsJEfH4WhSZvJyZAX6JbA0YqRiR6Jyxp2lS/X8d+Klka7KtZYk4XFP6rkHLxJxSXDAyS2i/AhGHRWUzW9RS6hC2CgiVJTJqFjFWZOCS1Cu7foQCQrFEHOZjt8jjrLq1Xd25EtCZFtndhFv7TKzhkunOXD9icTqhn3lZwpaRQKcXilAMLkqD5n29kya/FNpmNT3pR2xS5yXrvCqklXtgj7Z09fZpsii37xH+LWiujjwNHP31GtpXGpJDWe+mrryb9OWnR19yxFftWjBhKnTMWJXTOTCMSYfWCTzU9oTAbExBGwSGJFkzb98DkIg/jKEpiVFEZKkAAAAASUVORK5CYII=" />
              </div>
              <div className="text-lg md:font-normal font-bold mt-2 ml-3">
                2. Hire your pro
              </div>
            </div>
            <div className="flex flex-row md:flex-col justify-center max-auto items-center  mt-4  md:mt-0">
              <div>
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACMAAAAjCAYAAAAe2bNZAAAACXBIWXMAAAsTAAALEwEAmpwYAAACaklEQVR4nN2Xu2tUQRTGf/EJJhI0/g2JhdjoqviKz6hFSqtAMI1/hKXaJY1gIQgSEDFKWqNEwee6nYKFjU1EC4uQh0YR1Kwc+UYOl3uz95W96AfD3Z2Z7zvfztwzZxb+M2wDRvSsHC+App6V4rSMhHaqSjPPI2ZeVmXkeMRIaMeqMPPEGbjkPj9ut5H9LnhdfU9d3+F2mnnoAtt2GU64vul2GdkXsyoBz9zYwXaYue8C2mp4nHRjU2UH7tFKDAOXgckVViWg7uZMijcsnZ60Qc8CF4BxoAHMJqRuaAMJWgMteLPSH1c8i7s1kDcCH1sINF37BIy2+HFjmpdW0+JvMOImYDEyuAS8AiaAi8AQUAO6yYZu8YakMyHdpUi8Bfn4A6sp39zgNWANq4MO4IqL9R0YjE7qB764SddXwZAZuepifFUGxuIQ8NlNvgWsK8mI/bAbESPhwEyEHVbe0O0SDK1V9vh38miW2rPoyHeB9QWM3HRa9iocySqyF5h3Ine051nQIV7QmJduLuwG5pxYX0b+dsedk14hTDnBvydlSmxx3HuUgPcS+5CTH073maJGuoBliVm1zoMH4pvO5iJm9rhltnoTB8uynStk25jTML3cGHFC52IOMau47zRu23leqZxWIxNGnZDPBLtUvU6owG9lMhwDNTfWqtqnyqRfQKdOzUYk+A/gkZ6+v6H5neIXvv3NuBI/HQm2rAOtV3N79T288P5yvlA0o7pihEOzfwe7Eng7VD7ieLkzqhYjVtdVIw36I/fh0Ew3M/qAnxJ4E3cBSolB8ZvSC9uaGQeAMyVcsoxvOnYb+DfwGzYNFWdO0Od6AAAAAElFTkSuQmCC" />
              </div>
              <div className="text-lg md:font-normal font-bold mt-2 ml-3">
                3. Write a review
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
