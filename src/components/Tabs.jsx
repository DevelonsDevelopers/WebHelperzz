"use client";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import * as React from "react";
import Image from "next/image";
import { ExclamationMarkIcon, StarIcon } from "./svg";
import { Credentials } from "./Credentials";
import { Projects } from "./Projects";
import { useEffect, useState, useRef } from "react";
import { IMAGE_PATH } from "@/api/BaseUrl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import { Rating } from "@material-tailwind/react";
import "../style/Profile.css";
import Loading from "@/components/loading";

import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { useRouter } from "next/navigation";

function SubReview(props) {
  const sliderRef = useRef(null);

  const settings = {
    dots: true,
    infinite: props.length > 2,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };
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
              <Rating
                value={parseInt(rating)}
                style={{ color: "#12937C" }}
                readOnly
              />
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
                  <FaChevronDown />
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
          <Slider {...settings} ref={sliderRef}>
            {productImage.map((image, index) => (
              <div key={index}>
                <img
                  src={`${IMAGE_PATH}${image.image}`}
                  className="sm:w-[200px] sm:h-[100px] sm:px-1  w-28 h-auto my-2"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default function Tabs({ id, details }) {
  const [value, setValue] = React.useState("1");
  const [givenRating, setGivenRating] = useState(0);
  const [zoomedImageUrl, setZoomedImageUrl] = useState(null);
  const sliderRef = useRef(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);

  const buttons = [
    "Bathroom",
    "kitchen",
    "kitchen planning",
    "kitchen & Bathroom",
    "living room",
    "exterior",
    "entry",
  ];
  const navigate = useRouter();

  const handleButtonClick = () => {
    navigate.push(
      "/write_review/" + details.details.category + "/" + details.contractor.id
    );
  };

  useEffect(() => {
    if (details) {
      let rating = 0;
      for (const review of details.reviews) {
        rating = rating + parseFloat(review.rating);
      }
      setIsLoaded(false);
      setGivenRating(rating / parseFloat(details?.reviews?.length));
    }
  }, [details]);

  const handleReviewButtonClick = () => {
    setValue("4");
  };

  const handlePhotoButtonClick = () => {
    setValue("3");
  };

  const openZoomedImage = (imageUrl) => {
    setZoomedImageUrl(imageUrl);
  };

  const closeZoomedImage = () => {
    setZoomedImageUrl(null);
  };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await new Promise((resolve) => setTimeout(resolve, 2000));
  //     setLoading(false);
  //   };
  //   fetchData();
  // }, []);

  // useEffect(() => {
  //   if (details) {
  //     let rating = 0;
  //     for (const review of details.reviews) {
  //       rating = rating + parseFloat(review.rating);
  //     }
  //     setGivenRating(rating / parseFloat(details?.reviews?.length));
  //   }
  // }, [details]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const ZoomedImageModal = ({ imageUrl, onClose }) => {
    const projectCards = [
      {
        id: 1,
        img: "/assets/images/project-01.png",
        title: "Bathroom Renovation",
      },
      {
        id: 2,
        img: "/assets/images/project-02.png",
        title: "Bathroom Renovation",
      },
      {
        id: 3,
        img: "/assets/images/project-03.png",
        title: "Interior Renovation",
      },
      {
        id: 4,
        img: "/assets/images/project-02.png",
        title: "Bathroom Renovation",
      },
    ];

    // const projectCards = [
    //   {
    //     id: 0,
    //     img: imageUrl,
    //     title: "New product"
    //   },
    //   ...projectCardsOld
    // ]

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [zoomedImageUrl, setZoomedImageUrl] = useState(imageUrl); // Initial value

    const handlePrevClick = () => {
      setSelectedIndex((prevIndex) =>
        prevIndex === 0 ? projectCards.length - 1 : prevIndex - 1
      );
    };

    const handleNextClick = () => {
      setSelectedIndex((prevIndex) =>
        prevIndex === projectCards.length - 1 ? 0 : prevIndex + 1
      );
    };

    // Update zoomed image URL after selectedIndex changes
    useEffect(() => {
      setZoomedImageUrl(projectCards[selectedIndex].img);
    }, [selectedIndex, projectCards]);

    return (
      <div className="fixed top-0 left-0 w-full h-full  bg-black bg-opacity-75 flex justify-center z-10">
        <div className="mt-[4rem] sm:mt-[3rem] xl:flex xl:flex-col xl:justify-center">
          <div>
            <img
              src={zoomedImageUrl}
              alt="Zoomed"
              className="w-[100%] h-[350px] xl:h-[75vh] sm:h-[400px] object-fill sm:object-cover"
            />
          </div>

          <div className="images-cards">
            <div className="mt-4 relative">
              <div className="grid grid-cols-4 gap-1 sm:gap-2 w-[55%] sm:w-[75%] mx-auto">
                {projectCards.map((item, index) => (
                  <div
                    key={item.id}
                    // onClick={() => setZoomedImageUrl(item.img)}
                    className={`cursor-pointer ${
                      selectedIndex === index
                        ? "border-solid border-2 border-sky-500"
                        : ""
                    }`}
                  >
                    <Image
                      src={`${item.img}`}
                      alt={item.img}
                      width={110}
                      height={100}
                      className="w-[50px] h-[60px] sm:h-[80px] sm:w-[150px] xl:w-[100%]"
                    />
                  </div>
                ))}
              </div>
              <div className="absolute top-1/2 transform -translate-y-1/2 left-[20px]  sm:left-0 right-[20px] sm:right-0 flex justify-between">
                <button
                  className="btn-prev flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full"
                  onClick={handlePrevClick}
                >
                  <FaChevronLeft />
                </button>
                <button
                  className="btn-next flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full"
                  onClick={handleNextClick}
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="absolute top-0 right-0 m-4 p-5 text-white text-lg"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            justifyContent: "center",
          }}
        >
          <div className="tabs_ bg-secondary bg-opacity-10 py-3">
            <div className="lg:w-[1200px] w-screen mx-auto px-6">
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab
                  label="Overview"
                  value="1"
                  className="font-bold text-2xl"
                  style={{
                    fontWeight: "bolder",
                    textTransform: "capitalize",
                    fontSize: "18px",
                  }}
                />
                <Tab
                  label="Profile"
                  value="2"
                  className="font-bold text-2xl"
                  style={{
                    fontWeight: "bolder",
                    textTransform: "capitalize",
                    fontSize: "18px",
                  }}
                />
                <Tab
                  label="Photos"
                  value="3"
                  style={{
                    fontWeight: "bolder",
                    textTransform: "capitalize",
                    fontSize: "18px",
                  }}
                />
                <Tab
                  label="Reviews"
                  value="4"
                  style={{
                    fontWeight: "bolder",
                    textTransform: "capitalize",
                    marginRight: "50px",
                    fontSize: "18px",
                  }}
                />
              </TabList>
            </div>
          </div>
        </Box>
        <div className="xl:w-[1200px] w-[screen] mx-auto mt-6 md:mt-10">
          {isLoaded ? (
            <Loading />
          ) : (
            <TabPanel value="1">
              <div className="grid lg:grid-cols-12 gap-10">
                <div className="lg:col-span-7">
                  <div className="flex flex-wrap">
                    <div className="mb-4 md:mb-0 lg:w-[300px]">
                      <img
                        className="lg:w-[300px] w-[screen]"
                        src={`${IMAGE_PATH}${details?.contractor?.image}`}
                        alt=""
                      />
                    </div>
                    <div className="lg:ml-4">
                      <h1 className="text-2xl md:text-2xl font-semibold mb-3 text-text">
                        {details?.details?.company_name}
                      </h1>
                      <h2 className=" md:text-xl text-md md:mt-4 mt-2 text-[#444444]">
                        {details?.details?.category_name}
                      </h2>
                      <h5 className="mb-3  md:text-xl text-md mt-2 text-[#444444]">
                        {details?.details?.address}
                      </h5>
                      <div className="flex gap-2 items-center text-text md:text-md text-sm">
                        {details?.reviews?.length > 0 ? (
                          <>
                            <StarIcon color={"#12937C"} />{" "}
                            <span>{`${givenRating.toFixed(2)} / 5`}</span>{" "}
                            <span className="text-[#444444]">{`(${details.reviews.length} Reviews)`}</span>
                          </>
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mt-10">
                      <h2 className="text-2xl font-semibold mb-4 text-text ">
                        About company
                      </h2>
                      <h5
                        className="md:text-xl text-md mt-4 text-[#444444]"
                        dangerouslySetInnerHTML={{
                          __html: details?.details?.description,
                        }}
                      />

                      <h4 className="mt-10 text-xl md:text-2xl font-semibold mb-4 text-text">
                        Website:
                      </h4>
                      <a
                        href="https://www.homeimprovementpeople.com"
                        className="text-md md:text-xl font-semibold mb-4 text-text break-words"
                        rel="nofollow"
                        onClick={(e) => {
                          e.preventDefault(); // Prevents the default action of navigating to the URL
                          // Optionally, you can copy the URL to the clipboard
                          navigator.clipboard
                            .writeText("https://www.homeimprovementpeople.com")
                            .then(() => {
                              alert("Link copied to clipboard");
                            })
                            .catch((err) => {
                              console.error("Failed to copy: ", err);
                            });
                        }}
                      >
                        {details?.details?.website}
                      </a>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-5">
                  <form className="bg-secondary bg-opacity-10 rounded-2xl p-6 md:p-10">
                    <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-text">
                      Free In home consultation
                    </h2>
                    <p className="mb-6 md:mb-10  text-base md:text-xl mt-4 text-[#5c6261]">
                      For Helperzz users only
                    </p>
                    <div className="mb-5">
                      <input
                        type="email"
                        placeholder="Email Address"
                        id="email"
                        name="email"
                        className={
                          "w-full bg-white border border-[#43D9BE] rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#43D9BE]"
                        }
                      />
                    </div>
                    <div className="mb-5">
                      <input
                        type="text"
                        placeholder="Your Name"
                        id="name"
                        name="name"
                        className={
                          "w-full bg-white border border-[#43D9BE] rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#43D9BE]"
                        }
                      />
                    </div>
                    <div className="mb-5">
                      <input
                        placeholder="Phone Number"
                        type="tel"
                        id="phone"
                        name="phone"
                        className={
                          "w-full bg-white border border-[#43D9BE] rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#43D9BE]"
                        }
                      />
                    </div>
                    <div className="mb-5">
                      <input
                        type="text"
                        id="zip"
                        placeholder="Zip Code"
                        name="zip"
                        className={
                          "w-full bg-white border border-[#43D9BE] rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#43D9BE]"
                        }
                      />
                    </div>
                    <div className="mb-7">
                      <textarea
                        rows={4}
                        placeholder="Message"
                        id="message"
                        name="message"
                        className="w-full resize-none  focus:ring-2 focus:ring-[#43D9BE] bg-white border border-[#43D9BE] rounded-2xl py-2 px-4 focus:outline-none "
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="bg-secondary  w-full hover:bg-opacity-70 text-white font-semibold p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-white"
                    >
                      Send Message
                    </button>
                  </form>
                </div>
              </div>

              <div className="rounded-2xl bg-[#F7F9FB] p-7 mt-10">
                <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
                  <div>
                    <h2 className="whitespace-nowrap text-lg md:text-xl font-semibold mb-3 text-text">
                      Star Score
                    </h2>
                    <div className="flex gap-2 items-center text-text">
                      <StarIcon color={"#12937C"} />{" "}
                      <span>{`${givenRating.toFixed(2)} / 5`}</span>{" "}
                    </div>
                    <span className="text-[#444444] mt-2 block">
                      {`(${details?.reviews?.length} Reviews)`}
                    </span>
                  </div>
                  <div className="w-full">
                    <div className="grid md:grid-cols-2 gap-5">
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="md:w-[250px] mb-1 w-full whitespace-nowrap text-sm text-end  md:text-base  text-text">
                            Average Rating{" "}
                          </h5>
                          <progress
                            id="file"
                            value="82"
                            max="100"
                            class="w-full h-4 block"
                          >
                            <span class="rounded-full">32%</span>
                          </progress>
                          <ExclamationMarkIcon />
                        </div>
                        <div className="flex items-center gap-2">
                          <h5 className="md:w-[250px] mb-1 w-full whitespace-nowrap text-sm text-end  md:text-base  text-text">
                            Recency
                          </h5>
                          <progress
                            id="file"
                            value="81"
                            max="100"
                            class="w-full h-4 block"
                          >
                            <span class="rounded-full">32%</span>
                          </progress>
                          <ExclamationMarkIcon />
                        </div>
                        <div className="flex items-center gap-2">
                          <h5 className="md:w-[250px] mb-1 w-full whitespace-nowrap text-sm text-end  md:text-base  text-text">
                            Reputation{" "}
                          </h5>
                          <progress
                            id="file"
                            value="89"
                            max="100"
                            class="w-full h-4 block"
                          >
                            <span class="rounded-full">32%</span>
                          </progress>
                          <ExclamationMarkIcon />
                        </div>
                        <div className="flex items-center gap-2">
                          <h5 className="md:w-[250px] mb-1 w-full whitespace-nowrap text-sm text-end  md:text-base text-text">
                            Responsiveness{" "}
                          </h5>
                          <progress
                            id="file"
                            value="52"
                            max="100"
                            class="w-full h-4 block"
                          >
                            <span class="rounded-full">32%</span>
                          </progress>
                          <ExclamationMarkIcon />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className=" mb-1 w-full font-bold whitespace-nowrap text-wrap text-sm md:text-sm  text-text">
                            Reviews by rating{" "}
                            <span className="text-[#666]">
                              (past 12 months)
                            </span>
                          </h5>
                        </div>
                        <div className="flex items-center gap-2">
                          <h5 className="md:w-[90px] mb-1 w-full whitespace-nowrap text-sm text-end  md:text-base  text-text">
                            Great{" "}
                          </h5>
                          <progress
                            id="file"
                            value="72"
                            max="100"
                            class="w-full h-4 block"
                          >
                            <span class="rounded-full">32%</span>
                          </progress>
                        </div>
                        <div className="flex items-center gap-2">
                          <h5 className="md:w-[90px] mb-1 w-full whitespace-nowrap text-sm text-end  md:text-base  text-text">
                            Average{" "}
                          </h5>
                          <progress
                            id="file"
                            value="42"
                            max="100"
                            class="w-full h-4 block"
                          >
                            <span class="rounded-full">32%</span>
                          </progress>
                        </div>
                        <div className="flex items-center gap-2">
                          <h5 className="md:w-[90px] mb-1 w-full whitespace-nowrap text-sm text-end  md:text-base text-text">
                            Poor{" "}
                          </h5>
                          <progress
                            id="file"
                            value="32"
                            max="100"
                            class="w-full h-4 block"
                          >
                            <span class="rounded-full">32%</span>
                          </progress>
                        </div>
                      </div>
                    </div>
                    {/* <Image
                          src={require("/src/assets/images/progressBar.png")}
                          alt=""
                        /> */}
                  </div>
                </div>
              </div>
              <div className="md:mt-10 mt-5">
                <Credentials details={details} />
              </div>
              <div className="md:my-20 my-8">
                <div className="profile_container max-w-[1200px] mx-auto md:px-6 px-1">
                  <h2 className="text-2xl md:text-3xl font-semibold mb-5 text-text">
                    Projects
                  </h2>

                  <div className="flex mb-10 items-center gap-2 lg:gap-6 flex-wrap">
                    {buttons.map((item, index) => (
                      <button
                        key={index}
                        className="bg-secondary transition-all whitespace-nowrap bg-opacity-10 md:text-md text-sm min-w-[120px] hover:bg-opacity-100 hover:text-white border border-secondary text-text text-transform: capitalize  font-semibold sm:py-3 py-[7px] sm:px-4 px-[10px] rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-white"
                      >
                        {item}{" "}
                      </button>
                    ))}
                  </div>
                  <h2 className="text-2xl md:text-[28px] font-semibold md:mb-5 mb-2 text-text">
                    10 Photos
                  </h2>
                  <p className="font-medium text-[#666666] md:text-base text-sm">
                    Filtered results based on the selected room categories{" "}
                  </p>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 md:gap-10 lg:gap-[72px]">
                    {details?.projects?.slice(0, 3).map((project, index) => (
                      <div
                        className="mt-9"
                        key={index}
                        onClick={() =>
                          openZoomedImage(
                            `${IMAGE_PATH}${project.images[0].image}`
                          )
                        }
                      >
                        <img
                          src={`${IMAGE_PATH}${project.images[0].image}`}
                          alt=""
                          className="rounded-[22px] w-full h-[250px] object-cover"
                        />
                        <h2 className="text-lg md:text-[22px] text-center md:text-left font-semibold mt-5 text-text">
                          {project.title}
                        </h2>
                      </div>
                    ))}
                  </div>
                  {zoomedImageUrl && (
                    <ZoomedImageModal
                      imageUrl={zoomedImageUrl}
                      onClose={closeZoomedImage}
                    />
                  )}
                  <div className="mt-8 lg:mt-16 flex justify-center text-center">
                    <a
                      onClick={handlePhotoButtonClick}
                      className="hover:bg-secondary hover:text-white transition-all cursor-pointer text-text w-[300px]  text-base lg:text-xl justify-center border border-secondary px-5 py-4 rounded-2xl font-bold bg-[#fff] text-transform: uppercase"
                    >
                      See All Photos
                    </a>
                  </div>
                </div>
              </div>
              <div className="review_section ">
                <div className="md:px-6 px-0 py-10 lg::mx-auto">
                  {" "}
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <p className=" text-2xl md:text-3xl font-bold lg:pl-2 pl-0">
                      REVIEWS
                    </p>
                    <div className="review_head ">
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB3UlEQVR4nNWWv0tjQRDHn8LJFZq8HaNiISI5kasFwULEQv+BA5uzjmDvr8wsK9h4xWneTBRSWalgc1xx13p/wB1obWMtiHYqEiMbYk4SH+a9l/fAgal2vvvZ/e7sso7z7sKYrmomHSD4RzGdJApNM44A0yMIVVIeZhMDK6FVC7WpGFeSAzP9q4MF/yYCTXmYfYY+Z6ZAo7GDQQgbwcCYjx/MdNYEFjyNFdq7Q2PN0Fru0ue2A4f3zcf03ppSQpt+YDtma2xt6zvx9AwIXQLTje+OoiZX5750PT1dB/cVzSdguogNKnX4RdODo0qraRA6jguqGH+mvhvwtV2JzoHgffug+GBfOqfidLx55hlPjyvG83ZYq0RPttxsNsAzKWA8Cm2t4A/b5U7YcFkvWbuCWGs1TtToL6wPgGA5ALic2c4PRgYrxsXgNutcZDAI/g7eVPgrErSvaLoV422I5rqzzRkarIo07383ccOmX+NZbWgwCB2+djdd1lP1Gs5PvHrnGQ/CUUu5DyB43TDhcXrHuI2lvd+We4Cx1LDAm1DfX/Bw7uUkrodf39RI/gsIXv1fgJ4NDmbcqp4V04naxaFWdbbWamp2bwUGZwo06jItOMZ0BhYb02m1iXwCnfcST9nEk6kY/HV3AAAAAElFTkSuQmCC" />
                      <p className="text-xl md:text-3xl ">
                        {" "}
                        {`${givenRating.toFixed(2)} / 5`}
                      </p>
                      <p
                        className="text-xl md:text-3xl ml-3 "
                        style={{ color: "grey" }}
                      >
                        {`(${details?.reviews?.length} Reviews)`}
                      </p>
                    </div>
                  </div>
                  <div className="sorting_review w-[55%] flex pl-2 md:pl-0">
                    <p className="sm:text-2xl mt-2 font-semibold text-lg">
                      Sort by:
                    </p>
                    <div style={{ display: "flex", marginTop: "8px" }}>
                      <p className="sm:text-2xl font-semibold text-md">
                        Newest
                      </p>
                      <Image
                        src={require("../../public/assets/up-down-arrow-svgrepo-com 1.png")}
                        className="filter_imag ml-3 md:h-9 md:w-9 h-4 w-4"
                      />
                    </div>
                    <p className="sm:text-2xl mt-2 font-semibold text-md">
                      By Star
                    </p>
                    <div style={{ display: "flex", marginTop: "8px" }}>
                      <p className="sm:text-2xl font-semibold text-md">
                        Reviews with Photos
                      </p>
                      <Image
                        src={require("../../public/assets/checkbox.png")}
                        className="filter_imag ml-3  md:h-9 md:w-9 h-4 w-4"
                      />
                    </div>
                  </div>
                  <div className="flex justify-between md:mt-6 mt-2 flex-wrap lg:flex-nowrap gap-3 md:gap-4">
                    <div className="flex-col justify-between flex-wrap lg:flex-nowrap gap-3 md:gap-4 w-[75%]">
                      {details?.reviews?.slice(0, 3).map((value) => (
                        <SubReview
                          key={value.id}
                          name={value.name}
                          profileImage={require("../../public/assets/profileImage.png")}
                          jobPrice={` ${value.price}`}
                          title={value.title}
                          date={moment(value.created_date).format("ll")}
                          reviewText={value.review}
                          rating={value.rating}
                          companyResponse={value.response}
                          productImage={value.images}
                        />
                      ))}
                    </div>
                    <div className="flex-col justify-between lg:w-[25%] w-screen lg:pr-0 pr-10">
                      <div className="flex flex-col bg-white rounded-lg lg:p-8 p-4">
                        <p className="font-bold text-2xl flex">
                          {details?.details?.company_name}
                        </p>
                        <p className="flex font-normal text-left text-xl mt-5">
                          {details?.details?.category_name}
                        </p>
                        <div className="flex mt-5">
                          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB3UlEQVR4nNWWv0tjQRDHn8LJFZq8HaNiISI5kasFwULEQv+BA5uzjmDvr8wsK9h4xWneTBRSWalgc1xx13p/wB1obWMtiHYqEiMbYk4SH+a9l/fAgal2vvvZ/e7sso7z7sKYrmomHSD4RzGdJApNM44A0yMIVVIeZhMDK6FVC7WpGFeSAzP9q4MF/yYCTXmYfYY+Z6ZAo7GDQQgbwcCYjx/MdNYEFjyNFdq7Q2PN0Fru0ue2A4f3zcf03ppSQpt+YDtma2xt6zvx9AwIXQLTje+OoiZX5750PT1dB/cVzSdguogNKnX4RdODo0qraRA6jguqGH+mvhvwtV2JzoHgffug+GBfOqfidLx55hlPjyvG83ZYq0RPttxsNsAzKWA8Cm2t4A/b5U7YcFkvWbuCWGs1TtToL6wPgGA5ALic2c4PRgYrxsXgNutcZDAI/g7eVPgrErSvaLoV422I5rqzzRkarIo07383ccOmX+NZbWgwCB2+djdd1lP1Gs5PvHrnGQ/CUUu5DyB43TDhcXrHuI2lvd+We4Cx1LDAm1DfX/Bw7uUkrodf39RI/gsIXv1fgJ4NDmbcqp4V04naxaFWdbbWamp2bwUGZwo06jItOMZ0BhYb02m1iXwCnfcST9nEk6kY/HV3AAAAAElFTkSuQmCC" />
                          <p className="ml-2 text-md">
                            <span>{`${givenRating.toFixed(2)} / 5`}</span>{" "}
                            <span className="text-gray-400">{`(${details?.reviews?.length} Reviews)`}</span>
                          </p>
                        </div>
                        <button className="bg-[#12937C]  text-white font-bold py-4 px-4 sm:text-lg rounded-2xl w-full mt-10 mb-5">
                          GET A QUOTE
                        </button>
                        <button
                          className="bg-white font-semibold hover:bg-secondary hover:text-white transition-all py-4 px-6 cursor-pointer  border sm:text-md  border-[#12937C] rounded-2xl mx-auto mt-2  w-full"
                          onClick={handleButtonClick}
                        >
                          WRITE A REVIEW
                        </button>
                      </div>
                      <div className=" ">
                        <div className=" p-5 bg-white px-4 rounded-md mb-5">
                          <div className="flex ">
                            <Image
                              src={require("../../public/assets/phone-svgrepo-com.png")}
                              className="w-8 h-8"
                            />
                            <p className="ml-2 text-sm">(416) 770 7805</p>
                          </div>
                          <div className="divider"> </div>
                          <div className="flex my-4">
                            <Image
                              src={require("../../public/assets/search-globe-svgrepo-com.png")}
                              className="w-8 h-8"
                            />
                            <p className="ml-2  text-sm break-words">
                              <a
                                href="https://www.homeimprovementpeople.com"
                                rel="nofollow"
                                onClick={(e) => {
                                  e.preventDefault();
                                  navigator.clipboard
                                    .writeText(
                                      "https://www.homeimprovementpeople.com"
                                    )
                                    .then(() => {
                                      alert("Link copied to clipboard");
                                    })
                                    .catch((err) => {
                                      console.error("Failed to copy: ", err);
                                    });
                                }}
                              >
                                {details?.details?.website}
                              </a>
                            </p>
                          </div>
                        </div>
                        <div className="min-h-80 flex items-center flex-col justify-center bg-white lg:w-full  rounded-lg">
                          <iframe
                            className="h-[90%] lg:w-[250px] w-[screen] lg:pr-0 pr-4 rounded-sm"
                            frameBorder="0"
                            style={{ border: 0 }}
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387269.2782824296!2dlongitude!3dlatitude!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zxxxxxxxxxxxxxxx!5e0!3m2!1sen!2sus!4v1561132387270!5m2!1sen!2sus"
                            allowFullScreen
                          ></iframe>
                          <center className="lg:w-full w-[screen] mt-6">
                            <button className="hover:bg-secondary hover:text-white transition-all cursor-pointer bg-transparent  font-semibold py-4 px-6  border sm:text-md  border-[#12937C] rounded-2xl mx-auto mt-2  ">
                              VIEW SERVICE AREA{" "}
                            </button>
                          </center>
                        </div>
                      </div>
                    </div>
                  </div>
                  <center className="lg:w-full w-screen mt-2 ">
                    <button
                      onClick={handleReviewButtonClick}
                      className="hover:bg-secondary hover:text-white transition-all cursor-pointer bg-white font-semibold lg:py-6 py-3  px-6 md:w-fit sm:text-md border border-[#12937C] rounded-2xl mx-auto mt-2 text-transform: uppercase "
                    >
                      See All reviewS{" "}
                    </button>
                  </center>
                </div>
              </div>
            </TabPanel>
          )}
          {isLoaded ? (
            <Loading />
          ) : (
            <TabPanel value="2">
              <div className="grid lg:grid-cols-12 gap-10">
                <div className="lg:col-span-12">
                  <div className="flex flex-wrap">
                    <div className="mb-4 md:mb-0 lg:w-[300px]">
                      <img
                        className="lg:w-[300px] w-[screen]"
                        src={`${IMAGE_PATH}${details?.contractor?.image}`}
                        alt=""
                      />
                    </div>
                    <div className="lg:ml-4">
                      <h1 className="text-2xl md:text-2xl font-semibold mb-3 text-text">
                        {details?.details?.company_name}
                      </h1>
                      <h2 className=" md:text-xl text-md md:mt-4 mt-2 text-[#444444]">
                        {details?.details?.category_name}
                      </h2>
                      <h5 className="mb-3  md:text-xl text-md mt-2 text-[#444444]">
                        {details?.details?.address}
                      </h5>
                      <div className="flex gap-2 items-center text-text md:text-md text-sm">
                        <StarIcon color={"#12937C"} />{" "}
                        <span>{`${givenRating.toFixed(2)} / 5`}</span>{" "}
                        <span className="text-[#444444]">{`(${details?.reviews?.length} Reviews)`}</span>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mt-10">
                      <h2 className="text-2xl font-semibold mb-4 text-text ">
                        About company
                      </h2>
                      <p
                        className="md:text-xl text-md mt-4 text-[#444444]"
                        dangerouslySetInnerHTML={{
                          __html: details?.details?.description,
                        }}
                      />

                      <hh3 className="mt-10 text-xl md:text-2xl font-semibold mb-4 text-text">
                        Website:
                      </hh3>
                      <a
                        href="https://www.homeimprovementpeople.com"
                        className="text-md md:text-xl font-semibold mb-4 text-text break-words"
                        rel="nofollow"
                        onClick={(e) => {
                          e.preventDefault();
                          navigator.clipboard
                            .writeText("https://www.homeimprovementpeople.com")
                            .then(() => {
                              alert("Link copied to clipboard");
                            })
                            .catch((err) => {
                              console.error("Failed to copy: ", err);
                            });
                        }}
                      >
                        {details?.details?.website}
                      </a>
                    </div>
                    <div className="rounded-2xl bg-[#F7F9FB] p-7 mt-10">
                      <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
                        <div>
                          <h2 className="whitespace-nowrap text-lg md:text-xl font-semibold mb-3 text-text">
                            Star Score
                          </h2>
                          <div className="flex gap-2 items-center text-text md:text-md text-sm">
                            {details?.reviews?.length > 0 ? (
                              <>
                                <StarIcon color={"#12937C"} />{" "}
                                <span>{`${givenRating.toFixed(2)} / 5`}</span>{" "}
                                <span className="text-[#444444]">{`(${details.reviews.length} Reviews)`}</span>
                              </>
                            ) : null}
                          </div>
                          <span className="text-[#444444] mt-2 block">
                            {`(${details?.reviews?.length} Reviews)`}
                          </span>
                        </div>
                        <div className="w-full">
                          <div className="grid md:grid-cols-2 gap-5">
                            <div>
                              <div className="flex items-center gap-2">
                                <h5 className="md:w-[250px] mb-1 w-full whitespace-nowrap text-sm text-end  md:text-base  text-text">
                                  Average Rating{" "}
                                </h5>
                                <span className="bg-secondary rounded-full h-4 w-full block"></span>
                                <ExclamationMarkIcon />
                              </div>
                              <div className="flex items-center gap-2">
                                <h5 className="md:w-[250px] mb-1 w-full whitespace-nowrap text-sm text-end  md:text-base  text-text">
                                  Recency
                                </h5>
                                <span className="bg-secondary  rounded-full h-4 w-full block"></span>
                                <ExclamationMarkIcon />
                              </div>
                              <div className="flex items-center gap-2">
                                <h5 className="md:w-[250px] mb-1 w-full whitespace-nowrap text-sm text-end  md:text-base  text-text">
                                  Reputation{" "}
                                </h5>
                                <span className="bg-secondary rounded-full h-4 w-full block"></span>
                                <ExclamationMarkIcon />
                              </div>
                              <div className="flex items-center gap-2">
                                <h5 className="md:w-[250px] mb-1 w-full whitespace-nowrap text-sm text-end  md:text-base text-text">
                                  Responsiveness{" "}
                                </h5>
                                <span className="bg-secondary rounded-full h-4 w-full block"></span>
                                <ExclamationMarkIcon />
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <h5 className=" mb-1 w-full font-bold whitespace-nowrap text-wrap text-sm md:text-sm  text-text">
                                  Reviews by rating{" "}
                                  <span className="text-[#666]">
                                    (past 12 months)
                                  </span>
                                </h5>
                              </div>
                              <div className="flex items-center gap-2">
                                <h5 className="md:w-[90px] mb-1 w-full whitespace-nowrap text-sm text-end  md:text-base  text-text">
                                  Great{" "}
                                </h5>
                                <span className="bg-secondary  rounded-full h-4 w-full block"></span>
                              </div>
                              <div className="flex items-center gap-2">
                                <h5 className="md:w-[90px] mb-1 w-full whitespace-nowrap text-sm text-end  md:text-base  text-text">
                                  Average{" "}
                                </h5>
                                <span className="bg-[#E0E0E0] rounded-full h-4 w-full block"></span>
                              </div>
                              <div className="flex items-center gap-2">
                                <h5 className="md:w-[90px] mb-1 w-full whitespace-nowrap text-sm text-end  md:text-base text-text">
                                  Poor{" "}
                                </h5>
                                <span className="bg-[#E0E0E0] rounded-full h-4 w-full block"></span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
          )}
          {isLoaded ? (
            <Loading />
          ) : (
            <TabPanel value="3">
              <div className="img_align w-[screen] pl-2 md:pl-0  overflow-x-auto  flex flex-wrap gap-10">
                {details?.projects?.map((project, index) => (
                  <>
                    {project.images.map((img) => (
                      <div
                        onClick={() =>
                          openZoomedImage(`${IMAGE_PATH}${img.image}`)
                        }
                        className="mt-5"
                        key={index}
                      >
                        <img
                          src={`${IMAGE_PATH}${img.image}`}
                          alt=""
                          className="h-[280px] w-[350px] rounded-[22px]"
                          width={350}
                          height={280}
                        />
                      </div>
                    ))}
                  </>
                ))}
              </div>
            </TabPanel>
          )}
          {isLoaded ? (
            <Loading />
          ) : (
            <TabPanel value="4">
              <div className="review_section ">
                <div className=" md:px-6 px-0 py-10 lg::mx-auto">
                  <div style={{ display: "flex", flexDirection: "row" }}>
                    <p className=" text-2xl md:text-3xl font-bold lg:pl-2 pl-0">
                      REVIEWS
                    </p>
                    <div className="review_head ">
                      <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB3UlEQVR4nNWWv0tjQRDHn8LJFZq8HaNiISI5kasFwULEQv+BA5uzjmDvr8wsK9h4xWneTBRSWalgc1xx13p/wB1obWMtiHYqEiMbYk4SH+a9l/fAgal2vvvZ/e7sso7z7sKYrmomHSD4RzGdJApNM44A0yMIVVIeZhMDK6FVC7WpGFeSAzP9q4MF/yYCTXmYfYY+Z6ZAo7GDQQgbwcCYjx/MdNYEFjyNFdq7Q2PN0Fru0ue2A4f3zcf03ppSQpt+YDtma2xt6zvx9AwIXQLTje+OoiZX5750PT1dB/cVzSdguogNKnX4RdODo0qraRA6jguqGH+mvhvwtV2JzoHgffug+GBfOqfidLx55hlPjyvG83ZYq0RPttxsNsAzKWA8Cm2t4A/b5U7YcFkvWbuCWGs1TtToL6wPgGA5ALic2c4PRgYrxsXgNutcZDAI/g7eVPgrErSvaLoV422I5rqzzRkarIo07383ccOmX+NZbWgwCB2+djdd1lP1Gs5PvHrnGQ/CUUu5DyB43TDhcXrHuI2lvd+We4Cx1LDAm1DfX/Bw7uUkrodf39RI/gsIXv1fgJ4NDmbcqp4V04naxaFWdbbWamp2bwUGZwo06jItOMZ0BhYb02m1iXwCnfcST9nEk6kY/HV3AAAAAElFTkSuQmCC" />
                      <p className="text-xl md:text-3xl ">
                        {" "}
                        {`${givenRating.toFixed(2)} / 5`}
                      </p>
                      <p
                        className="text-xl md:text-3xl ml-3 "
                        style={{ color: "grey" }}
                      >
                        {`(${details?.reviews?.length} Reviews)`}
                      </p>
                    </div>
                  </div>
                  <div className="sorting_review w-[55%] flex pl-2 md:pl-0">
                    <p className="sm:text-2xl mt-2 font-semibold text-lg">
                      Sort by:
                    </p>
                    <div style={{ display: "flex", marginTop: "8px" }}>
                      <p className="sm:text-2xl font-semibold text-md">
                        Newest
                      </p>
                      <Image
                        src={require("../../public/assets/up-down-arrow-svgrepo-com 1.png")}
                        className="filter_imag ml-3 md:h-9 md:w-9 h-4 w-4"
                      />
                    </div>
                    <p className="sm:text-2xl mt-2 font-semibold text-md">
                      By Star
                    </p>
                    <div style={{ display: "flex", marginTop: "8px" }}>
                      <p className="sm:text-2xl font-semibold text-md">
                        Reviews with Photos
                      </p>
                      <Image
                        src={require("../../public/assets/checkbox.png")}
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
                          profileImage={require("../../public/assets/profileImage.png")}
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
                    <div className="flex-col justify-between lg:w-[25%] w-screen lg:pr-0 pr-10">
                      <div className="flex flex-col bg-white rounded-lg lg:p-8 p-4">
                        <p className="font-bold text-2xl flex">
                          {details?.details?.company_name}
                        </p>
                        <p className="flex font-normal text-left text-xl mt-5">
                          {details?.details?.category_name}
                        </p>
                        <div className="flex mt-5">
                          <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAACXBIWXMAAAsTAAALEwEAmpwYAAAB3UlEQVR4nNWWv0tjQRDHn8LJFZq8HaNiISI5kasFwULEQv+BA5uzjmDvr8wsK9h4xWneTBRSWalgc1xx13p/wB1obWMtiHYqEiMbYk4SH+a9l/fAgal2vvvZ/e7sso7z7sKYrmomHSD4RzGdJApNM44A0yMIVVIeZhMDK6FVC7WpGFeSAzP9q4MF/yYCTXmYfYY+Z6ZAo7GDQQgbwcCYjx/MdNYEFjyNFdq7Q2PN0Fru0ue2A4f3zcf03ppSQpt+YDtma2xt6zvx9AwIXQLTje+OoiZX5750PT1dB/cVzSdguogNKnX4RdODo0qraRA6jguqGH+mvhvwtV2JzoHgffug+GBfOqfidLx55hlPjyvG83ZYq0RPttxsNsAzKWA8Cm2t4A/b5U7YcFkvWbuCWGs1TtToL6wPgGA5ALic2c4PRgYrxsXgNutcZDAI/g7eVPgrErSvaLoV422I5rqzzRkarIo07383ccOmX+NZbWgwCB2+djdd1lP1Gs5PvHrnGQ/CUUu5DyB43TDhcXrHuI2lvd+We4Cx1LDAm1DfX/Bw7uUkrodf39RI/gsIXv1fgJ4NDmbcqp4V04naxaFWdbbWamp2bwUGZwo06jItOMZ0BhYb02m1iXwCnfcST9nEk6kY/HV3AAAAAElFTkSuQmCC" />
                          <p className="ml-2 text-md">
                            <span>{`${givenRating.toFixed(2)} / 5`}</span>{" "}
                            <span className="text-gray-400">{`(${details?.reviews?.length} Reviews)`}</span>
                          </p>
                        </div>
                        <button className="bg-[#12937C]  text-white font-bold py-4 px-4 sm:text-lg rounded-2xl w-full mt-10 mb-5">
                          GET A QUOTE
                        </button>
                        <button
                          className="bg-white font-semibold hover:bg-secondary hover:text-white transition-all py-4 px-6 cursor-pointer  border sm:text-md  border-[#12937C] rounded-2xl mx-auto mt-2  w-full"
                          onClick={handleButtonClick}
                        >
                          WRITE A REVIEW
                        </button>
                      </div>
                      <div className=" ">
                        <div className=" p-5 bg-white px-4 rounded-md mb-5">
                          <div className="flex ">
                            <Image
                              src={require("../../public/assets/phone-svgrepo-com.png")}
                              className="w-8 h-8"
                            />
                            <p className="ml-2 text-sm">(416) 770 7805</p>
                          </div>
                          <div className="divider"> </div>
                          <div className="flex my-4">
                            <Image
                              src={require("../../public/assets/search-globe-svgrepo-com.png")}
                              className="w-8 h-8"
                            />
                            <p className="ml-2  text-sm break-words">
                              <a
                                href="https://www.homeimprovementpeople.com"
                                rel="nofollow"
                                onClick={(e) => {
                                  e.preventDefault();
                                  navigator.clipboard
                                    .writeText(
                                      "https://www.homeimprovementpeople.com"
                                    )
                                    .then(() => {
                                      alert("Link copied to clipboard");
                                    })
                                    .catch((err) => {
                                      console.error("Failed to copy: ", err);
                                    });
                                }}
                              >
                                {details?.details?.website}
                              </a>
                            </p>
                          </div>
                        </div>
                        <div className="min-h-80 flex items-center flex-col justify-center bg-white lg:w-full  rounded-lg">
                          <iframe
                            className="h-[90%] lg:w-[250px] w-[screen] lg:pr-0 pr-4 rounded-sm"
                            frameBorder="0"
                            style={{ border: 0 }}
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d387269.2782824296!2dlongitude!3dlatitude!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zxxxxxxxxxxxxxxx!5e0!3m2!1sen!2sus!4v1561132387270!5m2!1sen!2sus"
                            allowFullScreen
                          ></iframe>
                          <center className="lg:w-full w-[screen] mt-6">
                            <button className="hover:bg-secondary hover:text-white transition-all cursor-pointer bg-transparent  font-semibold py-4 px-6  border sm:text-md  border-[#12937C] rounded-2xl mx-auto mt-2  ">
                              VIEW SERVICE AREA{" "}
                            </button>
                          </center>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
          )}
        </div>

        {zoomedImageUrl && (
          <ZoomedImageModal
            imageUrl={zoomedImageUrl}
            onClose={closeZoomedImage}
          />
        )}
      </TabContext>
    </Box>
  );
}
