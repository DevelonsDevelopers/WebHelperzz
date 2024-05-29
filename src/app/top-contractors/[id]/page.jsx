"use client";
import React, { useState, useEffect, useRef } from "react";
import Header from "../../../components/Header";
import Image from "next/image";
import contractorService from "../../../api/services/contractorService";
import categoryService from "../../../api/services/categoryService";
import cityService from "../../../api/services/cityService";
import { IMAGE_PATH } from "../../../api/BaseUrl";
import "../../../style/Home.css";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { Footer } from "@/components/Footer";
import Link from "next/link";
import searchIcon from "/public/assets/newImages/search-svgrepo-com.svg";
import { GrLocation } from "react-icons/gr";
import { IoSearch } from "react-icons/io5";
 import trustsealing from '/public/assets/trustsealbadge.png';
 import { useRouter } from 'next/navigation';
 import Autosuggest from "react-autosuggest";
 import Head from 'next/head';
 import { usePathname } from 'next/navigation'

import {
  Pagination,
  Stack,
  ThemeProvider,
  createTheme,
  PaginationItem
} from "@mui/material";


const rating = [{value:'1' , name:'1 Star'} ,{value:'2' , name:'2 Star'} ,{value:'3' , name:'3 Star'} ,{value:'4' , name:'4 Star'} ,{value:'5' , name:'5 Star'} , ]


const Page = ({params}) => {

  const [categoryOpen, setCategoryOpen] = useState(true);
  const [bussinessHighlightsOpen, setBussinessHighlightsOpen] = useState(true);
  const [languagesOpen, setLanguagesOpen] = useState(true);
  const [ratingOpen, setRatingOpen] = useState(true);

  const [filterData, setFilterData] = useState();
  const [contractors , setContractors] = useState([])
  const [category , setCategory] = useState()

  const [categorySearch , setCategorySearch] = useState('')
  const pathname = usePathname()



  const navigation = useRouter()

  
  useEffect(() => {
    const getCategoryByTag = async () => {
      try {
        const response = await categoryService.fetchByTag(params.id);
        setCategory(response.category);
      } catch (error) {
      console.error(error);
    }
  };
  getCategoryByTag()
},[])


  useEffect(() => {
    const fetchActive = async () => {
      const response = await contractorService.fetchAllActive()
      console.log('response' , response)
      setContractors(response?.contractors)
    }
    fetchActive()
  },[])

  useEffect(() => {
    const fetchFilter = async () => {
      const response = await contractorService.filters().then((res) =>{
        setFilterData(res?.data)
      })
    }
    fetchFilter()
  },[])



  const itemsPerPage = 9;
const [currentPage, setCurrentPage] = useState(1);
const handlePageChange = (event, newPage) => {
  setCurrentPage(newPage);
};

const [paginatedData, setPaginatedData] = useState([]);

useEffect(() => {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const filteredData = contractors.filter(value => value?.category_name === category?.name);
  setPaginatedData(filteredData.slice(startIndex, endIndex));
}, [currentPage, contractors, category?.name]); 



  const theme = createTheme({ palette: { primary: { main: '#E0EFEE', contrastText: '#EEE' } } })

  const handleRadioChange = (e) => {
    const {value} = e.target;
    navigation.replace(`/top-contractors/${e.target.value.replaceAll(" ", "-").replaceAll("/", "-").toLowerCase()}`)
};


const [inputCity, setInputCity] = useState("");

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
},[])


const getCitySuggestions = (inputValue) => {
    const inputValueLowerCase = inputValue.trim().toLowerCase();
    return cities.filter(
      (city) =>
        city.name.toLowerCase().includes(inputValueLowerCase) ||
        city.tag.toLowerCase().includes(inputValueLowerCase)
    );
  };

const onCitySuggestionsFetchRequested = ({ value }) => {
    const suggestions = getCitySuggestions(value);
    setCitySuggestions(suggestions);
    setCitySelectedOption(value);
   };

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

      <Header />
      <div className="mt-[7rem]">
          <div className="main-title mt-[6rem] ml-8 my-8 sm:ml-16">
        <h1 className="text-[18px]">Helperzz / {category?.name}</h1>
      </div>
      <div className="w-full bg-[#12937C] flex justify-center ">
      <div className="search-container  h-[204px] width-100 flex flex-col justify-center items-center ">
        <div className="search-text">
          <h1 className="text-[20px]  sm:text-[28px] font-[500] mb-5 text-[white] text-center">
            Search Top Contractor
          </h1>
        </div>
        <div className="search-input">
          <div className="relative bg-white rounded-[20px] shadow-md h-[45px] flex items-center">
            <div className="mr-2 pl-3 sm:pl-6">
              <Image
                src={searchIcon}
                alt="Search Icon"
                width={20}
                height={20}
              />
            </div>
            <input
              type="text"
              placeholder="Search By Category"
              className="focus:outline-none flex-grow text-black text-[10px] sm:text-[16px]   sm:w-[350px]"
            />
            <div className="bg-[#129DED] text-white px-3 text-[8px] sm:text-[14px] sm:px-5 py-[13px] rounded-[20px] ml-2">
              Search
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="max-w-[1200px] m-auto my-10">
      <p className="text-[2rem] text-gray-900 font-[600] max-md:text-center ">{category?.name}</p>
      <p className="text-sm text-gray-600 font-[400] max-w-[600px] max-md:text-center ">Some projects are just better left for the professionals - hire {category?.details} .</p>
    </div>

