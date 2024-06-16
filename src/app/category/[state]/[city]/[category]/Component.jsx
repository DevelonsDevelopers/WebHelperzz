"use client";

import React, {useState, useEffect, Suspense} from "react";
import {GrLocation} from "react-icons/gr";
import {IoSearch} from "react-icons/io5";

import Header from "@/components/Header";
import {FaAngleDown, FaAngleUp} from "react-icons/fa";
import {FiBox} from "react-icons/fi";
import {MdStar} from "react-icons/md";
import Image from "next/image";
import imgpfp from "/public/assets/profile2.png";
import imgThumb from "/public/assets/project_thumb.jpg";
import trustsealimg from "/public/assets/trustsealbadge.png";
import contractorService from "@/api/services/contractorService";
import {IMAGE_PATH} from "@/api/BaseUrl";
import reviewService from "@/api/services/reviewService";

import moment from "moment";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {Footer} from "@/components/Footer";
import categoryService from "@/api/services/categoryService";
import cityService from "@/api/services/cityService";
import Autosuggest from "react-autosuggest";
import Head from 'next/head';
import {usePathname} from 'next/navigation'
import toast from 'react-hot-toast';


import {
    Pagination,
    Stack,
    ThemeProvider,
    createTheme,
    PaginationItem
} from "@mui/material";
import Search from "@/components/search/Search";
import seoService from "@/api/services/seoService";

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
    rating: [{value: 1, name: '1 Star'}, {value: 2, name: '2 Star'}, {value: 3, name: '3 Star'}, {
        value: 4,
        name: '4 Star'
    }, {value: 5, name: '5 Star'},],
};



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
    const [category, setCategory] = useState();
    const [city, setCity] = useState();
    const [seo, setSeo] = useState();
    const [loading, setLoading] = useState(true);

    const [highlights, setHighlights] = useState([])
    const [languages, setLanguages] = useState([])
    const [ratings, setRatings] = useState([])

    const [selectedCategory, setSelectedCategory] = useState('')

    const [filterData, setFilterData] = useState()

    const [categorySearch, setCategorySearch] = useState('')
    const pathname = usePathname()


    const highlightCheck = (value) => {
        if (highlights.includes(value)) {
            setHighlights(highlights.filter(v => v !== value))
        } else {
            setHighlights(v => [...v, value])
        }
    }

    console.log('params', params)

    const languageCheck = (value) => {
        if (languages.includes(value)) {
            setLanguages(languages.filter(v => v !== value))
        } else {
            setLanguages(v => [...v, value])
        }
    }

    const ratingCheck = (value) => {
        if (ratings.includes(value)) {
            setRatings(ratings.filter(v => v !== value))
        } else {
            setRatings(v => [...v, value])
        }
    }

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
        setSelectedCategory(e.target.value)
        // console.log('e target' , e.target.value.replaceAll(" ", "-")
        // .toLowerCase())
        location.replace(`/category/on/${inputCity ? inputCity : params.city}/${e.target.value.replaceAll(" ", "-").replaceAll("/", "-").toLowerCase()}`)
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


    useEffect(() => {
        console.log(params);
        setID(26);
        getCategoryByTag();
        getCityByTag();
        getSeo();
    }, []);

    const getCategoryByTag = async () => {
        try {
            const response = await categoryService.fetchByTag(params.category);
            setCategory(response.category);
        } catch (error) {
            console.log(error);
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

    const getSeo = async () => {
        try {
            const response = await seoService.CityCategorySeo({city:params.city , category:params.category})
            setSeo(response.seo);
        } catch (error) {
            console.error(error);
        }
    };

    const getContractors = async (id, data) => {
        console.log("hello")
        try {
            const response = await contractorService.category(id, data);
            setContractors(response.contractors);
            setLoading(false);
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
        const fetchFilter = async () => {
            const response = await contractorService.filters().then((res) => {
                setFilterData(res?.data)
            })
        }
        fetchFilter()
    }, [])

    useEffect(() => {
        if (category) {
            getReviews(category.id);
        }
    }, [category]);

    useEffect(() => {
        let isRatings = false;
        let isLanguages = false;
        let isHighlights = false;
        if (ratings.length > 0) {
            console.log(ratings)
            isRatings = true
        }
        if (languages.length > 0) {
            isLanguages = true
        }
        if (highlights.length > 0) {
            isHighlights = true
        }
        if (category) {
            getContractors(category.id, {
                highlights: highlights.toString(),
                languages: languages.toString(),
                ratings: ratings.toString(),
                isRatings: isRatings,
                isLanguage: isLanguages,
                isHighlight: isHighlights
            });
        }
    }, [category, highlights, languages, ratings]);

    const handleInputChange = (e) => {
        setInputCity(e.target.value);
    };

    const handleCitySubmit = () => {
        if (inputCity) {

            location.replace(`/category/on/${inputCity.toLowerCase()}/${selectedCategory ? selectedCategory : params?.category}`)
        } else {
            toast.error('select city first')
        }

    };



    const [searchData, setSearchData] = useState('')


    const itemsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const [filteredData, setFilteredData] = useState([]);
    const [paginatedData, setPaginatedData] = useState([]);


    useEffect(() => {
        if (contractors) {
            const filteredResult = contractors.filter((item) =>
                (item.company_name && item.company_name?.toLowerCase().includes(searchData?.toLowerCase())) ||
                (item.skills && item.skills?.toLowerCase().includes(searchData?.toLowerCase())) ||
                (item.name && item.name?.toLowerCase().includes(searchData?.toLowerCase()))
            );
            setFilteredData(filteredResult);
            setCurrentPage(1);
        }
    }, [searchData, contractors]);


    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setPaginatedData(filteredData.slice(startIndex, endIndex));
    }, [currentPage, filteredData]);


    const theme = createTheme({palette: {primary: {main: '#E0EFEE', contrastText: '#EEE'}}})



    const [paginatedDataReview, setPaginatedDataReview] = useState([]);

    const itemsPerPageReviews = 4;
    const [currentPageReviews, setCurrentPageReviews] = useState(1);
    const handlePageChangeReviews = (event, newPage) => {
        setCurrentPageReviews(newPage);
    };

    useEffect(() => {
        const startIndex = (currentPageReviews - 1) * itemsPerPageReviews;
        const endIndex = startIndex + itemsPerPageReviews;
        setPaginatedDataReview(reviews.slice(startIndex, endIndex));
    }, [currentPageReviews, reviews]);


    const [citySuggestions, setCitySuggestions] = useState([]);
    const [cities, setCities] = useState([])
    const [citySelectedOption, setCitySelectedOption] = useState('');



    useEffect(() => {
        const getCities = async () => {
            try {
                const response = await cityService.fetchAll();
                setCities(response.cities);
            } catch (error) {
                console.error(error);
            }
        };
        getCities()
    }, [])


    const getCitySuggestions = (inputValue) => {
        const inputValueLowerCase = inputValue.trim().toLowerCase();
        return cities.filter(
            (city) =>
                city.name.toLowerCase().includes(inputValueLowerCase) ||
                city.tag.toLowerCase().includes(inputValueLowerCase)
        );
    };

    const onCitySuggestionsFetchRequested = ({value}) => {
        const suggestions = getCitySuggestions(value);
        setCitySuggestions(suggestions);
        setCitySelectedOption(value);
    };

    const [slicedCategory, setSlicedCategory] = useState(9)



    return (
        <>
            <Head>
                <title>
                    {pathname.replaceAll('/', '')}
                </title>
                <meta
                    name="description"
                    content="Check out iPhone 12 XR Pro and iPhone 12 Pro Max. Visit your local store and for expert advice."
                    key="desc"
                />
            </Head>

            <Header/>
            {loading ? (
                <>
                    <div className="flex space-x-2 justify-center items-center bg-white h-screen">
                        <span className="sr-only">Loading...</span>
                        <div className="h-6 w-6 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="h-6 w-6 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="h-6 w-6 bg-black rounded-full animate-bounce"></div>
                    </div>
                </>
            ) : (
                <>
                    <div className="mt-[80px]">

                        <Search/>

                        <div className="py-10 md:px-[4rem] px-4  max-w-[1200px] justify-center mx-auto">
                            <h1 className="sm:text-[1.8rem] text-2xl font-[500] ">
                                {category?.name} in {city?.name}
                            </h1>
                            <h3 className="text-gray-600 sm:text-md text-sm mt-4">
                                {seo?.page_description ? seo.page_description : "Coming Soon"}
                            </h3>{" "}
                            <div className="flex max-sm:flex-col mt-10 w-full justify-between items-center ">
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
                                            value={searchData}
                                            onChange={(e) => setSearchData(e.target.value)}
                                            className="bg-[#F7F9FB] py-2 px-4 rounded-xl border-[1px] border-[#12937C] text-sm focus:outline-none w-full pl-10 max-md:rounded-xl placeholder:text-[.8rem]"
                                            placeholder="Search by name or keyword"
                                        />
                                        <IoSearch
                                            className="ml-2 mt-[-28px] text-gray-600"
                                            size={20}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="flex max-md:flex-col gap-5 mt-10 ">
                                <div className="w-[25%] max-md:hidden ">
                                    <div className="bg-[#E8F5F2] p-4 rounded-lg ">
                                        <h5 className="text-[1.3rem] font-[600] ">Location</h5>


                                        <Autosuggest
                                            suggestions={citySuggestions?.slice(0, 10)}
                                            onSuggestionsFetchRequested={onCitySuggestionsFetchRequested}
                                            onSuggestionsClearRequested={() => setCitySuggestions([])}
                                            getSuggestionValue={(suggestion) => suggestion.name}
                                            renderSuggestion={(suggestion) => (
                                                <div
                                                    className=" p-2 border-[.5px] z-2 border-gray-200 bg-[#F7F9FB] sm:text-xs text-gray-800 bg-white cursor-pointer">
                                                    {suggestion.name}
                                                </div>
                                            )}
                                            inputProps={{
                                                placeholder: city?.name,
                                                value: inputCity,
                                                onChange: (_, {newValue}) => setInputCity(newValue),
                                                className: 'placeholder:text-[#696969] z-2 text-[#696969] bg-[#F7F9FB] font-normal py-2 rounded-md sm:text-xs ml-2 h-full outline-none w-full mt-2 pl-4',
                                            }}
                                        />


                                        <button
                                            onClick={handleCitySubmit}
                                            className="py-1 px-5 mt-4 bg-[#12937C] text-white text-[15px] rounded-[10px] w-full cursor-pointer hover:bg-opacity-80 font-[550]"
                                        >
                                            Filter City
                                        </button>
                                    </div>
                                    <div className="bg-[#E8F5F2] p-2 rounded-lg mt-5">

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
                                                    value={categorySearch}
                                                    onChange={(e) => setCategorySearch(e.target.value)}
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
                                                        {filterData?.categories
                                                            ?.filter(value => value.name.toLowerCase().includes(categorySearch.toLowerCase()))
                                                            .slice(0, slicedCategory)
                                                            .map((value, index) => (
                                                                <div
                                                                    key={index}
                                                                    className="flex items-center cursor-pointer"
                                                                >
                                                                    <input
                                                                        type="radio"
                                                                        id={`category-${index}`}
                                                                        name="categories"
                                                                        value={value.name}
                                                                        checked={category?.name.replaceAll(" ", "-").replaceAll("/", "-").toLowerCase() === value?.name.replaceAll(" ", "-").replaceAll("/", "-").toLowerCase()}
                                                                        onChange={handleRadioChange}
                                                                        className="cursor-pointer form-checkbox w-[13px] h-[13px] border-[1px] border-gray-500 rounded-lg bg-transparent checked:bg-[#12937C] checked:border-green-600"
                                                                    />
                                                                    <label
                                                                        htmlFor={`category-${index}`}
                                                                        className="ml-2 text-sm font-[400] text-gray-500 cursor-pointer"
                                                                    >
                                                                        {value.name}
                                                                    </label>
                                                                </div>

                                                            ))}
                                                    </form>
                                                </div>
                                            )}
                                            {slicedCategory === 9 ?
                                                <h1 onClick={() => setSlicedCategory(filterData?.categories?.length)}
                                                    className="mt-2 ml-2 cursor-pointer text-[13px] text-[#2B937C]  hover:underline">Show
                                                    more</h1>
                                                :
                                                <h1 onClick={() => setSlicedCategory(9)}
                                                    className="mt-2 ml-2 cursor-pointer text-[13px] text-[#2B937C]  hover:underline">Show
                                                    less </h1>
                                            }
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
                                                        {filterData?.highlights?.map((value, index) => (
                                                            <div key={index}
                                                                 className="flex items-center cursor-pointer">
                                                                <input
                                                                    type="checkbox"
                                                                    id={`highlight-${index}`}
                                                                    name="highlights"
                                                                    value={value.highlight}
                                                                    checked={highlights.includes(value.id)}
                                                                    onChange={() => highlightCheck(value.id)}
                                                                    className="cursor-pointer"
                                                                />
                                                                <label
                                                                    htmlFor={`highlight-${index}`}
                                                                    className="ml-2 text-[.9rem] font-[400] text-gray-500 cursor-pointer"
                                                                >
                                                                    {value.highlight}
                                                                </label>
                                                            </div>
                                                        ))}

                                                    </form>
                                                </div>
                                            )}
                                        </div>
                                        <div class="w-full border-gray-300  py-5 rounded-t border-b">
                                            <div
                                                onClick={() => setLanguagesOpen(!languagesOpen)}
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
                                                        {filterData?.languages?.map((value, index) => (
                                                            <div key={index}
                                                                 className="flex items-center cursor-pointer">
                                                                <input
                                                                    type="checkbox"
                                                                    id={`language-${index}`}
                                                                    name="languages"
                                                                    value={value.language}
                                                                    className="cursor-pointer"
                                                                    checked={languages.includes(value.id)}
                                                                    onChange={() => languageCheck(value.id)}
                                                                />
                                                                <label
                                                                    htmlFor={`language-${index}`}
                                                                    className="ml-2 text-[.9rem] font-[400] text-gray-500 cursor-pointer"
                                                                >
                                                                    {value.language}
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
                                                                    type="checkbox"
                                                                    id={`review-${index}`}
                                                                    name="review"
                                                                    value={value.name}
                                                                    className="cursor-pointer"
                                                                    checked={ratings.includes(value.value)}
                                                                    onChange={() => ratingCheck(value.value)}
                                                                />
                                                                <label
                                                                    for={`review-${index}`}
                                                                    className="ml-2 text-[.9rem] font-[400] text-gray-500"
                                                                >
                                                                    {value.name}
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
                                    {contractors?.length > 0 ?
                                        <>
                                            {paginatedData?.map((value, index) => (
                                                <div
                                                    key={index}
                                                    className="bg-[#F7F9FB] sm:p-4 p-1 flex max-md:flex-col items-center gap-5 mb-5"
                                                >
                                                    <div className="">
                                                        <Link
                                                            href={
                                                                `/profile/` +
                                                                value.company_name
                                                                    .replaceAll(" ", "-")
                                                                    .toLowerCase()
                                                            }
                                                        >
                                                            {value.cover ? (
                                                                <img
                                                                    src={`${IMAGE_PATH}${value.cover}`}
                                                                    className={`h-[250px] w-[250px] object-cover cursor-pointer`}
                                                                    alt={value?.company_name}
                                                                    height={250}
                                                                    width={550}
                                                                />
                                                            ) : (
                                                                <Image
                                                                    src={imgThumb}
                                                                    className={`h-[250px] w-[250px]`}
                                                                    alt={value?.company_name}
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
                                                                        value.company_name
                                                                            .replaceAll(" ", "-")
                                                                            .toLowerCase()
                                                                    }
                                                                >
                                                                    <img
                                                                        src={`${IMAGE_PATH}${value.image}`}
                                                                        alt={value?.company_name}
                                                                        className="sm:h-16 sm:w-16 h-auto w-36 cursor-pointer"
                                                                        href={
                                                                            `/profile/` +
                                                                            value.company_name
                                                                                .replaceAll(" ", "-")
                                                                                .toLowerCase()
                                                                        }
                                                                    />
                                                                </Link>
                                                            </div>
                                                            <div className="">
                                                                <h2 className="text-[1.2rem] md:text-lg font-[500] cursor-pointer">
                                                                    <Link
                                                                        href={
                                                                            `/profile/` +
                                                                            value.company_name
                                                                                .replaceAll(" ", "-")
                                                                                .toLowerCase()
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
                                                                    <div
                                                                        className="sm:ml-4 ml-0 flex items-center gap-1">
                                                                        {value.users > 0 ? (
                                                                            <>
                                                                                {" "}
                                                                                <MdStar
                                                                                    className="text-[#12937C] sm:text-[1.8rem] text-[1.2rem]"/>
                                                                                <span
                                                                                    className="sm:text-md text-sm font-[600]">
                                      {`${(value.ratings / value.users).toFixed(
                                          2
                                      )} / 5`}
                                    </span>
                                                                                <span
                                                                                    className={`${value.trust_seal ? 'ml-3' : ''}  ml-1 sm:text-md text-sm text-gray-500`}>
                                      {`(${value.users} Reviews)`}
                                    </span>
                                                                            </>
                                                                        ) : null}
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
                                                            <h4 className="text-[15px] font-[600] text-gray-700">
                                                                {value.skills}
                                                            </h4>
                                                            <h3
                                                                className="text-sm font-[500] text-gray-600 mt-3 text-ellipsis line-clamp-2"
                                                                dangerouslySetInnerHTML={{
                                                                    __html: value.description,
                                                                }}
                                                            ></h3>
                                                        </div>
                                                        <div className="flex justify-between w-full mt-2 ">
                                                            <h5 className="text-sm font-[500] text-gray-600">{value.name}</h5>
                                                            <Link
                                                                className="text-sm font-[600] text-[#12937C] "
                                                                href={
                                                                    `/profile/` +
                                                                    value.company_name
                                                                        .replaceAll(" ", "-")
                                                                        .toLowerCase()
                                                                }
                                                            >
                                                                Read More
                                                            </Link>
                                                        </div>
                                                        <div>
                                                            <Link
                                                                className="text-md font-[600] mt-1 cursor-pointer text-gray-700"
                                                                href={
                                                                    `/profile/` +
                                                                    value.company_name
                                                                        .replaceAll(" ", "-")
                                                                        .toLowerCase()
                                                                }
                                                            >
                                                                {value.projects} projects
                                                            </Link>
                                                        </div>
                                                        <button
                                                            className="py-2 px-5 mt-4 bg-[#12937C] text-white text-md rounded-[10px] text-opacity-70 cursor-pointer hover:bg-opacity-80 font-[600]">
                                                            Send Message
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}

                                            <ThemeProvider theme={theme}>
                                                <Stack direction="row" justifyContent="center" marginTop={2}>
                                                    <Pagination
                                                        count={Math.ceil(filteredData.length / itemsPerPage)}
                                                        page={currentPage}
                                                        onChange={handlePageChange}
                                                        color="primary"
                                                        renderItem={(item) => (
                                                            <PaginationItem
                                                                components={{
                                                                    previous: (props) => <button {...props}
                                                                                                 className="display-none"></button>,
                                                                    next: (props) => <button {...props}
                                                                                             className=" p-[4px] !bg-[#12937C] px-4 rounded-md">Next</button>,
                                                                }}
                                                                style={{
                                                                    paddingTop: '1.5rem',
                                                                    paddingBottom: '1.5rem',
                                                                    fontSize: '0.875rem',
                                                                    color: '#333',
                                                                    padding: '15px'
                                                                }}
                                                                {...item}
                                                            />
                                                        )}

                                                    />
                                                </Stack>
                                            </ThemeProvider>
                                        </>
                                        :
                                        <div
                                            className="lg:w-[75%] w-full max-md:mt-5 gap-2 m-auto border-2 p-4 py-8 rounded-sm">
                                            <h1 className="text-center text-gray-600 font-[500]">No contractor
                                                available </h1>
                                            <h1 className="text-center text-gray-600 font-[500] mt-4">Are you
                                                a {category?.name} pro, click the button below to register as
                                                a {category?.name} professional.</h1>
                                            <button
                                                onClick={() => location.push('/join-us')}
                                                className="py-1 px-5 mt-4 bg-[#12937C] text-white text-[15px] rounded-[10px] w-full cursor-pointer hover:bg-opacity-80 font-[550]"
                                            >
                                                Join us as a Home pro
                                            </button>

                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className="bg-[#F7F9FB] md:px-[4rem] px-6 py-10  ">
                            <div className="max-w-[1100px] justify-center mx-auto">
                                <h5 className="sm:text-[1.8rem] text-2xl font-[600] ">
                                    Featured Reviews for {category?.name} in {city?.name}
                                </h5>

                                <div className="grid lg:grid-cols-2 gap-5 sm:mt-[3rem] mt-3">
                                    {paginatedDataReview?.map((value, index) => (
                                        <div
                                            key={index}
                                            className="bg-white sm:px-5 sm:py-8 py-4 rounded-xl  "
                                        >
                                            <div className="flex gap-5">

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
                                                " {value.review} "
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <ThemeProvider theme={theme}>
                                <Stack direction="row" justifyContent="center" marginTop={2}>
                                    <Pagination
                                        count={Math.ceil(reviews.length / itemsPerPageReviews)}
                                        page={currentPageReviews}
                                        onChange={handlePageChangeReviews}
                                        color="primary"
                                        renderItem={(item) => (
                                            <PaginationItem
                                                components={{
                                                    previous: (props) => <button {...props}
                                                                                 className="display-none"></button>,
                                                    next: (props) => <button {...props}
                                                                             className=" p-[4px] !bg-[#12937C] px-4 rounded-md">Next</button>,
                                                }}
                                                style={{
                                                    paddingTop: '1.5rem',
                                                    paddingBottom: '1.5rem',
                                                    fontSize: '0.875rem',
                                                    color: '#333',
                                                    padding: '15px'
                                                }}
                                                {...item}
                                            />
                                        )}

                                    />
                                </Stack>
                            </ThemeProvider>
                        </div>
                    </div>
                </>
            )}
            <Footer showNewsLetter={false} postProject={false}/>
        </>
    );
};

export default Page;
