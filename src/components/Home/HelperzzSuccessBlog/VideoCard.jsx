import React from "react";
import Image from "next/image";
import {
  PlayIcon,
  ProtectedIcon,
  SearchBoldIcon,
  StarIcon,
} from "../../svg";

export const VideoCard = () => {
  return (
    <section className=" bg-[#fffff] py-14  ">
      <div className="grid  grid-cols-1 sm:grid-cols-2 gap-20 container px-4 mx-auto">
        <div className="bg-[#F7F9FB] rounded-3xl p-10 w-full">
          <h4 className=" sm:text-2xl text-2xl font-bold">
            Hire Verified and Reviewed Pros
          </h4>
          <p className=" mt-4 font-semibold mb-6 text-sm">
            With reviews, ratings and Verification, Helperzz gives you the tools
            you need to hire with confidence
          </p>
          <div className="flex gap-4 items-center mt-6">
            <div className="bg-[#43D9BE] w-fit p-3 rounded-full">
              <SearchBoldIcon />
            </div>
            <p className="text-sm">
              Get matched with 3 pros directly or research yourself from a list
              of verified and reviewed pros
            </p>
          </div>
          <div className="flex gap-4 items-center mt-4">
            <div className="bg-[#43D9BE] w-fit p-3 rounded-full">
              <StarIcon />
            </div>
            <p className="text-sm">
              Read reviews and browse project photos submitted by homeowners in
              your area.
            </p>
          </div>
          <div className="flex gap-4 items-center mt-4">
            <div className="bg-[#43D9BE] w-fit p-3 rounded-full">
              <ProtectedIcon />
            </div>
            <p className="text-sm">
              Pros with a Verified Badge have passed a credit check, criminal
              background check and are licensed.
            </p>
          </div>
          <div className="flex justify-center mt-16">
            <a class="text-text] border-2 text-lg px-6 py-3 rounded-2xl font-semibold border-primary inline-flex items-center md:mb-2 lg:mb-0 ">
              Get started
            </a>
          </div>
        </div>
        <div className="bg-[#F7F9FB] rounded-3xl pb-6 w-full">
          <div className="relative">
            {/* <Image
              class="w-full object-cover object-center h-72 rounded-tr-3xl rounded-tl-3xl"
              src={require("../../../../public/assets/images/video-thumbnail.png")}
              alt="blog"
            /> */}
            <iframe
              height="315"
              src="https://www.youtube.com/embed/UhA83mhLkPA?si=V38Zmi5H7wwiSCaf"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
              className="video_card sm:w-[420px] w-screen sm:mr-0 pr-6"
            ></iframe>
            {/* <video refused to connect.
              className="w-full object-cover object-center h-72 rounded-tr-3xl rounded-tl-3xl"
              controls
            >
              <source
                src="https://www.youtube.com/watch?v=UhA83mhLkPA"
                type="video/mp4"
              />
            </video> */}
            <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
              <PlayIcon />
            </div>
          </div>
          <p className="text-base mt-4 px-10 font-normal mb-4">
            “As an employee, I also use Helperzz because I trust the service.”
          </p>
          <h4 className="px-10 text-lg font-bold px-4">
            Ruth, major roofing project{" "}
          </h4>
          <div className="flex justify-center mt-10">
            <a class="text-text border-2  text-lg  px-6 py-3 rounded-2xl font-semibold border-primary inline-flex items-center md:mb-2 lg:mb-0 ">
              View Success Stories{" "}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
