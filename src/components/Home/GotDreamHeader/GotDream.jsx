import React from "react";
import Image from "next/image";
import "./GotDream.css";

export const GotDream = () => {
  return (
    <section className="got_dream_header bg-[#12937C] py-2">
      <div className="min-h-60  container  px-4 mx-auto flex items-center gap-[15%] flex-wrap">
        <div className="got_dream_header1 mb-4 sm:mb-0 flex justify-center items-center w-full sm:w-auto">
          <Image
            className="lg:h-60 md:h-36 py-5 w-full object-cover object-center rounded-3xl"
            src={require("../../../../public/assets/images/dream-project-image.png")}
            alt="blog"
          />
        </div>

        <div className="got_dream_header2 text-center w-full sm:w-auto">
          <h2 className="sm:text-4xl text-2xl font-bold text-center text-white ">
            Got A Dream Project?
          </h2>
          <p className="text-white mt-3">WE CAN PROVIDE A QUICK ESTIMATE !</p>
          <a className="text-text mt-6  min-w-60 justify-center border px-5 py-3 font-bold rounded-2xl bg-[#fff] inline-flex items-center md:mb-2 mx-auto">
            GET A FREE QUOTE
          </a>
        </div>
      </div>
    </section>
  );
};
