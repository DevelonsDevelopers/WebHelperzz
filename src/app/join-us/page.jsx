'use client'
import Header from "@/components/Header";
import Link from "next/link";
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {object, string, mixed} from 'yup';
import {useRef, useState} from 'react'
import {CiFileOn} from "react-icons/ci";

const schema = object({
    businessname: string().required().label('Business Name'),
    firstname: string().required().label('First Name'),
    lastname: string().required().label('Last Name'),
    email: string().email().required().label('Email'),
    phone_number: string().matches('/^\d{10}$/', 'Invalid Phone Number').label('Phone Number').required(),
    address: string().label('Address').required(),
    licenses: mixed().label('Licenses').required(),
    postal_code: string().matches('/^[A-Z]\d[A-Z] \d[A-Z]\d$/', 'Invalid Postal Code').label('Postal Code').required(),
    logo: mixed().label('Logo').required(),
    certificate: mixed().label('Cerificate').required(),
});
const Page = ({ params }) => {

    const [contractorData, setContractorData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        address: "",
        image: "",
    });

    const [detailsData, setDetailsData] = useState({
        contractor: '',
        company_name: '',
        address: '',
        postal_code: '',
        category: '',
        skills: '',
        service_areas: '',
        availability_days: '',
        availability_hours: '',
        website: '',
        description: '',
        trust_seal: 0,
    })

    const logoRef = useRef(null);
    const certificateRef = useRef(null);
    const licensesRef = useRef(null);

    const {
        setValue,
        register,
        handleSubmit,
        watch,
        reset,
        formState: {errors,},
    } = useForm({
        resolver: yupResolver(schema),
    });
    const logo = watch('logo');
    const certificate = watch('certificate')
    const licenses = watch('licenses')
    const onSubmit = (data) => {
        console.log(data)
    }
    return (
        <>
            <Header/>
            <div className="flex flex-col gap-5 lg:gap-10 py-44 justify-center items-center bg-gray-100 min-h-[100vh]">
                <div className='flex-1'>
                    <div className=" flex flex-col items-start ml-auto gap-10 max-w-lg p-1">
                        <h3 className='font-bold text-3xl lg:text-5xl'>We’re in the business of growing yours.</h3>
                        <div className='bg-[#27A9E1] h-1.5 rounded-full w-[200px]'/>
                    </div>

                </div>
                <div className='flex-1'>
                    <div className="flex flex-col gap-3 lg:items-center w-fit p-1">
                        <form
                            className='flex flex-col gap-5 md:mx-6 p-5 md:p-12 w-[100vw] lg:w-[1000px] bg-white shadow-lg'
                            onSubmit={handleSubmit(onSubmit)}>
                            <h4 className='font-bold text-xl self-center'>Join Us as a Contractor</h4>
                            <div className='flex flex-col'>
                                <label className='font-bold text-sm'>Professional/Company Name</label>
                                <input type='text' className='border-2 w-full p-2' {...register("businessname")}
                                       placeholder='Your Business Name'/>
                                {errors.businessname && (
                                    <span className="text-sm text-red-500">
                    {errors.businessname.message}
                  </span>
                                )}
                            </div>
                            <div className='flex flex-col lg:flex-row gap-4 w-full'>
                                <div className='flex-1 flex flex-col'>
                                    <label className='font-bold text-sm'>First Name</label>
                                    <input type='text' className='border-2 w-full p-2'
                                           placeholder='First Name' {...register("firstname")}/>
                                    {errors.firstname && (
                                        <span className="text-sm text-red-500">
                      {errors.firstname.message}
                    </span>
                                    )}
                                </div>
                                <div className='flex-1 flex flex-col'>
                                    <label className='font-bold text-sm'>Last Name</label>
                                    <input type='text' className='border-2 w-full p-2'
                                           placeholder='Last Name' {...register("lastname")}/>
                                    {errors.lastname && (
                                        <span className="text-sm text-red-500">
                      {errors.lastname.message}
                    </span>
                                    )}
                                </div>
                            </div>
                            <div className='flex flex-col lg:flex-row gap-4 w-full'>
                                <div className='flex-1 flex flex-col'>
                                    <label className='font-bold text-sm'>Email</label>
                                    <input type='text' className='border-2 w-full p-2'
                                           placeholder='Email Address' {...register("email")}/>
                                    {errors.email && (
                                        <span className="text-sm text-red-500">
                      {errors.email.message}
                    </span>
                                    )}
                                </div>
                                <div className='flex-1 flex flex-col'>
                                    <label className='font-bold text-sm'>Phone Number</label>
                                    <input type='number' className='border-2 w-full p-2'
                                           placeholder='Phone Number' {...register("phone_number")}/>
                                    {errors.phone_number && (
                                        <span className="text-sm text-red-500">
                      {errors.phone_number.message}
                    </span>
                                    )}
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <label className='font-bold text-sm'>Address</label>
                                <input type='text' className='border-2 w-full p-2' {...register("address")}
                                       placeholder='Address'/>
                                {errors.email && (
                                    <span className="text-sm text-red-500">
                    {errors.email.message}
                  </span>
                                )}
                            </div>
                            <div className='flex flex-col'>
                                <label className='font-bold text-sm'>Postal Code</label>
                                <input type='text' className='border-2 w-full p-2' {...register("postal_code")}
                                       placeholder='Postal Code'/>
                                {errors.postal_code && (
                                    <span className="text-sm text-red-500">
                    {errors.postal_code.message}
                  </span>
                                )}
                            </div>
                            <div className="min-w-[250px] w-[100%] mb-6 ">
                                <label className='font-bold text-sm'>Licenses</label>
                                <div className="flex justify-center items-center p-5">
                                    {
                                        licenses && licenses.length > 0 ?
                                            <div className='flex flex-col items-center gap-3'>
                                                <CiFileOn size={60}/>
                                                <p>{licenses[0].name}</p>
                                            </div> :
                                            <button onClick={() => licensesRef.current.click()} type='button'
                                                    className="px-5 py-2 bg-[#27A9E1] font-bold text-sm text-white">Upload
                                                File</button>
                                    }
                                    <input ref={licensesRef} type='file' accept='application/pdf'
                                           onChange={(e) => setValue('licenses', e.target.files)}
                                           className='hidden border-2 w-full p-2' placeholder='Email Address'/>
                                </div>
                                {errors.licenses && (
                                    <span className="text-sm text-red-500">
                    {errors.licenses.message}
                  </span>
                                )}
                            </div>
                            <div className="min-w-[250px] w-[100%] mb-6 ">
                                <label className='font-bold text-sm'>Company Logo</label>
                                <div className="flex justify-center items-center p-5">
                                    {
                                        logo && logo.length > 0 ?
                                            <div className='flex flex-col items-center gap-3'>
                                                <CiFileOn size={60}/>
                                                <p>{logo[0].name}</p>
                                            </div> :
                                            <button onClick={() => logoRef.current.click()} type='button'
                                                    className="px-5 py-2 bg-[#27A9E1] font-bold text-sm text-white">Upload
                                                File</button>

                                    }
                                    <input ref={logoRef} type='file' accept='application/pdf'
                                           onChange={(e) => setValue('logo', e.target.files)}
                                           className='hidden border-2 w-full p-2' placeholder='Email Address'/>
                                </div>
                                {errors.logo && (
                                    <span className="text-sm text-red-500">
                    {errors.logo.message}
                  </span>
                                )}
                            </div>
                            <div className='flex flex-col'>
                                <label className='font-bold text-sm'>Incorporation Certificate</label>
                                <div className="flex justify-center items-center p-5">
                                    {
                                        certificate && certificate.length > 0 ?
                                            <div className='flex flex-col items-center gap-3'>
                                                <CiFileOn size={60}/>
                                                <p>{certificate[0].name}</p>
                                            </div> :
                                            <button onClick={() => certificateRef.current.click()} type='button'
                                                    className="px-5 py-2 bg-[#27A9E1] font-bold text-sm text-white">Upload
                                                File</button>

                                    }
                                    <input ref={certificateRef} type='file' accept='application/pdf'
                                           onChange={(e) => setValue('certificate', e.target.files)}
                                           className='hidden border-2 w-full p-2' placeholder='Email Address'/>
                                </div>
                                {errors.certificate && (
                                    <span className="text-sm text-red-500">
                    {errors.certificate.message}
                  </span>
                                )}
                            </div>
                            <button type='submit' className="py-5 bg-[#27A9E1] font-bold text-sm text-white">REGISTER
                                NOW!
                            </button>
                        </form>
                        <p className="text-sm">Already have an account? <Link href='/login'
                                                                              className="font-bold underline">Log
                            in</Link> to continue</p>
                    </div>
                </div>
            </div>
            <footer class="text-gray-800 bg-[#E8E8E8] body-font">
                <div
                    class="container px-14 sm:px-0 sm:py-24 mx-auto flex  md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
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
