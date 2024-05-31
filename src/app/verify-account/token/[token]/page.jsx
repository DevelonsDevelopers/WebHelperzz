'use client'

import React, {useState, useRef, useEffect} from "react";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Button from "@mui/material/Button";
import {useRouter} from 'next/navigation'
import customerService from "@/api/services/customerService";
import Head from 'next/head';
import { usePathname } from 'next/navigation'
import { Footer } from "@/components/Footer";

const Page = ({params}) => {

    const [verified, setVerified] = useState(false)
    const [failed, setFailed] = useState(false)
    const navigate = useRouter()
    const [expired, setExpired] = useState(0)
    const pathname = usePathname()

    useEffect(() => {
        if (expired === 0) {
            if (params.token) {
                customerService.checkToken(params.token).then(response => {
                    console.log(response)
                    if (response.exist) {
                        setExpired(1)
                    } else {
                        setExpired(2)
                    }
                }).catch(e => {
                    setExpired(2)
                })
            }
        }
    }, [params.token, expired]);

    useEffect(() => {
        if (expired === 1) {
            if (params.token) {
                customerService.verifyEmail({token: params.token}).then(response => {
                    console.log(response)
                    if (response.success) {
                        setVerified(true)
                    }
                }).catch(err => {
                    setFailed(true)
                })
            }
        }
    }, [expired]);

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


            <div className="flex flex-col gap-5 lg:gap-10 py-44 justify-center items-center bg-gray-200 min-h-[100vh] ">

                <div className=" rounded-lg bg-gray-100 shadow-lg w-[50%] max-md:w-[90%]">
                    <div className="flex flex-wrap  ">
                        <div className="px-8 md:px-0 m-auto">
                            <div className="md:mx-6 md:p-12">
                                {expired === 2 ?
                                    <p className="  mt-6 font-semibold text-2xl  text-center">
                                        Token Expired
                                    </p>
                                    :
                                    <>
                                {verified ?
                                <form className="justify-center items-center mx-auto">
                                    <div className="flex justify-center">
                                        <CheckCircleOutlineIcon style={{fontSize: 90, color: '#44CA77'}}/>
                                    </div>
                                    <p className="  mt-6 font-semibold text-2xl  text-center">
                                        Account verified successfully
                                    </p>

                                    <center className="mt-4">
                                        <Button
                                            style={{userSelect: "text"}}
                                            variant="contained"
                                            className="btn_header text-sm"
                                            disableElevation
                                            onClick={() => navigate.push("/")}

                                        >
                                           Got to Home page
                                        </Button>
                                    </center>

                                </form>
                                :
                                    <p className="  mt-6 font-semibold text-2xl  text-center">
                                        Verifying
                                    </p>}
                                    </>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer   showNewsLetter={false} postProject={false}/>

        </div>
    )
}
export default Page
