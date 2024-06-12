"use client";
import classNames from "classnames";
import { Tab } from "@headlessui/react";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import ServicesRequests from "../../components/accountsComponents/SeviceRequest";
import MyProfile from "@/components/accountsComponents/MyProfile";
import MyReviews from "@/components/accountsComponents/MyReviews";

function Page() {

 
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
      <Footer  showNewsLetter={false}  postProject={false} />
    </>
  );
}



export default Page;
