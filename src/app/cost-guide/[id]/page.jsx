"use client";
'use client'

import Header from "@/components/Header";
import { Footer } from "@/components/Footer";
import React, { useState, useEffect } from "react";
import costGuideService from "@/api/services/costGuideService";
import Link from "next/link";
import moment from "moment";
import {IMAGE_PATH} from "@/api/BaseUrl";
import Head from 'next/head';
import { usePathname } from 'next/navigation'

function CostGuide({ params }) {
  const [costGuide, setCostGuide] = useState();
  const pathname = usePathname()

 

  useEffect(() => {
        const getCostGuide = async () => {
            try {
              const response = await costGuideService.fetchByTag(params?.id);
              console.log('response',response);
              setCostGuide(response.costGuide);
            } catch (error) {
              console.error(error);
            }
          };
    getCostGuide()
}, []);
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


            <Header/>
            <div className="max-w-[1000px] mt-[10rem] m-auto">
            <div className="">
              
                                    <h3 className="font-bold text-3xl max-w-2xl leading-relaxed">{costGuide?.title}</h3>
                                 <h4 className="font-semibold text-2xl font-[300]">{costGuide?.subtitle}</h4>
                                    {/* <p>Updated {moment(costGuide?.created_date).format("ll")}</p> */}
                                </div> 
                        <div className="flex flex-wrap lg:flex-nowrap gap-5 w-full max-w-[1300px] mx-auto">
                            <div className="flex text-lg flex-col gap-3 w-screen p-4">
                                <div className=' w-full'>
                                    <img src={`${IMAGE_PATH}${costGuide?.image}`} className=" min-w-[400px] min-h-[400px] m-auto rounded-xl" fill alt={costGuide?.title}/>
                                </div>
                                <p className={``} dangerouslySetInnerHTML={{
                                    __html: costGuide?.content,
                                }}/>
                            </div>
                           
                            
                 </div>
            </div>
         <Footer showNewsLetter={false}  postProject={false} />
        </>
  );
}




export default CostGuide;
