'use client'

import React, { useState , useRef} from "react";
// import Header from "../../components/Header";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Button from "@mui/material/Button";
import Head from 'next/head';
import { usePathname } from 'next/navigation'
 
const Page = ({params}) => {
  
  const pathname = usePathname()

console.log('params', params)

    return(
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


 <div className="flex flex-col gap-5 lg:gap-10 py-44 justify-center items-center bg-gray-200 min-h-[100vh] ">

<div className=" rounded-lg bg-gray-100 shadow-lg w-[50%] max-md:w-[90%]">
    <div className="flex flex-wrap  ">
      <div className="px-8 md:px-0 m-auto">
        <div className="md:mx-6 md:p-12">
          <form className="justify-center items-center mx-auto">
            <div className="flex justify-center">
            <CheckCircleOutlineIcon  style={{ fontSize : 90 , color:'#44CA77' }} />
</div>
            <p className="  mt-10 font-semibold text-2xl  text-center">
            {params?.id === 'email-sent' ? 'Check your E-mail' : params?.id === 'password-change' ? 'Password changed successfully' : '' }
            </p>
            <p className="mb-6  mt-4 font-semibold text-sm text-gray-500 max-w-[390px] text-center">
              {params?.id === 'email-sent' ?  'Your new passoword must be different from any of your previous passwords.' :''}
             </p>
             <center >
            {params?.id === 'password-change' && (
              <Button
              style={{userSelect: "text"}}
              variant="contained"
              className="btn_header text-sm"
              disableElevation
              onClick={() => navigate.push("/login")}

          >
              Go To Login Page
          </Button>
            )}
            </center>
            
          </form>
        </div>
      </div>
    </div>
  </div>
</div>       
     </div>
    )
}
export default Page