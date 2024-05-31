"use client";

import Header from "../../components/Header";
import React, { useState } from "react";
import authenticationService from "../../api/services/authenticationService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { PatternFormat } from "react-number-format";
import { IoEye } from "react-icons/io5";
import { IoEyeOff } from "react-icons/io5";
import Head from 'next/head';
import { usePathname } from 'next/navigation'
import { Footer } from "@/components/Footer";


const Page = () => {
  const [showPassword, setShowPassword] = useState(true);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(true);
  const [userAlreadyPresent, setUserAlreadyPresent] = useState("");
  const [verifyPassword , setVerifyPassword] = useState('')
  const pathname = usePathname()

  const [validInput, setValidInput] = useState({
    isPhoneEntered: true,
    isEmailValid: false,
  });

  const [names, setNames] = useState([
    "name",
    "email",
    "address",
    "phone",
    "password",
  ]);
  const [errors, setErrors] = useState([false, false, false, false, false]);
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
  });

  const navigate = useRouter();

  const handleChange = (e) => {
    let tempErrors = [...errors];
    const canadianPhoneRegex = /^\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    tempErrors[names.indexOf(e.target.name)] = false;
    setErrors(tempErrors);
    setRegisterData((data) => ({ ...data, [e.target.name]: e.target.value }));

    if (e.target.name === "phone") {
      setValidInput((prevState) => ({
        ...prevState,
        isPhoneEntered: canadianPhoneRegex.test(e.target.value),
      }));
    }

    if (e.target.name === "email") {
      setValidInput((prevState) => ({
        ...prevState,
        isEmailValid: emailRegex.test(e.target.value),
      }));
    }

    if (e.target.name === "password" && e.target.value.length < 4) {
      tempErrors[names.indexOf("password")] = true;
      setErrors(tempErrors);
    }
  };

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


  const handleRegister = (e) => {
    e.preventDefault();
    let tempErrors = [...errors];
    for (let i = 0; i < names.length; i++) {
      let name = names[i];
      tempErrors[i] = registerData[name].length === 0;
    }
    setErrors(tempErrors);

    if (registerData?.name?.length > 2) {
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerData?.email)) {
        if (registerData?.address?.length > 3) {
          if (/^\d{10}$/.test(registerData?.phone)) {
            if (passwordRegex.test(registerData.password)) {
              if (registerData?.password === verifyPassword) {
              
              if (!tempErrors.includes(true)) {
                authenticationService
                  .register(registerData)
                  .then((response) => {
                    navigate.push("/login");
                    toast.success(response.message);
                  })
                  .catch((error) => {
                    setUserAlreadyPresent(error?.message);
                    toast.error(error.message);
                    console.log("error", error);
                    // setSubmitting(false)
                  });
              }
              } else {
                toast.error("Password not match");
              }

            } else {
              toast.error("Enter a Strong password");
            }
          } else {
            toast.error("Enter a valid Phone");
          }
        } else {
          toast.error("Enter your Address");
        }
      } else {
        toast.error("Enter a valid email");
      }
    } else {
      toast.error("Enter your Display name");
    }
  };

  const [phone, setPhone] = useState("");
  console.log("phone number ", userAlreadyPresent);

  return (
    <>
<Head>
        <title>
         {pathname.replaceAll('/','')}
        </title>
        <meta
          name="description"
          content="Check out iPhone 12 XR Pro and iPhone 12 Pro Max. Visit your local store and for expert advice."
          key="desc"
        />
      </Head>

      <Header />
      <div className="flex flex-col gap-5 lg:gap-10 py-44 justify-center items-center bg-gray-100 min-h-[100vh]">

      <div className='flex-1'>
                    <div className=" flex flex-col items-start ml-auto gap-10 max-w-xl p-1">
                        <h3 className='font-bold text-3xl lg:text-5xl'>Sign Up.</h3>
                        <div className='bg-[#27A9E1] h-1.5 rounded-full w-[130px]'/>
                    </div>

                </div>

      <section className="flex-1 ">
        <div className="block rounded-lg bg-gray-100 w-[100%] max-md:w-[90%] shadow-lg ">
          <div className="flex flex-wrap">
            <div className="px-8 md:px-0 ">
              <div className="md:mx-6 md:p-12">
                <form className="justify-center items-center mx-auto">
                  <p className="mb-8 text-left sm:mt-4 mt-20 font-semibold text-2xl ">
                  Sign up as a customer
                  </p>

                  <div className="grid sm:grid-cols-2 gap-4 grid-cols-1">
                    <div className="mb-4">
                      <label className="text-left text-gray-700 font-bold mb-2">
                        Display Name
                      </label>
                      <input
                        name={names[0]}
                        onChange={(e) => handleChange(e)}
                        type="text"
                        className={`w-full border-[1px] bg-transparent px-4 py-2  outline-none ${
                          errors[0] ? "border-red-500" : "border-gray-300"
                        }`}
                        style={{
                          boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)",
                        }}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="text-left text-gray-700 font-bold mb-2">
                        Email
                      </label>
                      <input
                        name={names[1]}
                        type="email"
                        onChange={(e) => handleChange(e)}
                        className={`w-full border-[1px] bg-transparent px-4 py-2  outline-none ${
                          errors[1] ? "border-red-500" : "border-gray-300"
                        }`}
                        style={{
                          boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)",
                        }}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="text-left text-gray-700 font-bold mb-2">
                        Address
                      </label>
                      <input
                        name={names[2]}
                        type="text"
                        onChange={(e) => handleChange(e)}
                        className={`w-full border-[1px] bg-transparent px-4 py-2  outline-none ${
                          errors[2] ? "border-red-500" : "border-gray-300"
                        }`}
                        style={{
                          boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)",
                        }}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="text-left text-gray-700 font-bold mb-2">
                        Phone Number
                      </label>

                      <PatternFormat
                        type="tel"
                        format="+1 (###) ###-####"
                        onValueChange={(value) =>
                          setRegisterData((data) => ({
                            ...data,
                            phone: value.value,
                          }))
                        }
                        required
                        className={`w-full border-[1px] bg-transparent px-4 py-2  outline-none ${
                          errors[0] ? "border-red-500" : "border-gray-300"
                        }`}
                        style={{
                          boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)",
                        }}
                      />
                    </div>

                    <div className="">
                      <label className="text-left text-gray-700 font-bold mb-2">
                        Password
                      </label>
                      <div className="relative">
                        <input
                          name={names[4]}
                          type={!showPassword ? "text" : "password"}
                          onChange={(e) => handleChange(e)}
                          className={`w-full border-[1px] bg-transparent px-4 py-2 outline-none ${
                            errors[4] ? "border-red-500" : "border-gray-300"
                          }`}
                          
                          style={{
                            boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)",
                          }}
                        />
                        {showPassword ? 
                      <IoEyeOff className="ml-auto mt-[-2rem] mr-4 cursor-pointer" size={24} onClick={() => setShowPassword(false)} />
:
  <IoEye className="ml-auto mt-[-2rem] mr-4 cursor-pointer" size={24} onClick={() => setShowPassword(true)} />
                      }
                      </div>
                    </div>

                    <div className="">
                      <label className="text-left text-gray-700 font-bold mb-2">
                        Confirm Password
                      </label>
                      <div className="relative">
                        <input
                          name='confirm-password'
                          type={!showPasswordConfirm ? "text" : "password"}
                          onChange={(e) => setVerifyPassword(e.target.value)}
                          className={`w-full border-[1px] bg-transparent px-4 py-2 outline-none border-gray-300`}

                          style={{
                            boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)",
                          }}
                        />
  {showPasswordConfirm ? 
                      <IoEyeOff className="ml-auto mt-[-2rem] mr-4 cursor-pointer" size={24} onClick={() => setShowPasswordConfirm(false)} />
:
  <IoEye className="ml-auto mt-[-2rem] mr-4 cursor-pointer" size={24} onClick={() => setShowPasswordConfirm(true)} />
                      }

                      </div>
                    </div>

                  </div>
<p className="mb-8 text-sm text-gray-600 font-[400] mt-2">*Password must have at least 1 uppercase letter, 1 lowercase letter, 1 number, 1 special character, and be 8 characters long.</p>

                  <div className="mb-4 pb-1 pt-1 text-center mt-4">
                    <button
                      onClick={(e) => handleRegister(e)}
                      className="mb-3 py-3 inline-block w-full rounded px-6 font-bold text-base uppercase leading-normal text-white shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                      type="button"
                      style={{
                        background: "#27a9e1",
                      }}
                    >
                      Sign Up
                    </button>
                  </div>

                  <div className="flex items-center pb-10 mx-auto justify-center">
                    <p className="mb-0 me-2">Have an account?</p>
                    <p
                      // href={"/login"}
                      onClick={() => navigate.push("/login")}
                      className="inline-block rounded text-[#27a9e1]  text-base cursor-pointer"
                    >
                      Login
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

      </section>
        </div>
        <Footer   showNewsLetter={false} postProject={false}/>
    </>
  );
};

export default Page;
