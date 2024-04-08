"use client";

import React, {useState, useEffect, Suspense} from "react";
import {GrLocation} from "react-icons/gr";
import {IoSearch} from "react-icons/io5";

import Header from "../../../../../components/Header";
import {FaAngleDown, FaAngleUp} from "react-icons/fa";
import {FiBox} from "react-icons/fi";
import {MdStar} from "react-icons/md";
import Image from "next/image";
import imgpfp from "../../../../../../public/assets/profile2.png";
import trustsealimg from "../../../../../../public/assets/trustsealbadge.png";
import contractorService from "../../../../../api/services/contractorService";
import {IMAGE_PATH} from "@/api/BaseUrl";
import reviewService from "../../../../../api/services/reviewService";
import moment from "moment";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {Footer} from "@/components/Footer";
import categoryService from "@/api/services/categoryService";
import cityService from "@/api/services/cityService";

const data = {
    suggestedFilters: ["Verified Licence", "Hired On Helperzz"],
    professionalCategory: [
        "Architects & Buliding Designers",
        "Design-Build Firms",
        "General Contractors",
        "Home Builders",
        "Interior Designers & Decorators",
        "Kitchen & Bathroom Designers",
    ],
    credentials: ["Verified Licence", "Hired On Helperzz"],
    businessHighlights: [
        "Provides 3D Visualization",
        "Eco-friendly",
        "Family owned",
        "Locally owned",
        "Free consultation",
        "Online consultation",
        "Free estimate",
        "Evening consultations",
        "Weekend consultations",
        "Offers Custom Work",
    ],
    languages: ["All Languages", "Speaks Spanish", "Speaks French"],
    rating: ["Any Rating"],
};

const postData = [
    {name: "one"},
    {name: "one"},
    {name: "one"},
    {name: "one"},
];

const reviewsData = [
    {name: "one"},
    {name: "one"},
    {name: "one"},
    {name: "one"},
];

