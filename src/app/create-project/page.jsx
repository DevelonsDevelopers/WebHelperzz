'use client'
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";
import { useState } from "react";
import Header from "@/components/Header";
// import { Footer } from "@/components/Footer";


export default function Page() {
  return (
    <>
      <Header />
          <div className="pt-14">
            <div className="profile_container max-w-[1200px] mx-auto  px-6  pt-10 md:pt-32">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link
                    underline="hover"
                    color="inherit"
                    href="/"
                    style={{ color: "#000", fontSize: 20 }}
                    >
                    Helperzz
                    </Link>
                    <Typography
                    color="text.primary"
                    style={{ color: "#000", fontSize: 20, fontWeight: "bold" }}
                    >
                    My Account
                    </Typography>
                </Breadcrumbs>            
            </div>
            <div className="mt-14 bg-[#12937C1A] bg-opacity-10 max-w-[1500px] mx-auto py-5">
                <div className='max-w-[1200px] mx-auto'>
                    <div className='rounded-2xl py-4 px-24 w-fit text-secondary bg-white font-semibold'>
                        Overview
                    </div>
                </div>
            </div>
            <div className='flex gap-10 mt-24 max-w-[1200px] mx-auto min-h-[100vh]'>
                <div className='flex-initial flex flex-col w-[500px]  gap-5'>
                    <h2 className='text-3xl font-bold'>Planning a new project?</h2>
                    <p className='font-semibold'>Tell us about your home improvement project</p>
                    <small className='text-sm text-[#262626]'>Let us know some details and we&apos;ll match you with Pros for you to compare</small>
                </div>
                <Steps/>
            </div>
          </div>
          <footer className="text-gray-800 bg-[#E8E8E8] body-font">
                <div
                    className="container px-14 sm:px-0 sm:py-24 mx-auto flex  md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
                    <div className="flex-grow flex flex-wrap  -mb-10 md:mt-0 mt-10 md:text-left  text-left">
                        <div className="footer_col_1 lg:w-1/4 md:w-1/2 w-full px-8">
                            <h2 className="title-font font-bold text-gray-900 text-base mb-3 text-transform: uppercase">
                                Homeowners
                            </h2>
                            <nav className="list-none mb-10">
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Browse Categories
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Browse Tasks
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Write A Review
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Blog
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Homeowner FAQ
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Review Guidelines
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Homeowner Trust
                                    </a>
                                </li>
                            </nav>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 w-full">
                            <h2 className="title-font font-bold text-gray-900 text-base mb-3">
                                CONTRACTORS
                            </h2>
                            <nav className="list-none mb-10">
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Join Helperzz
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Home Professional FAQ
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Building Trust
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Home Professional Terms
                                    </a>
                                </li>
                            </nav>
                        </div>
                        <div className="lg:w-1/4 md:w-1/2 w-full">
                            <h2 className="title-font font-bold text-gray-900 text-base mb-3">
                                HELPERZZ
                            </h2>
                            <nav className="list-none mb-10">
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Careers at Helperzz
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Careers at Helperzz
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Contact Us
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Terms of Use
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                                        Privacy{" "}
                                    </a>
                                </li>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="text-center  text-base text-transform: uppercase font-bold text-text">
                    Helperzz.com
                </div>
                <p className="text-center text-sm  pb-4">2024</p>
            </footer>    
        </>
  );
}


