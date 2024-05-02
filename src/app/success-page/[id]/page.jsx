'use client'

import React, { useState , useRef} from "react";
// import Header from "../../components/Header";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

 
const Page = ({params}) => {
  

console.log('params', params)

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
            <p className="  mt-10 font-semibold text-2xl  text-center">
            {params?.id === 'email-sent' ? 'Check your e-mail' : params?.id === 'passowrd-change' ? 'Password Change Successfully' : '' }
            </p>
            <p className="mb-6  mt-4 font-semibold text-sm text-gray-500 max-w-[390px] text-center">
              {params?.id === 'email-sent' ?  'Your new passoword must be different from any of your previous passwords.' :''}
             </p>
            
            
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