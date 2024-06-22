'use client'
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import { Button } from "@mui/material";
import {useRouter} from "next/navigation";

const Page = () => {

    const navigate = useRouter();


    return (
        <div className="bg-gray-100 min-h-[100vh]">
            <Header />

            <div className="gap-5 lg:gap-10 pt-20 pb-10 bg-gray-100 max-w-[1100px] mx-auto">
                <h1 className="text-3xl font-semibold my-6 text-left pb-2 border-b-4 "> Career at Helperzz </h1>
                <h1 className="text-center text-3xl font-[600] py-[10rem] max-md:py-[2rem]">Coming Soon ...
                </h1>
                
              
                
                

            </div>

            <Footer showNewsLetter={false}  postProject={false} />
        </div>
    )
}
export default Page;
