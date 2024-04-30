"use client";

import Header from "../../components/Header";
import React, { useState } from "react";
import authenticationService from "../../api/services/authenticationService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userAlreadyPresent, setUserAlreadyPresent] = useState(false);
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

  // console.log('phone validation' , /^\d{10}$/.test(registerData?.phone))

  const handleRegister = (e) => {
    e.preventDefault();
    let tempErrors = [...errors];
    for (let i = 0; i < names.length; i++) {
      let name = names[i];
      tempErrors[i] = registerData[name].length === 0;
    }
    setErrors(tempErrors);

    if (registerData?.name?.length > 4) 
    {
      if ( /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerData?.email)) {
        if (registerData?.address?.length > 3) {
        if (/^\d{10}$/.test(registerData?.phone)) {
            if(registerData?.password?.length > 5) {

            
            
            if (!tempErrors.includes(true)) {
              authenticationService
                .register(registerData)
                .then((response) => {
                  navigate.push("/login");
                  toast.success(response.message);
                })
                .catch((error) => {
                  setUserAlreadyPresent(true);
                  // setSubmitting(false)
                });
            }
            }
else {
  toast.error('Enter Strong Password')
}

          } else {
            toast.error('Enter a valid Phone')
          }
        } else {
          toast.error('Enter your Address')
        }
      } else {
        toast.error('Enter a valid email')
      }
    } else {
      toast.error('Enter your Display name')
    }

  };

  return (
    <>
      <Header />
      <section
        className="flex items-center justify-center min-h-screen bg-gray-200 pt-6"
        style={{ alignItems: "center" }}
      >
        <div className="block rounded-lg bg-gray-100 shadow-lg ">
          <div className="flex flex-wrap">
            <div className="px-8 md:px-0 ">
              <div className="md:mx-6 md:p-12">
                <form className="justify-center items-center mx-auto">
                  <p className="mb-8 text-left sm:mt-4 mt-20 font-semibold text-2xl ">
                    Sign up for an account
                  </p>
                  {/* {(errors[0] || errors[1] || errors[2] || errors[3]) && (
                    <div
                      className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mb-6 rounded relative"
                      role="alert"
                    >
                      <strong className="font-bold">Error!</strong>
                      <span className="block sm:inline">
                        Please fill in all required fields!
                      </span>
                    </div>
                  )}
                  {errors[4] && (
                    <div
                      className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mb-6 rounded relative"
                      role="alert"
                    >
                      <strong className="font-bold">Error! </strong>
                      <span className="block sm:inline">
                        {" "}
                        Please enter a strong password
                      </span>
                    </div>
                  )}
                  {userAlreadyPresent && (
                    <div
                      className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mb-6 rounded relative"
                      role="alert"
                    >
                      <strong className="font-bold">Error! </strong>
                      <span className="block sm:inline">
                        User may already exist! You can Login to use your
                        account.{" "}
                      </span>
                    </div>
                  )}
                  {!validInput.isPhoneEntered && (
                    <div
                      className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mb-6 rounded relative"
                      role="alert"
                    >
                      <strong className="font-bold">Error!</strong>
                      <span className="block sm:inline">
                        Please enter your phone number!
                      </span>
                    </div>
                  )}
                  {!validInput.isEmailValid && (
                    <div
                      className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mb-6 rounded relative"
                      role="alert"
                    >
                      <strong className="font-bold">Error!</strong>
                      <span className="block sm:inline">
                        Please enter a valid email!
                      </span>
                    </div>
                  )} */}
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
                      <input
                        name={names[3]}
                        type="number"
                        onChange={(e) => handleChange(e)}
                        className={`w-full border-[1px] bg-transparent px-4 py-2  outline-none ${
                          errors[3] ? "border-red-500" : "border-gray-300"
                        }`}
                        style={{
                          boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)",
                        }}
                      />
                    </div>

                    <div className="mb-8">
                      <label className="text-left text-gray-700 font-bold mb-2">
                        Create Password
                      </label>
                      <div className="relative">
                        <input
                          name={names[4]}
                          type={showPassword ? "text" : "password"}
                          onChange={(e) => handleChange(e)}
                          className={`w-full border-[1px] bg-transparent px-4 py-2 outline-none ${
                            errors[4] ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="must be atleast 4 characters"
                          style={{
                            boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)",
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mb-4 pb-1 pt-1 text-center">
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
    </>
  );
};

export default Page;
