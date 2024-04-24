'use client'
import Header from "@/components/Header";
import Link from "next/link";
import Image from "next/image";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { object, string } from 'yup';
const Page = (props) => {
  return (
    <>
    <Header />
     <div className="flex flex-col gap-5 lg:gap-10 py-44 justify-center items-center bg-gray-100 min-h-[100vh] ">
        <div className="flex flex-wrap lg:flex-nowrap gap-5 w-full max-w-[1500px] mx-auto">
            <div className="flex text-lg flex-col gap-10 lg:w-[72%] w-screen p-4">
                <div className=''>
                    <h4 className="font-bold text-2xl">Moving Company Spotlight: Let’s Get Moving,</h4>
                    <div className="flex items-center gap-5 text-sm text-gray-600">
                        <p>Written by <Link className="inline text-black" href='#'>Bodhirupa Raha</Link></p>
                        <div className='w-0.5 h-4 bg-gray-800' />
                        <p>December 18, 2023</p>
                    </div>
                </div>
                <div className='relative w-full h-[600px]'>
                    <Image src='/assets/images/blog.png' className="object-cover" fill alt='Blog Image' />
                </div>
                <p>Whether you are moving into your dream home or moving into your own office, the one thing that causes the most hassle is the actual moving. Packing all your belongings, making sure they are moved with care and then again unpacking them – it can be a stressful experience. However, when you choose the right moving company, everything can be done swiftly and efficiently. To understand more about what makes a moving company great, we spoke to Best of Award winner <Link href='' className="inline text-primary">Let’s Get Moving</Link>. With an average rating of 9.5/10, three times Best of Award wins and over 400 reviews, they are the experts in their industry. and here’s what they had to say about their company, their experience at HomeStars and even tips on how to choose the right moving company! Let’s take a look. </p>
                <p>Tell us a little bit about how the company started and where it stands today.</p>
                <p>“Let’s Get Moving, now renowned as one of the premier <Link href='' className="text-primary inline">Toronto Movers</Link>, started in 2010 by Tiam Behdarvad. The company began its journey in Toronto with a team of two movers and one truck. Today, we operate across the country, located in 40+ locations in Canada and more than 25 territories in the USA.”</p>
                <div className='relative w-full h-[600px]'>
                    <Image src='/assets/images/blog.png' className="object-cover" fill alt='Blog Image' />
                </div>
                <p>Please briefly describe your services and anything else that is not offered by your competitors. </p>
                <p>“Residential Moving: Our team expertly handles all aspects of residential moves, ensuring a seamless transition for families and individuals. We pay special attention to the care of personal belongings and the specific needs of each household.</p>
                <p>Commercial Moving: We offer tailored solutions for businesses, managing office relocations efficiently to minimize downtime. Our expertise in handling office equipment and logistics sets us apart in commercial moving.</p>
                <p>Packing Services: Our professional packing services provide peace of mind, with our team using high-quality materials and techniques to protect your items during the move.</p>
                <p>Storage Solutions: We offer secure and flexible storage options for both short-term and long-term needs, ensuring your belongings are safe and accessible.</p>
                <p>Junk Removal: This unique service sets us apart, as we assist in decluttering and responsibly disposing of unwanted items, making the moving process smoother and more sustainable.</p>
                <p>Specialty Moving: We handle specialty items such as pianos, antiques, and artwork with the utmost care, showcasing our expertise in managing items that require special attention.”</p>
                <div className='relative w-full h-[600px]'>
                    <Image src='/assets/images/blog.png' className="object-cover" fill alt='Blog Image' />
                </div>
                <p>Whether you are moving into your dream home or moving into your own office, the one thing that causes the most hassle is the actual moving. Packing all your belongings, making sure they are moved with care and then again unpacking them – it can be a stressful experience. However, when you choose the right moving company, everything can be done swiftly and efficiently. To understand more about what makes a moving company great, we spoke to Best of Award winner Let’s Get Moving. With an average rating of 9.5/10, three times Best of Award wins and over 400 reviews, they are the experts in their industry. and here’s what they had to say about their company, their experience at HomeStars and even tips on how to choose the right moving company! Let’s take a look. </p>
            </div>
            <div className="flex flex-col gap-5 lg:w-[28%] w-full">
              <GetQuotesForm/>
              <SignUpArticle/>
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

const quotes_schema = object({
  category: string().required().label('Business Name'),
  postal_code: string().matches('/^[A-Z]\d[A-Z] \d[A-Z]\d$/', 'Invalid Postal Code').label('Postal Code').required(),
});
const GetQuotesForm = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors,  },
  } = useForm({
    resolver: yupResolver(quotes_schema),
  });
  const onSubmit = (data) => {
  }
  return (
        <div className="bg-[#d8e8e5] p-6 ">
          <h1 className="text-center font-bold pb-6 text-[20px] capitalize">
            Get Quotes From Reviewed Pros
          </h1>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col">
              <select
                name=""
                id=""
                className="p-3 px-2 text-gray-500 w-full text-[14px] outline-none"
                {...register("category")}
              >
                <option value="" >Select Category</option>
              </select>
              {errors.postal_code && (
                <span className="text-sm text-red-500">
                  {errors.postal_code.message}
                </span>
              )}
            </div>
            <div className="flex flex-col">
              <input type='text' className='border-2 w-full p-2' {...register("postal_code")} placeholder='Postal Code'/>
              {errors.postal_code && (
                <span className="text-sm text-red-500">
                  {errors.postal_code.message}
                </span>
              )}
            </div>
            <button className='bg-primary py-3 font-bold text-white' type='submit'>
              Get Quotes
            </button>
          </form>
        </div>
  )
}

const signup_schema = object({
  firstname:string().required().label('First Name'),
  lastname:string().required().label('Last Name'),
  email: string().email().required().label('Email'),
});
const SignUpArticle = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors,  },
  } = useForm({
    resolver: yupResolver(signup_schema),
  });
  const onSubmit = (data) => {
  }
  return (
        <div className="bg-[#d8e8e5] p-6 ">
          <h1 className="text-center font-bold pb-6 text-[20px] capitalize">
              Sign up for articles, hiring tips, cost guides and more
          </h1>
          <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
            <div className='flex flex-col'>
              <input type='text' className='border-2 w-full p-2' placeholder='First Name' {...register("firstname")}/>
              {errors.firstname && (
                <span className="text-sm text-red-500">
                  {errors.firstname.message}
                </span>
              )}
            </div>
            <div className='flex flex-col'>
              <input type='text' className='border-2 w-full p-2' placeholder='Last Name' {...register("lastname")}/>
              {errors.lastname && (
                <span className="text-sm text-red-500">
                  {errors.lastname.message}
                </span>
              )}
            </div>
            <div className='flex flex-col'>
              <input type='text' className='border-2 w-full p-2' placeholder='Email Address' {...register("email")}/>
              {errors.email && (
                <span className="text-sm text-red-500">
                  {errors.email.message}
                </span>
              )}
            </div>
            <button className='bg-primary py-3 font-bold text-white' type='submit'>
              Sign Up
            </button>
          </form>
        </div>
  )
}

export default Page