"use client";
import React, { useEffect, useState } from "react";
import { Suspense } from "react";
import BreadCrumbs from "../../../components/BreadCrumbs";
import Tabs from "../../../components/Tabs";
import Header from "../../../components/Header";
import { Footer } from "../../../components/Footer";
import contractorService from "../../../api/services/contractorService";

import { useRouter } from "next/navigation";
import Loading from "@/components/loading";
import Head from 'next/head';
import { usePathname } from 'next/navigation'

function ProfileComponent({ params }) {
  const [ID, setID] = useState();
  const [details, setDetails] = useState();
  const [loading, setLoading] = useState(false);
  const pathname = usePathname()

  const location = useRouter();
  // const params = new URLSearchParams(location.search);

  useEffect(() => {
    setID(params.id);
  }, []);

  const getDetails = async () => {
    try {
      const response = await contractorService.detailsTag(ID);
      console.log(ID);
      console.log(response);
      setDetails(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (ID) {
      getDetails();
    }
  }, [ID]);

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
      <Header />
      {loading ? (
        <Loading />
      ) : (
        <Suspense fallback={<p>Loading feed...</p>}>
          <div className="pt-14">
            <div className="profile_container max-w-[1200px] mx-auto  px-6  pt-10 md:pt-32">
              <BreadCrumbs details={details} />
            </div>
            <div className="mt-14">
              <Tabs id={ID} details={details} />
            </div>
          </div>
        </Suspense>
      )}
      <Footer />
    </>
  );
}
export default ProfileComponent;
