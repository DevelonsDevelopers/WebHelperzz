'use client'
import React from "react";
import Header from "../../components/Header";
import { Footer } from "@/components/Footer";
import Head from 'next/head';
import { usePathname } from 'next/navigation'

const Page = () => {
    const pathname = usePathname()

    return (
<div>
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
    <div className="main-title mt-[6rem] ml-8 my-8 sm:ml-16">
        <h1 className="text-[18px]">Helperzz / Get Started</h1>
      </div>
    <div className="mt-[30vh]">
        </div>
    <Footer  />
    </div>
    )
};
export default Page;
