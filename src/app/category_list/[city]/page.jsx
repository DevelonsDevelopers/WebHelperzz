"use client";
import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { GrLocation } from "react-icons/gr";
import { useRouter } from "next/navigation";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import Header from "@/components/Header";
import "../../../style/category_list.css";
import { IMAGE_PATH } from "../../../api/BaseUrl";
import categoryService from "@/api/services/categoryService";
import contractorService from "@/api/services/contractorService";
import { FiBox } from "react-icons/fi";
import { MdStar } from "react-icons/md";
import { Footer } from "@/components/Footer";

function CategoryList({ params }) {
  const navigate = useRouter();
  const [categories, setCategories] = useState([]);
  const [contractors, setContractors] = useState([]);
  const [category, setCategory] = useState();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    rows: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 2048,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const getCategoryByTag = async () => {
    try {
      const response = await categoryService.fetchByTag(params.category);
      setCategory(response.category);
    } catch (error) {
      console.error(error);
    }
  };

  const getCategories = async () => {
    try {
      const response = await categoryService.fetchAll();
      setCategories(response.categories);
      setCategoryLoading(false);
      setTopCategoryLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getContractors = async (id) => {
    try {
      const response = await contractorService.category(id);
      console.log(response.contractors);
      setContractors(response.contractors);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategoryByTag();
  }, []);

  useEffect(() => {
    if (category) {
      getContractors(category.id);
    }
  }, [category]);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <div className="shadow-lg">
        <Header />
      </div>

      <div className="bg-[#12937C] flex flex-col justify-center items-center mt-24 py-6 max-md:px-5 text-white ">
        <h1 className="text-[1.8rem] max-sm:text-[1.5rem] font-[700] ">
          Find The Right Pro For Your Project
        </h1>

        <div className="flex mt-5 mb-2 max-md:mt-3 max-md:justify-between max-md:w-[100%] ">
          <div className="max-md:w-[60%]">
            <input
              type="search"
              className="bg-[#F7F9FB] py-2 text-[.9rem]  px-4 rounded-l-[15px] focus:outline-none pl-10 max-md:w-[100%]"
              placeholder="Postal Code"
            />
            <GrLocation className="ml-4 mt-[-30px] text-gray-600" size={20} />
          </div>
          <div className="max-md:w-[40%]">
            <p className="bg-[#119DED] text-white text-[.9rem] py-2 text-center max-md:py-[10px] font-semibold max-md:px-2 px-4 ml-[-17px] max-md:ml-[-20px] rounded-[15px] cursor-pointer focus:outline-none max-md:text-[12px]">
              GET STARTED
            </p>
          </div>
        </div>
      </div>

      <div>
        <div className="bg-white px-[2%] pt-[5%] pb-[2%] justify-center flex flex-col items-center">
          <h1 className="text-[1.4rem] text-left font-bold items-center flex pt-6 pl-1 max-w-[1100px] w-full">
            Get Recommended Pros for Your Project
          </h1>

          <div className="m-auto max-w-[1100px] w-full">
            <Slider {...settings}>
              {categories.map((value) => (
                <ServicesCart
                  key={value.id}
                  id={value.id}
                  tag={value.tag}
                  imageSrc={`${IMAGE_PATH}${value.image}`}
                  text={value.name}
                />
              ))}
            </Slider>
          </div>
        </div>
        <div className="bg-white px-[2%] py-[2%] justify-center flex flex-col items-center">
          <h1 className="text-[1.4rem] text-left font-bold items-center flex pt-6 pl-1 max-w-[1100px] w-full">
            Popular Services
          </h1>

          <div className="m-auto max-w-[1100px] w-full">
            <Slider {...settings}>
              {categories.map((value) => (
                <ServicesCart
                  key={value.id}
                  id={value.id}
                  tag={value.tag}
                  imageSrc={`${IMAGE_PATH}${value.image}`}
                  text={value.name}
                />
              ))}
            </Slider>
          </div>
        </div>
        <div className="bg-white px-[2%] py-[2%] justify-center flex flex-col items-center">
          <h1 className="text-[1.4rem] text-left font-bold items-center flex pt-6 pl-1 max-w-[1100px] w-full">
            Popular Services
          </h1>

          <div className="m-auto max-w-[1100px] w-full">
            <Slider {...settings}>
              {categories.map((value) => (
                <ServicesCart
                  key={value.id}
                  id={value.id}
                  tag={value.tag}
                  imageSrc={`${IMAGE_PATH}${value.image}`}
                  text={value.name}
                />
              ))}
            </Slider>
          </div>
        </div>
        <div className="bg-white px-[2%] py-[2%] justify-center flex flex-col items-center">
          <h1 className="text-[1.4rem] text-left font-bold items-center flex pt-6 pl-1 max-w-[1100px] w-full">
            Outdoor & Garden
          </h1>

          <div className="m-auto max-w-[1100px] w-full">
            <Slider {...settings}>
              {categories.map((value) => (
                <ServicesCart
                  key={value.id}
                  id={value.id}
                  tag={value.tag}
                  imageSrc={`${IMAGE_PATH}${value.image}`}
                  text={value.name}
                />
              ))}
            </Slider>
          </div>
        </div>
        <div className="bg-white px-[2%] py-[2%] justify-center flex flex-col items-center">
          <h1 className="text-[1.4rem] text-left font-bold items-center flex pt-6 pl-1 max-w-[1100px] w-full">
            Home Improvement
          </h1>

          <div className="m-auto max-w-[1100px] w-full">
            <Slider {...settings}>
              {categories.map((value) => (
                <ServicesCart
                  key={value.id}
                  id={value.id}
                  tag={value.tag}
                  imageSrc={`${IMAGE_PATH}${value.image}`}
                  text={value.name}
                />
              ))}
            </Slider>
          </div>
        </div>
        <div className="bg-white px-[2%] py-[2%] justify-center flex flex-col items-center">
          <h1 className="text-[1.4rem] text-left font-bold items-center flex pt-6 pl-1 max-w-[1100px] w-full">
            Home Services
          </h1>

          <div className="m-auto max-w-[1100px] w-full">
            <Slider {...settings}>
              {categories.map((value) => (
                <ServicesCart
                  key={value.id}
                  id={value.id}
                  tag={value.tag}
                  imageSrc={`${IMAGE_PATH}${value.image}`}
                  text={value.name}
                />
              ))}
            </Slider>
          </div>
        </div>
      </div>

      <div className="bg-white px-[2%] py-[2%] justify-center flex flex-col items-center">
        <h1 className="text-[1.8rem] text-left font-bold items-center flex max-w-[1100px] w-full">
          Browse All Professionals
        </h1>

        <div className="text-left items-center flex pt-6 max-w-[1100px] w-full">
          <div>
            <h2 className="text-[1.5rem] text-left font-bold items-center flex max-w-[1100px] w-full">
              Popular
            </h2>

            <div className="text-[1.2rem] grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 w-full mt-6 gap-y-10">
              <div className="w-[270px]">
                <h4 className="py-3">Category 1</h4>
                <h4 className="py-3">Category 1</h4>
                <h4 className="py-3">Category 1</h4>
              </div>
              <div className="w-[270px]">
                <h4 className="py-3">Category 1</h4>
                <h4 className="py-3">Category 1</h4>
                <h4 className="py-3">Category 1</h4>
              </div>
              <div className="w-[270px]">
                {" "}
                <h4 className="py-3">Category 1</h4>
                <h4 className="py-3">Category 1</h4>
                <h4 className="py-3">Category 1</h4>
              </div>
              <div className="w-[270px]">
                <h4 className="py-3">Category 1</h4>
                <h4 className="py-3">Category 1</h4>
                <h4 className="py-3">Category 1</h4>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-md:mt-8 gap-2   justify-center flex flex-col items-center ">
        {contractors?.map((value, index) => (
          <div
            key={index}
            className="bg-[#F7F9FB] sm:p-4 p-1 flex max-md:flex-col items-center gap-5 mb-5"
          >
            <div className="">
              <Link
                href={
                  `/profile/` +
                  value.company_name.replaceAll(" ", "-").toLowerCase()
                }
              >
                {value.cover ? (
                  <img
                    src={`${IMAGE_PATH}${value.cover}`}
                    className={`h-[250px] w-[250px] object-cover cursor-pointer`}
                    alt=""
                    height={250}
                    width={550}
                  />
                ) : (
                  <Image
                    src={imgThumb}
                    className={`h-[250px] w-[250px]`}
                    alt=""
                    height={250}
                    width={550}
                  />
                )}
              </Link>
            </div>
            <div className="w-[80%]">
              <div className="flex gap-2">
                <div className="bg-white p-3 rounded-full">
                  <Link
                    href={
                      `/profile/` +
                      value.company_name.replaceAll(" ", "-").toLowerCase()
                    }
                  >
                    <img
                      src={`${IMAGE_PATH}${value.image}`}
                      alt=""
                      className="sm:h-16 sm:w-16 h-auto w-36 cursor-pointer"
                      href={
                        `/profile/` +
                        value.company_name.replaceAll(" ", "-").toLowerCase()
                      }
                    />
                  </Link>
                </div>
                <div className="">
                  <h2 className="text-[1.2rem] md:text-lg font-[500] cursor-pointer">
                    <Link
                      href={
                        `/profile/` +
                        value.company_name.replaceAll(" ", "-").toLowerCase()
                      }
                    >
                      {" "}
                      {value.company_name}
                    </Link>
                  </h2>
                  <div className="flex flex-wrap">
                    {value.trust_seal ? (
                      <Image
                        src={trustsealimg}
                        width={120}
                        height={20}
                        alt="trustSeal badge"
                      />
                    ) : null}
                    <div className="sm:ml-4 ml-0 flex items-center gap-1">
                      {value.users > 0 ? (
                        <>
                          {" "}
                          <MdStar className="text-[#12937C] sm:text-[1.8rem] text-[1.2rem]" />
                          <span className="sm:text-md text-sm font-[600]">
                            {`${(value.ratings / value.users).toFixed(2)} / 5`}
                          </span>
                          <span className="sm:ml-3 ml-1 sm:text-md text-sm text-gray-500">
                            {`(${value.users} Reviews)`}
                          </span>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <div className="flex items-center gap-3 bg-[#12937C1A] border-[1px] border-[#12937C] py-1 px-2 rounded-lg">
                  <span>
                    <FiBox />
                  </span>
                  <p className="text-sm font-semibold text-gray-600">
                    Provides 3D visualization
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <h4 className="text-[15px] font-[600] text-gray-600">
                  {value.skills}
                </h4>
                <h3
                  className="text-sm font-[500] mt-3 text-ellipsis line-clamp-2"
                  dangerouslySetInnerHTML={{
                    __html: value.description,
                  }}
                ></h3>
              </div>
              <div className="flex justify-between w-full mt-2 ">
                <h5 className="text-sm font-[500]">{value.name}</h5>
                <Link
                  className="text-sm font-[600] text-[#12937C] "
                  href={
                    `/profile/` +
                    value.company_name.replaceAll(" ", "-").toLowerCase()
                  }
                >
                  Read More
                </Link>
              </div>
              <div>
                <Link
                  className="text-md font-[600] mt-1 cursor-pointer"
                  href={
                    `/profile/` +
                    value.company_name.replaceAll(" ", "-").toLowerCase()
                  }
                >
                  {value.projects} projects
                </Link>
              </div>
              <button className="py-2 px-5 mt-4 bg-[#12937C] text-white text-md rounded-[10px] text-opacity-70 cursor-pointer hover:bg-opacity-80 font-[600]">
                Send Message
              </button>
            </div>
          </div>
        ))}

        <ul class="list-style-none flex mt-2 mx-auto justify-center">
          <li>
            <a
              class="relative block bg-transparent sm:px-3 px-[7px] py-1.5 text-sm text-surface transition duration-300 hover:bg-[#12937C] hover:bg-opacity-30 focus:bg-[#12937C] focus:bg-opacity-20 focus:outline-none active:bg-[#12937C] active:bg-opacity-20 text-black"
              href="#!"
            >
              1
            </a>
          </li>
          <li aria-current="page">
            <a
              class="relative block bg-transparent sm:px-3 px-[7px] py-1.5 text-sm text-surface transition duration-300 hover:bg-[#12937C] hover:bg-opacity-30 focus:bg-[#12937C] focus:bg-opacity-20 focus:outline-none active:bg-[#12937C] active:bg-opacity-20 text-black"
              href="#!"
            >
              2
              <span class="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]">
                (current)
              </span>
            </a>
          </li>
          <li>
            <a
              class="relative block bg-transparent sm:px-3 px-[7px] py-1.5 text-sm text-surface transition duration-300 hover:bg-[#12937C] hover:bg-opacity-30 focus:bg-[#12937C] focus:bg-opacity-20 focus:outline-none active:bg-[#12937C] active:bg-opacity-20 text-black"
              href="#!"
            >
              3
            </a>
          </li>
          <li>
            <a
              class="relative block bg-transparent sm:px-3 px-[7px] py-1.5 text-sm text-surface transition duration-300 hover:bg-[#12937C] hover:bg-opacity-30 focus:bg-[#12937C] focus:bg-opacity-20 focus:outline-none active:bg-[#12937C] active:bg-opacity-20 text-black"
              href="#!"
            >
              4
            </a>
          </li>
          <li>
            <a
              class="relative block bg-transparent sm:px-3 px-[7px] py-1.5 text-sm text-surface transition duration-300 hover:bg-[#12937C] hover:bg-opacity-30 focus:bg-[#12937C] focus:bg-opacity-20 focus:outline-none active:bg-[#12937C] active:bg-opacity-20 text-black"
              href="#!"
            >
              5
            </a>
          </li>{" "}
          <li>
            <a
              class="relative block bg-transparent sm:px-3 px-[7px] py-1.5 text-sm text-surface transition duration-300 hover:bg-[#12937C] hover:bg-opacity-30 focus:bg-[#12937C] focus:bg-opacity-20 focus:outline-none active:bg-[#12937C] active:bg-opacity-20 text-black"
              href="#!"
            >
              6
            </a>
          </li>{" "}
          <li>
            <a
              class="relative block bg-transparent sm:px-3 px-[7px] py-1.5 text-sm text-surface transition duration-300 hover:bg-[#12937C] hover:bg-opacity-30 focus:bg-[#12937C] focus:bg-opacity-20 focus:outline-none active:bg-[#12937C] active:bg-opacity-20 text-black"
              href="#!"
            >
              7
            </a>
          </li>{" "}
          <li>
            <a
              class="relative block bg-transparent sm:px-3 px-[7px] py-1.5 text-sm text-surface transition duration-300 hover:bg-[#12937C] hover:bg-opacity-30 focus:bg-[#12937C] focus:bg-opacity-20 focus:outline-none active:bg-[#12937C] active:bg-opacity-20 text-black"
              href="#!"
            >
              8
            </a>
          </li>
          <li>
            <a
              class="relative block sm:px-3 px-[7px] py-1.5 text-sm text-surface transition duration-300 bg-[#12937C] text-white "
              href="#!"
            >
              Next Page
            </a>
          </li>
        </ul>
      </div>
      <Footer />
    </>
  );
}

export default CategoryList;

function ServicesCart(props) {
  const { id, imageSrc, text, tag } = props;
  const navigate = useRouter();

  return (
    <div
      className="flex flex-col justify-center text-center font-semibold items-center bg-[#F7F9FB] rounded-xl p-6 h-[150px] cursor-pointer border-r-2 border-b-2 border-white hover:border-[#119DED99] hover:shadow-md hover:shadow-[#119DED99] mx-2 my-3 lg:mx-3 lg:my-4"
      onClick={() => navigate.push(`/getquotes/create/${tag}/any`)}
    >
      <img
        src={imageSrc}
        alt={text}
        style={{ height: 30, width: "auto", marginBottom: 10 }}
      />
      <p>{text}</p>
    </div>
  );
}
