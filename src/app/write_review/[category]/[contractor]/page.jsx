"use client";

import React, {useEffect, useState} from "react";
import {Rating} from "@material-tailwind/react";
import contractorService from "../../../../api/services/contractorService";
import uploadService from "../../../../api/services/uploadService";
import {useRouter} from "next/navigation";
import customerService from "@/api/services/customerService";
import {PatternFormat} from "react-number-format";
import Head from "next/head";
import {usePathname} from "next/navigation";
import {Footer} from "@/components/Footer";
import Header from "@/components/Header";
import {CloseOutlined} from "@mui/icons-material";

const Page = ({params}) => {
    const [clicked, setClicked] = useState(false);
    const [images, setImages] = useState([]);
    const [invalidFile, setInvalidFile] = useState(false);
    const [limitLength, setLimitLength] = useState(false);
    const [allImages, setAllImages] = useState([]);
    const pathname = usePathname();

    const [userData, setUserData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
    });

    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [displayName, setDisplayName] = useState("");
    const [postalCode, setPostalCode] = useState("")

    const [names, setNames] = useState([]);
    const [errors, setErrors] = useState([]);
    const [reviewData, setReviewData] = useState({
        user: 0,
        contractor: 0,
        category: 0,
        rating: 0,
        satisfaction: 0,
        recommendation: 0,
        paid: 0,
        postal_code: "",
        title: "",
        price: "",
        review: "",
    });

    const [titleError, setTitleError] = useState(false)
    const [reviewError, setReviewError] = useState(false);
    const [postaCodeError, setPostalCodeError] = useState(false);
    const [messageError, setMessageError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [addressError, setAddressError] = useState(false);
    const [numberError, setNumberError] = useState(false);
    const [costError, setCostError] = useState(false);
    const [recommendationError, setRecommendationError] = useState(false);
    const [satisfactionError, setSatisfactionError] = useState(false);
    const [allImagesError, setAllImagesError] = useState(false);

    useEffect(() => {
        if (reviewData.title.length > 0) {
            setTitleError(false);
        }
    }, [reviewData.title]);

    useEffect(() => {
        if (allImages?.length > 0) {
            setAllImagesError(false);
        }
    }, [allImages]);

    useEffect(() => {
        if (reviewData.review.length > 0) {
            setReviewError(false);
        }
    }, [reviewData.review]);

    useEffect(() => {
        if (/^[A-Z]\d[A-Z] \d[A-Z]\d$/i.test(reviewData?.postal_code)) {
            setPostalCodeError(false);
        }
    }, [reviewData.postal_code]);

    useEffect(() => {
        if (reviewData.price.length > 0) {
            setCostError(false);
        }
    }, [reviewData.price]);

    useEffect(() => {
        if (reviewData.review.length > 0) {
            setMessageError(false);
        }
    }, [reviewData.review]);

    useEffect(() => {
        if (userData.name.length > 0) {
            setNameError(false);
        }
    }, [userData.name]);
    useEffect(() => {
        if (userData.email.length > 0) {
            setEmailError(false);
        }
    }, [userData.email]);
    useEffect(() => {
        if (userData.address.length > 0) {
            setAddressError(false);
        }
    }, [userData.address]);

    useEffect(() => {
        if (userData.phone.length > 0) {
            setNumberError(false);
        }
    }, [userData.phone]);

    useEffect(() => {
        if (reviewData?.recommendation > 0) {
            setRecommendationError(false);
        }
    }, [reviewData?.recommendation]);

    useEffect(() => {
        if (reviewData?.satisfaction > 0) {
            setSatisfactionError(false);
        }
    }, [reviewData?.satisfaction]);

    console.log("recommendation error", recommendationError);

    console.log("satisfaction error", satisfactionError);

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleDisplayNameChange = (e) => {
        setDisplayName(e.target.value);
    };

    const navigate = useRouter();

    // const location = useLocation();
    // const params = new URLSearchParams(location.search);

    useEffect(() => {
        setReviewData((data) => ({...data, contractor: params.contractor}));
    }, []);

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("HELPERZZ-USER"));
        if (loggedInUser) {
            setLoggedIn(true);
            setReviewData((data) => ({...data, user: loggedInUser.id}));
            setUserData({
                name: loggedInUser.name,
                email: loggedInUser.email,
                address: loggedInUser.address,
                phone: loggedInUser.phone,
            });
        }
    }, []);

    useEffect(() => {
        console.log(reviewData);
    }, [reviewData]);

    useEffect(() => {
        setReviewData((data) => ({...data, category: params.category}));
    }, []);

    useEffect(() => {
        let rating = (reviewData.satisfaction + reviewData.recommendation) / 2;
        setReviewData((data) => ({...data, rating: parseInt(rating)}));
    }, [reviewData.satisfaction, reviewData.recommendation]);

    const handlePostalChange = (e) => {
        let inputPostal = e.target.value;
        inputPostal = inputPostal.toUpperCase()
        if (inputPostal.length > postalCode.length) {
            if (!inputPostal.includes(" ")) {
                if (inputPostal.length > 2) {
                    let p1 = inputPostal.substring(0, 3)
                    let p2 = inputPostal.substring(3, 5)
                    inputPostal = p1 + " " + p2;
                }
            }
        }
        console.log(inputPostal)
        setPostalCode(inputPostal);
        setReviewData((data) => ({
            ...data,
            postal_code: inputPostal,
        }))
    };

    const handleFileChange = (event) => {
        const files = event.target.files;
        let isValidFile = true;
        const newImageUrls = [];
        let imgs = [...allImages];
        imgs.push(...files);
        setAllImages(imgs);

        if (images.length + files.length > 6) {
            setLimitLength(true);
            return;
        }

        Array.from(files).forEach((file) => {
            if (
                file.type.match("image/jpeg") ||
                file.type.match("image/png") ||
                file.type.match("image/gif") ||
                file.type.match("image/svg+xml")
            ) {
                const fileURL = URL.createObjectURL(file);
                newImageUrls.push(fileURL);
            } else {
                isValidFile = false;
            }
        });

        if (isValidFile) {
            setInvalidFile(false);
            setImages((prevImages) => [...prevImages, ...newImageUrls]);
        } else {
            setInvalidFile(true);
        }
    };

    const handlePaid = (e) => {
        if (e.target.checked) {
            setReviewData((data) => ({
                ...data,
                paid: 1,
            }));
        } else {
            setReviewData((data) => ({
                ...data,
                paid: 0,
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (reviewData?.satisfaction > 0) {
            if (reviewData?.recommendation > 0) {
                if (reviewData?.title?.length > 0) {
                    if (/^[A-Z]\d[A-Z] \d[A-Z]\d$/i.test(reviewData?.postal_code)) {
                        if (reviewData?.price?.length > 0) {
                            if (reviewData?.review?.length > 0) {
                                if (allImages.length > 0) {
                                    if (userData?.email?.length > 0) {
                                        if (userData?.name?.length > 0) {
                                            if (userData?.address?.length > 0) {
                                                if (userData?.phone) {
                                                    let uData = {...userData};
                                                    uData.street = userData.address;
                                                    customerService
                                                        .passwordLessCreate(uData)
                                                        .then((response) => {
                                                            const customer = response.customer.id;
                                                            const data = {...reviewData};
                                                            data.user = customer;
                                                            contractorService
                                                                .createReview(data)
                                                                .then((response) => {
                                                                    console.log(response);
                                                                    for (let i = 0; i < allImages.length; i++) {
                                                                        uploadService
                                                                            .single(allImages[i])
                                                                            .then((file) => {
                                                                                const data = {
                                                                                    review: response?.review?.id,
                                                                                    image: file.fileName,
                                                                                };
                                                                                contractorService
                                                                                    .addImage(data)
                                                                                    .then((response) => {
                                                                                        console.log(response);
                                                                                        if (i === allImages.length - 1) {
                                                                                            navigate.replace("/");
                                                                                        }
                                                                                    });
                                                                            });
                                                                    }
                                                                })
                                                                .catch((error) => {
                                                                    console.log(error);
                                                                });
                                                        });
                                                } else {
                                                    setNumberError(true);
                                                }
                                            } else {
                                                setAddressError(true);
                                            }
                                        } else {
                                            setNameError(true);
                                        }
                                    } else {
                                        setEmailError(true);
                                    }
                                } else {
                                    setAllImagesError(true);
                                }
                            } else {
                                setMessageError(true);
                            }
                        } else {
                            setCostError(true);
                        }
                    } else {
                        setPostalCodeError(true);
                    }
                } else {
                    setTitleError(true);
                }
            } else {
                setRecommendationError(true);
            }
        } else {
            setSatisfactionError(true);
        }
    };

    return (
        <>
            <Head>
                <title>{pathname.replaceAll("/", "")}</title>
                <meta
                    name="description"
                    content="Check out iPhone 12 XR Pro and iPhone 12 Pro Max. Visit your local store and for expert advice."
                    key="desc"
                />
            </Head>
            <Header/>

            <section
                className="flex items-center justify-center min-h-screen bg-gray-200 pt-44"
                style={{alignItems: "center"}}
            >
                <div className="bg-gray-100 shadow-lg w-[90%]">
                    <div className="flex flex-wrap px-8 md:px-0 md:mx-6 md:p-12">
                        <form
                            onSubmit={(e) => handleSubmit(e)}
                            className="justify-center items-center mx-auto "
                        >
                            <h1 className="mb-8 text-center mt-5 font-semibold text-3xl">
                                Review Home
                            </h1>
                            <div className="text-center flex flex-col justify-center mx-auto items-center">
                                <label className="text-left text-gray-700 mb-2">
                                    How <strong> satisfied</strong> are you with this company?
                                </label>
                                <Rating
                                    style={{color: "#27a9e1"}}
                                    onChange={(e) =>
                                        setReviewData((data) => ({...data, satisfaction: e}))
                                    }
                                />
                                {satisfactionError && (
                                    <h1 className="text-red-500">Fill the required data</h1>
                                )}
                            </div>
                            <div className="text-center flex flex-col justify-center mx-auto items-center mt-3">
                                <label className="text-left text-gray-700 mb-2">
                                    How likely are you to <strong> recommend</strong> this
                                    company?
                                </label>
                                <Rating
                                    style={{color: "#27a9e1"}}
                                    onChange={(e) =>
                                        setReviewData((data) => ({...data, recommendation: e}))
                                    }
                                />
                                {recommendationError && (
                                    <h1 className="text-red-500">Fill the required data</h1>
                                )}
                            </div>

                            <div className="md:w-[600px] w-full">
                                <div className="mb-4 mt-5">
                                    <label className="text-left text-gray-700 font-bold mb-2">
                                        Review Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Project, product, or service, e.g, Kitchen Renovation"
                                        onChange={(e) =>
                                            setReviewData((data) => ({
                                                ...data,
                                                title: e.target.value,
                                            }))
                                        }
                                        className={`w-full border-[1px] bg-transparent px-4 py-2  outline-none border-gray-300`}
                                    />
                                    {titleError && (
                                        <h1 className="text-red-500">Fill the required data</h1>
                                    )}
                                </div>

                                <div className="mb-4 mt-5">
                                    <label className="text-left text-gray-700 font-bold mb-2">
                                        Postal Code
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Postal Code"
                                        value={postalCode}
                                        maxLength={7}
                                        onChange={(e) =>
                                            handlePostalChange(e)
                                        }
                                        className={`w-full border-[1px] bg-transparent px-4 py-2  outline-none border-gray-300`}
                                    />
                                    {postaCodeError && (
                                        <h1 className="text-red-500">Enter a valid postal code</h1>
                                    )}
                                </div>

                                <div className="mb-4 ">
                                    {" "}
                                    <label className="text-left text-gray-700 font-bold mb-2">
                                        Approximate Cost
                                    </label>
                                    <div className="flex md:flex-row flex-col">
                                        <div className="md:w-[55%] w-full">
                                            <input
                                                type="number"
                                                onChange={(e) =>
                                                    setReviewData((data) => ({
                                                        ...data,
                                                        price: e.target.value,
                                                    }))
                                                }
                                                className={` w-full border-[1px] bg-transparent px-4 py-2  outline-none border-gray-300`}
                                            />
                                            {costError && (
                                                <h1 className="text-red-500">Fill the required data</h1>
                                            )}
                                        </div>
                                        <div
                                            class="flex items-center md:ml-2 ml-0 align-content-center my-auto md:pt-0 pt-3">
                                            <input
                                                id="checkbox"
                                                type="checkbox"
                                                value=""
                                                onChange={(e) => handlePaid(e)}
                                                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded  dark:bg-gray-700 dark:border-gray-600"
                                            />
                                            <label
                                                for="default-checkbox"
                                                class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-600"
                                            >
                                                I paid for this service.
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-4">
                                    <label className="text-left text-gray-700 font-bold mb-2">
                                        Message
                                    </label>

                                    <textarea
                                        onChange={(e) =>
                                            setReviewData((data) => ({
                                                ...data,
                                                review: e.target.value,
                                            }))
                                        }
                                        rows={4}
                                        id="message"
                                        name="message"
                                        className={`w-full border-[1px] bg-transparent px-4 py-2  outline-none border-gray-300`}
                                    ></textarea>
                                    {messageError && (
                                        <h1 className="text-red-500">Fill the required data</h1>
                                    )}
                                </div>

                                <div className="min-w-[250px] w-[100%] mb-6 ">
                                    <label
                                        htmlFor="dropzone-file"
                                        className={`flex flex-col items-center justify-center w-full h-30 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 mt-3 border-gray-300
                      `}
                                    >
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
                                                or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500 ">
                                                SVG, PNG, JPG or GIF
                                            </p>
                                        </div>

                                        <input
                                            type="file"
                                            id="dropzone-file"
                                            name="image"
                                            className="hidden"
                                            multiple
                                            accept="image/*"
                                            onChange={handleFileChange}
                                        />
                                    </label>
                                    {allImagesError && (
                                        <p className="text-red-500 text-sm">please upload image</p>
                                    )}
                                    {invalidFile && (
                                        <p className="text-red-500 text-sm">
                                            Invalid file format. Please upload only JPEG, PNG, GIF, or
                                            SVG files.
                                        </p>
                                    )}
                                    {limitLength && (
                                        <p className="text-red-500 text-sm">
                                            Limit reached (maximum limit: 6)
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                {images.map((image, index) => (
                                    <div key={index}
                                         className="relative flex">

                                        <img
                                            src={image}
                                            alt={`Uploaded ${index + 1}`}
                                            className="w-20 object-cover mr-2"
                                        />
                                        <div className='ml-[-1.3rem] bg-white h-4 items-center flex '>
                                            <CloseOutlined className="text-sm cursor-pointer" />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="p-5 w-full mx-auto border-1 border-gray-500 bg-gray-200 bg-opacity-50">
                                <div className="mb-4 mt-3">
                                    <label className="block mb-2 md:text-xl text-base font-normal text-gray-500 ">
                                        Email
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        required
                                        placeholder="Email"
                                        onChange={(e) =>
                                            setUserData((data) => ({
                                                ...data,
                                                email: e.target.value,
                                            }))
                                        }
                                        value={userData.email}
                                        disabled={loggedIn}
                                        className={`border text-gray-600 placeholder-gray-400 md:text-md text-sm rounded-md block w-full p-3 placeholder:text-base `}
                                    />
                                    {emailError && (
                                        <h1 className="text-red-500">Fill the required data</h1>
                                    )}
                                </div>

                                <div className="mb-4 mt-5">
                                    <label className="block mb-2 md:text-xl text-md font-normal text-gray-500">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Full Name"
                                        value={userData.name}
                                        onChange={(e) =>
                                            setUserData((data) => ({
                                                ...data,
                                                name: e.target.value,
                                            }))
                                        }
                                        disabled={loggedIn}
                                        className={`border text-gray-600 placeholder-gray-400 md:text-md text-sm rounded-md block w-full p-3 placeholder:text-base `}
                                    />
                                    {nameError && (
                                        <h1 className="text-red-500">Fill the required data</h1>
                                    )}
                                </div>
                                <div className="mb-4 mt-5">
                                    <label className="block mb-2 md:text-xl text-md font-normal text-gray-500">
                                        Address
                                    </label>
                                    <input
                                        type="text"
                                        name="address"
                                        placeholder="Address"
                                        value={userData.address}
                                        onChange={(e) =>
                                            setUserData((data) => ({
                                                ...data,
                                                address: e.target.value,
                                            }))
                                        }
                                        disabled={loggedIn}
                                        className={`border text-gray-600 placeholder-gray-400 md:text-md text-sm rounded-md block w-full p-3 placeholder:text-base `}
                                    />
                                    {addressError && (
                                        <h1 className="text-red-500">Fill the required data</h1>
                                    )}
                                </div>
                                <div className="mb-4 mt-5">
                                    <label className="block mb-2 md:text-xl text-md font-normal text-gray-500">
                                        Phone Number
                                    </label>
                                    {/* <input
                                        type="number"
                                        name="phone"
                                        required
                                        placeholder="Phone Number"
                                        value={userData.phone}
                                        onChange={(e) =>
                                            setUserData((data) => ({
                                                ...data,
                                                phone: e.target.value,
                                            }))
                                        }
                                        disabled={loggedIn}
                                        className={`border text-gray-600 placeholder-gray-400 md:text-md text-sm rounded-md block w-full p-3 placeholder:text-base `}
                                    /> */}
                                    <PatternFormat
                                        type="tel"
                                        format="+1 (###) ###-####"
                                        onValueChange={(value) =>
                                            setUserData((data) => ({
                                                ...data,
                                                phone: value.value,
                                            }))
                                        }
                                        disabled={loggedIn}
                                        placeholder="Phone Number"
                                        className={`border text-gray-600 placeholder-gray-400 md:text-md text-sm rounded-md block w-full p-3 placeholder:text-base `}
                                    />
                                    {numberError && (
                                        <h1 className="text-red-500">Fill the required data</h1>
                                    )}
                                </div>
                            </div>

                            <div className="mb-4 pb-1 pt-5 text-center">
                                <input
                                    type="submit"
                                    value="submit"
                                    className="mb-3 cursor-pointer py-3 inline-block w-full rounded px-6 font-bold text-base uppercase leading-normal text-white shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                                    style={{
                                        background: "#27a9e1",
                                    }}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </section>
            <Footer showNewsLetter={false} postProject={false}/>
        </>
    );
};

export default Page;
