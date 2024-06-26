import Image from "next/image";
import react, { useState, useEffect } from "react";
import { IoAlertCircle, IoStarSharp } from "react-icons/io5";
import classNames from "classnames";
import trustsealbadge from "/public/assets/trustsealbadge.png";
import customerService from "@/api/services/customerService";
import moment from "moment";
import { IoIosArrowDown } from "react-icons/io";
import { PatternFormat } from "react-number-format";
import { useRouter } from "next/navigation";
import { IMAGE_PATH } from "@/api/BaseUrl";

const ServicesRequests = () => {
  const [active, setActive] = useState(0);
  const [chatActive, setChatActive] = useState(0);
  const [showChat, setShowChat] = useState(true);

  const [request, setRequest] = useState([]);
  const [data, setData] = useState([]);

  const navigation = useRouter();

  const [ratings, setRatings] = useState();
  const [reviews, setReviews] = useState();
  const [trustSeal, setTrustSeal] = useState();
  const [contractor, setContractor] = useState();
  const [noData, setNoData] = useState(false);
  const [contractorImage , setContractorImage] = useState()

  useEffect(() => {
    const dataWithDropdown = request.map((item) => ({
      ...item,
      dropdown: false,
    }));
    setData(dataWithDropdown);
  }, [request]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customerService.getRequest();
        console.log("response", response);
        setRequest(response?.requests);
        setNoData(response?.requests.length === 0);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-start gap-10 max-w-[1100px] px-10 mx-auto justify-center">
      <div className="flex flex-wrap lg:flex-nowrap gap-5 w-full pb-10">
        <div className="lg:w-[72%] w-screen border-2 rounded-3xl">
          <div className="flex flex-wrap   divide-x-2 w-full duration-100">
            <div className="   lg:w-[45%] flex-1 w-screen">
              <div className="flex items-center justify-between p-5 h-20">
                <p className="text-[#000000] text-opacity-80 text-base font-semibold">
                  My Service Request Details
                </p>
              </div>

              <h6
                className={`text-xl font-bold px-5 ${
                  noData ? "" : "text-center "
                }`}
              >
                {data?.length > 0 ? "Service Request" : "No service request"}{" "}
              </h6>
              <div className="flex flex-col gap-5 pt-8">
                {data.map((value, index) => (
                  <div key={index}>
                    <button
                      onClick={() => {
                        setActive(index);
                        setData((prevData) => {
                          const newData = [...prevData];
                          newData[index] = {
                            ...newData[index],
                            dropDown: !newData[index].dropDown,
                          };
                          return newData;
                        });
                      }}
                      className={classNames(
                        "flex justify-between w-full items-center py-2 px-5 border-t",
                        { "bg-[#12937C] bg-opacity-10": value?.dropDown }
                      )}
                    >
                      <div className="flex flex-col items-start gap-1 mt-1 sm:w-[240px] w-screen ml-2">
                        <h6 className="text-black font-semibold text-left text-opacity-80 text-base line-clamp-1 text-ellipsis">
                          {value.subcategory_name}
                        </h6>
                        <p className="text-black text-opacity-80 text-sm">
                          {value.home_type}
                        </p>
                        <p className="text-black text-opacity-80 text-sm">
                          {value.time}
                        </p>
                      </div>
                      <p className="text-black text-opacity-50 text-sm mt-2">
                        {moment(value.created_at).format("MMM Do YY")}
                      </p>
                      <IoIosArrowDown
                        className={`${
                          value.dropDown ? "rotate-180 " : ""
                        } transition ease-in-out delay-200`}
                      />
                    </button>
                    {value?.dropDown && (
                      <>
                        {value?.contractors?.length > 0 ? (
                          <div className="max-h-[20rem] overflow-y-auto">
                            <h6 className="text-xl font-bold px-5 py-2 text-center">
                              Contractors
                            </h6>
                            <div>
                              {value.contractors.map((contractor, index) => (
                                <button
                                  key={index}
                                  onClick={() => {
                                    setChatActive(index);
                                    setReviews(contractor?.reviews);
                                    setRatings(contractor?.ratings),
                                      setTrustSeal(contractor?.trust_seal);
                                    setContractor(contractor?.company_name);
                                    setContractorImage(contractor?.image);
                                  }}
                                  className={classNames(
                                    "flex items-start justify-between w-full py-6 px-5",
                                    {
                                      "border-b-2 border-black bg-opacity-10":
                                        chatActive === index,
                                    }
                                  )}
                                >
                                  <div className="flex flex-col items-start gap-1 mt-1 sm:w-[240px] w-screen ml-2">
                                    <h6 className="text-black font-semibold text-left text-opacity-80 text-base line-clamp-1 text-ellipsis">
                                      {contractor.company_name}
                                    </h6>
                                    <PatternFormat
                                      disabled={true}
                                      type="tel"
                                      format="+1 (###) ###-####"
                                      value={contractor?.phone}
                                      placeholder="Phone Number"
                                      className="border-0 "
                                      required
                                    />
                                  </div>
                                  <p className="text-black text-opacity-50 text-sm mt-2">
                                    {moment(value.created_date).format(
                                      "MMM Do YY"
                                    )}
                                  </p>
                                </button>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <h1 className="text-center font-semibold text-xl py-6">
                            No contractors yet
                          </h1>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 lg:w-[38%] w-full">
            {contractor && (
              <>
          <div className="flex flex-col items-center gap-3 bg-[#F7F9FB] border rounded-3xl p-2">
                <div className="relative w-full h-64 rounded-2xl">
                  <img
                    className="h-64 w-full rounded-xl "
                    src={`${IMAGE_PATH}${contractorImage}`}
                    alt=""
                  />
               
                </div>
                <h6 className="text-xl font-semibold line-clamp-1 text-ellipsis">
                  {contractor}
                </h6>

                <div className="flex items-center w-full md:justify-between justify-center md:gap-0 gap-5">
                  <h6 className="text-base font-semibold pl-3">Star Score </h6>
                  <div className="flex items-center gap-2 ">
                    <IoStarSharp className="text-[#12937C]" size={30} />
                    <p className="text-base">
                      {ratings?.average
                        ? parseFloat(ratings.average).toFixed(2)
                        : 0}{" "}
                      / 5
                    </p>
                  </div>

                  {trustSeal != 0 && (
                    <Image
                      src={trustsealbadge}
                      width={100}
                      height={50}
                      alt="trustBadge"
                    />
                  )}
                </div>
                <div className="flex flex-col w-full">
                  <div className="flex gap-1 items-center">
                    <p className="w-[200px] text-right text-sm">
                      Average Rating
                    </p>
                    <progress
                      id="file"
                      value={ratings?.avg}
                      max="5"
                      class="w-full h-4 block"
                    >
                      <span class="rounded-full">32%</span>
                    </progress>
                    <IoAlertCircle className="text-[#E0E0E0] " size={30} />
                  </div>
                  <div className="flex gap-1 items-center">
                    <p className="w-[200px] text-right text-sm">Recency</p>
                    <progress
                      id="file"
                      value={ratings?.recency}
                      max="5"
                      class="w-full h-4 block"
                    >
                      <span class="rounded-full">32%</span>
                    </progress>
                    <IoAlertCircle className="text-[#E0E0E0] " size={30} />
                  </div>
                  <div className="flex gap-1 items-center">
                    <p className="w-[200px] text-right text-sm">Reputation</p>
                    <progress
                      id="file"
                      value={ratings?.reputation}
                      max="5"
                      class="w-full h-4 block"
                    >
                      <span class="rounded-full">32%</span>
                    </progress>
                    <IoAlertCircle className="text-[#E0E0E0] " size={30} />
                  </div>

                  {contractor && (
                    <button
                      onClick={() =>
                        navigation.push(
                          `/profile/${contractor
                            ?.replaceAll(" ", "-")
                            .replaceAll("/", "-")
                            .toLowerCase()}`
                        )
                      }
                      className="font-semibold text-base w-[170px] mx-auto rounded-2xl px-5 py-[10px] mt-3 bg-white border border-[#12937C]"
                    >
                      See Full Profile
                    </button>
                  )}
                </div>
          </div>
              </>
            )}
          <div className="flex flex-col gap-5 items-center w-full border bg-[#F7F9FB] rounded-3xl p-5">
            <h6 className="text-xl font-bold">
              {contractor ? "Recent Reviews" : "No Contractor Selected"}
            </h6>
            {reviews?.map((value, index) => (
              <div key={index} className="flex flex-col gap-2">
                <div className="flex flex-col gap-2 bg-white rounded-2xl p-4">
                  <div className="flex gap-2">
                    <div className="flex flex-col justify-between">
                      <p className="font-bold line-clamp-1 text-ellipsis">
                        {value?.name}
                        <span className="font-normal text-[#313232] pl-3">
                          {moment(value?.created_date).format("MMM Do YY")}
                        </span>
                      </p>
                      <div className="flex items-center gap-2 ">
                        <IoStarSharp className="text-[#12937C]" size={25} />
                        <p className="">{value?.rating} / 5</p>
                      </div>
                      <p className="font-semibold text-[#313232] text-xs">
                        {value?.title}
                      </p>
                    </div>
                  </div>
                  <p className="text-[#262626] font-semibold text-sm line-clamp-2 text-ellipsis">
                    {value?.review}
                  </p>
                  {/* <Link href="" className="text-sm font-semibold text-[#12937C]">
                  Read More
                </Link> */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default ServicesRequests;
