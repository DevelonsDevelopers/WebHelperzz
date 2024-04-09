"use client";
import React, { useState } from "react";
import Header from "../../components/Header";
import authenticationService from "../../api/services/authenticationService";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Page = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: false,
    password: false,
    auth: false,
  });
  const navigate = useRouter();

  const handleChange = (e) => {
    setLoginData((data) => ({ ...data, [e.target.name]: e.target.value }));
    setError((prevError) => ({
      ...prevError,
      [e.target.name]: false,
      auth: false,
    }));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let hasError = false;
    setError((prevError) => ({ ...prevError, auth: false }));
    if (loginData.email.length === 0 || emailRegex.test(e.target.value)) {
      setError((prevError) => ({ ...prevError, email: true }));
      hasError = true;
    }
    if (loginData.password.length === 0) {
      setError((prevError) => ({ ...prevError, password: true }));
      hasError = true;
    }
    if (hasError) return;
    // setSubmitting(true)

    authenticationService
      .login(loginData)
      .then((response) => {
        // setSubmitting(false)
        localStorage.setItem("HELPERZZ-USER", JSON.stringify(response.user));
        Cookies.set("helperzz-customer-auth-token", response.token, {
          secure: true,
          sameSite: "Lax",
        });
        navigate.push("/");
        toast.success(response.message);
      })
      .catch((error) => {
        setError((prevError) => ({ ...prevError, auth: true }));
      });
  };
  // setSubmitting(true)

  return (
    <>
      <Header />
      <section
        className="flex items-center justify-center min-h-screen bg-gray-200"
        style={{ alignItems: "center" }}
      >
        <div className="block rounded-lg bg-gray-100 shadow-lg ">
          <div className="flex flex-wrap  ">
            <div className="px-8 md:px-0 m-auto">
              <div className="md:mx-6 md:p-12">
                <form className="justify-center items-center mx-auto">
                  <p className="mb-8 text-left mt-10 font-semibold text-2xl">
                    Login to your account
                  </p>
                  {error.auth && (
                    <div
                      className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mb-6 rounded relative"
                      role="alert"
                    >
                      <strong className="font-bold">Error!</strong>
                      <span className="block sm:inline">
                        {" "}
                        Invalid Email or Password
                      </span>
                    </div>
                  )}

                  {error.email && (
                    <div
                      className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mb-6 rounded relative"
                      role="alert"
                    >
                      <strong className="font-bold">Error!</strong>
                      <span className="block sm:inline">
                        {" "}
                        Please enter a valid email.
                      </span>
                    </div>
                  )}
                  {error.password && (
                    <div
                      className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 mb-6 rounded relative"
                      role="alert"
                    >
                      <strong className="font-bold">Error!</strong>
                      <span className="block sm:inline">
                        {" "}
                        Please enter your password.
                      </span>
                    </div>
                  )}

                  <div className="mb-4">
                    <label className="text-left text-gray-700 font-bold mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      onChange={(e) => handleChange(e)}
                      className="w-full border-[1px] border-gray-300 bg-transparent px-4 py-2  outline-none "
                      style={{
                        boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  </div>

                  <div className="mb-4 my-6">
                    <label className="text-left text-gray-700 font-bold mb-2">
                      Password
                    </label>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      onChange={(e) => handleChange(e)}
                      className="w-full border-[1px] border-gray-300 bg-transparent px-4 py-2  outline-none "
                      style={{
                        boxShadow: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)",
                      }}
                    />
                  </div>

                  <div className="mb-4 pb-1 pt-1 text-center">
                    <button
                      onClick={(e) => handleLogin(e)}
                      className="mb-3 py-3 inline-block w-full rounded px-6 font-bold text-base uppercase leading-normal text-white shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                      type="button"
                      style={{
                        background: "#27a9e1",
                      }}
                    >
                      Log in
                    </button>
                  </div>

                  <div className="flex items-center pb-3 mx-auto justify-center">
                    <p className="mb-0 me-2">Don&apos;t have an account?</p>
                    <p
                      onClick={() => navigate.push("/signup")}
                      className="inline-block rounded
                      text-[#27a9e1] text-base cursor-pointer"
                    >
                      Sign Up
                    </p>
                  </div>

                  <div className="flex items-center pb-6 mx-auto justify-center">
                    <p
                      onClick={() => navigate.push("/")}
                      className="inline-block rounded
                      text-[#27a9e1] text-base cursor-pointer"
                    >
                      Forgot your password?
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
