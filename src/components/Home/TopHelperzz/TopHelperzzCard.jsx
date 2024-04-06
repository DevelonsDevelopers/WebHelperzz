import React, { useRef } from "react";
import Image from "next/image";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./TopHelperzzCard.css";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useRouter } from "next/navigation";

export const TopHelperzzCard = ({ contractors }) => {
  const sliderRef = useRef(null);
  const isMobile = window.innerWidth < 768;
  const navigate = useRouter();
  const displayedGuides = isMobile ? contractors.slice(0, 2) : contractors;
  const settings = {
    dots: true,
    infinite: displayedGuides.length > 1,
    speed: 500,
    slidesToShow: Math.min(3, displayedGuides.length),
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

  const prevSlide = () => {
    sliderRef.current.slickPrev();
  };

  const nextSlide = () => {
    sliderRef.current.slickNext();
  };
  return (
    <section className="my-0 mb-6 sm:my-16 container mx-auto">
      <h2 className="text-2xl sm:text-3xl font-bold mb-2  text-text  sm:text-left text-center ">
        Top Helperzz
      </h2>
      <section class="text-gray-600 body-font">
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
            <Slider {...settings} ref={sliderRef}>
              {displayedGuides.map((value) => (
                <div key={value.id} className="flex">
                  <div className="sm:w-[220px] w-full">
                    <div class="py-3 px-2 mr-2 mb-2 border-primary border rounded-3xl relative cursor-pointer" onClick={() => navigate.push('/profile?id=' + value.contractor)}>
                      <div class="h-[280px]  items-start select-text">
                        <div class="flex p-3">
                          <a class="inline-flex">
                            <Image
                              alt="blog"
                              src={require("../../../../public/assets/images/helperz-01.png")}
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
                            {value.skills.split(",").map((skill) => (
                              <span>{skill}</span>
                            ))}
                          </div>
                          <a class="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[70%] text-xs mt-3 cursor-pointer hover:bg-primary hover:text-white transition-none text-text mb-2 min-w-55 justify-center px-3 py-3 rounded-2xl font-bold bg-transparent border-primary border inline-flex items-center mx-auto">
                            Get A Free Quote
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </div>
        <div className="slider-controls">
          <div className="carousel-buttons w-[screen] flex justify-center align-items-center mx-auto">
            <button className="btn-prev" onClick={prevSlide}>
              <FaChevronLeft />
            </button>
            <button className="btn-next" onClick={nextSlide}>
              <FaChevronRight />
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};
