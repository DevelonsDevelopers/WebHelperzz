'use client'

import React, {useState, useEffect} from "react";
import Header from "../../components/Header";
import {Footer} from "../../components/Footer";
import {useRouter} from "next/navigation";
import contractorService from "@/api/services/contractorService";
import uploadService from "@/api/services/uploadService";
import emailService from "@/api/services/emailService";
import Head from 'next/head';
import { usePathname } from 'next/navigation'

const Page = () => {

    const navigation = useRouter();
    const [email, setEmail] = useState()
    const [response , setResponse] = useState()
    const pathname = usePathname()
    const [emailError , setEmailError] = useState(false)


    const submitRequest = (e, email) => {
        e.preventDefault();
      if(email) {

          emailService.forgotPassword({ email: email }).then(response => {
              console.log(response)
              setResponse(response)
              if (response?.resonseCode === 200){
                  
                  navigation.push('/success-page/email-sent')
              }
          }).catch(err => {
  
          })
      } else {
        setEmailError(true)
      }
    }

    useEffect(() => {
        if(email?.length > 0) {
            setEmailError(false)
        }
    },[email])
    
    useEffect(() => {
        if(response?.responseCode === 200) {
            navigation.push('/success-page/email-sent')
        }
    },[response])

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
            <Header/>
            <div className="flex flex-col gap-5 lg:gap-10 py-44 justify-center items-center bg-gray-100 min-h-[100vh] ">
           
            <div className='flex-1'>
                    <div className=" flex flex-col items-start ml-auto gap-10 max-w-xl p-1">
                        <h3 className='font-bold text-3xl lg:text-5xl'>Forgot Password.</h3>
                        <div className='bg-[#27A9E1] h-1.5 rounded-full w-[90px]'/>
                    </div>

                </div>

                <div className='flex-1 min-w-[50%] rounded-lg shadow-lg bg-gray-100 '>
                    <div className="flex flex-wrap  ">
                        <div className="px-8 md:px-0 m-auto">
                            <div className="md:mx-6 md:p-12">
                                <form onSubmit={(e) => submitRequest(e,email)} className="justify-center items-center mx-auto">
                                    <p className=" text-left mt-10 font-semibold text-2xl ">
                                        Email Required
                                    </p>
                                    <p className="mb-6 text-left mt-2 font-[400] text-sm text-gray-600 max-w-[290px]">
                                        We will send you an <span className="font-[700]">One Time Password </span> On
                                        this email
                                    </p>

                                    <div className="mb-8">
                                        <label className="text-left text-gray-700 font-bold mb-2">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                             onChange={(e) => setEmail(e.target.value)}
                                            className={`${emailError ? 'border-red-500' :'border-gray-300'} w-full border-[1px]  bg-transparent px-4 py-2  outline-none `}
                                            style={{
                                                boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)",
                                            }}
                                        />
                                    <p className={` ${emailError ? 'text-red-600' :'text-transparent'}  `}>Enter a valid email</p>
                                    </div>



                                    <div className="mb-4 pb-1 pt-1 text-center">
                                        <button
                                            // onClick={() => navigation.push('/new-password')}
                                            className="mb-3 py-3 inline-block w-full rounded px-6 font-bold text-base uppercase leading-normal text-white shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                                            type="submit"
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
            <Footer  showNewsLetter={false}   postProject={false}/>
        </div>
    )
}
export default Page
