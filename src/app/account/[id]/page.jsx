"use client";
import {Menu} from "@headlessui/react";
import {MdArrowForwardIos} from "react-icons/md";
import Image from "next/image";
import {IoStarSharp} from "react-icons/io5";
import {IoAlertCircle} from "react-icons/io5";
import {MdKeyboardArrowDown} from "react-icons/md";
import {useState, useEffect} from "react";
import classNames from "classnames";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import {Fragment} from "react";
import {Tab} from "@headlessui/react";
import Header from "@/components/Header";
import {Footer} from "@/components/Footer";
import trustsealbadge from "../../../../public/assets/trustsealbadge.png";
import contractorService from "../../../api/services/contractorService";
import customerService from "../../../api/services/customerService";
import Head from 'next/head';
import {usePathname} from 'next/navigation'



import {useRouter} from "next/navigation";
import Loading from "@/components/loading";
import {ExclamationMarkIcon, StarIcon} from "@/components/svg";

function Page({params}) {

    const [ID, setID] = useState();
    const [details, setDetails] = useState();
    const [loading, setLoading] = useState(false);
    const pathname = usePathname()

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

            <Header/>;
            <div className="flex flex-col gap-10 mt-16 ">
                <div className="max-w-[1200px] mx-auto  px-6  pt-4 md:pt-7 text-left">
                    <BreadCrumbs details={details}/>
                </div>
                <Tab.Group>
                    <Tab.List
                        className="flex flex-wrap justify-center gap-5 lg:gap-16 py-2 lg:py-5 bg-[#12937C] bg-opacity-10">
                        <div className="md:w-[1200px] mx-auto justify-center">
                            {data.map(({label}, index) => (
                                <Tab key={index} className="focus:outline-none">
                                    {({selected}) => (
                                        <div
                                            className={classNames(
                                                "flex items-center capitalize font-bold justify-center text-center w-full md:w-[230px]  px-3 h-12 rounded-xl",
                                                {
                                                    "bg-white text-[#12937C]": selected,
                                                    "bg-transparent text-black": !selected,
                                                }
                                            )}
                                        >
                                            {label}
                                        </div>
                                    )}
                                </Tab>
                            ))}
                        </div>
                    </Tab.List>
                    <Tab.Panels>
                        {data.map(({child}, index) => {
                            const TabContent = child;
                            return (
                                <Tab.Panel key={index}>
                                    <TabContent/>
                                </Tab.Panel>
                            );
                        })}
                    </Tab.Panels>
                </Tab.Group>
            </div>
            <Footer/>
        </>
    );
}

const BreadCrumbs = ({details}) => {
    function handleClick(event) {
        event.preventDefault();
        console.info("You clicked a breadcrumb.");
    }

    return (
        <div role="presentation" onClick={handleClick}>
            <Breadcrumbs aria-label="breadcrumb">
                <Link
                    underline="hover"
                    color="inherit"
                    href="/"
                    style={{color: "#000", fontSize: 20}}
                >
                    Helperzz
                </Link>

                <Typography
                    color="text.primary"
                    style={{color: "#000", fontSize: 20, fontWeight: "bold"}}
                >
                    {details?.details?.name}
                </Typography>
            </Breadcrumbs>
        </div>
    );
};

const ServicesRequests = (props) => {
    return (
        <div className="flex flex-col items-start gap-10 lg:w-[1200px] w-full mx-auto justify-center">
            <Dropdown/>
            <div className="flex flex-wrap lg:flex-nowrap gap-5 w-full">
                <div className="lg:w-[72%] w-screen">
                    <ChatComponent/>
                </div>
                <div className="flex flex-col gap-5 lg:w-[28%] w-full">
                    <ProfileCard/>
                    <RecentReviews/>
                </div>
            </div>
        </div>
    );
};