<div className="flex max-w-[1200px] gap-8 m-auto">
<div className="w-[25%] max-md:hidden ">
                  <div className="bg-[#DBF0FC] p-4 rounded-lg ">
                    <h5 className="text-[1.3rem] font-[600] ">Location</h5>

                    
 <Autosuggest
                    suggestions={citySuggestions?.slice(0,10)}
                    onSuggestionsFetchRequested={onCitySuggestionsFetchRequested}
                    onSuggestionsClearRequested={() => setCitySuggestions([])}
                    getSuggestionValue={(suggestion) => suggestion.name}
                    renderSuggestion={(suggestion) => (
                      <div className=" p-2 border-[.5px] z-2 border-gray-200 bg-[#F7F9FB] sm:text-xs text-gray-800 bg-white cursor-pointer">
                        {suggestion.name}
                      </div>
                    )}
                    inputProps={{
                      placeholder: 'Toronto ||',
                      value: inputCity, 
                      onChange: (_, { newValue }) => setInputCity(newValue),
                      className: 'placeholder:text-[#696969] z-2 text-[#696969] bg-[#F7F9FB] font-normal py-2 rounded-md sm:text-xs ml-2 h-full outline-none w-full mt-2 pl-4',
                    }}
                  />
                    <div
                      // onClick={handleCitySubmit}
                      className="py-1 px-5 mt-4 bg-[#3F9DED] text-white text-[15px] rounded-[10px] w-full cursor-pointer hover:bg-opacity-80 font-[550]"
                    >
                      Filter City
                    </div>
                  </div>
                  <div className="bg-[#DBF0FC] p-2 rounded-lg mt-5">
                     
                    <div class="w-full border-gray-300  py-5 rounded-t border-b">
                      <div
                        onClick={() => setCategoryOpen(!categoryOpen)}
                        class="mb-3 p-1 flex items-center  rounded transition-all ease-in-out duration-500 "
                      >
                        <div class="p-1 text-lg md:text-md font-[500] w-full text-gray-800 cursor-pointer">
                          Professional Category
                        </div>
                        <div class="text-black w-8 py-1 pl-2 pr-1  flex items-center">
                          {categoryOpen ? (
                            <button class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                              <FaAngleUp />
                            </button>
                          ) : (
                            <button class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                              <FaAngleDown />
                            </button>
                          )}
                        </div>
                      </div>
                      <div className="w-[100%] max-md:w-[100%]">
                        <input
                          type="search"
                          value={categorySearch}
                          onChange={(e) => setCategorySearch(e.target.value)}
                          className="bg-white border-[1px] border-gray-400 py-1 px-4 rounded-xl focus:outline-none w-full pl-10 placeholder:text-xs max-md:rounded-lg"
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
                                                        {filterData?.categories?.filter(value =>
    value.name.toLowerCase().includes(categorySearch.toLowerCase())
  ).map((value, index) => (
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
                    </div>
                  
                    <div class="w-full border-gray-300  py-5 rounded-t border-b">
                      <div
                        onClick={() => setBussinessHighlightsOpen(!bussinessHighlightsOpen)}
                        class="mb-3 p-1 bg-transparent flex items-center  rounded transition-all ease-in-out duration-500 "
                      >
                        <div class="p-1 px-2 text-[1.2rem] font-[500] w-full text-gray-800 cursor-pointer">
                          Business Highlights
                        </div>
                        <div class="text-black w-8 py-1 pl-2 pr-1  flex items-center">
                          {bussinessHighlightsOpen ? (
                            <button class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                              <FaAngleUp />
                            </button>
                          ) : (
                            <button class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                              <FaAngleDown />
                            </button>
                          )}
                        </div>
                      </div>
                      {bussinessHighlightsOpen && (
                        <div class="w-full items-center flex mx-3 -mt-1">
                          <form action="" className="flex flex-col gap-2">
                          {filterData?.highlights?.map((value, index) => (
  <div key={index} className="flex items-center cursor-pointer">
    <input
      type="checkbox"
      id={`highlight-${index}`} 
      name="highlights"
      value={value.highlight}
      // onChange={handleCheckboxChange} 
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
                        <div class="p-1 px-2 text-[1.2rem] font-[500] w-full text-gray-800 cursor-pointer">
                          Languages
                        </div>
                        <div class="text-black w-8 py-1 pl-2 pr-1  flex items-center">
                          {languagesOpen ? (
                            <button class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                              <FaAngleUp />
                            </button>
                          ) : (
                            <button class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                              <FaAngleDown />
                            </button>
                          )}
                        </div>
                      </div>
                      {languagesOpen && (
                        <div class="w-full items-center flex mx-3 -mt-1">
                          <form action="" className="flex flex-col gap-2">
                          {filterData?.languages?.map((value, index) => (
  <div key={index} className="flex items-center cursor-pointer">
    <input
      type="checkbox"
      id={`language-${index}`}
      name="languages"
      value={value.language}
      className="cursor-pointer"
      // onChange={handleCheckboxChange} 
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
                        onClick={() => setRatingOpen(!ratingOpen)}
                        class="mb-3 p-1 bg-transparent flex items-center  rounded transition-all ease-in-out duration-500 "
                      >
                        <div class="p-1 px-2 text-[1.2rem] font-[500] w-full text-gray-800 cursor-pointer">
                          Rating
                        </div>
                        <div class="text-black w-8 py-1 pl-2 pr-1  flex items-center">
                          {ratingOpen ? (
                            <button class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                              <FaAngleUp />
                            </button>
                          ) : (
                            <button class="cursor-pointer w-6 h-6 text-gray-600 outline-none focus:outline-none">
                              <FaAngleDown />
                            </button>
                          )}
                        </div>
                      </div>
                      {ratingOpen && (
                        <div class="w-full items-center flex mx-3 -mt-1">
                          <form action="" className="flex flex-col gap-2">
                            {rating?.map((value, index) => (
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
                                  // onChange={handleRadioChange}
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

<div className="w-[75%] max-md:w-[80%] max-md:m-auto">


{paginatedData?.length > 0 ?
<>
<div className="grid grid-cols-3 max-md:grid-cols-1 gap-4 max-w-[1000px]">
{paginatedData?.map((value, index) => (
    <div key={index} className='border-2 border-[#64B6E3] p-4 rounded-xl flex flex-col min-h-[300px] bg-[#F7F9FB] '>
      <div className="flex gap-4">
        <img src={`${IMAGE_PATH}${value?.image}`} alt={value?.company_name} className="w-12 h-12 rounded-full" />
        <div className='mt-2'>
          <h1 className='font-semibold text-sm'>{value?.company_name}</h1>  
          <h1 className=' text-xs mt-2 font-[500] text-gray-600'>{value?.category_name}</h1> 
        </div>
        
      </div>
      {value.trust_seal === 1 && (
        <Image
             src={trustsealing}
             width={120}
             height={20}
             alt="trustSeal badge"
             className="mt-2"
          />

      )}
      <div className='mt-4 flex flex-wrap gap-2 mb-6'>
      {value?.skills?.split(',').map((skill, index) => (
  <h1 key={index} className='font-medium text-[15px] text-[#119DED] font-[700] ml-2'>{skill.trim()}</h1>
))}
      </div>
      <div className='flex-grow'></div>
      <button className='font-semibold hover:bg-primary  text-sm px-4 max-md:mt-2 py-2 rounded-xl bg-white capitalize shadow-sm relative border-[1px] border-[#119DED] hover:border-[#B7E2FA] hover:text-white ml-auto mr-auto'>
        Get a free quote
      </button>
    </div>
))}

</div>
<ThemeProvider theme={theme}>
        <Stack direction="row" justifyContent="center" marginTop={2}>
          <Pagination
            count={Math.ceil(paginatedData.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
            renderItem={(item) => (
              <PaginationItem
              components={{
                previous: (props) => <button {...props} className="display-none"> </button>,
                next: (props) => <button {...props} className=" p-[4px] !bg-[#12937C] px-4 rounded-md" >Next</button>,
              }}
              style={{    
              paddingTop: '1.5rem',
              paddingBottom: '1.5rem',
              fontSize: '0.875rem', 
              color: '#333', 
            padding:'15px'
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
                                                onClick={() => navigation.push('/join-us')}
                                                className="py-1 px-5 mt-4 bg-[#12937C] text-white text-[15px] rounded-[10px] w-full cursor-pointer hover:bg-opacity-80 font-[550]"
                                            >
                                                Join us as a Home pro
                                            </button>

                                        </div>
}
</div>


</div>

      </div>
      <div className="mt-[5rem]">
      <Footer />
        </div>
    </>
  );
};

export default Page;
