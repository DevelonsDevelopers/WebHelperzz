import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import "./ReviewParent.css";

const data = [{ id: 1 }, { id: 1 }, { id: 1 }, { id: 1 }, { id: 1 }, { id: 1 }];

function ReviewParent() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "-10%",
        },
      },
    ],
  };

  const sliderRef = React.useRef();

  const slideNext = () => {
    sliderRef.current.slickNext();
  };

  const slidePrev = () => {
    sliderRef.current.slickPrev();
  };

  return (
    <div className="review_parent">
      <center>
        <h1 className="heading_costguides text-center">HELPERZZ</h1>
        <h1 className="text-lg text-center">REVIEWS</h1>
      </center>
      <div className="layout_review_cart select-text">
        <Slider ref={sliderRef} {...settings}>
          {/* <Review />
          <Review />
          <Review /> */}
          {data?.map((value, index) => (
            <div
              key={index}
              className="flex flex-col bg-[#F7F9FB] rounded-xl items-center m-6 py-4 px-4 "
            >
              <h2 className="text-center mt-6 font-bold">HELPERZZ USER</h2>
              <h2 className="text-[#119DED] text-[1.6rem] text-center">★ ★ ★ ★ ★</h2>
              <h5 className="text-center">28.02.2024</h5>
              <h5 className=" mt-3 text-center font-[600]">
                &apos;We use them for most of our home needs.Very reliable and
                always get great results&apos;
              </h5>
            </div>
          ))}
        </Slider>
      </div>
      <div className="carousel-buttons">
        <button className="btn-prev" onClick={slidePrev}>
          <FaChevronLeft />
        </button>
        <button className="btn-next" onClick={slideNext}>
          <FaChevronRight />
        </button>
      </div>
    </div>
  );
}

export default ReviewParent;
