'use client'
import Header from "@/components/Header";
import {Footer} from "@/components/Footer";

import Link from "next/link";
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {object, string, mixed} from 'yup';
import {useEffect, useRef, useState} from 'react'
import {CiFileOn} from "react-icons/ci";
import {log} from "next/dist/server/typescript/utils";
import categoryService from "@/api/services/categoryService";
import contractorService from "@/api/services/contractorService";
import subcategoryService from "@/api/services/subcategoryService";
import uploadService from "@/api/services/uploadService";
import {useRouter} from "next/navigation";
import emailService from "@/api/services/emailService";
import {PatternFormat} from "react-number-format";
import toast from "react-hot-toast";
import cityService from "@/api/services/cityService";
import Head from 'next/head';
import {usePathname} from 'next/navigation';
import Select from 'react-select'



const schema = object({
    businessname: string().required().label('Business Name'),
    firstname: string().required().label('First Name'),
    lastname: string().required().label('Last Name'),
    email: string().email().required().label('Email'),
    // phone_number: string().min(10, 'Invalid Phone Number').label('Phone Number').required(),
    address: string().label('Address').required(),
    licenses: mixed().test('fileCount', 'Only six files are allowed', (value) => {
        return value.length <= 6;
    }).label('Licenses').required(),
    postal_code: string().matches(/^[A-Z]\d[A-Z] \d[A-Z]\d$/i, 'Invalid Postal Code').label('Postal Code').required(),
    logo: mixed().label('Logo').required(),
    certificate: mixed().label('Cerificate').required(),
    category: string().label('Category').required(),
    city: string().label('City').required(),
    subcategories: mixed().label('Subcategory').required()
});
const JoinUsComponent = ({params}) => {
    const pathname = usePathname()

    const navigate = useRouter();

    const [sendEmail, setSendEmail] = useState('')
    const [sendName, setSendName] = useState('')
    const [categories, setCategories] = useState([]);
    const [certificateDone, setCertificateDone] = useState(false)
    const [licenseDone, setLicenseDone] = useState(false)
    const [submitting, setSubmitting] = useState(false)
    const [subcategory, setSubcategory] = useState([])
    const [subcategoryValue, setSubcategoryValue] = useState()

    const [phoneNumber, setPhoneNumber] = useState('')
    const [contractorData, setContractorData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "123456",
        address: "",
        image: "-",
        status: 0,
        checked: 0,
        contractor: '',
        company_name: '',
        postal_code: '',
        category: '0',
        city: '0',
        skills: '',
        service_areas: '',
        availability_days: '',
        availability_hours: '',
        website: '',
        description: '',
        trust_seal: 0,
    });

    const [detailsData, setDetailsData] = useState({
        contractor: '',
        company_name: '',
        address: '',
        postal_code: '',
        category: '0',
        city: '0',
        skills: '',
        service_areas: '',
        availability_days: '',
        availability_hours: '',
        website: '',
        description: '',
        trust_seal: 0,
    })


    useEffect(() => {
        if (certificateDone && licenseDone) {
            setSubmitting(false)
            emailService.contractorJoin({email: sendEmail, name: sendName}).then(res => {
                console.log(res)
            })
            navigate.push('/join-us/success')
        }
    }, [certificateDone, licenseDone]);

    const logoRef = useRef(null);
    const certificateRef = useRef(null);
    const licensesRef = useRef(null);

    // console.log('email ' , sendEmail , company )
    const [category, setCategory] = useState()

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

    const [cities, setCities] = useState([])

    useEffect(() => {
        const getCities = async () => {
            try {
                const response = await cityService.fetchAll();
                setCities(response.cities);
                console.log('cities ', response)
            } catch (error) {
                console.error(error);
            }
        };
        getCities()
    }, [])

    const getSubcategoryByCategory = async (category) => {
        try {
            const response = await subcategoryService.fetchByCategory(category);
            setSubcategory(response.subcategories);
            console.log('cities ', response)
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        if (category) {
            getSubcategoryByCategory(category)
        }
    }, [category])



    const onSubmit = async (data) => {
        try {
            console.log('clicked');
            console.log(data)

            let contractorD = {...contractorData};
            contractorD.name = `${data.firstname} ${data.lastname}`;
            contractorD.email = data.email;
            contractorD.phone = phoneNumber;
            contractorD.address = data.address;
            contractorD.postal_code = data.postal_code;
            contractorD.company_name = data.businessname;
            contractorD.category = category;
            contractorD.city = data.city;

            setSubmitting(true);
            setSendEmail(data.email);
            setSendName(`${data.firstname} ${data.lastname}`);

            console.log(data)
            if (!data.businessname || !data.email) {
                setSubmitting(false);
                return;
            }

            const logoFile = await uploadService.single(data.logo[0]);
            contractorD.image = logoFile.fileName;

            const submittedContractor = await contractorService.join(contractorD);

            if (submittedContractor.contractor !== null) {
                await Promise.all(
                    data.licenses.map(async (license) => {
                        const licenseFile = await uploadService.single(license);
                        const docData = {
                            contractor: submittedContractor.contractor,
                            title: 'License',
                            file: licenseFile.fileName,
                        };
                        await contractorService.createDocument(docData);
                    })
                );

                const certificateFile = await uploadService.single(data.certificate[0]);
                const certificateData = {
                    contractor: submittedContractor.contractor,
                    title: 'Incorporate Certificate',
                    file: certificateFile.fileName,
                };
                await contractorService.createDocument(certificateData);

                setLicenseDone(true);
                setCertificateDone(true);
            } else {
                setSubmitting(false);
            }
        } catch (error) {
            console.error('Error in onSubmit:', error);
            setSubmitting(false);
        }
    };


    const getCategories = async () => {
        try {
            const response = await categoryService.fetchAll();
            setCategories(response.categories);
        } catch (error) {
            console.error(error);
        }
    };

    const options = categories.map((category) => ({
        value: category.id,
        label: category.name,
    }));

    useEffect(() => {
        getCategories();
    }, []);

    const [secondSub, setSecondSub] = useState(subcategoryValue);

    useEffect(() => {
        setSecondSub(subcategoryValue);
    }, [subcategoryValue]);

    useEffect(() => {
        if (Array.isArray(secondSub) && secondSub.length > 0) {
            const concatenatedValues = secondSub.map(option => option.value).toString();
            setSecondSub(concatenatedValues);
        }
    }, [secondSub]);




    return (
        <>
            <Head>
                <title>
                    {pathname.replaceAll('/', '')}
                </title>
                <meta
                    name="description"
                    content="Check out iPhone 12 XR Pro and iPhone 12 Pro Max. Visit your local store and for expert advice."
                    key="desc"
                />
            </Head>

            <Header/>
            <div className="flex flex-col gap-5 lg:gap-10 py-44 justify-center items-center bg-gray-100 min-h-[100vh]">
                <div className='flex-1'>
                    <div className=" flex flex-col items-start ml-auto gap-10 max-w-xl p-1">
                        <h3 className='font-bold text-3xl lg:text-5xl'>With us, your business grows to new heights.</h3>
                        <div className='bg-[#27A9E1] h-1.5 rounded-full w-[200px]'/>
                    </div>

                </div>
                <div className='flex-1'>
                    <div className="flex flex-col gap-3 lg:items-center w-fit p-1">
                        <form
                            className='flex flex-col gap-5 md:mx-6 p-5 md:p-12 w-[100vw] lg:w-[1000px] bg-white shadow-lg'
                            onSubmit={handleSubmit(onSubmit)}>
                            <h4 className='font-bold text-xl self-center'>Join Us as a Contractor</h4>
                            <div className='flex flex-col lg:flex-row gap-4 w-full'>
                                <div className='flex-1 flex flex-col'>
                                    <label className='font-bold text-sm'>Professional/Company Name</label>
                                    <input type='text' required
                                           className='border-2 w-full p-2' {...register("businessname")}
                                           placeholder='Your Business Name'/>
                                    <span
                                        className={`${errors.businessname ? 'text-red-500' : 'text-transparent'} text-sm `}>
                                            {errors.businessname?.message}
                                        </span>
                                </div>
                                <div className='flex-1 flex flex-col'>
                                    <label className='font-bold text-sm'>Category</label>
                                    <select
                                        required
                                        className='bg-white  border-2 w-full p-2' value={category}
                                        onChange={(e) => {
                                            setCategory(e.target.value);
                                            setSecondSub(null);
                                            setSubcategoryValue([])
                                        }}
                                    >
                                        <option value="" selected disabled>Select Category</option>
                                        {
                                            options.map((option, i) => (
                                                <option key={i} value={option.value}>{option.label}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className='flex-1 flex flex-col'>
                                <label className='font-bold text-sm'>Subcategories</label>
                                <Select
                                    placeholder="Select category first"
                                    required
                                    value={subcategoryValue}
                                    onChange={(e) => setSubcategoryValue(e)}
                                    className='bg-white border-2 w-full !focus:outline-none'
                                    options={subcategory.map((value, index) => (
                                        {label: value.name, value: value.id}
                                    ))}
                                    isMulti={true}
                                    styles={{
                                        control: (provided) => ({
                                            ...provided,
                                            border: 'none',
                                        }),
                                        menu: (provided) => ({
                                            ...provided,
                                            border: 'none',
                                        }),
                                        multiValue: (provided) => ({
                                            ...provided,
                                            borderRadius: '0',
                                        }),
                                    }}
                                />


                            </div>
                            <div className='flex flex-col lg:flex-row gap-4 w-full'>
                                <div className='flex-1 flex flex-col'>
                                    <label className='font-bold text-sm'>First Name</label>
                                    <input required type='text' className='border-2 w-full p-2'
                                           placeholder='First Name' {...register("firstname")}/>
                                    <span
                                        className={`${errors.firstname ? 'text-red-500' : 'text-transparent'} text-sm `}>
                                            {errors.firstname?.message}
                                        </span>
                                </div>
                                <div className='flex-1 flex flex-col'>
                                    <label className='font-bold text-sm'>Last Name</label>
                                    <input required type='text' className='border-2 w-full p-2'
                                           placeholder='Last Name' {...register("lastname")}/>
                                    <span
                                        className={`${errors.lastname ? 'text-red-500' : 'text-transparent'} text-sm `}>{errors.lastname?.message}</span>
                                </div>
                            </div>
                            <div className='flex flex-col lg:flex-row gap-4 w-full'>
                                <div className='flex-1 flex flex-col'>
                                    <label className='font-bold text-sm'>Email</label>
                                    <input required type='text' className='border-2 w-full p-2'
                                           placeholder='Email Address' {...register("email")}/>
                                    <span className={`${errors.email ? 'text-red-500' : 'text-transparent'} text-sm `}>
                      {errors.email?.message}
                    </span>
                                </div>
                                <div className='flex-1 flex flex-col'>
                                    <label className='font-bold text-sm'>Phone Number</label>

                                    <PatternFormat
                                        type="tel"
                                        format="+1 (###) ###-####"
                                        onValueChange={(value) => setPhoneNumber(value.value)}
                                        placeholder="Phone Number"
                                        className='border-2 w-full p-2'
                                        required
                                    />


                                    <span
                                        className={`${errors.phone_number ? 'text-red-500' : 'text-transparent'} text-sm `}>
                      {errors.phone_number?.message}
                    </span>

                                </div>
                            </div>

                            <div className='flex-1 flex flex-col'>
                                <label className='font-bold text-sm'>City</label>
                                <select
                                    required
                                    className='bg-white  border-2 w-full p-2'
                                    {...register("city")}
                                >
                                    <option value="" selected disabled>Select City</option>
                                    {
                                        cities.map((option, i) => (
                                            <option key={i} value={option.id}>{option.name}</option>
                                        ))
                                    }
                                </select>
                            </div>

                            <div className='flex gap-4'>
                                <div className='flex-1 flex flex-col'>
                                    <label className='font-bold text-sm'>Address</label>
                                    <input required type='text' className='border-2 w-full p-2' {...register("address")}
                                           placeholder='Address'/>
                                    <span
                                        className={`${errors.address ? 'text-red-500' : 'text-transparent'} text-sm `}>
                                        {errors.address?.message}
                                    </span>
                                </div>
                                <div className='flex-initial flex flex-col'>
                                    <label className='font-bold text-sm'>Postal Code</label>
                                    <input required type='text'
                                           className='border-2 w-full p-2' {...register("postal_code")}
                                           placeholder='Postal Code'/>
                                    <span
                                        className={`${errors.postal_code ? 'text-red-500' : 'text-transparent'} text-sm `}>
                                            {errors.postal_code?.message ? errors.postal_code?.message : 'fake text'}
                                        </span>
                                </div>
                            </div>
                            <div className="min-w-[250px] w-[100%] mb-6 ">
                                <label className='font-bold text-sm'>Licenses</label>
                                <div
                                    htmlFor="dropzone-file"
                                    onClick={() => licensesRef.current?.click()}
                                    className={`flex flex-col items-center justify-center w-full h-30 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 mt-3 border-gray-300`}
                                >
                                    {licenses && licenses.length > 0 ?
                                        <div className="flex flex-wrap gap-1 py-3">
                                            {
                                                Array.from(licenses).map((license, i) => (

                                                    <img
                                                        key={i}
                                                        src={URL.createObjectURL(license)}
                                                        alt={"Uploaded Logo"}
                                                        className="w-20 object-cover mr-2"
                                                    />
                                                ))
                                            }
                                        </div> :
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
                                        multiple
                                        id="dropzone-file"
                                        name="image"
                                        accept='image/jpeg, image/png, image/svg+xml'
                                        className="hidden"
                                        onChange={(e) => setValue('licenses', e.target.files)}
                                    />
                                </div>
                                <span
                                    className={`${errors.licenses && !licenses?.length ? 'text-red-500' : 'text-transparent'} text-sm `}>{errors.licenses?.message}</span>
                            </div>
                            <div className="min-w-[250px] w-[100%] mb-6 ">
                                <label className='font-bold text-sm'>Company Logo</label>
                                <div
                                    htmlFor="dropzone-file"
                                    onClick={() => {
                                        console.log('here', logoRef.current);
                                        logoRef.current?.click()
                                    }}
                                    className={`flex flex-col items-center justify-center w-full h-30 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 mt-3 border-gray-300`}
                                >
                                    {logo && logo.length > 0 ?
                                        <div className="flex flex-wrap py-3">
                                            <img
                                                src={URL.createObjectURL(logo[0])}
                                                alt={"Uploaded Logo"}
                                                className="w-20 object-cover mr-2"
                                            />
                                        </div> :
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
                                <span
                                    className={`${errors.logo && !logo?.length ? 'text-red-500' : 'text-transparent'} text-sm `}>
                    {errors.logo?.message}
                  </span>
                            </div>
                            <div className="min-w-[250px] w-[100%] mb-6 ">
                                <label className='font-bold text-sm'>Incorporation Certificate</label>
                                <div
                                    htmlFor="dropzone-file"
                                    onClick={() => {
                                        console.log('here', certificateRef.current);
                                        certificateRef.current?.click()
                                    }}
                                    className={`flex flex-col items-center justify-center w-full h-30 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 mt-3 border-gray-300`}
                                >
                                    {certificate && certificate.length > 0 ?
                                        <div className="flex flex-wrap py-3">
                                            <img
                                                src={URL.createObjectURL(certificate[0])}
                                                alt={"Uploaded Logo"}
                                                className="w-20 object-cover mr-2"
                                            />
                                        </div> :
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
                                <span
                                    className={`${errors.certificate && !certificate?.length ? 'text-red-500' : 'text-transparent'} text-sm `}>
                    {errors.certificate?.message}
                  </span>
                            </div>
                            {submitting ?
                                <button type="submit" onClick={(e) => e.preventDefault()}
                                        className="py-5 bg-[#27A9E1] font-bold text-sm text-white">
                                    <div
                                        className="animate-spin rounded-full h-4 w-4 border-t-2 border-white mx-auto"></div>
                                </button>
                                :
                                <button type='submit'
                                        className="py-5 bg-[#27A9E1] font-bold text-sm text-white">REGISTER
                                    NOW!
                                </button>
                            }
                        </form>

                    </div>
                </div>
            </div>
            <Footer showNewsLetter={false} postProject={false}/>
        </>
    )
}

export default JoinUsComponent
