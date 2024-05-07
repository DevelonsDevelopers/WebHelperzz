'use client'
import Header from "../../components/Header";
import {Footer} from "../../components/Footer";
import { useState } from "react";
import { IoIosCall } from "react-icons/io";
import { MdFolderCopy } from "react-icons/md";




const tabs = [{name :'For Service Pros'} , {name :'For HomeOwners'}]

const Page = () => {

    const [selected , setSelected] = useState(0)

    return (
        <div className="">
            <Header />

            <div className="bg-[#1B3047] mt-[5rem] py-20">
                <div className="max-w-[1000px] m-auto">

<h1 className="text-[2rem] font-[400] text-gray-300 ">Contact Us </h1>
<h1 className="text-[1rem] font-[600] text-gray-300 max-w-[500px] mt-4">Our team is ready to assist you. Reach out to one of our teams below. </h1>
<button className="bg-[#3FA9E2] px-4 py-2 uppercase m-auto mt-4 font-[500] rounded-sm text-white ">
    Are you a service pro ?
</button>

            </div>
            </div>

            {/* <div className="bg-[#12937C1A]  mx-auto justify-center items-center pt-[10rem]">
          <div className="flex justify-center lg:w-[1100px] w-screen m-auto mt-6 p-4 gap-10">
            {tabs.map((value, index) => (
                <h1  onClick={() => setSelected(index)} className={` font-[500] text-[1.1rem] text-center p-[8px] rounded-xl cursor-pointer ${ selected === index ? "bg-white text-[#12937C]" : ""}  `} 
                     >
              {value.name}
            </h1>
            ) )}
           
          </div>
        </div> */}

        <div className="flex max-md:flex-col max-w-[800px] my-10 max-md:w-[90%] m-auto ">
<div className="flex-col ">
{tabs.map((value, index) => (
                <h1  onClick={() => setSelected(index)}  className={`border-t-[1px] border-b-[1px] border-l-[1px] border-gray-400 min-w-[250px] py-4 pl-4 text-lg text-gray-600 mt-2 cursor-pointer rounded-l-md ${selected === index ? 'bg-[#EDEEEF]' : 'bg-white hover:bg-[#EDEEEF]'}` }
                     >
              {value.name}
            </h1>
            ) )}
</div>



{selected === 0 ? 

<div className="w-1/.2 !border-[1px] border-gray-400 px-10 max-md:px-4 py-8 mt-2" >
<h1 className="text-center text-lg text-gray-600 font-[400] ">
    Get in touch with us anytime, we're always here to help!
    </h1>
{/* <div className="flex items-center justify-evenly mt-4">

<div className="flex items-center gap-2">
<IoIosCall className='text-[#3FA9E3] ' size={28}  />
<h1 className="text-[1.3rem] max-md:text-[.7rem] text-gray-800 font-[500] hover:text-[#3FA9E3] cursor-pointer">1-885-6457-4578</h1>
    </div>
<div className="flex gap-2 items-center">
<MdFolderCopy className='text-[#3FA9E3] ' size={28} />
<h1 className="text-[1.3rem] max-md:text-[.7rem] text-gray-800 font-[500] hover:text-[#3FA9E3] cursor-pointer">Service Pro FAQ</h1>
    </div>
    </div> */}

    <h1 className="text-gray-700 text-[14px] my-4 text-center font-[500]">Fill out the form below to send us a message: </h1>


    <form className="mt-4">
        <div className="flex gap-2 max-md:flex-col">
            <input  type="text" required className="py-2 w-full border-[1px] border-gray-300 text-sm rounded-sm px-6 text-gray-600 focus:outline-none" placeholder="First Name *" />
            <input  type="text" required className="py-2 w-full border-[1px] border-gray-300 text-sm rounded-sm px-6 text-gray-600 focus:outline-none" placeholder="Last Name *" />
            </div>
            <input  type="text" required className="py-2 w-full border-[1px] border-gray-300 text-sm mt-2 rounded-sm px-6 text-gray-600  focus:outline-none" placeholder="Company Name *" />
        <div className="flex gap-2 mt-2 max-md:flex-col">
            <input  type="phone" required className="py-2 w-full border-[1px] border-gray-300 text-sm rounded-sm px-6 text-gray-600 focus:outline-none" placeholder="Phone *" />
            <input  type="email" required className="py-2 w-full border-[1px] border-gray-300 text-sm rounded-sm px-6 text-gray-600 focus:outline-none" placeholder="Email *" />
            </div>
            <select className="py-2 w-full border-[1px] border-gray-300 text-sm rounded-sm px-6 text-gray-600 focus:outline-none mt-2" required>
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
             <textarea  required className="py-2 w-full border-[1px] border-gray-300 text-sm rounded-sm px-6 text-gray-600 focus:outline-none mt-2" placeholder="Message *" />
            <input  type="submit" value="Send Message" className="py-2 w-full border-[1px] border-gray-300 text-sm rounded-sm px-6 text-gray-600 focus:outline-none mt-2 bg-[#3FA9E2] text-white cursor-pointer font-[600]" />
        </form>
        <h1 className="text-gray-700 text-[14px] my-4 text-center font-[400]">*Our team is available Monday - Friday from 9 am to 5 pm EST </h1>
    </div> 
    :
    <div className="w-1/.2 !border-[1px] border-gray-400 px-10 py-8 mt-2" >
    <h1 className="text-center text-lg text-gray-600 font-[500] ">
        Get in touch with us anytime, we're always here to help!
        </h1>
    {/* <div className="flex items-center justify-evenly mt-4">
    <div className="flex gap-2">
    <MdFolderCopy className='text-[#3FA9E3] ' size={28} />
    <h1 className="text-[1.3rem] text-gray-800 font-[500] hover:text-[#3FA9E3] cursor-pointer">Service Pro FAQ</h1>
        </div>
        </div> */}
        <h1 className="text-gray-700 text-[14px] my-4 text-center font-[500]">Fill out the form below to send us a message: </h1>
    
    <form className="mt-4">
        <div className="flex gap-2 max-md:flex-col">
            <input  type="text" required className="py-2 w-full border-[1px] border-gray-300 text-sm rounded-sm px-6 text-gray-600 focus:outline-none" placeholder="First Name *" />
            <input  type="text" required className="py-2 w-full border-[1px] border-gray-300 text-sm rounded-sm px-6 text-gray-600 focus:outline-none" placeholder="Last Name *" />
            </div>
            <input  type="email" required className="py-2 w-full border-[1px] border-gray-300 text-sm rounded-sm px-6 text-gray-600 focus:outline-none mt-2" placeholder="Email *" />
            <textarea  type="email" required className="py-2 w-full border-[1px] border-gray-300 text-sm rounded-sm px-6 text-gray-600 focus:outline-none mt-2" placeholder="Message *" />
            <input  type="submit" value="Send Message" className="py-2 w-full border-[1px] border-gray-300 text-sm rounded-sm px-6 text-gray-600 focus:outline-none mt-2 bg-[#3FA9E2] text-white cursor-pointer font-[600]" />
        </form>
        <h1 className="text-gray-700 text-[14px] my-4 text-center font-[400] italic	">*Our team is available Monday - Friday from 9 am to 5 pm EST </h1>
        <h1 className="text-gray-700 text-[14px] text-center font-[400] italic	">For inquiries regarding removal of personal data, please see our privacy policy</h1>

    </div>
}

            </div>
            </div>
    )
}
export default Page;