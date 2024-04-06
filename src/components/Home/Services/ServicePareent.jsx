import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ServiceParent.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Image from "next/image";
import { BaseUrl, IMAGE_PATH } from "../../../api/BaseUrl";

function ServicePareent({ categories }) {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    rows: 2,
    slidesToScroll: 5,
    responsive: [
      {
        breakpoint: 2048,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
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
    <div className="service_parent">
      <h1 className="heading pt-6">You Need It, We’ve Got It</h1>
      <div className="layout_cart !mt-[20px] ">
        <Slider {...settings} ref={sliderRef}>
          {categories.map((value) => (
            // <ServicesCart
            //   key={value.id}
            //   id={value.id}
            //   imageSrc={`${IMAGE_PATH}${value.image}`}
            //   text={value.name}
            // />

                <div key={value.id} className='flex flex-col  bg-[#F7F9FB] rounded-xl p-6 h-[130px] cursor-pointer border-r-2 border-b-2 border-white hover:border-[#119DED99] hover:shadow-sm hover:shadow-[#119DED99]  ' >
                    <img src={`${IMAGE_PATH}${value.image}`} className='w-[32px] m-auto' alt="Avatar" />
                    <h1 className='font-[600] text-[16px] mt-2 text-center max-md:text-[13px] text-center' >{value?.name}</h1>
                </div>


            ))}
        </Slider>
      </div>
      <div className="slider-controls">
        <div className="carousel-buttons">
          <button className="btn-prev" onClick={prevSlide}>
            <FaChevronLeft />
          </button>
          <button className="btn-next" onClick={nextSlide}>
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ServicePareent;
