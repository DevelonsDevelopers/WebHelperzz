'use client'
import { TabContext, TabList, TabPanel } from "@mui/lab";
import { Box, Tab } from "@mui/material";
import * as React from "react";
import Image from "next/image";
import { ExclamationMarkIcon, StarIcon } from "./svg";
import Reviews from "./Home/Reviews/ReviewParenet";
import { Credentials } from "./Credentials";
import { Projects } from "./Projects";
import { useEffect, useState } from "react";
import Loading from "./Loading";
import {IMAGE_PATH} from "@/api/BaseUrl";

export default function Tabs({ id, details }) {
  const [value, setValue] = React.useState("1");
  const [givenRating, setGivenRating] = useState(0);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     await new Promise((resolve) => setTimeout(resolve, 2000));
  //     setLoading(false);
  //   };
  //   fetchData();
  // }, []);

  useEffect(() => {}, []);
  useEffect(() => {
    if (details) {
      let rating = 0;
      for (const review of details.reviews) {
        rating = rating + parseInt(review.rating);
      }
      setGivenRating(rating / details?.reviews?.length);
    }
  }, [details]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
          <TabPanel value="1">
            {loading ? (
              <Loading />
            ) : (
              <>
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
                        <h2 className="text-2xl md:text-2xl font-semibold mb-3 text-text">
                          {details?.details?.company_name}
                        </h2>
                        <p className=" md:text-xl text-md md:mt-4 mt-2 text-[#444444]">
                          {details?.details?.category_name}
                        </p>
                        <p className="mb-3  md:text-xl text-md mt-2 text-[#444444]">
                          {details?.details?.address}
                        </p>
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
                          className={'w-full bg-white border border-[#43D9BE] rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#43D9BE]'}
                        />
                      </div>
                      <div className="mb-5">
                        <input
                          type="text"
                          placeholder="Your Name"
                          id="name"
                          name="name"
                          className={'w-full bg-white border border-[#43D9BE] rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#43D9BE]'}
                        />
                      </div>
                      <div className="mb-5">
                        <input
                          placeholder="Phone Number"
                          type="tel"
                          id="phone"
                          name="phone"
                          className={'w-full bg-white border border-[#43D9BE] rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#43D9BE]'}
                        />
                      </div>
                      <div className="mb-5">
                        <input
                          type="text"
                          id="zip"
                          placeholder="Zip Code"
                          name="zip"
                          className={'w-full bg-white border border-[#43D9BE] rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#43D9BE]'}
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
                  <Projects />
                </div>
                <Reviews details={details} />
              </>
            )}
          </TabPanel>
          <TabPanel value="2">
            {loading ? (
              <Loading />
            ) : (
              <div className="grid lg:grid-cols-12 gap-10">
                <div className="lg:col-span-12">
                  <div className="flex flex-wrap">
                    <div className="mb-4 md:mb-0 lg:w-[300px]">
                      <Image
                        className="lg:w-[300px] w-[screen]"
                        src={require("/public/assets/images/Bathroom.png")}
                        alt=""
                      />
                    </div>
                    <div className="lg:ml-4">
                      <h2 className="text-2xl md:text-2xl font-semibold mb-3 text-text">
                        {details?.details?.company_name}
                      </h2>
                      <p className=" md:text-xl text-md md:mt-4 mt-2 text-[#444444]">
                        {details?.details?.category_name}
                      </p>
                      <p className="mb-3  md:text-xl text-md mt-2 text-[#444444]">
                        {details?.details?.address}
                      </p>
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

                      <h4 className="mt-10 text-xl md:text-2xl font-semibold mb-4 text-text">
                        Website:
                      </h4>
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
                          {/* <Image
                          src={require("../../../src/assets/images/progressBar.png")}
                          alt=""
                        /> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabPanel>
          <TabPanel value="3">
            {loading ? (
              <Loading />
            ) : (
              <div className="img_align w-[screen] pl-2 md:pl-0  overflow-x-auto  flex flex-wrap gap-10">
                <Image
                  src={require("/public/assets/Rectangle 121.png")}
                  className="h-[280px] w-[350px]"
                />
                <Image
                  src={require("/public/assets/Rectangle 122.png")}
                  className="h-[280px] w-[350px]"
                />
                <Image
                  src={require("/public/assets/Rectangle 123.png")}
                  className="h-[280px] w-[350px]"
                />
                <Image
                  src={require("/public/assets/Rectangle 124.png")}
                  className="h-[280px] w-[350px]"
                />
                <Image
                  src={require("/public/assets/Rectangle 127.png")}
                  className="h-[280px] w-[350px]"
                />
                <Image
                  src={require("/public/assets/Rectangle 121.png")}
                  className="h-[280px] w-[350px]"
                />
              </div>
            )}
          </TabPanel>
          <TabPanel value="4">
            {loading ? <Loading /> : <Reviews details={details} />}
          </TabPanel>
        </div>
      </TabContext>
    </Box>
  );
}
