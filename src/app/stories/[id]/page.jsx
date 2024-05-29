'use client'
import Header from "@/components/Header";
import Link from "next/link";
import blogService from "@/api/services/blogService";
import {useEffect, useState} from "react";
import moment from "moment";
import {IMAGE_PATH} from "@/api/BaseUrl";
import Head from 'next/head';
import { usePathname } from 'next/navigation'

const Page = ({params}) => {

    const [ID, setID] = useState()
    const [story, setStory] = useState()
    const pathname = usePathname()

    useEffect(() => {
        setID(params.id);
    }, []);

    const getStory = async () => {
        try {
            const response = await blogService.fetchByTag(ID);
            setStory(response.blog);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (ID) {
            getStory();
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
                    <h6 className="text-lg max-w-[1300px] w-full mx-auto">Helperzz / Blog</h6>
                    <div className="flex justify-between bg-[#F7F9FB] w-full max-w-[1500px] mx-auto">
                        <div className='flex justify-between max-w-[1300px] mx-auto w-full  py-10 px-4'>
                            <div className="flex flex-col gap-3">
                                <h3 className="font-bold text-3xl max-w-2xl leading-relaxed">{story?.title}</h3>
                                <p>By <Link className="inline text-black" href='#'>{story?.author}</Link></p>
                                <p>Updated {moment(story?.created_date).format("ll")}</p>
                            </div>
                            <GetQuotes/>
                        </div>

                    </div>
                    <div className="flex flex-wrap lg:flex-nowrap gap-5 w-full max-w-[1300px] mx-auto">
                        <div className="flex text-lg flex-col gap-3 lg:w-[60%] w-screen p-4">
                            <h4 className="font-bold text-2xl">{story?.subtitle}</h4>
                            <div className='relative w-full h-[600px]'>
                                <img src={`${IMAGE_PATH}${story?.image}`} className="object-cover" fill alt={story?.subtitle}/>
                            </div>
                            <p className={``} dangerouslySetInnerHTML={{
                                __html: story?.content,
                            }}/>
                        </div>
                        <MoreStories/>
                    </div>
                </div>
            </div>
            <footer className="text-gray-800 bg-[#E8E8E8] body-font">
                <div
                    className="container px-14 sm:px-0 sm:py-24 mx-auto flex  md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
                    <div className="flex-grow flex flex-wrap  -mb-10 md:mt-0 mt-10 md:text-left  text-left">
                        <div className="footer_col_1 lg:w-1/4 md:w-1/2 w-full px-8">
                            <h2 className="title-font font-bold text-gray-900 text-base mb-3 text-transform: uppercase">
                                Homeowners
                            </h2>
                            <nav className="list-none mb-10">
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Browse Categories
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Browse Tasks
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Write A Review
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Homeowner FAQ
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Review Guidelines
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Homeowner Trust
                                    </a>
                                </li>
                            </nav>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 w-full">
                            <h2 className="title-font font-bold text-gray-900 text-base mb-3">
                                CONTRACTORS
                            </h2>
                            <nav className="list-none mb-10">
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Join Helperzz
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Home Professional FAQ
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Building Trust
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Home Professional Terms
                                    </a>
                                </li>
                            </nav>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 w-full">
                            <h2 className="title-font font-bold text-gray-900 text-base mb-3">
                                HELPERZZ
                            </h2>
                            <nav className="list-none mb-10">
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Careers at Helperzz
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Careers at Helperzz
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Contact Us
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Terms of Use
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
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

export const GetQuotes = (props) => {
    return (
    <div className="flex flex-col gap-5 lg:col-span-5 bg-secondary text-white rounded-3xl p-8">
        <h1 className="text-center font-bold text-[20px] capitalize">
            Ready to start your deck design?
        </h1>
        <p className="font-medium">Find top local pros.</p>
        <button
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
                    alt="construction"
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

export const StoryCard = (props) => {
    return (
    <div className="flex bg-secondary rounded-3xl bg-opacity-10 overflow-hidden select-text">
        <img
            className="object-cover w-[40%] h-[250px] object-center rounded-3xl"
            src={`/cali-constructions.png`}
            alt="construction"
        />
        <div className="flex-1 flex flex-col gap-5 p-3">
            <h2 className="title-font text-lg font-bold text-gray-900 mb-3 select-text">
                Successful Contractor Life
            </h2>
            <div className="flex justify-between">
                <p className="text-sm text-[#26262699]">By: Helperzz</p>
                <p className="text-sm text-[#26262699]">July 6, 2024</p>
            </div>
            <p className="text-sm mb-3 overflow-ellipsis select-text">
                A modern, renovated deck combines beauty and function to create the perfect entertaining space...
            </p>
            <a href='' className="text-secondary text-sm font-bold transition-all inline-flex items-center md:mb-2 lg:mb-0 sm:w-auto w-full sm:justify-start justify-center">
                Read more
            </a>
        </div>
    </div>
    )
}

export const MoreStories = (props) => {
    const [stories, setStories] = useState()


    const getStories = async () => {
        try {
            const response = await blogService.fetchAll();
            setStories(response.blogs);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getStories();
    }, []);
    return (
        <div className="flex flex-col gap-5 lg:w-[40%] w-full p-4">
            <h4 className="font-bold text-2xl">You may also like</h4>
            {
                stories?.slice(0,5).map((_, i) => (
                    <StoryCard key={i}/>
                ))
            }
        </div>
    )
}
export default Page
