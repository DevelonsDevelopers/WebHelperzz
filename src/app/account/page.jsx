"use client";
import { Menu } from "@headlessui/react";
import { MdArrowForwardIos } from "react-icons/md";
import Image from "next/image";
import { IoStarSharp } from "react-icons/io5";
import { IoAlertCircle } from "react-icons/io5";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useState, useEffect } from "react";
import classNames from "classnames";
import Link from "next/link";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import { Fragment } from "react";
import { Tab } from "@headlessui/react";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import trustsealbadge from "../../../public/assets/trustsealbadge.png";
import contractorService from "../../api/services/contractorService";
import customerService from "../../api/services/customerService";
import image from "../../../public/assets/bath.png";
import Head from "next/head";
import { usePathname } from "next/navigation";

import { useRouter } from "next/navigation";
import Loading from "@/components/loading";
import { ExclamationMarkIcon, StarIcon } from "@/components/svg";
import ServicesRequests from "../../components/accountsComponents/SeviceRequest";
import MyProfile from "@/components/accountsComponents/MyProfile";
import MyReviews from "@/components/accountsComponents/MyReviews";

function Page() {
  const [ID, setID] = useState();
  const [details, setDetails] = useState();
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  const data = [
    {
      label: "My Service Requests",
      child: ServicesRequests,
    },
    {
      label: "My Profile",
      child: MyProfile,
    },
    {
      label: "My Reviews",
      child: MyReviews,
    },
  ];


  return (
    <>
      <Head>
        <title>{pathname.replaceAll("/", "")}</title>
        <meta
          name="description"
          content="Check out iPhone 12 XR Pro and iPhone 12 Pro Max. Visit your local store and for expert advice."
          key="desc"
        />
      </Head>

      <Header />
      <div className="flex flex-col gap-10 mt-16 ">
        <p className=" min-w-[1100px] text-xl px-10 m-auto mt-6 ">
          Helperzz / account
        </p>
        <Tab.Group>
          <Tab.List className="flex flex-wrap justify-center gap-5 lg:gap-16 py-2 lg:py-5 bg-[#12937C] bg-opacity-10">
            <div className="md:w-[1200px] mx-auto flex justify-center">
              {data.map(({ label }, index) => (
                <Tab key={index} className="focus:outline-none">
                  {({ selected }) => (
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
            {data.map(({ child }, index) => {
              const TabContent = child;
              return (
                <Tab.Panel key={index}>
                  <TabContent />
                </Tab.Panel>
              );
            })}
          </Tab.Panels>
        </Tab.Group>
      </div>
      <Footer />
    </>
  );
}

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

const Reviews = ({ details }) => {
  return (
    <div className="w-[1200px] mx-auto justify-center">
      {" "}
      <div className="bg-[#f7f9fb] mb-[150px]">
        <div className=" md:px-6 px-0 py-10 lg::mx-auto">
          <div style={{ display: "flex", flexDirection: "row" }}>
            <p className=" text-2xl md:text-3xl font-bold lg:pl-2 pl-0">
              REVIEWS
            </p>
            <div className="flex ml-[20px] items-center">
              <p
                className="text-xl md:text-3xl ml-3 "
                style={{ color: "grey" }}
              >
                {`(${details?.reviews?.length} Reviews)`}
              </p>
            </div>
          </div>
          <div className="flex mt-[25px] w-[55%] justify-between pl-2 md:pl-0">
            <p className="sm:text-2xl mt-2 font-semibold text-lg">Sort by:</p>
            <div style={{ display: "flex", marginTop: "8px" }}>
              <p className="sm:text-2xl font-semibold text-md">Newest</p>
              <Image
                src={require("../../../public/assets/up-down-arrow-svgrepo-com 1.png")}
                className="filter_imag ml-3 md:h-9 md:w-9 h-4 w-4"
              />
            </div>
            <p className="sm:text-2xl mt-2 font-semibold text-md">By Star</p>
            <div style={{ display: "flex", marginTop: "8px" }}>
              <p className="sm:text-2xl font-semibold text-md">
                Reviews with Photos
              </p>
              <Image
                src={require("../../../public/assets/checkbox.png")}
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
                  profileImage={require("../../../public/assets/profileImage.png")}
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
                <span className="ml-2" style={{ color: "black" }}>
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
      </div>
    </div>
  );
}


export default Page;
