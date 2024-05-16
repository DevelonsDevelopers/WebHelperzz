'use client'

import React, {useState, useRef, useEffect} from "react";
// import Header from "../../components/Header";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import Button from "@mui/material/Button";
import {useRouter} from 'next/navigation'
import customerService from "@/api/services/customerService";

const Page = ({params}) => {

    const [verified, setVerified] = useState(false)
    const [setFailed, setSetFailed] = useState(false)
    const navigate = useRouter()

    useEffect(() => {
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
    }, [params.token]);

    return (
        <div>
            {/* <Header /> */}


            <div className="flex flex-col gap-5 lg:gap-10 py-44 justify-center items-center bg-gray-200 min-h-[100vh] ">

                <div className=" rounded-lg bg-gray-100 shadow-lg w-[50%] max-md:w-[90%]">
                    <div className="flex flex-wrap  ">
                        <div className="px-8 md:px-0 m-auto">
                            <div className="md:mx-6 md:p-12">
                                {verified ?
                                <form className="justify-center items-center mx-auto">
                                    <div className="flex justify-center">
                                        <CheckCircleOutlineIcon style={{fontSize: 90, color: '#44CA77'}}/>
                                    </div>
                                    <p className="  mt-6 font-semibold text-2xl  text-center">
                                        Account verified successfuly
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Page
