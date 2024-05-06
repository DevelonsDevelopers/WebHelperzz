'use client'
import Header from "../../components/Header";
import {Footer} from "../../components/Footer";
import { useState } from "react";


const tabs = [{name :'For Service Pros'} , {name :'For HomeOwners'}]

const Page = () => {

    const [selected , setSelected] = useState(0)

    return (
        <div className="bg-gray-200 min-h-[100vh]">
            <Header />
            <div className="bg-[#12937C1A]  mx-auto justify-center items-center pt-[10rem]">
          <div className="flex justify-center lg:w-[1100px] w-screen m-auto mt-6 p-4 gap-10">
            {tabs.map((value, index) => (
                <h1  onClick={() => setSelected(index)} className={` font-[500] text-[1.1rem] text-center p-[8px] rounded-xl cursor-pointer ${ selected === index ? "bg-white text-[#12937C]" : ""}  `} 
                     >
              {value.name}
            </h1>
            ) )}
           
          </div>
        </div>

{selected === 0 ? 

<div className="border-2 w-[50%] m-auto mt-10 max-md:w-[90%]">
<h1 className="text-center text-xl text-gray-600 font-[600] ">
    Get in touch with us anytime, we're always here to help!
    </h1>
    <form className="mt-4">
        <div className="flex gap-2 max-md:flex-col">
            <input  type="text" required className="py-2 w-full border-2 rounded-sm px-6 text-gray-600 focus:outline-none" placeholder="First Name *" />
            <input  type="text" required className="py-2 w-full border-2 rounded-sm px-6 text-gray-600 focus:outline-none" placeholder="Last Name *" />
            </div>
            <input  type="text" required className="py-2 w-full border-2 mt-2 rounded-sm px-6 text-gray-600  focus:outline-none" placeholder="Company Name *" />
        <div className="flex gap-2 mt-2 max-md:flex-col">
            <input  type="phone" required className="py-2 w-full border-2 rounded-sm px-6 text-gray-600 focus:outline-none" placeholder="Phone *" />
            <input  type="email" required className="py-2 w-full border-2 rounded-sm px-6 text-gray-600 focus:outline-none" placeholder="Email *" />
            </div>
            <select className="py-2 w-full border-2 rounded-sm px-6 text-gray-600 focus:outline-none mt-2" required>
                <option value="Choose a Topic " selected disabled>
                    Choose a Topic </option>
                <option value="Getting started" >
                    Getting started </option>
                <option value="Princing" >
                    Princing </option>
                <option value="Billing & Payment" >
                    Billing & Payment </option>
                <option value="Customer Support" >
                    Customer Support </option>
                <option value="General Inquiries" >
                    General Inquiries </option>
                </select>
             <textarea  required className="py-2 w-full border-2 rounded-sm px-6 text-gray-600 focus:outline-none mt-2" placeholder="Message *" />
            <input  type="submit" value="Send Message" className="py-2 w-full border-2 rounded-sm px-6 text-gray-600 focus:outline-none mt-2 bg-[#3FA9E2] text-white cursor-pointer" />
        </form>
    </div>
    :
    <div className="border-2 w-[50%] max-md:w-[90%] m-auto mt-10">
<h1 className="text-center text-xl text-gray-600 font-[600] ">
    Get in touch with us anytime, we're always here to help!
    </h1>
    <form className="mt-4">
        <div className="flex gap-2 max-md:flex-col">
            <input  type="text" required className="py-2 w-full border-2 rounded-sm px-6 text-gray-600 focus:outline-none" placeholder="First Name *" />
            <input  type="text" required className="py-2 w-full border-2 rounded-sm px-6 text-gray-600 focus:outline-none" placeholder="Last Name *" />
            </div>
            <input  type="email" required className="py-2 w-full border-2 rounded-sm px-6 text-gray-600 focus:outline-none mt-2" placeholder="Email *" />
            <textarea  type="email" required className="py-2 w-full border-2 rounded-sm px-6 text-gray-600 focus:outline-none mt-2" placeholder="Message *" />
            <input  type="submit" value="Send Message" className="py-2 w-full border-2 rounded-sm px-6 text-gray-600 focus:outline-none mt-2 bg-[#3FA9E2] text-white cursor-pointer" />
        </form>
    </div>
}
            </div>
    )
}
export default Page;