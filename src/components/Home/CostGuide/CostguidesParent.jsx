import React from "react";
import "./CostguidesParent.css";

function Costguides({ costGuides }) {
  const isMobile = window.innerWidth < 768;
  const displayedGuides = isMobile ? costGuides.slice(0, 2) : costGuides;

  return (
    <div className="costguides_main flex justify-center align-content-center">
      <div className="container px-5 sm:py-6">
        <div className="mb-8 flex justify-between items-center flex-wrap">
          <h1 className="heading_costguides pb-3">Popular Cost Guides</h1>
        </div>
        <div className="mx-auto grid pr-5 mb-5 max-md:grid-cols-2 grid-cols-3  justify-between">
          {displayedGuides.map((value , index) => (
            // <Costgguides
            //   key={value.id}
            //   buttonText={value.subtitle}
            //   title={value.title}
            // />
            <div
              key={index}
              className="flex flex-col bg-[#F7F9FB] rounded-xl cursor-pointer p-4 py-6 "
            >
              <button className="bg-[#55DCC4CC] mr-auto p-2 rounded-xl font-[400] text-[14px] max-md:text-[12px]">
              {value.subtitle}
              </button>
              <h1 className="font-[600] text-[19px] mt-4 capitalize max-md:text-[16px]">
                {value?.title}
              </h1>
            </div>
          ))}
        </div>
        {isMobile && (
          <a
            className="guide_btn text-text mt-2 justify-center border px-4 py-3 rounded-2xl font-bold bg-[#fff] flex align-item-center  items-center mx-auto"
            href="#"
          >
            View All Guides
          </a>
        )}
      </div>
    </div>
  );
}

export default Costguides;
