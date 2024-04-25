'use client'
import Header from "@/components/Header";
import Link from "next/link";
import Image from "next/image";
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {object, string} from 'yup';
import contractorService from "@/api/services/contractorService";
import blogService from "@/api/services/blogService";
import {useEffect, useState} from "react";
import moment from "moment";
import {IMAGE_PATH} from "@/api/BaseUrl";

const Page = ({params}) => {

    const [ID, setID] = useState()
    const [blog, setBlog] = useState()

    useEffect(() => {
        setID(params.id);
    }, []);

    const getBlog = async () => {
        try {
            const response = await blogService.fetchByTag(ID);
            setBlog(response.blog);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (ID) {
            getBlog();
        }
    }, [ID]);

    return (
        <>
            <Header/>
            <div className="flex flex-col gap-5 lg:gap-10 py-44 justify-center items-center bg-gray-100 min-h-[100vh] ">
                <div className="flex flex-wrap lg:flex-nowrap gap-5 w-full max-w-[1500px] mx-auto">
                    <div className="flex text-lg flex-col gap-10 lg:w-[72%] w-screen p-4">
                        <div className=''>
                            <h4 className="font-bold text-2xl">{blog?.title}</h4>
                            <div className="flex items-center gap-5 text-sm text-gray-600">
                                <p>Written by <Link className="inline text-black" href='#'>{blog?.author}</Link></p>
                                <div className='w-0.5 h-4 bg-gray-800'/>
                                <p>{moment(blog?.created_date).format("ll")}</p>
                            </div>
                        </div>
                        <div className='relative w-full h-[600px]'>
                            <img src={`${IMAGE_PATH}${blog?.image}`} className="object-cover" fill alt='Blog Image'/>
                        </div>
                        <p className={``} dangerouslySetInnerHTML={{
                            __html: blog?.content,
                        }}/>
                    </div>
                    <div className="flex flex-col gap-5 lg:w-[28%] w-full mt-20">
                        <GetQuotesForm/>
                        <GuideCard/>
                        <GuideCard/>
                    </div>
                </div>
            </div>
            <footer class="text-gray-800 bg-[#E8E8E8] body-font">
                <div
                    class="container px-14 sm:px-0 sm:py-24 mx-auto flex  md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
                    <div class="flex-grow flex flex-wrap  -mb-10 md:mt-0 mt-10 md:text-left  text-left">
                        <div class="footer_col_1 lg:w-1/4 md:w-1/2 w-full px-8">
                            <h2 class="title-font font-bold text-gray-900 text-base mb-3 text-transform: uppercase">
                                Homeowners
                            </h2>
                            <nav class="list-none mb-10">
                                <li>
                                    <a class="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Browse Categories
                                    </a>
                                </li>
                                <li>
                                    <a class="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Browse Tasks
                                    </a>
                                </li>
                                <li>
                                    <a class="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Write A Review
                                    </a>
                                </li>
                                <li>
                                    <a class="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a class="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Homeowner FAQ
                                    </a>
                                </li>
                                <li>
                                    <a class="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Review Guidelines
                                    </a>
                                </li>
                                <li>
                                    <a class="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Homeowner Trust
                                    </a>
                                </li>
                            </nav>
                        </div>
                        <div class="lg:w-1/4 md:w-1/2 w-full">
                            <h2 class="title-font font-bold text-gray-900 text-base mb-3">
                                CONTRACTORS
                            </h2>
                            <nav class="list-none mb-10">
                                <li>
                                    <a class="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Join Helperzz
                                    </a>
                                </li>
                                <li>
                                    <a class="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Home Professional FAQ
                                    </a>
                                </li>
                                <li>
                                    <a class="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Building Trust
                                    </a>
                                </li>
                                <li>
                                    <a class="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Home Professional Terms
                                    </a>
                                </li>
                            </nav>
                        </div>
                        <div class="lg:w-1/4 md:w-1/2 w-full">
                            <h2 class="title-font font-bold text-gray-900 text-base mb-3">
                                HELPERZZ
                            </h2>
                            <nav class="list-none mb-10">
                                <li>
                                    <a class="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a class="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Careers at Helperzz
                                    </a>
                                </li>
                                <li>
                                    <a class="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Careers at Helperzz
                                    </a>
                                </li>
                                <li>
                                    <a class="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Contact Us
                                    </a>
                                </li>
                                <li>
                                    <a class="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Terms of Use
                                    </a>
                                </li>
                                <li>
                                    <a class="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Privacy{" "}
                                    </a>
                                </li>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="text-center  text-base text-transform: uppercase font-bold text-text">
                    Helperzz.com
                </div>
                <p className="text-center text-sm  pb-4">2024</p>
            </footer>
        </>

    )
}

const quotes_schema = object({
    category: string().required().label('Business Name'),
    postal_code: string().matches('/^[A-Z]\d[A-Z] \d[A-Z]\d$/', 'Invalid Postal Code').label('Postal Code').required(),
});
const GetQuotesForm = (props) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: {errors,},
    } = useForm({
        resolver: yupResolver(quotes_schema),
    });
    const onSubmit = (data) => {
    }
    return (
        <div className="p-6 ">
            <div className="lg:col-span-5">
                <form className="bg-secondary bg-opacity-10 rounded-2xl p-6 md:p-8">
                    <h1 className="text-center font-bold pb-6 text-[20px] capitalize">
                        Get Quotes From Reviewed Pros
                    </h1>
                    <div className="mb-5">

                    </div>
                    <div className="flex flex-col mb-5">
                        <select
                            name=""
                            id=""
                            className="w-full bg-white border border-[#43D9BE] rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#43D9BE]"
                            {...register("category")}
                        >
                            <option value="">Select Category</option>
                        </select>
                        {errors.category && (
                            <span className="text-sm text-red-500">
                    {errors.category.message}
                  </span>
                        )}
                    </div>
                    <div className="flex flex-col mb-5">
                        <input
                            type="text"
                            id="zip"
                            placeholder="Zip Code"
                            name="zip"
                            className={
                                "w-full bg-white border border-[#43D9BE] rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#43D9BE]"
                            }
                            {...register('postal_code')}

                        />
                        {errors.postal_code && (
                            <span className="text-sm text-red-500">
                    {errors.postal_code.message}
                  </span>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="bg-secondary  w-full hover:bg-opacity-70 text-white font-semibold p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-white"
                    >
                        Get Quotes
                    </button>
                </form>
            </div>
        </div>
    )
}


const GuideCard = (props) => {
    return (
        <div className="p-6">
            <div className="h-full rounded-lg overflow-hidden select-text">
                <img
                    className="object-cover h-[300px] object-center rounded-3xl"
                    src={`/cali-constructions.png`}
                    alt="blog"
                />
                <div className="py-4">
                    <h2 className="title-font text-base font-semibold text-gray-900 mb-3 select-text">
                        Successful Contractor Life
                    </h2>
                    <p className="text-sm mb-3 overflow-hidden whitespace-nowrap overflow-ellipsis select-text">
                        How to be a Successful Contractor
                    </p>

                    <div className="flex items-center flex-wrap">
                        <a className="text-primary w-[35%] sm:w-[70%] border text-sm px-4 py-2 rounded-2xl font-bold border-primary hover:bg-primary transition-all hover:text-white inline-flex items-center md:mb-2 lg:mb-0 sm:w-auto w-full sm:justify-start justify-center">
                            Read more
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page
