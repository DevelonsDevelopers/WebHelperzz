"use client";
import Header from '../../components/Header'
import React from 'react'
import { IoSearch } from 'react-icons/io5'

const Page = () => {
    return (
        <div className='h-screen flex items-center justify-center'>
            <Header />
            <div className='w-full h-[50%] flex items-center bg-gray-50 border-t-2 border-b-2 border-gray-200' >
                <div className='w-[70%] m-auto px-20 py-10' >
                    <h1 className='text-[2.5rem] font-[700] text-center ' >Search for a Category to Quote</h1>
                    <div className='flex items-center gap-4 mt-8' >
                        <div className='w-full h-[4rem] border-2 border-gray-400 p-1 rounded-md'>
                            <input type="search" className='h-full w-full text-[1.1rem] placeholder:text-[1.3rem] px-5 !bg-white outline-none' placeholder='Category Name'  />
                        </div>
                        <div className='bg-[#27AAE2] border-[1px] border-gray-400 rounded-md h-[4rem] w-[5rem] flex items-center justify-center cursor-pointer' >
                            <IoSearch
                                className="text-gray-100"
                                size={30}
                            />
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Page