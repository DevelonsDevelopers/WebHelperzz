"use client";

import React, {useEffect, useState, useRef} from "react";
import {Suspense} from "react";

import {LocationIcon, SearchIcon} from "@/components/svg";
import {Posts} from "@/components/Post";
import Link from "next/link";
import "../style/Home.css";
import axios from "axios";
import Select from "react-select";
import Header from "../components/Header";
import {Footer} from "../components/Footer";

import categoryService from "../api/services/categoryService";
import costGuideService from "../api/services/costGuideService";
import blogService from "../api/services/blogService";
import testimonialService from "../api/services/testimonialService";
import contractorService from "../api/services/contractorService";
import {useRouter} from "next/navigation";
import {
    PlayIcon,
    ProtectedIcon,
    SearchBoldIcon,
    StarIcon,
} from "../components/svg";
import Image1 from "../../public/assets/images/post-image-01.png";
import {IMAGE_PATH} from "../api/BaseUrl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {FaChevronLeft, FaChevronRight} from "react-icons/fa";
import Image from "next/image";
import {Rating} from "@material-tailwind/react";
import moment from "moment";
import Loading from "@/components/loading";
import useMediaQuery from '@mui/material/useMediaQuery';
import Head from 'next/head';
import { usePathname } from 'next/navigation'


const hire = [{id: 1, name: 'Interior Design', tag: 'interior-design'}, {
    id: 3,
    name: 'Home Staging',
    tag: 'home-staging'
}, {id: 2, name: 'Electrical', tag: 'Electrical'}, {id: 4, name: 'Painting', tag: 'Painting'}, {
    id: 5,
    name: 'Flooring',
    tag: 'Flooring'
},]

function Review({review}) {
    return (
        <div
            className="h-[275px] bg-[#f7f9fb] rounded-[15px] flex flex-col justify-center items-center  transition-shadow duration-300 ease-in-out w-screen sm:w-[320px] text-center px-8 ">
            <p className="heading_review">{review.name}</p>
            <Rating
                readonly={true}
                style={{color: "#27a9e1", marginTop: "10px"}}
                value={review.rating}
            />
            <p className="date_review mt-3">
                {moment(review.created_date).format("ll")}
            </p>
            <center>
                <p className="text-[1.2rem] max-md:text-[1rem] font-[500]">{review.review}</p>
            </center>
        </div>
    );
}

function ServicesCart(props) {
    const {id, imageSrc, text, tag} = props;
    const navigate = useRouter();

    return (
        <div
            className="flex flex-col justify-center text-center font-semibold items-center bg-[#F7F9FB] rounded-xl p-6 h-[150px] cursor-pointer border-r-2 border-b-2 border-white hover:border-[#119DED99] hover:shadow-md hover:shadow-[#119DED99] mx-2 my-3 lg:mx-3 lg:my-4"
            onClick={() => navigate.push(`/getquotes/create/${tag}/any`)}
        >
            <img
                src={imageSrc}
                alt={text}
                style={{height: 30, width: "auto", marginBottom: 10}}
            />
            <p>{text}</p>
        </div>
    );
}

function CategoryCart(props) {
    const {id, imageSrc, text, title, tag} = props;
    const navigate = useRouter();

    return (
        <div
            className="Cart_category cursor-pointer"
            onClick={() => navigate.push(`/category/on/toronto/${tag}`)}
        >
            <img
                src={imageSrc}
                alt={text}
                style={{height: 30, width: "auto", marginBottom: 10}}
            />
            <p
                style={{fontWeight: "bold", marginTop: "5px"}}
                className="Cart_category_heading text-transform: capitalize "
            >
                {title}
            </p>
            <p className="Cart_category_text line-clamp-2  text-center w-4/5 text-transform: capitalize overflow-hidden whitespace-nowrap overflow-ellipsis">
                {text}
            </p>
        </div>
    );
}

