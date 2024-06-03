"use client";
import React, {useState, useEffect, useRef} from "react";
import Header from "../../components/Header";
import Image from "next/image";
import categoryService from "../../api/services/categoryService";
import {IMAGE_PATH} from "../../api/BaseUrl";
import "../../style/Home.css";
import {FaAngleDown, FaAngleUp} from "react-icons/fa";
import {Footer} from "@/components/Footer";
import Link from "next/link";
import searchIcon from "/public/assets/newImages/search-svgrepo-com.svg";
import {GrLocation} from "react-icons/gr";
import {IoSearch} from "react-icons/io5";
import trustsealing from '/public/assets/trustsealbadge.png'
import {FaArrowRight} from "react-icons/fa";
import {useRouter} from 'next/navigation'
import Head from 'next/head';
import { usePathname } from 'next/navigation'


import {
    Pagination,
    Stack,
    ThemeProvider,
    createTheme,
    PaginationItem
} from "@mui/material";




const Page = () => {

    const [data, setData] = useState([])
    const pathname = usePathname()

    const navigation = useRouter()

    useEffect(() => {
        const fetchContractors = async () => {
            try {
                const response = await categoryService.fetchAllTopContractors();
                console.log('response of fetch contractors', response);
                setData(response?.categories)
            } catch (error) {
                console.error('Error fetching contractors:', error);
            }
        }
        fetchContractors();
    }, []);

    console.log('contractors', data)



    const itemsPerPage = 9;
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };

    const [paginatedData, setPaginatedData] = useState([]);

    useEffect(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        setPaginatedData(data.slice(startIndex, endIndex));
    }, [currentPage, data]);

    const theme = createTheme({palette: {primary: {main: '#E0EFEE', contrastText: '#EEE'}}})


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
            <div className="mt-[7rem]">
                <div className="main-title mt-[6rem] ml-8 my-8 sm:ml-16">
                    <h1 className="text-[18px]"><span className="cursor-pointer" onClick={() => navigation.push('/')}> Helperzz </span>  / Top Contractors</h1>
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
                                <button
                                    className="bg-[#129DED] text-white px-3 text-[8px] sm:text-[14px] sm:px-5 h-[45px] rounded-[20px] ml-2">
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <div className="max-w-[1100px] m-auto my-10 max-md:w-[80%]">

                <div>
                    {paginatedData?.map((value, index) => (
                        <div key={index} className="mt-4">

                            {value?.contractors?.length > 0 && (
                                <div key={index} className="flex justify-between">
                                    <h1 className="text-xl text-gray-800 font-[500]">
                                        {value.name}
                                    </h1>
                                    <div className="bg-[#E7F4F2] flex items-center gap-2 px-2 py-[4px] " onClick={() =>
                                        navigation.push(
                                            "/top-contractors/" +
                                            value.name.replaceAll(" ", "-").toLowerCase()
                                        )
                                    }>
                                        <h1>See more</h1>
                                        <FaArrowRight/>
                                    </div>
                                </div>
                            )}

                            <div className="grid grid-cols-4 max-md:grid-cols-1 gap-6 mt-4 ">

                                {value?.contractors?.slice(0, 4).map((item) => (
                                    <div key={item.id} className="flex">
                                        <div className=" w-full">
                                            <div
                                                className="py-3 px-2 mr-2 mb-2 border-primary border rounded-3xl relative cursor-pointer"
                                                onClick={() =>
                                                    navigation.push(
                                                        "/profile/" +
                                                        item.company_name.replaceAll(" ", "-").toLowerCase()
                                                    )
                                                }
                                            >
                                                <div className="h-[280px] items-start select-text">
                                                    <div className="flex p-3">
                                                        <a className="inline-flex">
                                                            <img
                                                                alt="blog"
                                                                src={`https://api.helperzz.com/public/uploads/${item.image}`}
                                                                className="h-16 w-16 rounded-full flex-shrink-0 object-cover object-center"
                                                            />
                                                            <span className="flex-grow flex flex-col pl-2 items-center">
                    <span className="text-lg font-semibold text-gray-900 line-clamp-1 text-ellipsis">
                      {item.company_name}
                    </span>
                    <span className="font-normal text-sm text-gray-900">
                      {item.category_name}
                    </span>
                  </span>
                                                        </a>
                                                        {value.trust_seal === 1 && (
                                                            <Image
                                                                src={trustsealing}
                                                                width={120}
                                                                height={20}
                                                                alt="trustSeal badge"
                                                                className="mt-2"
                                                            />

                                                        )}

                                                        <div
                                                            className="text-primary absolute text-sm mt-24 font-bold mb-8 flex flex-wrap gap-x-4">
                                                            {item.skills.split(",").map((skill, index) => (
                                                                <span key={index}>{skill}</span>
                                                            ))}
                                                        </div>
                                                        <Link
                                                            href="/create-project"
                                                            className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-[70%] text-xs mt-3 cursor-pointer hover:bg-primary hover:text-white transition-none text-text mb-2 min-w-55 justify-center px-3 py-3 rounded-2xl font-bold bg-transparent border-primary border inline-flex items-center mx-auto"
                                                        >
                                                            Get A Free Quote
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                </div>
            </div>

            <ThemeProvider theme={theme}>
                <Stack direction="row" justifyContent="center" marginTop={2}>
                    <Pagination
                        count={Math.ceil(data?.length / itemsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                        renderItem={(item) => (
                            <PaginationItem
                                components={{
                                    previous: (props) => <button {...props} className="display-none"></button>,
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

            <div className="mt-[5rem]">
                <Footer/>
            </div>
        </>
    );
};

export default Page;
