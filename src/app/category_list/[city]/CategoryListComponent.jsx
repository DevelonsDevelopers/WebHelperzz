"use client";
import React, {useState, useRef, useEffect} from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import Header from "@/components/Header";
import "../../../style/category_list.css";
import {Footer} from "@/components/Footer";
import Search from "@/components/search/Search";
import ProjectList from "@/components/lists/ProjectList";
import TitleComponent from "@/components/title/Title";
import PopularList from "@/components/lists/PopularList";
import Link from "next/link";
import {MdStar} from "react-icons/md";
import {FiBox} from "react-icons/fi";
import imgThumb from "../../../../public/assets/project_thumb.jpg";
import trustsealimg from "../../../../public/assets/trustsealbadge.png";
import contractorService from "@/api/services/contractorService";
import categoryService from "@/api/services/categoryService";
import {useRouter} from 'next/navigation';
import Head from 'next/head';
import { usePathname } from 'next/navigation'

function CategoryListComponent({params}) {

    const [categories, setCategories] = useState([])
    const [categoryLoading, setCategoryLoading] = useState(true)
    
    const pathname = usePathname()

    const navigation = useRouter()

    const getCategories = async () => {
        try {
            const response = await categoryService.fetchCategoriesSubcategories();
            setCategories(response.categories);
            setCategoryLoading(false);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

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
            <div className="shadow-lg">
                <Header/>
            </div>

            <div className="main-title max-w-[1150px] px-10 m-auto mt-[6rem]  my-8 ">
                <h1 className="text-[18px]"><span className="cursor-pointer pr-2" onClick={() => navigation.push('/')}> Helperzz  </span> / <span className="cursor-pointer pl-2"> Browse All Categories </span></h1>
            </div>

            <Search/>

            <div className="flex justify-center">
                <div className="max-w-[1100px]  w-full px-[3rem] md-[8rem]  mt-14 mb-[6rem]">
                    <ProjectList categories={categories}/>
                </div>
            </div>

            <div className="professions-container  mt-[50px]">
                <div className="max-w-[1100px] px-10 m-auto">
                <TitleComponent title="Browse All Professionals"/>

                <PopularList categories={categories}/>
                </div>
            </div>

            <div className="max-w-[1150px] px-10 m-auto mt-[4rem]">
                <TitleComponent title="Toronto Home Improvement Pros"/>
            </div>
            <div className="w-full flex justify-center mt-[2rem] mb-[6rem]">
                <div className="toronto-h4me max-w-[1100px] px-10 w-full max-md:mt-5 gap-2">
                    <div
                        // key={index}
                        className="bg-[#F7F9FB] sm:p-4 p-1 flex max-md:flex-col items-center gap-5 mb-5"
                    >
                        <div className="">
                            <Link href={"#"}>
                                {true ? (
                                    <img
                                        src={`/assets/newImages/Rectangle 132.png`}
                                        className={`h-[250px] w-[250px] object-cover cursor-pointer`}
                                        alt="rectangle"
                                        height={250}
                                        width={550}
                                    />
                                ) : (
                                    <Image
                                        src={imgThumb}
                                        className={`h-[250px] w-[250px] `}
                                        alt="image thumb"
                                        height={250}
                                        width={550}
                                    />
                                )}
                            </Link>
                        </div>
                        <div className="">
                            <div className="flex gap-2 items-center">
                                <div className="p-3 rounded-full">
                                    <Link href={"#"}>
                                        <img
                                            src={"/assets/newImages/Ellipse 7.png"}
                                            alt="ellipse"
                                            className="sm:h-16 sm:w-16 h-auto w-36 cursor-pointer rounded-md"
                                            // href={
                                            //   `/profile/` +
                                            //   value.company_name.replaceAll(" ", "-").toLowerCase()
                                            // }
                                        />
                                    </Link>
                                </div>
                                <div className="">
                                    <h2 className="text-[1.2rem] md:text-lg font-[500] cursor-pointer max-md:hidden">
                                        <Link href={"/"}> Helperzz</Link>
                                    </h2>
                                    <div className="flex  max-md:flex-col">
                                        {true ? (
                                            <Image
                                                src={trustsealimg}
                                                width={120}
                                                height={20}
                                                alt="trustSeal badge"
                                            />
                                        ) : null}
                                        <div className="sm:ml-4 ml-0 flex items-center gap-1">
                                            {true > 0 ? (
                                                <>
                                                    {" "}
                                                    <MdStar className="text-[#12937C] sm:text-[1.8rem] text-[1.2rem]"/>
                                                    <span className="sm:text-md text-sm font-[600]">
                            {/* {`${(value.ratings / value.users).toFixed(2)} / 5`} */}
                          </span>
                                                    <span className="sm:ml-3 ml-1 sm:text-md text-sm text-gray-500">
                            {`($5 Reviews)`}
                          </span>
                                                </>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2 mt-4 px-6">
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
                            <div className="mt-2 px-6">
                                <h4 className="text-[15px] font-[600] text-gray-600">
                                    helperzzz
                                </h4>
                                <h3
                                    className="text-sm font-[500] mt-3 text-ellipsis line-clamp-2  "
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            "Premier Roofing Services: Our company specializes in delivering top-tier roofing solutions, offering impeccable installations, repairs, and maintenance...",
                                    }}
                                ></h3>
                            </div>
                            <div className="flex justify-between w-full mt-2 px-6">
                                <h5 className="text-sm font-[500]">helperzzz</h5>
                                <Link className="text-sm font-[600] text-[#12937C] " href={"#"}>
                                    Read More
                                </Link>
                            </div>
                            <div>
                                <Link
                                    className="text-md font-[600] mt-1 cursor-pointer px-6"
                                    href={"#"}
                                >
                                    projects
                                </Link>
                            </div>
                            <button
                                className="py-2 px-5 max-md:ml-3 mt-4 bg-[#12937C] text-white text-md rounded-[10px] text-opacity-70 cursor-pointer hover:bg-opacity-80 font-[600]">
                                Send Message
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Footer showNewsLetter={false}/>
        </>
    );
}

export default CategoryListComponent;
