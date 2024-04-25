'use client'
import Header from "@/components/Header";
import Link from "next/link";
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {object, string, mixed} from 'yup';
import {useEffect, useRef, useState} from 'react'
import {CiFileOn} from "react-icons/ci";
import {log} from "next/dist/server/typescript/utils";
import contractorService from "@/api/services/contractorService";

const schema = object({
    businessname: string().required().label('Business Name'),
    firstname: string().required().label('First Name'),
    lastname: string().required().label('Last Name'),
    email: string().email().required().label('Email'),
    phone_number: string().min(10, 'Invalid Phone Number').label('Phone Number').required(),
    address: string().label('Address').required(),
    licenses: mixed().label('Licenses').required(),
    postal_code: string().matches(/^[A-Z]\d[A-Z] \d[A-Z]\d$/, 'Invalid Postal Code').label('Postal Code').required(),
    logo: mixed().label('Logo').required(),
    certificate: mixed().label('Cerificate').required(),
});
const Page = ({ params }) => {


    const [contractorData, setContractorData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "123456",
        address: "",
        image: "-",
    });

    const [detailsData, setDetailsData] = useState({
        contractor: '',
        company_name: '',
        address: '',
        postal_code: '56000',
        category: '0',
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
        let contractorD = {...contractorData}
        contractorD.name = data.firstname + " " + data.lastname
        contractorD.email = data.email
        contractorD.phone = data.phone_number
        contractorD.address = data.address
        contractorService.create(contractorD).then(response => {
            let contractorDetails = {...detailsData}
            contractorDetails.contractor = response.contractor.id
            contractorDetails.address = data.address
            contractorDetails.postal_code = data.postal_code
            contractorDetails.company_name = data.businessname
            contractorService.createDetails(contractorDetails).then(response => {
                console.log(response)
            })
        }).catch(err => {

        })
        // setDetailsData(value => ({...value, contractor: data.contractor, company_name: data.company_name, address: data.address, postal_code: data.postal_code, skills: data.skills, service_areas: data.service_areas, availability_days: data.availability_days, availability_hours: data.availability_hours, website: data.website, description: data.description }))
        // console.log(data)
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
                            <div className='flex gap-4'>
                                <div className='flex-1 flex flex-col'>
                                    <label className='font-bold text-sm'>Address</label>
                                    <input type='text' className='border-2 w-full p-2' {...register("address")}
                                        placeholder='Address'/>
                                    {errors.address && (
                                        <span className="text-sm text-red-500">
                                        {errors.address.message}
                                    </span>
                                    )}
                                </div>
                                <div className='flex-initial flex flex-col'>
                                    <label className='font-bold text-sm'>Postal Code</label>
                                    <input type='text' className='border-2 w-full p-2' {...register("postal_code")}
                                        placeholder='Postal Code'/>
                                    {errors.postal_code && (
                                        <span className="text-sm text-red-500">
                                            {errors.postal_code.message}
                                        </span>
                                    )}
                                </div>
                            </div>
                            <div className="min-w-[250px] w-[100%] mb-6 ">
                <label className='font-bold text-sm'>Licenses</label>
                <div
                    htmlFor="dropzone-file"
                    onClick={() => {console.log('here', licensesRef.current);licensesRef.current?.click()}}
                    className={`flex flex-col items-center justify-center w-full h-30 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 mt-3 border-gray-300
  `}
                >
                    {licenses && licenses.length > 0 ?
                      <div className="flex flex-wrap py-3">
                          <img
                              src={URL.createObjectURL(licenses[0])}
                              alt={`Uploaded Logo`}
                              className="w-20 object-cover mr-2"
                          />
                      </div>:
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                            className="w-8 h-8 mb-4 text-gray-500 "
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 ">
                            <span className="font-semibold">Click to upload</span>{" "}

                        </p>
                        <p className="text-xs text-gray-500 ">
                            SVG, PNG, JPG or GIF
                        </p>
                    </div>

                    }

                    <input
                        ref={licensesRef}
                        type="file"
                        id="dropzone-file"
                        name="image"
                        accept='image/jpeg, image/png, image/svg+xml'
                        className="hidden"
                        onChange={(e) => setValue('licenses', e.target.files)}
                      />
                </div>
                {errors.licenses && (
                  <span className="text-sm text-red-500">
                    {errors.licenses.message}
                  </span>
                )}
            </div>
            <div className="min-w-[250px] w-[100%] mb-6 ">
                <label className='font-bold text-sm'>Company Logo</label>
                <div
                    htmlFor="dropzone-file"
                    onClick={() => {console.log('here', logoRef.current);logoRef.current?.click()}}
                    className={`flex flex-col items-center justify-center w-full h-30 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 mt-3 border-gray-300
  `}
                >
                    {logo && logo.length > 0 ?
                      <div className="flex flex-wrap py-3">
                          <img
                              src={URL.createObjectURL(logo[0])}
                              alt={`Uploaded Logo`}
                              className="w-20 object-cover mr-2"
                          />
                      </div>:
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                            className="w-8 h-8 mb-4 text-gray-500 "
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 ">
                            <span className="font-semibold">Click to upload</span>{" "}

                        </p>
                        <p className="text-xs text-gray-500 ">
                            SVG, PNG, JPG or GIF
                        </p>
                    </div>

                    }

                    <input
                        ref={logoRef}
                        type="file"
                        id="dropzone-file"
                        name="image"
                        accept='image/jpeg, image/png, image/svg+xml'
                        className="hidden"
                        onChange={(e) => setValue('logo', e.target.files)}
                      />
                </div>
                {errors.logo && (
                  <span className="text-sm text-red-500">
                    {errors.logo.message}
                  </span>
                )}
            </div>
            <div className="min-w-[250px] w-[100%] mb-6 ">
                <label className='font-bold text-sm'>Incorporation Certificate</label>
                <div
                    htmlFor="dropzone-file"
                    onClick={() => {console.log('here', certificateRef.current);certificateRef.current?.click()}}
                    className={`flex flex-col items-center justify-center w-full h-30 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 mt-3 border-gray-300
  `}
                >
                    {certificate && certificate.length > 0 ?
                      <div className="flex flex-wrap py-3">
                          <img
                              src={URL.createObjectURL(certificate[0])}
                              alt={`Uploaded Logo`}
                              className="w-20 object-cover mr-2"
                          />
                      </div>:
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                            className="w-8 h-8 mb-4 text-gray-500 "
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                        >
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 ">
                            <span className="font-semibold">Click to upload</span>{" "}

                        </p>
                        <p className="text-xs text-gray-500 ">
                            SVG, PNG, JPG or GIF
                        </p>
                    </div>

                    }

                    <input
                        ref={certificateRef}
                        type="file"
                        id="dropzone-file"
                        name="image"
                        accept='image/jpeg, image/png, image/svg+xml'
                        className="hidden"
                        onChange={(e) => setValue('certificate', e.target.files)}
                      />
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