const ChatComponent = (props) => {
    return (
        <div className="flex flex-wrap border rounded-3xl divide-x-2 w-full">
            <div className="divide-y  lg:w-[45%] flex-1 w-screen">
                <div className="flex items-center justify-between p-5 h-20">
                    <p className="text-[#000000] text-opacity-80 text-base font-semibold">
                        My Service Request Details
                    </p>
                    <MdArrowForwardIos size={20}/>
                </div>
                <Conversations/>
            </div>
            <div className=" lg:w-[55%] flex-1 w-screen">
                <ChatBoard/>
            </div>
        </div>
    );
};

export const ProfileCard = (props) => {
    return (
        <div className="flex flex-col items-center gap-3 bg-[#F7F9FB] border rounded-3xl p-2">
            <div className="relative w-full h-64 rounded-2xl">
                <Image
                    className="rounded-2xl object-cover"
                    src="/cali-constructions.png"
                    alt=""
                    fill
                />
                <Image
                    className="absolute bottom-5 left-5 rounded-2xl object-cover"
                    src="/bathroom.svg"
                    width={100}
                    height={100}
                    alt=""
                />
            </div>
            <h6 className="text-xl font-semibold line-clamp-1 text-ellipsis">
                Cali Construction and design
            </h6>
            <div className="flex items-center w-full md:justify-between justify-center md:gap-0 gap-5">
                <h6 className="text-base font-semibold pl-3">Star Score </h6>
                <div className="flex items-center gap-2 ">
                    <IoStarSharp className="text-[#12937C]" size={30}/>
                    <p className="text-base">4.8 / 5</p>
                </div>
                <Image src={trustsealbadge} width={100} height={50} alt="trustBadge"/>
            </div>
            <div className="flex flex-col w-full">
                <div className="flex gap-1 items-center">
                    <p className="w-[200px] text-right text-sm">Average Rating</p>
                    <div className="w-full rounded-full h-[13px] bg-[#12937C]"/>
                    <IoAlertCircle className="text-[#E0E0E0] " size={30}/>
                </div>
                <div className="flex gap-1 items-center">
                    <p className="w-[200px] text-right text-sm">Recency</p>
                    <div className="w-full rounded-full h-[13px] bg-[#12937C]"/>
                    <IoAlertCircle className="text-[#E0E0E0] " size={30}/>
                </div>
                <div className="flex gap-1 items-center">
                    <p className="w-[200px] text-right text-sm">Reputation</p>
                    <div className="w-full rounded-full h-[13px] bg-[#12937C]"/>
                    <IoAlertCircle className="text-[#E0E0E0] " size={30}/>
                </div>
                <div className="flex gap-1 items-center">
                    <p className="w-[200px] text-right text-sm">Responsiveness</p>
                    <div className="w-full rounded-full h-[13px] bg-[#12937C]"/>
                    <IoAlertCircle className="text-[#E0E0E0] " size={30}/>
                </div>
                <button
                    className="font-semibold text-base w-[170px] mx-auto rounded-2xl px-5 py-[10px] mt-3 bg-white border border-[#12937C]">
                    See Full Profile
                </button>
            </div>
        </div>
    );
};

export const RecentReviews = (props) => {
    return (
        <div className="flex flex-col gap-5 items-center w-full border bg-[#F7F9FB] rounded-3xl p-5">
            <h6 className="text-xl font-bold">Recent Reviews</h6>
            <div className="flex flex-col gap-2">
                <Review/>
                <Review/>
            </div>
        </div>
    );
};

