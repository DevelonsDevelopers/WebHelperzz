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
                <h1 className="text-3xl font-semibold my-6 pb-2 border-b-4 "> Terms of use </h1>
                <h1>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis praesentium earum fugit qui, illum consequuntur voluptatem ipsa aperiam corporis, error minima molestias, quaerat blanditiis consectetur architecto! Aut, alias maxime. Nihil.consectetur, adipisicing elit. Officiis praesentium earum fugit qui, illum consequuntur voluptatem ipsa aperiam corporis, error minima molestias, quaerat blanditiis consectetur architecto! Aut, alias maxime. Nihil.
                </h1>
                <h1 className="text-xl font-semibold my-6"> Lorem ipsum </h1>
                <h1>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis praesentium earum fugit qui, illum consequuntur voluptatem ipsa aperiam corporis, error minima molestias, quaerat blanditiis consectetur architecto! Aut, alias maxime. Nihil.
                </h1>
                <h1 className="text-xl font-semibold my-6"> Lorem ipsum  </h1>
                <h1>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis praesentium earum fugit qui, illum consequuntur voluptatem ipsa aperiam corporis, error minima molestias, quaerat blanditiis consectetur architecto! Aut, alias maxime. Nihil.
                </h1>
                <h1 className="text-xl font-semibold my-6"> Lorem ipsum  </h1>
                <h1>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officiis praesentium earum fugit qui, illum consequuntur voluptatem ipsa aperiam corporis, error minima molestias, quaerat blanditiis consectetur architecto! Aut, alias maxime. Nihil.
                </h1>
                

            </div>

            <Footer   showNewsLetter={false}  postProject={false}/>
        </div>
    )
}
export default Page;
