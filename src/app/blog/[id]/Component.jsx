

'use client'
import Header from "@/components/Header";
import {Footer} from "@/components/Footer";
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
import {useRouter} from "next/navigation"
import Head from 'next/head';
import { usePathname } from 'next/navigation'

const Component = ({params}) => {

    const pathname = usePathname()


    const [ID, setID] = useState()
    const [blog, setBlog] = useState()

    const navigation = useRouter()

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
            <div className="flex flex-col gap-5 lg:gap-10 py-44 justify-center items-center min-h-[100vh] ">
                <div className='flex flex-col gap-7 w-full'>
                    <h6 className="text-lg w-full mx-auto max-md:ml-4  max-w-[1300px] px-10 max-md:px-0 mx-auto"><span onClick={() => navigation.push('/')} className="cursor-pointer" > Helperzz </span> / <span  className="cursor-pointer" onClick={() => navigation.push('/blog')}> Blog  /</span> <span className="cursor-pointer">{blog?.title}</span></h6>
                    <div className="flex justify-between bg-[#E8F5F2] rounded-xl w-full max-w-[1300px] px-10 max-md:px-0 mx-auto">
                        <div className='flex justify-between max-w-[97%] mx-auto w-full  py-10 px-4'>
                            <div className="flex flex-col gap-3">
                                <h3 className="font-bold text-3xl max-w-2xl leading-relaxed">{blog?.title}</h3>
                                <p className="text-xl font-[400] -mt-4">By <Link className="inline text-black" href='#'>{blog?.author}</Link></p>
                                <p className="text-xl font-[400] ">Updated {moment(blog?.created_date).format("ll")}</p>
                            </div>
                        </div>

                    </div>
                    <div className="flex flex-wrap lg:flex-nowrap gap-5 w-full  max-w-[1300px] px-10 max-md:px-0 mx-auto">
                        <div className="flex text-lg flex-col gap-3 lg:w-[60%] w-screen p-4">
                            {/* <h4 className="font-bold text-2xl">{blog?.subtitle}</h4> */}
                            <div className='relative w-full max-h-[600px]'>
                                <img src={`${IMAGE_PATH}${blog?.image}`} className="object-cover rounded-xl" fill alt='Blog Image'/>
                            </div>
                            <p className='font-[400] !text-black' dangerouslySetInnerHTML={{
                                __html: blog?.content,
                            }}/>
                        </div>
                        <div className='relative flex flex-col lg:w-[40%] w-full gap-10 -mt-24'>
                            <GetQuotes/>
                            <MoreBlogs category={blog?.category} id={blog?.id}/>
                        </div>
                    </div>
                </div>
            </div>
            <Footer showNewsLetter={false}   postProject={false} />
        </>

    )
}

const quotes_schema = object({
    category: string().required().label('Business Name'),
    postal_code: string().matches('/^[A-Z]\d[A-Z] \d[A-Z]\d$/', 'Invalid Postal Code').label('Postal Code').required(),
});
export const GetQuotesForm = (props) => {
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
    )
}


export const GetQuotes = (props) => {

    const navigation = useRouter()

    return (
        <div className="sticky top-10 mr-4 ml-auto flex flex-col gap-5 lg:w-[80%] w-full bg-secondary text-white rounded-3xl p-8">
            <h1 className="text-left font-bold text-[20px] capitalize ">
                Ready to start this project?
            </h1>
            <p className="font-medium">Find top local pros.</p>
            <button onClick={() => navigation.push('/create-project')}
                type="submit"
                className="bg-white text-black  w-full hover:bg-opacity-70 font-semibold p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-white"
            >
                Get Quotes
            </button>
        </div>
    )
}

export const GuideCard = (props) => {
    return (
        <div className="p-6">
            <div className="h-full rounded-lg overflow-hidden select-text">
                <img
                    className="object-cover h-[300px] object-center rounded-3xl"
                    src={`/cali-constructions.png`}
                    alt="blog"
                />
                <div className="py-4">
                    <h2 className="title-font text-base font-semibold text-gray-900  select-text">
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

export const BlogCard = ({blog, id}) => {
    return (
        <div className="flex bg-secondary rounded-3xl bg-opacity-10 overflow-hidden select-text">
            <img
                className="object-cover w-[40%] h-[250px] object-center rounded-3xl"
                src={`${IMAGE_PATH}${blog?.image}`}
                alt="blog"
            />
            <div className="flex-1 flex flex-col gap-5 p-3">
                <h2 className="title-font text-lg font-bold text-gray-900 select-text">
                    {blog?.title}
                </h2>
                <div className="flex justify-between -mt-2">
                    <p className="text-sm text-[#26262699]">{blog?.author}</p>
                    <p className="text-sm text-[#26262699]">{moment(blog?.created_date).format("ll")}</p>
                </div>
                <p className="text-sm mb-3 overflow-ellipsis select-text text-gray-600">
                    {blog?.subtitle}
                </p>
                <a href='' className="text-secondary text-sm font-bold transition-all inline-flex items-center md:mb-2 lg:mb-0 sm:w-auto w-full sm:justify-start justify-center">
                    Read more
                </a>
            </div>
        </div>
    )
}

export const MoreBlogs = ({category, id}) => {
    const [blogs, setBlogs] = useState([])


    const getBlogs = async () => {
        try {
            const response = await blogService.fetchRelated(category);
            setBlogs(response.blogs);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (category) {
            getBlogs();
        }
    }, [category]);
    return (
        <div className="flex flex-col gap-5 w-full p-4">
            <h4 className="font-bold text-2xl">You may also like</h4>
            {
                blogs.slice(0,5).map((blog, i) => (
                    <>
                        {blog.id !== id ?
                                <BlogCard key={i} blog={blog}/>
                                : ''
                        }
                    </>
                ))
            }
        </div>
    )
}
export default Component
