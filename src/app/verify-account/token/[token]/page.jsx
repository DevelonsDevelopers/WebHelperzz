'use client'

import React, { useState , useRef} from "react";
// import Header from "../../components/Header";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Button from "@mui/material/Button";
import {useRouter} from 'next/navigation'


 
const Page = ({params}) => {
  

console.log('params', params)

const navigate = useRouter()

    return(
        <div>
     {/* <Header /> */}


 <div className="flex flex-col gap-5 lg:gap-10 py-44 justify-center items-center bg-gray-200 min-h-[100vh] ">

<div className=" rounded-lg bg-gray-100 shadow-lg w-[50%] max-md:w-[90%]">
    <div className="flex flex-wrap  ">
      <div className="px-8 md:px-0 m-auto">
        <div className="md:mx-6 md:p-12">
          <form className="justify-center items-center mx-auto">
            <div className="flex justify-center">
            <CheckCircleOutlineIcon  style={{ fontSize : 90 , color:'#44CA77' }} />
</div>
            <p className="  mt-6 font-semibold text-2xl  text-center">
                Account verified successfuly
             </p>
            
             <center className="mt-4">
             <Button
              style={{ userSelect: "text" }}
              variant="contained"
              className="btn_header text-sm"
              disableElevation
              onClick={() => navigate.push("/")}

            >
              Continue
            </Button>
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