'use client'
import Header from "@/components/Header";
import Link from "next/link";
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup';
import {object, string, mixed} from 'yup';
import {useEffect, useRef, useState} from 'react'
import {CiFileOn} from "react-icons/ci";
import {log} from "next/dist/server/typescript/utils";
import categoryService from "@/api/services/categoryService";
import contractorService from "@/api/services/contractorService";
import uploadService from "@/api/services/uploadService";
import {useRouter} from "next/navigation";
import emailService from "@/api/services/emailService";
import { PatternFormat } from "react-number-format";
import toast from "react-hot-toast";


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
    postal_code: string().matches(/^[A-Z]\d[A-Z] \d[A-Z]\d$/, 'Invalid Postal Code').label('Postal Code').required(),
    logo: mixed().label('Logo').required(),
    certificate: mixed().label('Cerificate').required(),
    category: string().label('Category').required()
});
const Page = ({params}) => {

    const navigate = useRouter();
    const [company , setCompany] = useState('')

    const [sendEmail, setSendEmail] = useState('')
    const [sendName, setSendName] = useState('')
    const [categories, setCategories] = useState([]);
    const [certificateDone, setCertificateDone] = useState(false)
    const [licenseDone, setLicenseDone] = useState(false)
    const [submitting, setSubmitting] = useState(false)

    const [phoneNumber , setPhoneNumber] = useState('')
    const [contractorData, setContractorData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "123456",
        address: "",
        image: "-",
        status: 0,
        checked: 0
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

    useEffect(() => {
        if (certificateDone && licenseDone){
            setSubmitting(false)
            emailService.contractorJoin({ email: sendEmail, name: sendName }).then(res => {
                console.log(res)
            })
            navigate.push('/join-us/success')
        }
    }, [certificateDone, licenseDone]);

    const logoRef = useRef(null);
    const certificateRef = useRef(null);
    const licensesRef = useRef(null);

    // console.log('email ' , sendEmail , company )

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
        console.log('clicked')
        let contractorD = {...contractorData}
        contractorD.name = data.firstname + " " + data.lastname
        contractorD.email = data.email
        contractorD.phone = phoneNumber
        contractorD.address = data.address
        setSubmitting(true)
        setSendEmail(data.email)
        setSendName(data.firstname + " " + data.lastname)
        uploadService.single(data.logo[0]).then((file) => {
            contractorD.image = file.fileName
            contractorService.create(contractorD).then(response => {
                let contractorDetails = {...detailsData}
                contractorDetails.contractor = response.contractor.id
                contractorDetails.address = data.address
                contractorDetails.postal_code = data.postal_code
                contractorDetails.company_name = data.businessname
                setCompany(data.businessname)
                contractorDetails.category = data.category
                
if(data.businessname && data.email) {
    contractorService.checkContractor({email :data.email , company :data.businessname}).then((res) => { 

if(res.responseCode === 407){
    contractorService.createDetails(contractorDetails).then(response => {
        console.log(response)
    })
    for (let i = 0; i < data.licenses.length; i++) {
        uploadService.single(data.licenses[i]).then((file) => {
            const docData = {contractor: response.contractor.id, title: "License", file: file.fileName};
            contractorService.createDocument(docData).then((docResponse) => {
                if (i === data.licenses.length - 1) {
                    setLicenseDone(true)
                }
            });
        });
    }
    uploadService.single(data.certificate[0]).then((file) => {
        const data = {
            contractor: response.contractor.id,
            title: "Incorporate Certificate",
            file: file.fileName
        };
        contractorService.createDocument(data).then((docResponse) => {
            setCertificateDone(true)
        });
    });

} 
else {
    toast.error(res?.message)
    setSubmitting(false)
}

    })   
} else {
    console.log('no require data entered ' , data.businessname , data.email)
}
                
            }).catch(err => {

            })
        });
        console.log(data)
    }
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
    },[]);


    return (
        <>
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
                                    <input type='text' required className='border-2 w-full p-2' {...register("businessname")}
                                           placeholder='Your Business Name'/>
                                    {errors.businessname && (
                                        <span className="text-sm text-red-500">
                                            {errors.businessname.message}
                                        </span>
                                    )}
                                </div>
                                <div className='flex-1 flex flex-col'>
                                    <label className='font-bold text-sm'>Category</label>
                                    <select
                                        required
                                        className='bg-white text-gray-400 border-2 w-full p-2' {...register("category")}>
                                        <option value="">Select Category</option>
                                        {
                                            options.map((option, i) => (
                                                <option key={i} value={option.value}>{option.label}</option>
                                            ))
                                        }
                                    </select>
                                </div>
                            </div>
                            <div className='flex flex-col lg:flex-row gap-4 w-full'>
                                <div className='flex-1 flex flex-col'>
                                    <label className='font-bold text-sm'>First Name</label>
                                    <input required type='text' className='border-2 w-full p-2'
                                           placeholder='First Name' {...register("firstname")}/>
                                    {errors.firstname && (
                                        <span className="text-sm text-red-500">
                                            {errors.firstname.message}
                                        </span>
                                    )}
                                </div>
                                <div className='flex-1 flex flex-col'>
                                    <label className='font-bold text-sm'>Last Name</label>
                                    <input  required type='text' className='border-2 w-full p-2'
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
                                    <input required type='text' className='border-2 w-full p-2'
                                           placeholder='Email Address' {...register("email")}/>
                                    {errors.email && (
                                        <span className="text-sm text-red-500">
                      {errors.email.message}
                    </span>
                                    )}
                                </div>
                                <div className='flex-1 flex flex-col'>
                                    <label className='font-bold text-sm'>Phone Number</label>

                                    <PatternFormat
                                        type="tel"
                                        format="+1 (###) ###-####"
                                        onValueChange={(value) => setPhoneNumber(value.value) }
                                        placeholder="Phone Number"
                                        className='border-2 w-full p-2'
                                        required
                                    />

                                    {/* <input required type='number' className='border-2 w-full p-2'
                                           placeholder='Phone Number' {...register("phone_number")}/> */}

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
                                    <input required type='text' className='border-2 w-full p-2' {...register("address")}
                                           placeholder='Address'/>
                                    {errors.address && (
                                        <span className="text-sm text-red-500">
                                        {errors.address.message}
                                    </span>
                                    )}
                                </div>
                                <div className='flex-initial flex flex-col'>
                                    <label className='font-bold text-sm'>Postal Code</label>
                                    <input required type='text' className='border-2 w-full p-2' {...register("postal_code")}
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
                                    onClick={() => licensesRef.current?.click()}
                                    className={`flex flex-col items-center justify-center w-full h-30 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 mt-3 border-gray-300
  `}
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
                                {errors.licenses && !licenses?.length && (
                                    <span className="text-sm text-red-500">{errors.licenses.message}</span>
                                )}
                            </div>
                            <div className="min-w-[250px] w-[100%] mb-6 ">
                                <label className='font-bold text-sm'>Company Logo</label>
                                <div
                                    htmlFor="dropzone-file"
                                    onClick={() => {
                                        console.log('here', logoRef.current);
                                        logoRef.current?.click()
                                    }}
                                    className={`flex flex-col items-center justify-center w-full h-30 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 mt-3 border-gray-300
  `}
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
                                {errors.logo &&  !logo?.length && (
                                    <span className="text-sm text-red-500">
                    {errors.logo.message}
                  </span>
                                )}
                            </div>
                            <div className="min-w-[250px] w-[100%] mb-6 ">
                                <label className='font-bold text-sm'>Incorporation Certificate</label>
                                <div
                                    htmlFor="dropzone-file"
                                    onClick={() => {
                                        console.log('here', certificateRef.current);
                                        certificateRef.current?.click()
                                    }}
                                    className={`flex flex-col items-center justify-center w-full h-30 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 mt-3 border-gray-300
  `}
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
                                {errors.certificate && !certificate?.length &&  (
                                    <span className="text-sm text-red-500">
                    {errors.certificate.message}
                  </span>
                                )}
                            </div>
                            {submitting ?
                                <button type="submit" onClick={(e) => e.preventDefault()}
                                        className="py-5 bg-[#27A9E1] font-bold text-sm text-white">
                                    <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white mx-auto"></div>
                                </button>
                                :
                                <button type='submit' className="py-5 bg-[#27A9E1] font-bold text-sm text-white">REGISTER
                                    NOW!
                                </button>
                            }
                        </form>

                    </div>
                </div>
            </div>

        </>
    )
}

export default Page
