"use client";
import React from "react";
import { IMAGE_PATH } from "../api/BaseUrl";

export const Credentials = ({ details }) => {
  return (
    <section className="bg-[#F7F9FB] py-12  md:px-6 px-1">
      <div className="profile_container max-w-[1200px] md:px-6 mx-auto">
        <h2 className="text-2xl md:text-3xl font-semibold mb-5 text-text">
          Credentials
        </h2>

        <div className="flex justify-between gap-6 lg:gap-0 flex-wrap lg:flex-nowrap">
          <div className="w-full lg:min-w-1/4">
            <h2 className="sm:text-xl text-lg font-semibold mb-5 text-text">
              Awards
            </h2>
            <div className="flex gap-3 flex-wrap sm:overflow-auto">
              {details?.awards?.slice(0, 3).map((value) => (
                // <div className="border justify-center w-[100px] h-[120px] text-center border-secondary py-2 px-4 bg-secondary bg-opacity-20 rounded-xl">
                //   <h4 className="sm:text-xl text-md font-bold mb-1 text-secondary ">
                //     {value.subtitle}
                //   </h4>
                //   <p className="font-medium text-text text-xs sm:text-sm text-transform : capitalize">
                //     {value.title}
                //   </p>
                // </div>
                <div
                  className="border-[1px] border-[#12937C] w-[100px] h-[120px] justify-center flex items-center rounded-xl"
                  key={value.id}
                >
                  <img
                    className="w-[100px] h-[118px] object-cover rounded-xl"
                    src={`${IMAGE_PATH}${value.image}`}
                    alt={value.id}
                  />
                </div>
              ))}
            </div>
            
          </div>
          <div className="w-full lg:min-w-1/4  sm:overflow-auto">
            <h2 className="text-xl font-semibold mb-5 text-text">Badges </h2>
            <div className="flex gap-3 flex-wrap">
              {details?.badges?.slice(0, 3).map((value) => (
                // <div className="border  w-[100px] h-[120px] justify-center flex items-center gap-2 flex-col border-secondary py-2 px-4 bg-white bg-opacity-20 rounded-xl">
                //   <p className="font-medium text-text text-center sm:text-sm text-xs text-transform : capitalize">
                //     {value.title}
                //   </p>
                //   <img
                //     className={`w-12 h-13`}
                //     src={`${IMAGE_PATH}${value.image}`}
                //   />
                // </div>
                <div
                  className="border-[1px] border-[#12937C] w-[100px] h-[120px] justify-center flex items-center rounded-xl"
                  key={value.id}
                >
                  <img
                    className="w-[100px] h-[118px] object-cover rounded-xl"
                    src={`${IMAGE_PATH}${value.image}`}
                    alt={value.id}
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="w-full lg:min-w-1/4 overflow-x-scroll md:overflow-auto">
            <h2 className="text-xl font-semibold mb-5 text-text">
              Affilations{" "}
            </h2>
            <div className="flex gap-3">
              {details?.affiliations?.slice(0, 3).map((value) => (
                <div
                  className="border-[1px] border-[#12937C] w-[100px] h-[120px] justify-center flex items-center rounded-xl"
                  key={value.id}
                >
                  <img
                    className="w-[100px] h-[118px] object-cover rounded-xl"
                    src={`${IMAGE_PATH}${value.image}`}
                    alt={value.id}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