const Review = (props) => {
    return (
        <div className="flex flex-col gap-2 bg-white rounded-2xl p-4">
            <div className="flex gap-2">
                <Image
                    width={80}
                    height={50}
                    className="rounded-xl"
                    src="/profile.png"
                    alt="profile"
                />
                <div className="flex flex-col justify-between">
                    <p className="font-bold line-clamp-1 text-ellipsis">
                        BELINA{" "}
                        <span className="font-normal text-[#313232] pl-3">28.02.2024</span>
                    </p>
                    <div className="flex items-center gap-2 ">
                        <IoStarSharp className="text-[#12937C]" size={25}/>
                        <p className="">4.8 / 5</p>
                    </div>
                    <p className="font-semibold text-[#313232] text-xs">
                        Bathroom Renovation new Bathroom
                    </p>
                </div>
            </div>
            <p className="text-[#262626] font-semibold text-sm line-clamp-2 text-ellipsis">
                Happy to have found HIP to do my bathrooms! Did my kitchen basement
                renos and all were...
            </p>
            <Link href="" className="text-sm font-semibold text-[#12937C]">
                Read More
            </Link>
        </div>
    );
};

const Conversations = (props) => {
    const [active, setActive] = useState(0);
    return (
        <div className="flex flex-col gap-5 pt-8">
            <h6 className="text-xl font-bold px-5 ">Conversations</h6>
            <div>
                {Array.from({length: 5}).map((_, index) => (
                    <Conversation
                        key={index}
                        index={index}
                        active={active}
                        setActive={setActive}
                    />
                ))}
            </div>
        </div>
    );
};

const Conversation = ({index, active, setActive}) => {
    return (
        <button
            onClick={() => setActive(index)}
            className={classNames(
                "flex items-start justify-between w-full py-6 px-5 border-t",
                {"bg-[#12937C] bg-opacity-10": active === index}
            )}
        >
            <div className="bg-[#D9D9D9] sm:w-14 sm:h-14 w-10 h-10 rounded-full"/>
            <div className="flex flex-col items-start gap-1 mt-1 sm:w-[240px] w-screen ml-2">
                <h6 className="text-black font-semibold text-left text-opacity-80 text-base line-clamp-1 text-ellipsis">
                    Cali Construction and design
                </h6>
                <p className="text-black text-opacity-80 text-sm">Interested</p>
            </div>
            <p className="text-black text-opacity-50 text-sm mt-2">Mar 25</p>
        </button>
    );
};

