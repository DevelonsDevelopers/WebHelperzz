import Image from "next/image";
import React from "react";
import mapIcon from "/public/assets/newImages/map-tag-svgrepo-com.svg";
import searchIcon from "/public/assets/newImages/search-svgrepo-com.svg";

const Search = () => {
  return (
    <div className="w-full bg-[#12937C] flex justify-center ">
      <div className="search-container  h-[204px] width-100 flex flex-col justify-center items-center ">
        <div className="search-text">
          <h1 className="text-[20px]  sm:text-[28px] font-[500] mb-5 text-[white] text-center">
            Find the right pro for your project
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
              placeholder="What Service do you need?"
              className="focus:outline-none flex-grow text-black text-[10px] sm:text-[16px]  w-[100px]  sm:w-[200px]"
            />
            <div className="mr-2 ml-5">
              <Image src={mapIcon} alt="Map Icon" width={20} height={20} />
            </div>
            <input
              type="text"
              placeholder="Postal Code"
              className="focus:outline-none flex-grow text-black text-[10px] sm:text-[16px] w-[60px] sm:w-[110px]"
            />
            <button className="bg-blue-500 text-white px-3 text-[8px] sm:text-[14px] sm:px-5 h-[45px] rounded-[20px] ml-2">
              GET QUOTES
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