function Costgguides(props) {
    const {tag, buttonText, title} = props;
    const navigate = useRouter();

    return (
        <div
            className="h-[130px] w-[270px] max-md:h-auto max-md:w-[150px] mb-5 bg-[#f7f9fb] rounded-[15px] flex flex-col p-5 transition-shadow duration-300 ease-in-out justify-between hover:border-[#119DED99] hover:shadow-md hover:shadow-[#119DED99]  cursor-pointer"
            onClick={() => navigate.push(`/cost-guide/${tag}`)}
        >
            <div
                className="bg-[#55dcc4] flex items-center h-[40px] rounded-[5px] justify-start p-[10px] max-md:p-[3px] max-md:h-[auto]">
                <p className="text-[14px] font-[400] max-md:text-[12px]">{buttonText}</p>
            </div>
            <p className="text-[18px] font-[600] max-md:text-[13px]">{title}</p>
        </div>
    );
}

function Home() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [categories, setCategories] = useState([]);
    const [bannerCategories, setBannerCategories] = useState([])
    const [blogs, setBlogs] = useState([]);
    const [costGuides, setCostGuides] = useState([]);
    const [testimonials, setTestimonials] = useState([]);
    const [contractors, setContractors] = useState([]);
    const navigate = useRouter();
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedError, setSelectedError] = useState(false);

    const [isValidPostalCode, setIsValidPostalCode] = useState(true);
    const [postalCode, setPostalCode] = useState("");
    const categoriesSliderRef = useRef(null);
    const blogsSliderRef = useRef(null);
    const reviewSliderRef = useRef(null);
    const topHelperzzSliderRef = useRef(null);
    const [categoryLoading, setCategoryLoading] = useState(true);
    const [topCategoryLoading, setTopCategoryLoading] = useState(true);
    const [blogLoading, setBlogLoading] = useState(true);
    const [guideLoading, setGuideLoading] = useState(true);
    const [reviewLoading, setReviewLoading] = useState(true);
    const [contractorLoading, setContractorLoading] = useState(true);

    const pathname = usePathname()

    const matches = useMediaQuery('(max-width:700px)');


    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        setSelectedError(false);
    };


    useEffect(() => {
        if (postalCode?.length === 0) {
            setIsValidPostalCode(true)
        }
    }, [postalCode])

    useEffect(() => {
        if (/^[A-Z]\d[A-Z] \d[A-Z]\d$/i.test(postalCode)) {
            setIsValidPostalCode(true)
            console.log('regex', /^[A-Z]\d[A-Z] \d[A-Z]\d$/i.test(postalCode))
        }

    }, [postalCode])

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedOption) {
            setSelectedError(true);
            return;
        }

        const postalCoderegex = /^[A-Z]\d[A-Z] \d[A-Z]\d$/i;
        const isPostalCodeValid = postalCoderegex.test(postalCode);
        setIsValidPostalCode(isPostalCodeValid);

        if (!isPostalCodeValid) {
            return;
        }

        if (selectedOption && isPostalCodeValid) {
            console.log(selectedOption);
            let postal = postalCode.replaceAll(" ", "-").toLowerCase();
            navigate.push("/getquotes/create/" + selectedOption.value + "/" + postal);
        }
    };

    const handlePostalChange = (e) => {
        const inputPostal = e.target.value;
        setPostalCode(inputPostal);
    };

    const options = categories.map((category) => ({
        value: category.tag,
        label: category.name,
    }));

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

    const getBannerCategories = async () => {
        try {
            const response = await categoryService.banner();
            setBannerCategories(response.categories);
        } catch (error) {
            console.error(error);
        }
    };

    const getCategoryContractors = async () => {
        try {
            const response = await categoryService.categoriesContractors();
            setBannerCategories(response.categories);
        } catch (error) {
            console.error(error);
        }
    };

    const getCostGuides = async () => {
        try {
            const response = await costGuideService.fetchAll();
            setCostGuides(response.costGuides);
            setGuideLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const getBlogs = async () => {
        try {
            const response = await blogService.fetchAll();
            setBlogs(response.blogs);
            setBlogLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const getTestimonials = async () => {
        try {
            const response = await testimonialService.featured();
            console.log(response);
            setTestimonials(response.testimonials);
            setReviewLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    const getContractors = async () => {
        try {
            const response = await contractorService.featured();
            setContractors(response.contractors);
            setContractorLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getBannerCategories();
        getCategories();
        getBlogs();
        getCostGuides();
        getTestimonials();
        getContractors();
    }, []);

    // Section 2
    const sliderRef = useRef(null);
    const prevSlide = () => {
        sliderRef.current.slickPrev();
    };

    const nextSlide = () => {
        sliderRef.current.slickNext();
    };

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        rows: 2,
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

    const categorySettings = {
        dots: false,
        infinite: categories.length > 6,
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
                    slidesToShow: 3,
                    rows: 2,
                    slidesToScroll: 3,
                },
            },
        ],
    };

    const categoryPrevSlide = () => {
        categoriesSliderRef.current.slickPrev();
    };

    const categoryNextSlide = () => {
        categoriesSliderRef.current.slickNext();
    };

    {
        /* Section 4 */
    }
    const displayedGuides = matches ? costGuides.slice(0, 2) : costGuides;

    // Section 5
    const guidesBlogSettings = {
        dots: false,
        infinite: blogs.length > 3,
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

    const blogPrevSlide = () => {
        blogsSliderRef.current.slickPrev();
    };

    const blogNextSlide = () => {
        blogsSliderRef.current.slickNext();
    };

    // Section 7
    const isTopHelperzzMobile =
        typeof window !== "undefined" && window.innerWidth < 768;
    const displayedTopHelperzz = isTopHelperzzMobile
        ? contractors.slice(0, 2)
        : contractors;
    const TopHelperzzsettings = {
        dots: false,
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
    const tophelperzzSlideNext = () => {
        topHelperzzSliderRef.current.slickNext();
    };

    const topHelperzzSlidePrev = () => {
        topHelperzzSliderRef.current.slickPrev();
    };

    //Section 8
    const reviewSettings = {
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
                breakpoint: 800,
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
                    centerMode: true,
                    centerPadding: "-10%",
                },
            },
        ],
    };
    const reviewSlideNext = () => {
        reviewSliderRef.current.slickNext();
    };

    const reviewSlidePrev = () => {
        reviewSliderRef.current.slickPrev();
    };
    console.log(blogs)
    return (
        <>
 <Head>
        <title>
         {pathname.replaceAll('/','')}
        </title>
        <meta
          name="description"
          content="Check out iPhone 12 XR Pro and iPhone 12 Pro Max. Visit your local store and for expert advice."
          key="desc"
        />
      </Head>

            <Header/>
            {/* Section 1 */}
            <main className="hero_image px-4 mt-[-100px] w-[100%] !flex-col">
                <div className="main_home max-w-[650px] mx-auto">
                    <h1 className="font-semibold pt-32 text-2xl text-transform: capitalize">
                        The best place <br/>
                        to Find Professionals
                    </h1>
                    <h2 className="text-lg mt-4">
                        Thousands of homeowners connect with the right pro every week for
                        their remodeling projects. Ready to find yours?
                    </h2>
                    <form onSubmit={handleSubmit} className="mt-8 sm:hidden min-h-9 cursor-pointer items-center rounded-3xl w-full">
                        <div>
                            <div
                                className="w-full cursor-pointer items-center cursor-pointer flex gap-2 p-3 rounded-full bg-white shadow-md">
                                <SearchIcon/>
                                <Select
                                    styles={{
                                        control: (provided) => ({
                                            ...provided,
                                            cursor: 'pointer',
                                        }),
                                    }}
                                    options={options}
                                    placeholder="What service do you need?"
                                    isSearchable={true}
                                    className="placeholder:text-[#696969] !cursor-pointer sm:w-[230px] w-[100%] text-black font-semibold ml-2 h-full outline-none border-none"
                                    onChange={handleSelectChange}
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between mt-4 gap-3">
                            <div
                                className="w-1/2 flex shadow-md items-center gap-2 p-3 rounded-full bg-white font-bold text-[#888888] text-sm sm:text-base">
                                <LocationIcon/>
                                <input
                                    type="text"
                                    placeholder="Postal Code"
                                    value={postalCode}
                                    maxLength="7"
                                    onChange={(e) => setPostalCode(e.target.value)}
                                    className="placeholder:text-[#696969] font-semibold ml-2 h-full outline-none max-w-28"
                                />
                            </div>
                            <input type="submit" value="Get Quotes"
                                   className="bg-[#3F9DED] p-3 rounded-3xl text-white w-full"/>
                        </div>
                    </form>
                    <form onSubmit={(e) => handleSubmit(e)}
                          className="mt-8 sm:flex bg-white min-h-9   items-center  rounded-[20px] shadow-md w-full hidden ">
                        <div className="pl-4">
                            <SearchIcon/>
                        </div>
                        <Select
                            styles={{
                                border: "none",
                                control: (baseStyles, state) => ({
                                    ...baseStyles,
                                }),
                            }}
                            options={options}
                            placeholder="What service do you need?"
                            isSearchable={true}
                            className="placeholder:text-[#696969] text-black select_bar  sm:w-[230px] w-[100%]  font-medium ml-2 h-full outline-none"
                            onChange={(e) => handleSelectChange(e)}
                        />
                        <div className=" font-bold text-[#696969] ml-6 flex items-center gap-2 text-sm sm:text-base">
                            <LocationIcon/>
                            <input
                                type="text"
                                placeholder="Postal Code"
                                maxlength='7'
                                value={postalCode}
                                onChange={(e) => handlePostalChange(e)}
                                className=" placeholder:text-[#696969] font-medium ml-2 h-full outline-none max-w-28"
                            />
                        </div>
                        <input type="submit"
                               value="Get Quotes"
                               className="bg-primary cursor-pointer hover:bg-white hover:text-primary transition-none border-2 border-primary text-white rounded-[20px] ml-auto p-3 text-transform : uppercase font-bold px-5 text-sm sm:text-base"
                        />

                    </form>

                    <div className="flex w-[100%]">
                        {selectedError && (
                            <p className="mt-2 ml-12 text-sm text-red-600 dark:text-red-500">
                                Please select category!
                            </p>
                        )}
                        {!isValidPostalCode && (
                            <p className="mt-2 ml-[19rem] max-md:ml-0 text-sm text-red-600 dark:text-red-500">
                                Please provide a valid postal code !
                            </p>
                        )}
                    </div>

                </div>
                <div
                    className=" flex gap-2 items-center flex-col sm:flex-row sm:pb-0  mt-6 justify-center  max-md:pb-80 max-w-[100%] max-md:w-[100%] max-md:ml-0 ml-[17%] ">
                    <h5 className="font-bold text-xl min-w-[110px] ">Hire a pro:</h5>
                    <div className="flex flex-wrap gap-3 max-md:m-auto max-md:w-[98%] ">
                        {bannerCategories?.map((value, index) => (
                            <div key={index} className="flex flex-wrap gap-2 sm:gap-8">
                                <button onClick={() => navigate.push(`/category/on/toronto/${value?.tag}`)}
                                        className="text-[12px] sm:text-base py-2 sm:py-2 px-5 sm:px-5 bg-transparent border-[2px] border-text rounded-3xl text-text font-bold">
                                    {value?.name}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Section 2 */}
            <div className="service_parent">
                <h1 className="heading pt-6">You Need It, We’ve Got It</h1>
                {categoryLoading ? (
                    <Loading/>
                ) : (
                    <div className="layout_cart">
                        <Slider {...settings} ref={sliderRef}>
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
                )}
                <div className="slider-controls">
                    <div className="carousel-buttons">
                        <button className="btn-prev" onClick={prevSlide}>
                            <FaChevronLeft/>
                        </button>
                        <button className="btn-next" onClick={nextSlide}>
                            <FaChevronRight/>
                        </button>
                    </div>
                </div>
            </div>

            {/* Section 3 */}
            <div className="category_parent">
                <h1 className="heading_category font-semibold">Our Most Popular Categories</h1>

                <div className="layout_category_cart">
                    {" "}
                    {topCategoryLoading ? (
                        <Loading/>
                    ) : (
                        <Slider {...categorySettings} ref={categoriesSliderRef}>
                            {categories.map((category) => (
                                <div key={category.id}>
                                    <CategoryCart
                                        id={category.id}
                                        imageSrc={`${IMAGE_PATH}${category.image}`}
                                        text={category.details}
                                        title={category.name}
                                        tag={category.tag}
                                    />
                                </div>
                            ))}
                        </Slider>
                    )}
                </div>

                <div className="slider-controls">
                    <div className="carousel-buttons">
                        <button className="btn-prev" onClick={categoryPrevSlide}>
                            <FaChevronLeft/>
                        </button>
                        <button className="btn-next" onClick={categoryNextSlide}>
                            <FaChevronRight/>
                        </button>
                    </div>
                </div>
            </div>

            {/* Section 4 */}
            <div className="max-w-[1000px] m-auto mt-10">
                <div className=" px-5 sm:py-6">
                    <div className="mb-8 flex justify-between items-center flex-wrap">
                        <h1 className="heading_costguides mt-5 font-semibold">Popular Cost Guides</h1>
                    </div>
                    {guideLoading ? (
                        <Loading/>
                    ) : (
                        <>
                            <div
                                className="mx-auto grid mb-5 grid-cols-2 md:grid-cols-3  justify-between gap-4 max-md:max-w-[90%] ">
                                {displayedGuides.map((value) => (
                                    <Costgguides
                                        key={value.id}
                                        tag={value.title.replaceAll(" ", "-").replaceAll("/", "-").toLowerCase()}
                                        buttonText={value.subtitle}
                                        title={value.title}
                                    />
                                ))}
                            </div>

                            <a
                                className="guide_btn hidden max-md:block text-center !border-[#119DED] text-text mt-2 max-md:w-[70%] justify-center border px-4 py-3 rounded-2xl font-bold bg-[#fff] flex align-item-center  items-center mx-auto"
                                href="#"
                            >
                                View All Guides
                            </a>

                        </>
                    )}
                </div>
            </div>

            {/* Section 5 */}
            <section className="text-gray-600 body-font mx-auto justify-center align-content-center items-center">
                <div
                    className="container !max-w-[1000px]  px-5 sm:py-6 mx-auto justify-center align-content-center items-center">
                    <div className="mb-8 flex justify-between max-md:flex-col items-center flex-wrap">
                        <h2 className="text-xl sm:text-3xl font-[600] text-black sm:text-left text-center max-md:mt-10">
                            Guides to help you grow{" "}
                        </h2>
                        <Link href='/blog'
                              className="text-[#276487] hover:underline font-[300] text-xl hidden sm:block pr-16">
                            See More
                        </Link>
                    </div>
                    {blogLoading ? (
                        <Loading/>
                    ) : (
                        <div className="w-screen pr-6 sm:w-[50%] md:w-[100%] md:mx-auto ">
                            <Slider {...guidesBlogSettings} ref={blogsSliderRef}>
                                {blogs.map((value) => (
                                    <div key={value.id} className="p-2 cursor-pointer"
                                         onClick={() => navigate.push(`/blog/${value.title.replaceAll(" ", "-").toLowerCase()}`)}>
                                        <div className="h-full rounded-lg overflow-hidden select-text">
                                            <img
                                                className="object-cover h-[300px] object-center rounded-3xl"
                                                src={`${IMAGE_PATH}${value.image}`}
                                                alt= {value.title}
                                            />
                                            <div className="py-4">
                                                <h2 className="title-font text-base font-semibold text-gray-900 mb-3 select-text">
                                                    {value.title}
                                                </h2>
                                                <p className="text-sm mb-3 max-md:-mt-2 text-gray-700 overflow-hidden whitespace-nowrap overflow-ellipsis  ">
                                                    {value.subtitle}
                                                </p>

                                                <div className="flex items-center flex-wrap">
                                                    <Link href={`/blogs/${value.id}`}
                                                          className="text-primary w-full lg:w-fit border text-sm px-5 py-3 rounded-2xl font-bold border-primary hover:bg-primary transition-all hover:text-white inline-flex items-center md:mb-2 lg:mb-0 sm:w-auto sm:justify-start justify-center">
                                                        Read more
                                                    </Link>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                    )}
                    <div className="slider-controls hidden max-md:block max-md:mt-[-3rem]">
                        <div className="carousel-buttons w-[screen] flex justify-center align-items-center mx-auto">
                            <button className="btn-prev" onClick={blogPrevSlide}>
                                <FaChevronLeft/>
                            </button>
                            <button className="btn-next" onClick={blogNextSlide}>
                                <FaChevronRight/>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 6 */}
            <section className="min-h-70 bg-[#ffff] lg:bg-[#B7E2FA] px-5  py-10">
                <div>
                    <h2 className=" sm:text-3xl text-xl font-bold text-center ">
                        How Helperzz Works
                    </h2>
                </div>

                <div className="mx-auto flex flex-col justify-evenly max-w-[950px] items-center ">
                    <div
                        className="flex w-[100%] gap-5 lg:gap-10   sm:p-0  sm:justify-between mt-6 flex-col lg:flex-row ">
                        <div className="flex items-center ">
                            <h2 className="text-5xl sm:text-[70px] font-medium max-md:min-w-[40px]">1</h2>
                            <div className="flex gap-1 flex-col ml-3">
                                <h5 className=" font-[600]">Create a job for free</h5>
                                <p className="capitalize font-[450] text-gray-600">tell us what you need</p>
                            </div>
                        </div>
                        <div className="flex items-center ">
                            <h2 className="text-5xl sm:text-[70px] font-medium max-md:min-w-[40px]">2</h2>
                            <div className="flex gap-1 flex-col ml-3">
                                <h5 className=" font-[600]">Get a quotee</h5>
                                <p className="capitalize font-[450] text-gray-600">Tradespeople get in touch</p>
                            </div>
                        </div>
                        <div className="flex items-center ">
                            <h2 className="text-5xl sm:text-[70px] font-medium max-md:min-w-[40px]">3</h2>
                            <div className="flex gap-1 flex-col ml-3">
                                <h5 className=" font-[600]">Rate and review</h5>
                                <p className="capitalize font-[450] text-gray-600">Job done - leave feedback</p>
                            </div>
                        </div>
                    </div>
                    <a href='/create-project'
                       className="text-text !border-[#119DED] mt-6 cursor-pointer hover:bg-primary hover:text-white transition-none  w-full md:w-fit min-w-60 justify-center border px-5 py-2 rounded-2xl font-semibold bg-[#fff] inline-flex items-center mx-auto">
                        Create A Job For Free
                    </a>
                </div>
            </section>

            {/* Section 7  */}
            <section className="my-0 mb-6 sm:my-16 container mx-auto">
                <h2 className="text-2xl sm:text-3xl font-[600] text-text  sm:text-left text-center mb-8">
                    Top Helperzz
                </h2>
                <section class="text-gray-600 body-font">
                    {contractorLoading ? (
                        <Loading/>
                    ) : (
                        <div class="sm:w-[100%] sm:flex h-[100%] md:mx-auto ">
                            <div
                                class="rounded-3xl mr-2 mb-2 sm:w-[25%] px-4 w-[90%] max-md:mx-auto py-7  bg-[#B7E2FA]">
                                <div class="h-[180px] sm:h-full flex ">
                                    <div class="relative flex-grow sm:p-3 p-0">
                                        <h2
                                            style={{lineHeight: 1.45}}
                                            className="text-xl max-md:text-[1.5rem] pt-6  text-center sm:text-left font-bold  text-text w-full "
                                        >
                                            Find the
                                            <span className="mx-2 text-[#0067A1]">
                        Top Rated Helperzz
                      </span>
                                            for your project
                                        </h2>
                                        <Link href='/top-contractors'
                                              class="absolute bottom-[1px] left-1/2 transform -translate-x-1/2 w-[90%] shadow-lg mt-12 text-xs hover:bg-primary hover:text-white cursor-pointer hover:border-primary transition-none text-text mt-4 justify-center border py-3 rounded-2xl max-md:text-[1rem] font-bold bg-[#fff] inline-flex items-center mx-auto">
                                            View All top Helperzz
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="sm:w-[75%]">
                                <Slider {...TopHelperzzsettings} ref={topHelperzzSliderRef}>
                                    {displayedTopHelperzz.map((value) => (
                                        <div key={value.id} className="flex">
                                            <div className="sm:w-[220px] w-[90%] max-md:mx-auto">
                                                <div
                                                    class="py-3 px-2 mr-2 mb-2 border-primary border rounded-3xl relative cursor-pointer"
                                                    onClick={() =>
                                                        navigate.push(
                                                            "/profile/" +
                                                            value.company_name
                                                                .replaceAll(" ", "-")
                                                                .toLowerCase()
                                                        )
                                                    }
                                                >
                                                    <div class="h-[280px]  items-start select-text">
                                                        <div class="flex p-3 gap-2">
                                                            <a class="inline-flex gap-2">
                                                                <img
                                                                    alt={value.company_name}
                                                                    src={`${IMAGE_PATH}${value.image}`}
                                                                    class="h-16 w-16 max-md:w-20 rounded-full flex-shrink-0 object-cover object-center"
                                                                />
                                                                <span
                                                                    class="flex-grow flex flex-col pl-2  items-center">
                                  <span class="text-lg font-semibold text-gray-900 line-clamp-1 text-ellipsis">
                                    {value.company_name}
                                  </span>
                                  <span class="font-normal text-sm text-gray-900 !text-left mr-auto">
                                    {value.category_name}
                                  </span>
                                </span>
                                                            </a>

                                                            <div
                                                                class="text-primary absolute text-sm mt-24 font-bold mb-8 flex flex-wrap gap-x-4">
                                                                {value.skills.split(",").map((skill, index) => (
                                                                    <span key={index}>{skill}</span>
                                                                ))}
                                                            </div>
                                                            <Link href='/create-project'
                                                                  class="absolute bottom-4 max-md:text-[1rem] left-1/2 transform -translate-x-1/2 w-[70%] text-xs mt-3 cursor-pointer hover:bg-primary hover:text-white transition-none text-text mb-2 min-w-55 justify-center px-3 py-3 rounded-2xl font-bold bg-transparent border-primary border inline-flex items-center mx-auto">
                                                                Get A Free Quote
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                    )}
                    <div className="slider-controls">
                        <div className="carousel-buttons w-[screen] flex justify-center align-items-center mx-auto">
                            <button className="btn-prev" onClick={topHelperzzSlidePrev}>
                                <FaChevronLeft/>
                            </button>
                            <button className="btn-next" onClick={tophelperzzSlideNext}>
                                <FaChevronRight/>
                            </button>
                        </div>
                    </div>
                </section>
            </section>

            {/* Section 8 */}
            <section className="got_dream_header bg-[#12937C] py-2">
                <div className="min-h-60 flex container  px-4 mx-auto flex items-center gap-[15%] max-md:flex-col ">
                    <div className="got_dream_header1 mb-4 sm:mb-0 flex justify-center items-center w-full sm:w-auto">
                        <Image
                            className="lg:h-60 md:h-36 py-5 w-full object-cover object-center rounded-3xl"
                            src={require("../../public/assets/images/dream-project-image.png")}
                            alt="blog"
                        />
                    </div>

                    <div className="got_dream_header2 text-center w-full sm:w-auto">
                        <h2 className="sm:text-3xl text-2xl font-bold text-center text-white uppercase">
                            Got A Dream Project?
                        </h2>
                        <p className="text-white mt-3">WE CAN PROVIDE A QUICK ESTIMATE !</p>
                        <Link href='/create-project'
                              className="text-text mt-6 max-md:border-[#119DED] max-md:border-[2px] shadow-sm shadow-black/20 min-w-[280px] justify-center border px-5 py-3 font-bold rounded-2xl bg-[#fff] hover:bg-primary hover:border-primary hover:text-white inline-flex items-center md:mb-2 mx-auto">
                            GET A FREE QUOTE
                        </Link>
                    </div>
                </div>
            </section>

            {/* Section 9 */}
            <section className=" bg-[#fffff] py-14  ">
                <div className="grid  grid-cols-1 sm:grid-cols-2 gap-20 container  px-4 mx-auto">
                    <div className="bg-[#F7F9FB] rounded-3xl p-10 max-md:p-4 w-full">
                        <h4 className=" sm:text-2xl text-2xl font-bold">
                            Hire Verified and Reviewed Pros
                        </h4>
                        <p className=" mt-4 font-semibold mb-6 text-sm">
                            With reviews, ratings and Verification, Helperzz gives you the
                            tools you need to hire with confidence
                        </p>
                        <div className="flex gap-4 items-center mt-6">
                            <div className="bg-[#43D9BE] w-fit p-3 rounded-full">
                                <SearchBoldIcon/>
                            </div>
                            <p className="text-sm">
                                Get matched with 3 pros directly or research yourself from a
                                list of verified and reviewed pros
                            </p>
                        </div>
                        <div className="flex gap-4 items-center mt-4">
                            <div className="bg-[#43D9BE] w-fit p-3 rounded-full">
                                <StarIcon/>
                            </div>
                            <p className="text-sm">
                                Read reviews and browse project photos submitted by homeowners
                                in your area.
                            </p>
                        </div>
                        <div className="flex gap-4 items-center mt-4">
                            <div className="bg-[#43D9BE] w-fit p-3 rounded-full">
                                <ProtectedIcon/>
                            </div>
                            <p className="text-sm">
                                Pros with a Verified Badge have passed a credit check, criminal
                                background check and are licensed.
                            </p>
                        </div>
                        <div className="flex justify-center mt-16 max-md:mt-10">
                            <Link href='/create-project'
                                  class="text-text] max-md:px-20 border-2  text-lg px-6 py-3 rounded-2xl font-semibold cursor-pointer hover:bg-primary hover:text-white border-primary inline-flex items-center md:mb-2 lg:mb-0 ">
                                Get started
                            </Link>
                        </div>
                    </div>
                    <div className="bg-[#F7F9FB] rounded-3xl pb-6 w-full">
                        <div className="relative">
                            {/* <Image
              class="w-full object-cover object-center h-72 rounded-tr-3xl rounded-tl-3xl"
              src={require("../../public/assets/images/video-thumbnail.png")}
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
                            {/* <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
                <PlayIcon />
              </div> */}
                        </div>
                        <p className="text-base mt-4 px-10 max-md:pr-2 max-md:pl-2  font-normal mb-4">
                            “As an employee, I also use Helperzz because I trust the service.”
                        </p>
                        <h4 className="px-10 text-lg font-bold px-4">
                            Ruth, major roofing project{" "}
                        </h4>
                        <div className="flex justify-center mt-10">
                            <Link href='/success-stories'
                                  class="text-text border-2  text-lg  px-6 py-3 rounded-2xl font-semibold cursor-pointer hover:bg-primary hover:text-white border-primary inline-flex items-center md:mb-2 lg:mb-0 ">
                                View Success Stories{" "}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Section 10 */}
            <div className="review_parent">

                <h1 className="heading_costguides text-center">HELPERZZ</h1>
                <h1 className="text-lg text-center max-md:mr-auto max-md:ml-4 max-md:mt-4">REVIEWS</h1>

                {reviewLoading ? (
                    <Loading/>
                ) : (
                    <div className="layout_review_cart ">
                        <Slider ref={reviewSliderRef} {...reviewSettings}>
                            {testimonials.map((value) => (
                                <Review key={value.id} review={value}/>
                            ))}
                        </Slider>
                    </div>
                )}
                <div className="carousel-buttons">
                    <button className="btn-prev" onClick={reviewSlidePrev}>
                        <FaChevronLeft/>
                    </button>
                    <button className="btn-next" onClick={reviewSlideNext}>
                        <FaChevronRight/>
                    </button>
                </div>
            </div>
            {/* <Posts
        categories={categories}
        costGuides={costGuides}
        blogs={blogs}
        contractors={contractors}
      /> */}
            <Footer/>
        </>
    );
}

export default Home;
