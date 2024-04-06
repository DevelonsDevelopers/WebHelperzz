import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./CategoryParent.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { IMAGE_PATH } from "../../../api/BaseUrl";
import Link from "next/link";
import {useRouter} from 'next/navigation'

function CategoryParent({ categories }) {
  const sliderRef = useRef(null);
  const router = useRouter()

  const image1 = "../../../../public/assets/bath";
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    rows: 2,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      // {
      //   breakpoint: 768,
      //   settings: {
      //     slidesToShow: 2,
      //     slidesToScroll: 1,
      //   },
      // },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          rows: 2,
          slidesToScroll: 2,
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
    <div className="category_parent">
      <h1 className="heading_category">Our Most Popular Categories</h1>

      <div className="layout_category_cart">
        <Slider {...settings} ref={sliderRef}>
          {categories.map((category) => (
            <div key={category.id}>
              <div
                className=" h-[160px] max-md:h-[220px] max-md:w-[140px] max-md:ml-[5px] max-md:p-[8px] max-sm:h-[160px] max-sm:w-[150px]  text-center cursor-pointer w-[300px] bg-blue-300 bg-opacity-25 rounded-lg flex justify-center flex-col items-center transition duration-300 ease-in-out mb-20 shadow-lg hover:shadow-custom"
                onClick={() => router.push("/search?id=" + category.id)}
              >
                <img
                  src={`${IMAGE_PATH}${category.image}`}
                  alt={category.details}
                  style={{ height: 30, width: "auto", marginBottom: 10 }}
                />
                <p
                  style={{ fontWeight: "bold", marginTop: "5px" }}
                  className="Cart_category_heading max-md:text-[14px] text-transform: capitalize "
                >
                  {category.name}
                </p>
                <p className="Cart_category_text line-clamp-2  max-md:text-[12px] text-center w-4/5 text-transform: capitalize overflow-hidden whitespace-nowrap overflow-ellipsis">
                  {category.details}
                </p>
              </div>
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

export default CategoryParent;