const Steps = (props) => {
    const [ step, setStep ] = useState(1)
  return (
    <div className='flex-1 flex flex-col gap-5'>
        <div className="flex items-center">
            <div className="flex items-center gap-3">
                <div className="flex p-3 bg-secondary rounded-lg ">
                    <img src="/assets/check.svg" className="w-5" alt="" />
                </div>
                <h4 className='text-base font-bold text-secondary'>Select Work</h4>
            </div>
            <div className='flex items-center ml-1'>
                <div className='h-12 border border-secondary'/>
                <div className='w-16 border border-secondary'/>
                <div className='bg-[#2626264D] bg-opacity-30 rounded-lg p-3'>
                    <img src="/assets/describe.svg" className="w-7" alt="" />
                </div>
            </div>
            <h4 className='text-base font-bold ml-1 text-gray-400'>Describe Work</h4>
            <div className='flex items-center ml-1'>
                <div className='h-12 border'/>
                <div className='w-16 border'/>
                <div className='bg-[#2626264D] bg-opacity-30 rounded-lg p-3'>
                    <img src="/assets/message.svg" className="w-7" alt="" />
                </div>
            </div>
            <h4 className='text-base font-bold ml-1 text-gray-400'>Project Detail</h4>

        </div>
        <div className='flex flex-col gap-5 rounded-2xl bg-secondary bg-opacity-10 p-5'>
            {step === 1 &&
            <>
                <p className='font-medium'>Choose a task that best describes the work you need done on your home</p>
                <SearchInput/>
                <button className='bg-secondary rounded-2xl text-lg font-semibold text-white py-3' onClick={() => setStep(step + 1)}>Next</button>
            </>}
            {step === 2 &&
            <div className="flex flex-col gap-10 mt-5">
                <p className='font-medium'>Choose a task that best describes the work you need done on your home</p>
                <SelectInput value={'Detached / Semi-Detached Home'} message={'What type of home do you live in?'}/>  
                <SelectInput value={'Time is flexible'} message={'When do you want to start this project?'}/>                              
                <button className='bg-white rounded-2xl text-lg font-semibold mt-5 py-3' onClick={() => setStep(step + 1)}>Next</button>
            </div>}
            {step === 3 &&
            <>  
                <p className='font-semibold text-lg mb-5'>Provide some details about your project</p>
                <Textarea message={'This Step is Optional'}/>
                <button className='bg-white rounded-2xl text-lg font-semibold mt-5 py-3'>Next</button>
            </>}

        </div>
        
    </div>
  )
} 

const SearchInput = ({message, icon}) => {
    const [ showResult, setShowResult ] = useState(true)
    const [selected, setSelected] = useState(-1)

  return (
    <div className='relative w-full'>
        <div className="absolute -top-5 left-5 px-10 text-white py-2 bg-secondary rounded-xl">
            What do you need done?
        </div>
        <div className="flex w-full bg-white rounded-2xl px-3 border border-secondary">
            <img src="/assets/search.svg" className="w-4 cursor-pointer mr-3" alt="" />
            <input type="text" className="flex-1 py-5 focus:outline-none ring-0" placeholder="Search"/>
            <img src="/assets/thick-arrow-down.svg" className="w-2 cursor-pointer" alt="" onClick={() => setShowResult(!showResult)}/>
        </div>
        {showResult && 
        <div className="flex flex-col w-full py-5 px-6 bg-white rounded-2xl  mt-2 border border-secondary">
            <h4>Alarm Systems</h4>
            <div className='flex flex-col gap-2 pl-4 mt-1'>
                {
                    Array.from({ length:4}).map((_, i) => (
                        <Option selected={selected} value={i} setSelected={setSelected} key={i} label='Lightning Protection - Install or Repair'/>
                    ))
                }
            </div>

        </div>}
    </div>
  )
} 

const Option = ({label, value, setSelected, selected}) => {
  return (
    <div className="flex gap-3 items-center">
        <div className='cursor-pointer' onClick={() => setSelected(value)}>
            {selected === value ? <div className='rounded-full bg-secondary w-4 h-4'/>:<div className='rounded-full w-4 h-4 border border-black'/>}
        </div>
        <div>{label}</div>
        
    </div>
  )
}


const SelectInput = ({message, value}) => {
    const [ showResult, setShowResult ] = useState(false)
    const [selected, setSelected] = useState(-1)

  return (
    <div className='relative w-full'>
        <div className="absolute -top-5 left-5 px-10 text-white py-2 bg-secondary rounded-xl">
            {message}
        </div>
        <div className="flex w-full bg-white rounded-2xl py-5 px-3 border border-secondary">
            <div className="flex-1 font-semibold">{value ? value:'Select'}</div>
            <img src="/assets/thick-arrow-down.svg" className="w-2 cursor-pointer" alt="" onClick={() => setShowResult(!showResult)}/>
        </div>
        {showResult && 
        <div className="flex flex-col w-full py-5 px-6 bg-white rounded-2xl  mt-2 border border-secondary">
            <div className='flex flex-col gap-2 pl-4 mt-1'>
                {
                    Array.from({ length:4}).map((_, i) => (
                        <Option selected={selected} value={i} setSelected={setSelected} key={i} label='Lightning Protection - Install or Repair'/>
                    ))
                }
            </div>

        </div>}
    </div>
  )
} 


const Textarea = ({message, value}) => {

  return (
    <div className='relative w-full'>
        <div className="absolute -top-5 left-5 px-10 text-white py-2 bg-secondary rounded-xl">
            {message}
        </div>
        <div className="flex w-full bg-white rounded-2xl py-5 px-3 border border-secondary">
            <textarea name="" id="" cols="30" className="p-2 w-full focus:outline-none" placeholder='Message' rows="10"></textarea>
        </div>
        
    </div>
  )
} 