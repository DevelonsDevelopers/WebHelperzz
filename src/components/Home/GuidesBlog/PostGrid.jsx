import React, { useRef } from "react";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image1 from "../../../../public/assets/images/post-image-01.png";

export const PostGrid = ({ blogs }) => {
  const sliderRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
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
    <section className="text-gray-600 body-font mx-auto">
      <div className="container px-5 sm:py-6">
        <div className="mb-8 flex justify-between items-center flex-wrap">
          <h2 className="text-xl sm:text-3xl font-bold text-text sm:text-left text-center">
            Guides to help you grow{" "}
          </h2>
          <p className="text-[#276487] text-2xl hidden sm:block pr-16">
            See More
          </p>
        </div>
        <div className="w-screen pr-6 sm:w-[50%] md:w-[100%] md:mx-auto ">
          <Slider {...settings} ref={sliderRef}>
            {blogs.map((value) => (
              <div key={value.id} className="p-2">
                <div className="h-full rounded-lg overflow-hidden select-text">
                  <Image
                    className="object-cover object-center rounded-3xl"
                    src={Image1}
                    alt="blog"
                  />
                  <div className="py-4">
                    <h2 className="title-font text-base font-semibold text-gray-900 mb-3 select-text">
                      {value.title}
                    </h2>
                    <p className="text-sm mb-3 overflow-hidden whitespace-nowrap overflow-ellipsis select-text">
                      {value.subtitle}
                    </p>

                    <div className="flex items-center flex-wrap">
                      <a className="text-primary w-[35%] sm:w-[70%] border text-sm px-4 py-2 rounded-2xl font-bold border-primary hover:bg-primary transition-all hover:text-white inline-flex items-center md:mb-2 lg:mb-0 sm:w-auto w-full sm:justify-start justify-center">
                        Read more
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
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
      </div>
    </section>
  );
};

export default PostGrid;
