"use client";
import React, { useEffect, useState } from "react";
import BreadCrumbs from "../../components/BreadCrumbs";
import Tabs from "../../components/Tabs";
import Header from "../../components/Header";
import { Footer } from "../../components/Footer";
import contractorService from "../../api/services/contractorService";
import Loading from "../../components/Loading";
import { useRouter } from "next/navigation";

function Page() {
  const [ID, setID] = useState(3);
  const [details, setDetails] = useState();

  const location = useRouter();
  const params = new URLSearchParams(location.search);

  useEffect(() => {
    setID(params.get("id"));
  }, []);

  const getDetails = async () => {
    try {
      const response = await contractorService.details(3);
      console.log(ID);
      console.log(response);
      setDetails(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // if (ID) {
    getDetails();
    // }
  }, [ID]);

  return (
    <>
      <Header />
      {/* <Loading /> */}
      <div className="pt-14">
        <div className="profile_container max-w-[1200px] mx-auto  px-6  pt-10 md:pt-32">
          <BreadCrumbs details={details} />
        </div>
        <div className="mt-14">
          <Tabs id={ID} details={details} />
        </div>
      </div>

      <Footer />
    </>
  );
}
export default Page;
