'use client'

import Header from "../../components/Header";
import React, { useState } from "react";
import authenticationService from "../../api/services/authenticationService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [validInput, setValidInput] = useState({
    isPhoneEntered: true,
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

    tempErrors[names.indexOf(e.target.name)] = false;
    setErrors(tempErrors);
    setRegisterData((data) => ({ ...data, [e.target.name]: e.target.value }));
    if (e.target.name === "phone") {
      setValidInput((prevState) => ({
        ...prevState,
        isPhoneEntered: canadianPhoneRegex.test(e.target.value),
      }));
    }

    // if (e.target.name === "password" && e.target.value.length < 4) {
    //   setErrors({
    //     ...errors,
    //     password: "Password must be at least 4 characters",
    //   });
    // } else {
    //   setErrors({
    //     ...errors,
    //     password: "", // Clear the error if the input is valid
    //   });
    // }
  };

  const handleRegister = (e) => {
    e.preventDefault();
    let tempErrors = [...errors];
    for (let i = 0; i < names.length; i++) {
      let name = names[i];
      tempErrors[i] = registerData[name].length === 0;
    }
    setErrors(tempErrors);
    if (!tempErrors.includes(true)) {
      authenticationService
        .register(registerData)
        .then((response) => {
          navigate.push("/login");
          toast.success(response.message);
        })
        .catch((error) => {
          toast.error(error.message);
          // setSubmitting(false)
        });
    }
  };

  return (
    <>
      <Header />
      <section
        className="flex items-center justify-center min-h-screen bg-gray-200"
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

                  <div className="grid sm:grid-cols-2 grid-cols-1">
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
                      {!validInput.isPhoneEntered && (
                        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                          Please enter your phone number!
                        </p>
                      )}
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
                        {errors[4] && (
                          <p className="text-red-500">Please Enter a Strong Password</p>
                        )}
                        {/* <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? "Hide" : "Show"}
                      </button> */}
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
                      onClick={() => navigate.push('/login')}
                      className="inline-block rounded text-[#27a9e1]  text-base"
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