const ChatBoard = (props) => {
    return (
        <div className="flex flex-col items-center gap-5  h-full">
            <div className="p-5 flex flex-col gap-5 items-center">
                <p className="text-black text-opacity-80 text-sm py-4">
                    Mar 25 11:36PM
                </p>
                <div className="flex items-center gap-3 w-full">
                    <div className="w-7 h-7 bg-[#119DED] rounded-full text-[15px]"/>
                    <p>you created this service request.</p>
                </div>
                <p className="text-black text-opacity-80 text-sm py-4">
                    Mar 25 11:40PM
                </p>
                <div className="flex items-start gap-3 w-full relative">
                    <div
                        className="w-7 h-7 bg-[#12937C] rounded-full absolute top-3 left-3 transform translate-x-[-50%] translate-y-[-50%]"/>
                    <p className="text-wrap text-[15px] pl-[35px]">
                        Cali construction and design is interested in your service request.
                    </p>
                </div>

                <Message/>
            </div>
            <div className="flex flex-col justify-center mt-auto w-full h-28 border-t">
                <div className="flex h-12 mx-6 ">
                    <input
                        type="text"
                        placeholder="Message"
                        className="flex-1 bg-[#F7F9FB] pl-5 rounded-2xl focus:outline-none"
                    />
                    <button
                        type="button"
                        className="bg-[#12937C] rounded-2xl text-white px-5 -ml-5"
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
};

const Message = (props) => {
    return (
        <div
            className="flex flex-col gap-3 w-full font-semibold text-sm text-[#262626] opacity-80 h-auto px-4 py-6 rounded-2xl bg-[#12937C] bg-opacity-10">
            <p>Hi. Hope all is well. We are more than happy to help.</p>
            <div className="flex flex-col gap-1">
                <p>Julian Ribeiro</p>
                <p>JJR construction inc</p>
                <p>(416) 371 0000</p>
            </div>
        </div>
    );
};

const Dropdown = (props) => {
    return (
        <Menu as="div" className="relative">
            <Menu.Button className="flex justify-center items-center gap-3 border-2 rounded-xl py-2 px-5">
                <div className="relative">
                    State Active{" "}
                    <div className="bg-green-500 w-2 h-2 absolute -right-2 -top-1 rounded-full"/>
                    {" "}
                </div>
                <MdKeyboardArrowDown size={25}/>
            </Menu.Button>
            <Menu.Items
                className="absolute top-full z-50 bg-white flex flex-col gap-2 border-2 p-2 w-[250px] rounded-md">
                <Menu.Item>
                    {({active}) => (
                        <button className={`text-left px-5 py-1 ${active && "bg-gray-50"}`}>
                            Active
                        </button>
                    )}
                </Menu.Item>
                <Menu.Item>
                    {({active}) => (
                        <button className={`text-left px-5 py-1 ${active && "bg-gray-50"}`}>
                            Idle
                        </button>
                    )}
                </Menu.Item>
            </Menu.Items>
        </Menu>
    );
};

const Profile = (details) => {
    return (
        <div className="w-[1200px] mx-auto justify-center mb-40">
            <div className="grid lg:grid-cols-12 gap-10">
                <div className="lg:col-span-12">
                    <div className="flex flex-wrap">
                        <div className="lg:ml-4">
                            <h2 className="text-2xl md:text-2xl font-semibold mb-3 text-text">
                                {details?.details?.name}
                            </h2>
                            <p className=" md:text-xl text-md md:mt-4 mt-2 text-[#444444]">
                                {details?.details?.email}
                            </p>
                            <p className="mb-3  md:text-xl text-md mt-2 text-[#444444]">
                                {details?.details?.address}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Reviews = ({details}) => {
    return (
        <div className="w-[1200px] mx-auto justify-center">
            {" "}
            <div className="bg-[#f7f9fb] mb-[150px]">
                <div className=" md:px-6 px-0 py-10 lg::mx-auto">
                    <div style={{display: "flex", flexDirection: "row"}}>
                        <p className=" text-2xl md:text-3xl font-bold lg:pl-2 pl-0">
                            REVIEWS
                        </p>
                        <div className="flex ml-[20px] items-center">
                            <p
                                className="text-xl md:text-3xl ml-3 "
                                style={{color: "grey"}}
                            >
                                {`(${details?.reviews?.length} Reviews)`}
                            </p>
                        </div>
                    </div>
                    <div className="flex mt-[25px] w-[55%] justify-between pl-2 md:pl-0">
                        <p className="sm:text-2xl mt-2 font-semibold text-lg">Sort by:</p>
                        <div style={{display: "flex", marginTop: "8px"}}>
                            <p className="sm:text-2xl font-semibold text-md">Newest</p>
                            <Image
                                src={require("../../../../public/assets/up-down-arrow-svgrepo-com 1.png")}
                                className="filter_imag ml-3 md:h-9 md:w-9 h-4 w-4"
                            />
                        </div>
                        <p className="sm:text-2xl mt-2 font-semibold text-md">By Star</p>
                        <div style={{display: "flex", marginTop: "8px"}}>
                            <p className="sm:text-2xl font-semibold text-md">
                                Reviews with Photos
                            </p>
                            <Image
                                src={require("../../../../public/assets/checkbox.png")}
                                className="filter_imag ml-3  md:h-9 md:w-9 h-4 w-4"
                            />
                        </div>
                    </div>
                    <div className="flex justify-between md:mt-6 mt-2 flex-wrap lg:flex-nowrap gap-3 md:gap-4">
                        <div className="flex-col justify-between flex-wrap lg:flex-nowrap gap-3 md:gap-4 w-[75%]">
                            {details?.reviews?.map((value) => (
                                <SubReview
                                    key={value.id}
                                    name={value.name}
                                    profileImage={require("../../../../public/assets/profileImage.png")}
                                    jobPrice={`${value.price}`}
                                    title={value.title}
                                    date={moment(value.created_date).format("ll")}
                                    reviewText={value.review}
                                    rating={value.rating}
                                    companyResponse={value.response}
                                    productImage={value.images}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

function SubReview(props) {
    const {
        profileImage,
        name,
        date,
        title,
        productImage,
        jobPrice,
        reviewText,
        rating,
        companyResponse,
    } = props;

    return (
        <div className="w-full md:mx-6 mx-0 md:mt-8 mt-5 md:mb-16 mb-7">
            <div className="flex justify-between w-[screen] flex-wrap gap-6 md:gap-10 flex-col lg:flex-row">
                <div className="flex flex-wrap">
                    {/* <Image src={profileImage} className="md:w-32 w-24 h-auto" /> */}
                    <div className="h-20 ml-1 lg:ml-4">
                        <div className="flex flex-wrap gap-4 md:gap-14 ">
                            <p className="font-bold text-xl uppercase">{name}</p>
                            <p className="sm:text-[20px] text-[grey] text-base">{date}</p>
                        </div>
                        <p className="md:text-lg flex font-semibold text-gray-700 my-2">
                            {title}
                        </p>
                        <div className="flex my-2">
                            {/* <Rating value={4} style={{ color: "#12937C" }} readOnly /> */}
                        </div>
                    </div>
                </div>
                <div className="md:h-20 w-full md:w-[30%]  pl-0 mt-1 lg:mt-0 flex flex-wrap">
                    <p className="md:text-lg font-bold">Job price:</p>
                    <p className="md:text-lg ml-1 font-bold">{jobPrice}</p>
                </div>
            </div>
            <div className="flex md:flex-row flex-col">
                <div className="flex-wrap sm:w-[60%] w-screen">
                    <p className="md:text-[16px] text-sm md:font-[550] flex sm:pt-4 sm:pl-8 pl-4 mt-4 mr-10 lg:mr-0 text-gray-700">
                        {reviewText}
                    </p>
                    {companyResponse !== null && (
                        <div className="sm:pl-12 pl-6 pt-4 flex-wrap">
                            <p className="flex md:text-xl text-lg font-bold ">
                                Company response{" "}
                                <span className="ml-2" style={{color: "black"}}>
                  {/* <FaChevronDown /> */}
                </span>
                            </p>{" "}
                            <p className="md:text-[17px] text-sm mt-2 sm:pl-5 pl-3  md:font-[550] font-[500] text-gray-700">
                                Hello {name}
                            </p>
                            <p className="md:text-[17px] text-sm md:font-[550] sm:pl-5 pl-3 sm:mr-0 mr-10 font-[500] text-gray-700">
                                {companyResponse}{" "}
                            </p>
                        </div>
                    )}
                </div>
                <div className="flex-col justify-between w-[35%]">
                    {/* <Slider {...settings} ref={sliderRef}>
              {productImage.map((image, index) => (
                <div key={index}>
                  <img
                    src={`${IMAGE_PATH}${image.image}`}
                    className="sm:w-[200px] sm:h-[100px] sm:px-1  w-28 h-auto my-2"
                  />
                </div>
              ))}
            </Slider> */}
                </div>
            </div>
        </div>
    );
}

const Favorites = (props) => {
    return <div className="w-[1200px] mx-auto justify-center">Favorites</div>;
};

const data = [
    {
        label: "My Service Requests",
        child: ServicesRequests,
    },
    {
        label: "My Profile",
        child: Profile,
    },
    {
        label: "My Reviews",
        child: Reviews,
    },
    {
        label: "My Favorites",
        child: Favorites,
    },
    {
        label: "Logout",
        child: Fragment,
    },
];

export default Page;
