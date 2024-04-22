
'use client'
import Header from "@/components/Header";
import Image from "next/image";
import Link from "next/link";
import { category_data } from "@/data";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string, number } from 'yup';

const schema = object({
  name: string().required('Required'),
  category: string().required('Required'),
  postal_code:string().required('Required'),
  phone_number:string().required('Required'),
});
const Page = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data) => {
  }
  return (
    <>
      <Header />
       <div className="flex flex-col lg:flex-row gap-5 lg:gap-44 mt-44 lg:mt-0 justify-center items-center h-[100vh]">
        <div className='flex-1'>
          <div className=" flex flex-col items-start ml-auto gap-10 max-w-lg p-1">
            <Image src='/assets/images/homestar-logo.svg' width={300} height={100} alt='homestar logo'/>
            <h3 className='font-bold text-3xl lg:text-5xl'>We’re in the business of growing yours.</h3>
            <div className='bg-[#27A9E1] h-1.5 rounded-full w-[200px]'/>
            <p>Create your HomeStars profile, and get in front of the <span className="font-semibold">8 million homeowners </span>who visit us every year. More eyes on your business means more opportunity to connect with your next customer.</p>
          </div>
          
        </div>
        <div className='flex-1'>
          <div className="flex flex-col gap-3 lg:items-center max-w-sm p-1">
            <form className='flex flex-col gap-5 p-5 bg-gray-100' onSubmit={handleSubmit(onSubmit)}>
              <h4 className='font-bold text-xl self-center'>Create Your Profile</h4>
              <div className='flex flex-col'>
                <label className='font-bold text-sm'>Professional/Company Name</label>
                <input type='text' className='border-2 w-full p-2' {...register("name")} placeholder='Your Business Name'/>
                {errors.name && (
                  <span className="text-sm text-red-500">
                    {errors.name.message}
                  </span>
                )}
              </div>
              <div className='flex flex-col'>
                <label className='font-bold text-sm'>Category</label>
                <select className='border-2 bg-white w-full p-2' {...register("category")}>
                  {
                    category_data.map((item, index) => (
                      <option value={item.value} key={index}>{item.label}</option>
                    ))
                  }
                  <option value="">Select one</option>
                </select>
                {errors.category && (
                  <span className="text-sm text-red-500">
                    {errors.category.message}
                  </span>
                )}
              </div>
              <div className='flex flex-col lg:flex-row gap-4'>
                <div className='flex flex-col'>
                  <label className='font-bold text-sm'>Postal Code</label>
                  <input type='text' className='border-2 w-full p-2' placeholder='A1B 2C3' {...register("postal_code")}/>
                  {errors.postal_code && (
                    <span className="text-sm text-red-500">
                      {errors.postal_code.message}
                    </span>
                  )}
                </div>
                <div className='flex flex-col'>
                  <label className='font-bold text-sm'>Phone Number</label>
                  <input type='text' className='border-2 w-full p-2' placeholder='1234567890' {...register("phone_number")}/>
                  {errors.phone_number && (
                    <span className="text-sm text-red-500">
                      {errors.phone_number.message}
                    </span>
                  )}
                </div>
              </div>
              <button type='submit' className="py-5 bg-[#fad04f] font-bold text-sm">REGISTER NOW!</button>
            </form>
            <p className="text-sm">Already have an account? <Link href='/login' className="font-bold underline" >Log in</Link> to continue</p>
          </div>
        </div>
       </div>
       <footer class="text-gray-800 bg-[#E8E8E8] body-font">
        <div class="container px-14 sm:px-0 sm:py-24 mx-auto flex  md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div class="flex-grow flex flex-wrap  -mb-10 md:mt-0 mt-10 md:text-left  text-left">
            <div class="footer_col_1 lg:w-1/4 md:w-1/2 w-full px-8">
              <h2 class="title-font font-bold text-gray-900 text-base mb-3 text-transform: uppercase">
                Homeowners
              </h2>
              <nav class="list-none mb-10">
                <li>
                  <a class="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                    Browse Categories
                  </a>
                </li>
                <li>
                  <a class="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                    Browse Tasks
                  </a>
                </li>
                <li>
                  <a class="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                    Write A Review
                  </a>
                </li>
                <li>
                  <a class="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                    Blog
                  </a>
                </li>
                <li>
                  <a class="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                    Homeowner FAQ
                  </a>
                </li>
                <li>
                  <a class="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                    Review Guidelines
                  </a>
                </li>
                <li>
                  <a class="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                    Homeowner Trust
                  </a>
                </li>
              </nav>
            </div>
            <div class="lg:w-1/4 md:w-1/2 w-full">
              <h2 class="title-font font-bold text-gray-900 text-base mb-3">
                CONTRACTORS
              </h2>
              <nav class="list-none mb-10">
                <li>
                  <a class="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                    Join Helperzz
                  </a>
                </li>
                <li>
                  <a class="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                    Home Professional FAQ
                  </a>
                </li>
                <li>
                  <a class="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                    Building Trust
                  </a>
                </li>
                <li>
                  <a class="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                    Home Professional Terms
                  </a>
                </li>
              </nav>
            </div>
            <div class="lg:w-1/4 md:w-1/2 w-full">
              <h2 class="title-font font-bold text-gray-900 text-base mb-3">
                HELPERZZ
              </h2>
              <nav class="list-none mb-10">
                <li>
                  <a class="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                    About
                  </a>
                </li>
                <li>
                  <a class="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                    Careers at Helperzz
                  </a>
                </li>
                <li>
                  <a class="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                    Careers at Helperzz
                  </a>
                </li>
                <li>
                  <a class="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a class="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                    Terms of Use
                  </a>
                </li>
                <li>
                  <a class="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
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
  )
}

export default Page