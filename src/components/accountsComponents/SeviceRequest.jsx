import { Menu } from "@headlessui/react";
import Image from "next/image";
import react, { useState, useEffect } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";
import image from "/public/assets/bath.png";
import { IoAlertCircle, IoStarSharp } from "react-icons/io5";
import Link from "next/link";
import classNames from "classnames";
import trustsealbadge from "/public/assets/trustsealbadge.png";
import customerService from "@/api/services/customerService";
import moment from 'moment';
import { IoIosArrowDown } from "react-icons/io";


const ServicesRequests = ({ params }) => {
  const [active, setActive] = useState(0);
  const [chatActive, setChatActive] = useState(0);
  const [showChat, setShowChat] = useState(true);

  const [request, setRequest] = useState([]);
  const [data, setData] = useState([]);
  
  useEffect(() => {
      const dataWithDropdown = request.map(item => ({
          ...item,
          dropdown: false  
      }));
      setData(dataWithDropdown);
  }, [request]);

  console.log('data main' , data)
  const [id, setId] = useState(params?.id);
 
  useEffect(() => {
    if (params) {
      setId(params?.id);
    }
  }, [params]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customerService.getRequest(id);
        console.log("response", response);
        setRequest(response?.requests)
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="flex flex-col items-start gap-10 max-w-[1100px] px-10 mx-auto justify-center">
      <Menu as="div" className="relative">
        <Menu.Button className="flex justify-center items-center gap-3 border-2 rounded-xl py-2 px-5">
          <div className="relative">
            State Active{" "}
            <div className="bg-green-500 w-2 h-2 absolute -right-2 -top-1 rounded-full" />{" "}
          </div>
          <MdKeyboardArrowDown size={25} />
        </Menu.Button>
        <Menu.Items className="absolute top-full z-50 bg-white flex flex-col gap-2 border-2 p-2 w-[250px] rounded-md">
          <Menu.Item>
            {({ active }) => (
              <button
                className={`text-left px-5 py-1 ${active && "bg-gray-50"}`}
              >
                Active
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                className={`text-left px-5 py-1 ${active && "bg-gray-50"}`}
              >
                Idle
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Menu>
      <div className="flex flex-wrap lg:flex-nowrap gap-5 w-full">
        <div className="lg:w-[72%] w-screen">
          <div className="flex flex-wrap border rounded-3xl divide-x-2 w-full duration-100">
            <div className="divide-y  lg:w-[45%] flex-1 w-screen">
              <div className="flex items-center justify-between p-5 h-20">
                <p className="text-[#000000] text-opacity-80 text-base font-semibold">
                  My Service Request Details
                </p>
              </div>

              <h6 className="text-xl font-bold px-5 ">Service Request</h6>
              <div className="flex flex-col gap-5 pt-8">
              {data.map((value, index) => (
    <div key={index}>
        <button
            onClick={() => {
                setActive(index);
                setData(prevData => {
                    const newData = [...prevData];
                    newData[index] = { ...newData[index], dropDown: !newData[index].dropDown };
                    return newData;
                });
            }}
            className={classNames(
                "flex items-start justify-between w-full py-6 px-5 border-t",
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
            <IoIosArrowDown  className={`${value.dropDown ? 'rotate-180 ' :''} transition ease-in-out delay-200`} />
        </button>
        {value?.dropDown && (
            <div>
                <h6 className="text-xl font-bold px-5 mt-2">Contractors</h6>
                <div>
                    {value?.contractors?.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setChatActive(index)}
                            className={classNames(
                                "flex items-start justify-between w-full py-6 px-5  ",
                                { "border-b-2 border-black bg-opacity-10": chatActive === index }
                            )}
                        >
                            {/* <div className="bg-[#D9D9D9] sm:w-14 sm:h-14 w-10 h-10 rounded-full" /> */}
                            <div className="flex flex-col items-start gap-1 mt-1 sm:w-[240px] w-screen ml-2">
                                <h6 className="text-black font-semibold text-left text-opacity-80 text-base line-clamp-1 text-ellipsis">
                                    {_.company_name}
                                </h6>
                                <p className="text-black text-opacity-80 text-sm">
                                    Interested
                                </p>
                            </div>
                            <p className="text-black text-opacity-50 text-sm mt-2">
                                Mar 25
                            </p>
                        </button>
                    ))}
                </div>
            </div>
        )}
    </div>
))}

              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 lg:w-[38%] w-full">
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
                <IoStarSharp className="text-[#12937C]" size={30} />
                <p className="text-base">4.8 / 5</p>
              </div>
              <Image
                src={trustsealbadge}
                width={100}
                height={50}
                alt="trustBadge"
              />
            </div>
            <div className="flex flex-col w-full">
              <div className="flex gap-1 items-center">
                <p className="w-[200px] text-right text-sm">Average Rating</p>
                <div className="w-full rounded-full h-[13px] bg-[#12937C]" />
                <IoAlertCircle className="text-[#E0E0E0] " size={30} />
              </div>
              <div className="flex gap-1 items-center">
                <p className="w-[200px] text-right text-sm">Recency</p>
                <div className="w-full rounded-full h-[13px] bg-[#12937C]" />
                <IoAlertCircle className="text-[#E0E0E0] " size={30} />
              </div>
              <div className="flex gap-1 items-center">
                <p className="w-[200px] text-right text-sm">Reputation</p>
                <div className="w-full rounded-full h-[13px] bg-[#12937C]" />
                <IoAlertCircle className="text-[#E0E0E0] " size={30} />
              </div>
              <div className="flex gap-1 items-center">
                <p className="w-[200px] text-right text-sm">Responsiveness</p>
                <div className="w-full rounded-full h-[13px] bg-[#12937C]" />
                <IoAlertCircle className="text-[#E0E0E0] " size={30} />
              </div>
              <button className="font-semibold text-base w-[170px] mx-auto rounded-2xl px-5 py-[10px] mt-3 bg-white border border-[#12937C]">
                See Full Profile
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-5 items-center w-full border bg-[#F7F9FB] rounded-3xl p-5">
            <h6 className="text-xl font-bold">Recent Reviews</h6>
            <div className="flex flex-col gap-2">
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
                      <span className="font-normal text-[#313232] pl-3">
                        28.02.2024
                      </span>
                    </p>
                    <div className="flex items-center gap-2 ">
                      <IoStarSharp className="text-[#12937C]" size={25} />
                      <p className="">4.8 / 5</p>
                    </div>
                    <p className="font-semibold text-[#313232] text-xs">
                      Bathroom Renovation new Bathroom
                    </p>
                  </div>
                </div>
                <p className="text-[#262626] font-semibold text-sm line-clamp-2 text-ellipsis">
                  Happy to have found HIP to do my bathrooms! Did my kitchen
                  basement renos and all were...
                </p>
                <Link href="" className="text-sm font-semibold text-[#12937C]">
                  Read More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ServicesRequests;
