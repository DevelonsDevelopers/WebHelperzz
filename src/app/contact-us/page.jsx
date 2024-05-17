"use client";
import Header from "../../components/Header";
import { Footer } from "../../components/Footer";
import { useState } from "react";
import { IoIosCall } from "react-icons/io";
import { MdFolderCopy } from "react-icons/md";

const tabs = [{ name: "For Service Pros" }, { name: "For HomeOwners" }];

const Page = () => {
  const [selected, setSelected] = useState(0);
  const [homeOwnerData, setHomeOwnerData] = useState({
    name: "",
    last_name: "",
    email: "",
    message: "",
  });

  const [serviceProData, setServiceProData] = useState({
    name: "",
    last_name: "",
    company_name: "",
    phone: "",
    email: "",
    topic: "",
    message: "",
  });

  console.log('service pro' , serviceProData)
  console.log('home owner' , homeOwnerData)

  const handleSubmit = () => {};

  return (
    <div className="">
      <Header />

      <div className="bg-[#1B3047] mt-[5rem] py-20">
        <div className="max-w-[1000px] m-auto">
          <h1 className="text-[2rem] font-[400] text-gray-300 ">Contact Us </h1>
          <h1 className="text-[1rem] font-[600] text-gray-300 max-w-[500px] mt-4">
            Our team is ready to assist you. Reach out to one of our teams
            below.{" "}
          </h1>
          <button className="bg-[#3FA9E2] px-4 py-2 uppercase m-auto mt-4 font-[500] rounded-sm text-white ">
            Are you a service pro ?
          </button>
        </div>
      </div>

      <div className="flex max-md:flex-col max-w-[800px] my-10 max-md:w-[90%] m-auto ">
        <div className="flex-col ">
          {tabs.map((value, index) => (
            <h1
              key={index}
              onClick={() => setSelected(index)}
              className={`border-t-[1px] border-b-[1px] border-l-[1px] border-gray-400 min-w-[250px] py-4 pl-4 text-lg text-gray-600 mt-2 cursor-pointer rounded-l-md ${
                selected === index
                  ? "bg-[#EDEEEF]"
                  : "bg-white hover:bg-[#EDEEEF]"
              }`}
            >
              {value.name}
            </h1>
          ))}
        </div>

        {selected === 0 ? (
          <div className="w-1/.2 !border-[1px] border-gray-400 px-10 max-md:px-4 py-8 mt-2">
            <h1 className="text-center text-lg text-gray-600 font-[400] ">
              Get in touch with us anytime, we're always here to help!
            </h1>

            <h1 className="text-gray-700 text-[14px] my-4 text-center font-[500]">
              Fill out the form below to send us a message:{" "}
            </h1>

            <form className="mt-4" onSubmit={handleSubmit}>
              <div className="flex gap-2 max-md:flex-col">
                <input
                  type="text"
                  required
                  value={serviceProData?.name}
                  onChange={(e) =>
                    setServiceProData({
                      ...serviceProData,
                      name: e.target.value,
                    })
                  }
                  className="py-2 w-full border-[1px] border-gray-300 text-sm rounded-sm px-6 text-gray-600 focus:outline-none"
                  placeholder="First Name *"
                />
                <input
                  type="text"
                  required
                  value={serviceProData?.last_name}
                  onChange={(e) =>
                    setServiceProData({
                      ...serviceProData,
                      last_name: e.target.value,
                    })
                  }
                  className="py-2 w-full border-[1px] border-gray-300 text-sm rounded-sm px-6 text-gray-600 focus:outline-none"
                  placeholder="Last Name *"
                />
              </div>

              <input
                type="text"
                required
                value={serviceProData?.company_name}
                onChange={(e) =>
                  setServiceProData({
                    ...serviceProData,
                    company_name: e.target.value,
                  })
                }
                className="py-2 w-full border-[1px] border-gray-300 text-sm mt-2 rounded-sm px-6 text-gray-600  focus:outline-none"
                placeholder="Company Name *"
              />

              <div className="flex gap-2 mt-2 max-md:flex-col">
                <input
                  type="phone"
                  required
                  value={serviceProData?.phone}
                  onChange={(e) =>
                    setServiceProData({
                      ...serviceProData,
                      phone: e.target.value,
                    })
                  }
                  className="py-2 w-full border-[1px] border-gray-300 text-sm rounded-sm px-6 text-gray-600 focus:outline-none"
                  placeholder="Phone *"
                />

                <input
                  type="email"
                  required
                  value={serviceProData?.email}
                  onChange={(e) =>
                    setServiceProData({
                      ...serviceProData,
                      email: e.target.value,
                    })
                  }
                  className="py-2 w-full border-[1px] border-gray-300 text-sm rounded-sm px-6 text-gray-600 focus:outline-none"
                  placeholder="Email *"
                />
              </div>
              <select
                value={serviceProData?.topic}
                onChange={(e) =>
                  setServiceProData({
                    ...serviceProData,
                    topic: e.target.value,
                  })
                }
                className="py-2 w-full border-[1px] border-gray-300 text-sm rounded-sm px-6 text-gray-600 focus:outline-none mt-2"
                required
              >
                <option value="Choose a Topic " selected disabled>
                  Choose a Topic
                </option>
                <option value="Getting started">Getting started</option>
                <option value="Princing">Pricing</option>
                <option value="Billing & Payment">Billing & Payment</option>
                <option value="Customer Support">Customer Support</option>
                <option value="General Inquiries">General Inquiries</option>
              </select>
              <textarea
                required
                value={serviceProData?.message}
                onChange={(e) =>
                  setServiceProData({
                    ...serviceProData,
                    message: e.target.value,
                  })
                }
                className="py-2 w-full border-[1px] border-gray-300 text-sm rounded-sm px-6 text-gray-600 focus:outline-none mt-2"
                placeholder="Message *"
              />
              <input
                type="submit"
                value="Send Message"
                className="py-2 w-full border-[1px] border-gray-300 text-sm rounded-sm px-6 text-gray-600 focus:outline-none mt-2 bg-[#3FA9E2] text-white cursor-pointer font-[600]"
              />
            </form>
            <h1 className="text-gray-700 text-[14px] my-4 text-center font-[400]">
              *Our team is available Monday - Friday from 9 am to 5 pm EST{" "}
            </h1>
          </div>
        ) : (
          <div className="w-1/.2 !border-[1px] border-gray-400 px-10 py-8 mt-2">
            <h1 className="text-center text-lg text-gray-600 font-[500] ">
              Get in touch with us anytime, we're always here to help!
            </h1>
            <h1 className="text-gray-700 text-[14px] my-4 text-center font-[500]">
              Fill out the form below to send us a message:{" "}
            </h1>

            <form className="mt-4">
              <div className="flex gap-2 max-md:flex-col">
                <input
                  type="text"
                  required
                  value={homeOwnerData?.name}
                  onChange={(e) =>
                    setHomeOwnerData({ ...homeOwnerData, name: e.target.value })
                  }
                  className="py-2 w-full border-[1px] border-gray-300 text-sm rounded-sm px-6 text-gray-600 focus:outline-none"
                  placeholder="First Name *"
                />

                <input
                  type="text"
                  required
                  value={homeOwnerData?.last_name}
                  onChange={(e) =>
                    setHomeOwnerData({
                      ...homeOwnerData,
                      last_name: e.target.value,
                    })
                  }
                  className="py-2 w-full border-[1px] border-gray-300 text-sm rounded-sm px-6 text-gray-600 focus:outline-none"
                  placeholder="Last Name *"
                />
              </div>

              <input
                type="email"
                required
                value={homeOwnerData?.email}
                onChange={(e) =>
                  setHomeOwnerData({ ...homeOwnerData, email: e.target.value })
                }
                className="py-2 w-full border-[1px] border-gray-300 text-sm rounded-sm px-6 text-gray-600 focus:outline-none mt-2"
                placeholder="Email *"
              />

              <textarea
                required
                value={homeOwnerData?.message}
                onChange={(e) =>
                  setHomeOwnerData({
                    ...homeOwnerData,
                    message: e.target.value,
                  })
                }
                className="py-2 w-full border-[1px] border-gray-300 text-sm rounded-sm px-6 text-gray-600 focus:outline-none mt-2"
                placeholder="Message *"
              />
              <input
                type="submit"
                value="Send Message"
                className="py-2 w-full border-[1px] border-gray-300 text-sm rounded-sm px-6 text-gray-600 focus:outline-none mt-2 bg-[#3FA9E2] text-white cursor-pointer font-[600]"
              />
            </form>
            <h1 className="text-gray-700 text-[14px] my-4 text-center font-[400] italic	">
              *Our team is available Monday - Friday from 9 am to 5 pm EST{" "}
            </h1>
            <h1 className="text-gray-700 text-[14px] text-center font-[400] italic	">
              For inquiries regarding removal of personal data, please see our
              privacy policy
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};
export default Page;
