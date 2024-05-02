'use client'

import React, { useState , useRef} from "react";
import Header from "../../components/Header";
import { useRouter } from "next/navigation";
 
const Page = () => {

  const navigation = useRouter();

    const numInputs = 6;
    const [otp, setOtp] = useState(new Array(numInputs).fill(''));
    const inputRefs = useRef([]);
  
    const handleChange2 = (index, value) => {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
  
      if (value && index < numInputs - 1) {
        inputRefs.current[index + 1].focus();
      }
    };
  
    const handleKeyUp = (index, e) => {
      if (e.keyCode === 8 && index > 0 && !otp[index]) {
        inputRefs.current[index - 1].focus();
      }
    };


    return(
        <div>
 <Header />



 <div className="flex flex-col gap-5 lg:gap-10 py-44 justify-center items-center bg-gray-200 min-h-[100vh] ">

<div className=" rounded-lg bg-gray-100 shadow-lg w-[50%] max-md:w-[90%]">
    <div className="flex flex-wrap  ">
      <div className="px-8 md:px-0 m-auto">
        <div className="md:mx-6 md:p-12">
          <form className="justify-center items-center mx-auto">
            <p className=" text-left mt-10 font-semibold text-2xl ">
             E-mail verification
            </p>
            <p className="mb-8 text-left mt-2 font-semibold text-sm text-gray-600 max-w-[390px]">
                A 6 digit code has been sent to <span className="text-blue-600 underline"> example@gmail.com </span> via email. To finish the process, please check you email and enter the code here.
            </p>

            <div className="flex justify-center items-center h-full mb-8">
{otp.map((digit, index) => (
  <input
    key={index}
    type="text"
    maxLength={1}
    value={digit}
    onChange={(e) => handleChange2(index, e.target.value)}
    onKeyUp={(e) => handleKeyUp(index, e)}
    ref={(input) => inputRefs.current.push(input)}
    className="w-12 h-12 mx-2 text-center border rounded-md focus:outline-none focus:ring focus:ring-[#43D9BE]"
  />
))}
</div>
           
            <div className="mb-4 pb-1 pt-1 text-center">
              <button
                onClick={() => navigation.push('/new-password')}
                className="mb-3 py-3 inline-block w-full rounded px-6 font-bold text-base uppercase leading-normal text-white shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                type="button"
                style={{
                  background: "#27a9e1",
                }}
              >
               Submit
              </button>
            </div>
            <h1 className="text-gray-600 font-[300] text-sm">
                Didn't recieve the OTP? <span className="font-[500] underline cursor-pointer">Resent</span>
                </h1>

            
            
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