const Page = ({params}) => {
    const [suggestedFilterOpen, setSuggestedFilterOpen] = useState(true);
    const [categoryOpen, setCategoryOpen] = useState(true);
    const [credentialsOpen, setCredentialsOpen] = useState(true);
    const [bussinessHighlightsOpen, setBussinessHighlightsOpen] = useState(true);
    const [languagesOpen, setLanguagesOpen] = useState(true);
    const [ratingOpen, setRatingOpen] = useState(true);
    const [cityName, setCityName] = useState("Toronto");
    const [inputCity, setInputCity] = useState("");
    const [isVisible, setIsVisible] = useState(true);
    const [ID, setID] = useState();
    const [contractors, setContractors] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [category, setCategory] = useState()
    const [city, setCity] = useState()
    const [loading, setLoading] = useState(true)

    const handleCheckboxChange = (e) => {
        const {value, checked} = e.target;
        if (checked) {
            setSelectedOptions((prevOptions) => [...prevOptions, value]);
        } else {
            setSelectedOptions((prevOptions) =>
                prevOptions.filter((option) => option !== value)
            );
        }
    };

    const handleRadioChange = (e) => {
        const {value} = e.target;
        setSelectedOptions((prevOptions) => [value, ...prevOptions]);
    };

    const handleOptionClose = (option) => {
        setSelectedOptions((prevOptions) =>
            prevOptions.filter((prevOption) => prevOption !== option)
        );
    };

    const location = useRouter();
    // const params = new URLSearchParams(location.query);

    const handleBoxClose = () => {
        setIsVisible(false);
    };

    const handleSuggestedFilterClick = () => {
        setSuggestedFilterOpen(!suggestedFilterOpen);
    };
    const handleCategoryClick = () => {
        setCategoryOpen(!categoryOpen);
    };
    const handleCredentialsClick = () => {
        setCredentialsOpen(!credentialsOpen);
    };
    const handleBussinessHighlightsClick = () => {
        setBussinessHighlightsOpen(!bussinessHighlightsOpen);
    };
    const handleLanguagesClick = () => {
        setLanguagesOpen(!languagesOpen);
    };
    const handleRatingClick = () => {
        setRatingOpen(!ratingOpen);
    };
    // const fetchCityName = async () => {
    //   try {
    //     const response = await axios.get("https://api.ipify.org?format=json");
    //     const ipAddress = response.data.ip;
    //     const cityResponse = await axios.get(
    //       `https://ipapi.co/${ipAddress}/json/`
    //     );
    //     const city = cityResponse.data.city || "Toronto";
    //     setCityName(city);
    //     console.log(city);
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // };
    useEffect(() => {
        // fetchCityName();
    }, []);

    useEffect(() => {
        console.log(params)
        setID(26);
        getCategoryByTag()
        getCityByTag()
    }, []);

    const getCategoryByTag = async () => {
        try {
            const response = await categoryService.fetchByTag(params.category);
            setCategory(response.category);
        } catch (error) {
            console.error(error);
        }
    };

    const getCityByTag = async () => {
        try {
            const response = await cityService.fetchByTag(params.city);
            setCity(response.city);
        } catch (error) {
            console.error(error);
        }
    };

    const getContractors = async (id) => {
        try {
            const response = await contractorService.category(id);
            setContractors(response.contractors);
            setLoading(false)
        } catch (error) {
            console.error(error);
        }
    };

    const getReviews = async (id) => {
        try {
            const response = await reviewService.category(id);
            console.log(response);
            setReviews(response.contractorReviews);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (category) {
            getContractors(category.id);
            getReviews(category.id);
        }
    }, [category]);

    const handleInputChange = (e) => {
        setInputCity(e.target.value);
    };

    const handleCitySubmit = () => {
        if (inputCity.trim() === "") {
            fetchCityName();
        } else {
            setCityName(inputCity);
        }
    };
    return (
        <>
            <Header/>
            {loading ?
                <>
                    <div className="flex space-x-2 justify-center items-center bg-white h-screen">
                        <span className="sr-only">Loading...</span>
                        <div className="h-6 w-6 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="h-6 w-6 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="h-6 w-6 bg-black rounded-full animate-bounce"></div>
                    </div>
                </> :
                <>
                    <div className="mt-[80px]">
                        <div
                            className="bg-[#12937C] flex flex-col justify-center items-center mt-10 py-6 max-md:px-5 text-white ">
                            <h1 className="text-[1.8rem] max-sm:text-[1.5rem] font-[700] ">
                                Get Matched with Local Professionals
                            </h1>
                            <p className="text-[1.1rem] max-sm:text-[.9rem] font-[300] ">
                                Answer a few questions,and we&apos;ll put you in touch with pros who
                                can help.
                            </p>
                            <div className="flex mt-5 mb-2 max-md:mt-3 max-md:justify-between max-md:w-[100%] ">
                                <div className="max-md:w-[60%]">
                                    <input
                                        type="search"
                                        className="bg-[#F7F9FB] py-2 text-[.9rem]  px-4 rounded-l-[15px] focus:outline-none pl-10 max-md:w-[100%]"
                                        placeholder="Postal Code"
                                    />
                                    <GrLocation className="ml-4 mt-[-30px] text-gray-600" size={20}/>
                                </div>
                                <div className="max-md:w-[40%]">
                                    <p className="bg-[#119DED] text-white text-[.9rem] py-2 text-center max-md:py-[10px] font-semibold max-md:px-2 px-4 ml-[-17px] max-md:ml-[-20px] rounded-[15px] cursor-pointer focus:outline-none max-md:text-[12px]">
                                        GET STARTED
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="py-10 md:px-[4rem] px-4  max-w-[1200px] justify-center mx-auto">
                            <h5 className="sm:text-[1.8rem] text-2xl font-[500] ">
                                {category?.name} in {city?.name}
                            </h5>
                            <p className="text-gray-600 sm:text-md text-sm">
                                {category?.name} in {city?.name}: {category?.details}
                            </p>{" "}
                            <div className="flex max-sm:flex-col mt-14 w-full justify-between items-center ">
                                <div className="flex flex-wrap gap-3 lg:gap-5 max-md:gap-2">
                                    {selectedOptions.map((option, index) => (
                                        <div
                                            className="flex items-center gap-5 bg-[#12937C1A] border-[1px] border-[#12937C] py-1 px-3 rounded-lg"
                                            key={index}
                                        >
                                            <p className="text-[.9rem]">{option}</p>
                                            <span
                                                className="text-[.9rem] cursor-pointer"
                                                onClick={() => handleOptionClose(option)}
                                            >
                    X
                  </span>
                                        </div>
                                    ))}
                                </div>

                                <div className="max-sm:mt-10">
                                    <div className="w-[100%] max-md:w-[100%]">
                                        <input
                                            type="search"
                                            className="bg-[#F7F9FB] py-2 px-4 rounded-xl border-[1px] border-[#12937C] text-sm focus:outline-none w-full pl-10 max-md:rounded-xl placeholder:text-[.8rem]"
                                            placeholder="Search by name or keyword"
                                        />
                                        <IoSearch className="ml-2 mt-[-28px] text-gray-600" size={20}/>
                                    </div>
                                </div>
                            </div>
                            <div className="flex max-md:flex-col gap-5 mt-10 ">
                                <div className="w-[25%] max-md:hidden ">
                                    <div className="bg-[#E8F5F2] p-4 rounded-lg ">
                                        <h5 className="text-[1.3rem] font-[600] ">Location (1)</h5>

                                        <input
                                            type="search"
                                            value={inputCity}
                                            onChange={handleInputChange}
                                            className="bg-[#F7F9FB] border-[1px] border-[#12937C]  mt-4 py-1 px-4 rounded-lg focus:outline-none w-full pl-10 max-md:rounded-r-lg placeholder:text-[.8rem] align-items-center "
                                            placeholder="Toronto ||"
                                        />
                                        <GrLocation
                                            className="ml-3 mt-[-28px] text-gray-600"
                                            size={20}
                                        />
                                        <input
                                            type="search"
                                            className="bg-[#F7F9FB] border-[1px] border-[#12937C] mt-4 py-1 px-4 rounded-lg focus:outline-none w-full pl-4 max-md:rounded-r-lg placeholder:text-[.8rem] align-items-center"
                                            placeholder="Radius 50 mi"
                                        />

                                        <button
                                            onClick={handleCitySubmit}
                                            className="py-1 px-5 mt-4 bg-[#12937C] text-white text-[15px] rounded-[10px] w-full cursor-pointer hover:bg-opacity-80 font-[550]"
                                        >
                                            Filter City
                                        </button>
                                    </div>
                                    <div className="bg-[#E8F5F2] p-2 rounded-lg mt-5">
                                        <div class="w-full pb-5 border-gray-300 rounded-t border-b">
                                            <div
                                                onClick={handleSuggestedFilterClick}
                                                class="mb-3 p-1 bg-transparent flex items-center  rounded transition-all ease-in-out duration-500 "
                                            >
                                                <div class="p-1 text-lg md:text-md font-[500] w-full text-gray-800">
                                                    Suggested Filters
                                                </div>
                                                <div class="text-black w-8 py-1 pl-2 pr-1  flex items-center">
                                                    {suggestedFilterOpen ? (
                                                        <button
                                                            class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                                                            <FaAngleUp/>
                                                        </button>
                                                    ) : (
                                                        <button
                                                            class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                                                            <FaAngleDown/>
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                            {suggestedFilterOpen && (
                                                <div class="w-full items-center flex mx-3 -mt-1">
                                                    <form action="" className="flex flex-col gap-2">
                                                        {data?.suggestedFilters?.map((value, index) => (
                                                            <div
                                                                key={index}
                                                                className="flex items-center cursor-pointer"
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    id="categories"
                                                                    // onChange={(e) => {
                                                                    //     if (e.target.checked) {
                                                                    //         setSelectedCategories((state) => [
                                                                    //             ...state,
                                                                    //             value.id,
                                                                    //         ]);
                                                                    //     } else {
                                                                    //         removeSelectedCategory(value.id);
                                                                    //     }
                                                                    // }}
                                                                    name="categories"
                                                                    value={value}
                                                                    onChange={handleCheckboxChange}
                                                                    className="cursor-pointer form-checkbox w-[17px] h-[17px]  text-[#12937C] border-gray-500 rounded-lg bg-transparent checked:bg-[#12937C] checked:border-green-600"
                                                                />
                                                                <label
                                                                    for="category"
                                                                    className="ml-2 text-[.9rem] text-[#262626B2] font-[400] "
                                                                >
                                                                    {value}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </form>
                                                </div>
                                            )}
                                        </div>
                                        <div class="w-full border-gray-300  py-5 rounded-t border-b">
                                            <div
                                                onClick={handleCategoryClick}
                                                class="mb-3 p-1 bg-transparent flex items-center  rounded transition-all ease-in-out duration-500 "
                                            >
                                                <div class="p-1 text-lg md:text-md font-[500] w-full text-gray-800">
                                                    Professional Category
                                                </div>
                                                <div class="text-black w-8 py-1 pl-2 pr-1  flex items-center">
                                                    {categoryOpen ? (
                                                        <button
                                                            class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                                                            <FaAngleUp/>
                                                        </button>
                                                    ) : (
                                                        <button
                                                            class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                                                            <FaAngleDown/>
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                            <div className="w-[100%] max-md:w-[100%]">
                                                <input
                                                    type="search"
                                                    className="bg-transparent border-[1px] border-gray-400 py-1 px-4 rounded-xl focus:outline-none w-full pl-10 placeholder:text-xs max-md:rounded-lg"
                                                    placeholder="Search Professional Category"
                                                />
                                                <IoSearch
                                                    className="ml-2 mt-[-28px] text-gray-500"
                                                    size={20}
                                                />
                                            </div>
                                            {categoryOpen && (
                                                <div class="w-full items-center flex mx-3 mt-6">
                                                    <form action="" className="flex flex-col gap-2">
                                                        {data?.professionalCategory?.map((value, index) => (
                                                            <div
                                                                key={index}
                                                                className="flex items-center cursor-pointer"
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    id="categories"
                                                                    name="categories"
                                                                    value={value}
                                                                    onChange={handleRadioChange}
                                                                    className="cursor-pointer form-checkbox w-[13px] h-[13px] border-[1px] border-gray-500 rounded-lg bg-transparent checked:bg-[#12937C] checked:border-green-600"
                                                                />
                                                                <label
                                                                    for="category"
                                                                    className="ml-2 text-sm font-[400] text-gray-500"
                                                                >
                                                                    {value}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </form>
                                                </div>
                                            )}
                                        </div>
                                        <div class="w-full border-gray-300  py-5 rounded-t border-b">
                                            <div
                                                onClick={handleCredentialsClick}
                                                class="mb-3 p-1 bg-transparent flex items-center  rounded transition-all ease-in-out duration-500 "
                                            >
                                                <div class="p-1 px-2 text-[1.2rem] font-[500] w-full text-gray-800">
                                                    Credentials $ Awards
                                                </div>
                                                <div class="text-black w-8 py-1 pl-2 pr-1  flex items-center">
                                                    {credentialsOpen ? (
                                                        <button
                                                            class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                                                            <FaAngleUp/>
                                                        </button>
                                                    ) : (
                                                        <button
                                                            class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                                                            <FaAngleDown/>
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                            {credentialsOpen && (
                                                <div class="w-full items-center flex mx-3 -mt-1">
                                                    <form action="" className="flex flex-col gap-2">
                                                        {data?.credentials?.map((value, index) => (
                                                            <div
                                                                key={index}
                                                                className="flex items-center cursor-pointer"
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    id="categories"
                                                                    name="categories"
                                                                    value={value}
                                                                    onChange={handleCheckboxChange}
                                                                    className=" cursor-pointer form-checkbox w-[17px] h-[17px]  text-[#12937C] border-gray-500 rounded-lg bg-transparent checked:bg-[#12937C] checked:border-green-600"
                                                                />
                                                                <label
                                                                    for="category"
                                                                    className="ml-2 text-[.9rem] font-[400] text-gray-500"
                                                                >
                                                                    {value}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </form>
                                                </div>
                                            )}
                                        </div>
                                        <div class="w-full border-gray-300  py-5 rounded-t border-b">
                                            <div
                                                onClick={handleBussinessHighlightsClick}
                                                class="mb-3 p-1 bg-transparent flex items-center  rounded transition-all ease-in-out duration-500 "
                                            >
                                                <div class="p-1 px-2 text-[1.2rem] font-[500] w-full text-gray-800">
                                                    Business Highlights
                                                </div>
                                                <div class="text-black w-8 py-1 pl-2 pr-1  flex items-center">
                                                    {bussinessHighlightsOpen ? (
                                                        <button
                                                            class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                                                            <FaAngleUp/>
                                                        </button>
                                                    ) : (
                                                        <button
                                                            class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                                                            <FaAngleDown/>
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                            {bussinessHighlightsOpen && (
                                                <div class="w-full items-center flex mx-3 -mt-1">
                                                    <form action="" className="flex flex-col gap-2">
                                                        {data?.businessHighlights?.map((value, index) => (
                                                            <div
                                                                key={index}
                                                                className="flex items-center cursor-pointer"
                                                            >
                                                                <input
                                                                    type="checkbox"
                                                                    id="categories"
                                                                    name="categories"
                                                                    value={value}
                                                                    onChange={handleCheckboxChange}
                                                                    className=" cursor-pointer form-checkbox w-[17px] h-[17px]  text-[#12937C] border-gray-500 rounded-lg bg-transparent checked:bg-[#12937C] checked:border-green-600"
                                                                />
                                                                <label
                                                                    for="category"
                                                                    className="ml-2 text-[.9rem] font-[400] text-gray-500"
                                                                >
                                                                    {value}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </form>
                                                </div>
                                            )}
                                        </div>
                                        <div class="w-full border-gray-300  py-5 rounded-t border-b">
                                            <div
                                                onClick={languagesOpen}
                                                class="mb-3 p-1 bg-transparent flex items-center  rounded transition-all ease-in-out duration-500 "
                                            >
                                                <div class="p-1 px-2 text-[1.2rem] font-[500] w-full text-gray-800">
                                                    Languages
                                                </div>
                                                <div class="text-black w-8 py-1 pl-2 pr-1  flex items-center">
                                                    {languagesOpen ? (
                                                        <button
                                                            class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                                                            <FaAngleUp/>
                                                        </button>
                                                    ) : (
                                                        <button
                                                            class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                                                            <FaAngleDown/>
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                            {languagesOpen && (
                                                <div class="w-full items-center flex mx-3 -mt-1">
                                                    <form action="" className="flex flex-col gap-2">
                                                        {data?.languages?.map((value, index) => (
                                                            <div
                                                                key={index}
                                                                className="flex items-center cursor-pointer"
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    id="categories"
                                                                    name="categories"
                                                                    value={value}
                                                                    className="cursor-pointer"
                                                                    onChange={handleRadioChange}
                                                                />
                                                                <label
                                                                    for="category"
                                                                    className="ml-2 text-[.9rem] font-[400] text-gray-500"
                                                                >
                                                                    {value}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </form>
                                                </div>
                                            )}
                                        </div>
                                        <div class="w-full border-gray-300  py-5 rounded-t border-b">
                                            <div
                                                onClick={handleRatingClick}
                                                class="mb-3 p-1 bg-transparent flex items-center  rounded transition-all ease-in-out duration-500 "
                                            >
                                                <div class="p-1 px-2 text-[1.2rem] font-[500] w-full text-gray-800">
                                                    Rating
                                                </div>
                                                <div class="text-black w-8 py-1 pl-2 pr-1  flex items-center">
                                                    {ratingOpen ? (
                                                        <button
                                                            class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                                                            <FaAngleUp/>
                                                        </button>
                                                    ) : (
                                                        <button
                                                            class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                                                            <FaAngleDown/>
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                            {ratingOpen && (
                                                <div class="w-full items-center flex mx-3 -mt-1">
                                                    <form action="" className="flex flex-col gap-2">
                                                        {data?.rating?.map((value, index) => (
                                                            <div
                                                                key={index}
                                                                className="flex items-center cursor-pointer"
                                                            >
                                                                <input
                                                                    type="radio"
                                                                    id="categories"
                                                                    name="categories"
                                                                    value={value}
                                                                    className="cursor-pointer"
                                                                    onChange={handleRadioChange}
                                                                />
                                                                <label
                                                                    for="category"
                                                                    className="ml-2 text-[.9rem] font-[400] text-gray-500"
                                                                >
                                                                    {value}
                                                                </label>
                                                            </div>
                                                        ))}
                                                    </form>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:w-[75%] w-full max-md:mt-5 gap-2 ">
                                    {contractors?.map((value, index) => (
                                        <div
                                            key={index}
                                            className="bg-[#F7F9FB] sm:p-4 p-1 flex max-md:flex-col items-center gap-5 mb-5"
                                        >
                                            <div className="">
                                                <img
                                                    src={`${IMAGE_PATH}${value.image}`}
                                                    className={`h-[250px] w-[250px]`}
                                                    alt=""
                                                    height={250}
                                                    width={550}
                                                />
                                            </div>
                                            <div className="w-[80%]">
                                                <div className="flex gap-2">
                                                    <div className="bg-white p-3 rounded-full">
                                                        <img
                                                            src={`${IMAGE_PATH}${value.image}`}
                                                            alt=""
                                                            className="sm:h-16 sm:w-16 h-auto w-36"
                                                        />
                                                    </div>
                                                    <div className="">
                                                        <h4 className="text-[1.2rem] md:text-lg font-[500] ">
                                                            {value.company_name}
                                                        </h4>
                                                        <div className="flex flex-wrap">
                                                            {value.trust_seal ? (
                                                                <Image
                                                                    src={trustsealimg}
                                                                    width={120}
                                                                    height={20}
                                                                    alt="trustSeal badge"
                                                                />
                                                            ) : null}
                                                            <div className="sm:ml-4 ml-0 flex  items-center gap-1 ">
                                                                <MdStar
                                                                    className="text-[#12937C] sm:text-[1.8rem] text-[1.2rem] "/>
                                                                <span className="sm:text-md text-sm font-[600]">
                              {`${value.ratings / value.users} / 5`}
                            </span>
                                                                <span
                                                                    className="sm:ml-3 ml-1 sm:text-md text-sm text-gray-500">
                              {`(${value.users} Reviews)`}
                            </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 mt-4">
                                                    <div
                                                        className="flex items-center gap-3 bg-[#12937C1A] border-[1px] border-[#12937C] py-1 px-2 rounded-lg">
                        <span>
                          <FiBox/>
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
                                                    <h5
                                                        className="text-sm font-[500] mt-3 text-ellipsis line-clamp-2"
                                                        dangerouslySetInnerHTML={{
                                                            __html: value.description,
                                                        }}
                                                    ></h5>
                                                </div>
                                                <div className="flex justify-between w-full mt-2 ">
                                                    <h5 className="text-sm font-[500]">{value.name}</h5>
                                                    <Link
                                                        className="text-sm font-[600] text-[#12937C] "
                                                        href={`/profile`}
                                                    >
                                                        Read More
                                                    </Link>
                                                </div>
                                                <h4 className="text-md font-[600] mt-1">
                                                    4 projects in the {cityName}
                                                </h4>
                                                <button
                                                    className="py-2 px-5 mt-4 bg-[#12937C] text-white text-md rounded-[10px] text-opacity-70 cursor-pointer hover:bg-opacity-80 font-[600]">
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
                                                <span
                                                    class="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]">
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
                                        </li>
                                        {" "}
                                        <li>
                                            <a
                                                class="relative block bg-transparent sm:px-3 px-[7px] py-1.5 text-sm text-surface transition duration-300 hover:bg-[#12937C] hover:bg-opacity-30 focus:bg-[#12937C] focus:bg-opacity-20 focus:outline-none active:bg-[#12937C] active:bg-opacity-20 text-black"
                                                href="#!"
                                            >
                                                6
                                            </a>
                                        </li>
                                        {" "}
                                        <li>
                                            <a
                                                class="relative block bg-transparent sm:px-3 px-[7px] py-1.5 text-sm text-surface transition duration-300 hover:bg-[#12937C] hover:bg-opacity-30 focus:bg-[#12937C] focus:bg-opacity-20 focus:outline-none active:bg-[#12937C] active:bg-opacity-20 text-black"
                                                href="#!"
                                            >
                                                7
                                            </a>
                                        </li>
                                        {" "}
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
                            </div>
                        </div>
                        <div className="bg-[#F7F9FB] md:px-[4rem] px-6 py-10  ">
                            <div className="max-w-[1100px] justify-center mx-auto">
                                <h5 className="sm:text-[1.8rem] text-2xl font-[600] ">
                                    Featured Reviews for {category?.name} in {city?.name}
                                </h5>

                                <div className="grid lg:grid-cols-2 gap-5 sm:mt-[3rem] mt-3">
                                    {reviews?.map((value, index) => (
                                        <div
                                            key={index}
                                            className="bg-white sm:px-5 sm:py-8 py-4 rounded-xl  "
                                        >
                                            <div className="flex gap-5">
                                                <div className="bg-white sm:p-3 rounded-full">
                                                    <Image
                                                        src={imgpfp}
                                                        alt=""
                                                        className="sm:h-16 sm:w-16 h-auto w-36"
                                                    />
                                                </div>
                                                <div>
                                                    <h4 className="text-[1.1rem] font-[500] ">
                                                        {value.name}
                                                    </h4>
                                                    <h4 className="text-[.9rem] font-[600] ">
                                                        {value.title}
                                                    </h4>
                                                    <div className="flex items-center ">
                                                        <MdStar
                                                            className="text-[#12937C] text-[1.5rem] max-md:text-[1.2rem] "/>
                                                        <MdStar
                                                            className="text-[#12937C] text-[1.5rem] max-md:text-[1.2rem] "/>
                                                        <MdStar
                                                            className="text-[#12937C] text-[1.5rem] max-md:text-[1.2rem] "/>
                                                        <MdStar
                                                            className="text-[#12937C] text-[1.5rem] max-md:text-[1.2rem] "/>
                                                        <MdStar
                                                            className="text-[#12937C] text-[1.5rem] max-md:text-[1.2rem] "/>

                                                        <p className="sm:ml-5 ml-1 sm:text-[.8rem] text-[10px]  text-gray-500 ">
                                                            {moment(value.created_date).format("ll")}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            <p className="mt-5 text-[.9rem] max-md:text-[.8rem] ">
                                                {value.review}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <ul class="list-style-none flex mt-7 mx-auto justify-center">
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
                                        <span
                                            class="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]">
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
                                </li>
                                {" "}
                                <li>
                                    <a
                                        class="relative block bg-transparent sm:px-3 px-[7px] py-1.5 text-sm text-surface transition duration-300 hover:bg-[#12937C] hover:bg-opacity-30 focus:bg-[#12937C] focus:bg-opacity-20 focus:outline-none active:bg-[#12937C] active:bg-opacity-20 text-black"
                                        href="#!"
                                    >
                                        6
                                    </a>
                                </li>
                                {" "}
                                <li>
                                    <a
                                        class="relative block bg-transparent sm:px-3 px-[7px] py-1.5 text-sm text-surface transition duration-300 hover:bg-[#12937C] hover:bg-opacity-30 focus:bg-[#12937C] focus:bg-opacity-20 focus:outline-none active:bg-[#12937C] active:bg-opacity-20 text-black"
                                        href="#!"
                                    >
                                        7
                                    </a>
                                </li>
                                {" "}
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
                    </div>
                </>
            }
            <Footer/>
        </>
    );
};

export default Page;
