'use client'

import React, { useState , useRef} from "react";
import Header from "../../components/Header";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
 
import { useRouter } from "next/navigation";
 
const Page = () => {

  const navigation = useRouter();

    const [visible , setVisible] = useState(true)
    const [confirmPasswordVisible , setConfirmPasswordVisible] = useState(true)



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
             Create New Password
            </p>
            <p className="mb-6 text-left mt-4 font-semibold text-sm text-gray-500 max-w-[390px]">
                Your new passoword must be different from any of your previous passwords.
             </p>

            <div className="mb-4">
                
              <label className="text-left text-gray-700 font-bold mb-2">
                New Password
              </label>
              <input
                type={visible ? 'text' : 'password'}
                name="passowrd"
                // onChange={(e) => handleChange(e)}
                className="w-full border-[1px] border-gray-300 bg-transparent px-4 py-2  outline-none "
                style={{
                  boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)",
                }}
              />
              <div className="ml-auto flex justify-end mt-[-30px] mr-2">
{visible ? 
              <VisibilityIcon onClick={() => setVisible(false)} />
              :
              <VisibilityOffIcon onClick={() => setVisible(true)} />
}
              </div>
            </div>

            <div className="mb-4">
              <label className="text-left text-gray-700 font-bold mb-2">
                Confirm Password
              </label>
              <input
                type={confirmPasswordVisible ? 'text' : 'password'}
                name="passowrd"
                // onChange={(e) => handleChange(e)}
                className="w-full border-[1px] border-gray-300 bg-transparent px-4 py-2  outline-none "
                style={{
                  boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)",
                }}
              />
                <div className="ml-auto flex justify-end mt-[-30px] mr-2">
{confirmPasswordVisible ? 
              <VisibilityIcon onClick={() => setConfirmPasswordVisible(false)} />
              :
              <VisibilityOffIcon onClick={() => setConfirmPasswordVisible(true)} />
}
              </div>
            </div>

           

            <div className="mb-4 pb-1 pt-1 text-center">
              <button
                onClick={() => navigation.push('/success-page')}
                className="mb-3 py-3 inline-block w-full rounded px-6 font-bold text-base uppercase leading-normal text-white shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                type="button"
                style={{
                  background: "#27a9e1",
                }}
              >
               Submit
              </button>
            </div>

            
            
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