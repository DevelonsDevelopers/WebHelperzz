"use client";
import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "../../../../../../style/GetQuotes.css";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import subcategoryService from "../../../../../../api/services/subcategoryService";
import requestService from "../../../../../../api/services/requestService";
import customerService from "../../../../../../api/services/customerService";
import imgLogo from "../../../../../../../public/assets/logo.jpeg";
import Image from "next/image";

function GetQuotes({ params }) {
  const [requestData, setRequestData] = useState({
    user: 2,
    subcategory: "",
    postal_code: "",
    home_type: "",
    time: "",
    details: "",
  });

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phone: "",
    street: "",
  });

  const [nextBox, setNextBox] = useState({
    showNextBox: false,
    showThirdBox: false,
    showFourthBox: false,
    showFifthBox: false,
  });

  const [validInput, setValidInput] = useState({
    isValidEmail: false,
    isNameEntered: false,
    isStreetEntered: false,
    isPhoneEntered: false,
  });

  const [selectedType, setSelectedType] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [imagePressed, setImagePressed] = useState(false);

  const [category, setCategory] = useState("");
  const [CATID, setCATID] = useState();
  const [subcategories, setSubcategories] = useState([]);

  const nextBoxRef = useRef(null);
  const thirdBoxRef = useRef(null);
  const fourthBoxRef = useRef(null);
  const fifthBoxRef = useRef(null);
  const [submitting, setSubmitting] = useState(false);

  // const searchParams = useSearchParams();
  // const params = new URLSearchParams(searchParams.search);

  const handleNameChange = (e) => {
    const inputName = e.target.value;
    setUserData((data) => ({ ...data, name: inputName }));
    setValidInput((prevState) => ({
      ...prevState,
      isNameEntered: inputName.trim() !== "",
    }));
  };

  const handleEmailChange = (e) => {
    const inputEmail = e.target.value;
    setUserData((data) => ({ ...data, email: inputEmail }));

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setValidInput((prevState) => ({
      ...prevState,
      isValidEmail: emailRegex.test(inputEmail),
    }));
  };

  const handleUserDataChange = (e) => {
    setUserData((data) => ({ ...data, [e.target.name]: e.target.value }));
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const canadianPhoneRegex = /^(\+1)?\d{10}$/;
    if (e.target.name === "name") {
      setValidInput((prevState) => ({
        ...prevState,
        isNameEntered: e.target.value.trim() !== "",
      }));
    } else if (e.target.name === "email") {
      setValidInput((prevState) => ({
        ...prevState,
        isValidEmail: emailRegex.test(e.target.value),
      }));
    } else if (e.target.name === "street") {
      setValidInput((prevState) => ({
        ...prevState,
        isStreetEntered: e.target.value.trim() !== "",
      }));
    } else if (e.target.name === "phone") {
      setValidInput((prevState) => ({
        ...prevState,
        isPhoneEntered: canadianPhoneRegex.test(e.target.value),
      }));
    }
  };

  const handleStreetChange = (e) => {
    const inputStreet = e.target.value;
    setUserData((data) => ({ ...data, street: inputStreet }));
  };

  const handlePhoneChange = (e) => {
    const inputPhone = e.target.value;
    const canadianPhoneRegex = /^(\+1)?\d{10}$/;
    setUserData((data) => ({ ...data, phone: inputPhone }));
    setValidInput((prevState) => ({
      ...prevState,
      isPhoneEntered: canadianPhoneRegex.test(inputPhone),
    }));
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
    filterOptions(event.target.value);
  };

  const filterOptions = (query) => {
    const filtered = radioData.filter((option) =>
      option.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredOptions(filtered);
  };

  const navigate = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      validInput.isValidEmail &&
      validInput.isNameEntered &&
      validInput.isStreetEntered &&
      validInput.isPhoneEntered
    ) {
      setSubmitting(true);
      customerService.passwordLessCreate(userData).then((response) => {
        const customer = response.customer.id;
        const data = { ...requestData };
        data.user = customer;
        requestService.create(data).then((response) => {
          setSubmitting(false);
          navigate.push("/getquotes/complete");
        });
      });
      // requestService.create(requestData).then((response) => {
      //   console.log(response);
      // });
    }
  };

  //   const handleRadioChange = (event) => {
  //     setSelectedValue(event.target.value);
  //   };

  const handleTypeSelection = (type) => {
    setSelectedType(type);
    setImagePressed(!imagePressed);
    setRequestData((data) => ({ ...data, home_type: type }));
  };

  const scrollToNextBox = () => {
    if (nextBoxRef.current) {
      nextBoxRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToThirdBox = () => {
    if (thirdBoxRef.current) {
      thirdBoxRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToFourthBox = () => {
    if (fourthBoxRef.current) {
      fourthBoxRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const scrollToFifthBox = () => {
    if (fifthBoxRef.current) {
      fifthBoxRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    setCategory(params.category);
    setCATID(params.id);
    setRequestData((data) => ({ ...data, postal_code: params.postal }));
  }, []);

  useEffect(() => {
    console.log(requestData);
  }, [requestData]);

  useEffect(() => {
    if (nextBox.showNextBox) {
      scrollToNextBox();
    }
  }, [nextBox.showNextBox]);

  useEffect(() => {
    if (nextBox.showThirdBox) {
      scrollToThirdBox();
    }
  }, [nextBox.showThirdBox]);

  useEffect(() => {
    if (nextBox.showFourthBox) {
      scrollToFourthBox();
    }
  }, [nextBox.showFourthBox]);

  useEffect(() => {
    if (nextBox.showFifthBox) {
      scrollToFifthBox();
    }
  }, [nextBox.showFifthBox]);

  useEffect(() => {
    setFilteredOptions(radioData);
  }, []);

  console.log(requestData.home_type);
  useEffect(() => {
    if (CATID) {
      subcategoryService.fetchByCategory(CATID).then((response) => {
        setSubcategories(response.subcategories);
      });
    }
  }, [CATID]);

  const dullImageHome =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAFCklEQVR4nO1bS4gcVRStiZH4I4pK/OAP/C00LvxsDG7iB6PoSsjKz0pdGZe6OudVzwyNw4AdshnFTZQsmsEImhgVF/GHbkQRdZWFDmKMSTRBEyNqyZ3cMnceVdVVr8rp7kwdKJKpvPvevefde897nZ4oatGiRYsWLYaCqampS+SJViIAPEsyAfAPgB2Tk5OXRSsJAA4oAb/JnySPkNwCYHWRHcmPdXyZ58NoVEF1EsBVJHean78AcGeeHYCPyhIA4INoVEF1Mv3ZOXc3yW9NWWwHsK6s/aD3IwdmODo7O3s2AJI8rkQclrLo9/tnlLEvet84eLIWg2uM5O8a5Eb/3wBcB2CPSefP4ji+bdQISOosBOAlU6uZKgDgEZILOuYvANsAXHC6ELCa5PNS76kKiDT6KgDgPAAvAPhTidhP8tGxJyBFRvf+0jm3IfIA4AYA7/rjx5aAbrd7vt1J59yDJPelKkDyFQAXe2YTYqNZkJIwI1nSlF+lEbpQp9O5FkCX5C/+TpZVAekDJHvSF9T+BwCP1fGrMvyFBqjCBID7SO4i+bcJ/P0sh+M4vn6QCggA3ArgUzPunWESkPgLz8zMnAvgaQDfmI5/jOTLcRyvz7MrowJmzCoAT5I8ZDNKsmloBAC4XFIZwEHj1I/6bkldD9oxAOdoWZxQIg5KwJJV3rgLpSxMhu2TvrLsBACYN7WZaGlszrvklE3ZOI5vIrnXzLsXwM3+OLlHyH3CjNsp940GQl6KdIFer7eG5OOePMluveqcuyPKAYC15kp8LCqHJSqgZ4MlKmDOGFv0hrl44wTw3KCbZiWYHd/v/d0V3e21wW0FcNTYvVhlbekD2g/STFuQfuGPEz/klGk2Zq5alBkAcLvsrt1xAJ9LFkg25O2cc+5eAG/5KgDg4SgQogyiEMaPPUJwhs8b00wIWgjAKufcQyTfM85LIG8CuKfA7izRZ5JfGSf/0KvuLVEzmNA1fjZl0RMFsoOC5LF78rQmtfSdCfyIHkKuybOrogJNYZAKVCIgjuP1otWq2WkAX5N8ymfWwjl3l68CAD4RFZibmzszz67T6Vypdkf1eT2O4xur07Dowwa5T5j13+h0OleXIWBC6tGezoRNqVupX193U6QqoH3gPxUA8FqRCtjg/UOMPocAXBFCgqqAnSv97OFAkdE2w5rswtashmI7rHR872Ly0yAVyFh3Xm13ScD67FY/+lEgTCw70is3gGeKDI7rILmTr80bJ7uqKnCiggrkIpVDu9uaFYv9pup8OSfTdQAuLW2Qk1Kb7UfSejafl7qPaqCIAAC/hs5bueszw2B6evoi+dQmvZCoU4flExppLFEDkIan8+6WwDX4t9Nj9VAIiHNUQG52RSoQAun2eU2wqAdViacUcCpYqwLJIBVoAtr4+nrGkM8G5+sEH0rAdqsCQSenEUJl/3u93hoAT8ixUk+AK4sAHy0BbDMgaUuAp2oIwAP2PBDwLDjnNgXMF2rXbA9gveBTdfk+ZL5Qu6YJSOpMGDpfU3bL5nAeWgLYZkDSlgDbHpDk9YT/u3eMogwmWQ76/8tc14/GCHDObZIA6gQP4P4SBBTueFU/GiOgaYQSUHf+5ZsgcH75Jqj9hufIEMCMb4DUfBfczMqssSwnQTb8rowfZd+1BLDhDIBXm3Xf1cmAMmuMbRP0MTJN8LQngNV+E2Ncn/xvt6PCb2KM6zPSv0HSokWLaBj4F3ISB8WATZMCAAAAAElFTkSuQmCC";

  const selectedImageHome =
    "data:image/png;base64,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";

  const selectedImageTownHouse =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAADWUlEQVR4nO2dy24TMRiFvYIF8AZIgISEFKn1Hy5PgIqg8DzcXgTYsiOxW2DBA1AhbtuISl3Q2FkgBCwoYhFUEeTpjAhpkiZKGB/PnE+yqngS+/c58/tS5aIUIYQQQgghhFQYse6NNu517DhIjlg/CIWCgEBDwKAhYNAQMGhIQoZwBwZnCHdgNKTuMEPAoCGRaLQ6x7T1rwoDRkvxPDF+a55rAlDCv37C+FRKaONvTxtUyoZIMMW6OyoVVmzvtFj3IwTetP56laasZrt7Nc+Sn03z8YxKATG+lYv75NC1xA05anzJ3UFVMGRlygyAuJBvT5tj83Xh5bzX0AjjOxin34Zd4P8G6XbOv9g5ripMI9x8xn+AXeCTSeO6LPBJLXRVHzf0nVKXmUHb7k1t3Duxvh/7kCZYpZ/pYnrrpZmxutG9BTDwAXwpyxRt/ftidwG75YtE0EOMu3tgiHtbSqdi3F7osNH6fLKUDhPjwtMvp3JD9krpMF87Qof3mCFjMsS6++VmiHVrYtzv6HO0BS8bvRulGJKZYnrr4Q7gLsuPGtEPb9Yo1YxD5uTBqBojSBpABRMJKA2ggokElAbTghHrvg3Psdq4r1W6nqAh/9ZX7XEBDcmhIWNghihmSAEzZAzMEJVOhoRdybRdSurXkzOkLgiSBlDBRAJKA6hgIgGlAU/qKiVDsE7WwpM6loBCQ7AEFBqCJaDQECwBpe6GxD5Ja57U64mkkiF1QZA0gAomElAa8KSuUjIEa1ckdd9lxRZMaAgNiQ4zRHHKKuCUNQae1FU6GVIXBEkDqGAiAaUBVDCRqMxJfRi9uXtWrH8kxvW09b/CXzH+Yaif3DdG+wkZMttJV7fdteLTvTJasnq3htx+pQxZbXXPFWJp45812+7y6uNPJ8Jfsf55Xv990vdvxW7/KA2SMySbRnKx1Pg2CtEeILZfPUPCXG794OKmuzShjSuZYNY5xPYrZ4i2bj/UT/oSgkb2YfxMsH3E9pMyZJZ3j88yGJnwHIT2Z+2jNBYNZhHBENpfxuuXCg1RNGQeapshi5Y5++jk9Z3hxyN1i7S/9DGUBqcshZkh//P1wkWdhswDM2QOKr2oI/+mhyAW47doiIUqSfy4ACGEEEIIIYQQQgghhBC1ZP4AiNRcZTV3pecAAAAASUVORK5CYII=";

  const dullImageTownHouse =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAACXBIWXMAAAsTAAALEwEAmpwYAAADH0lEQVR4nO2dzWpTQRzFZ1UX6hsU1GdQn0AUv57HqptzplmVrLpSH0F3+ggWadWtWHAn3erCiotKaWRkLoRwmyakvXPm3vODIWRuMvOfc+5/PiAfIRhjjDHGGGNMjwGwR3K3dBwmQ3KSigURwYaIYUPEsCFi2JCKDPEOTMwQZ08BbIgYNkQMG1IIAGskPzQGzJbmdSR3lrlGjbKbxhdqAsCTeYOq3JAJyY1QCwDWSf5OgQO436cpK8Z4J8f5ZzQaXQs1AOBNDvr17LXaDTlrfNXdQT0xZP20GUBxId+fN8emdQHA+2WvqZHGl8e5L7vAN0EC+La9vX0p9BgAawC+yi7w1aTxUBb4qha6vo9b+k4ZyswQY3wE4BPJI4FD2kSoHCVdADzszAwAjwUGPlEvnZlC8nPudEN2y1d29/U06/Oxq04P8x1wpZMOK2Nra+tq1uewkw7z2pHugGfOkNYMed5phsQY7wI4KT1HU7zEGB+ErkgLVroDvMti2y5rr1MzZmmCCQOGShpIBVMIKQ2kgimElAbzgiH5c+aw9KNP12s0ZNLn5w02JGNDWnCGBGdIgzOkBWdIqCdD0q5k3i6l9uvVGTIUqKSBVDCFkNJAKphCSGngk3qoyhCpkzV9UtcSkDZES0DaEC0BaUO0BOTQDSl9koZP6sOEtWTIUKCSBlLBFEJKA5/UQ1WGSO2KOPRdVmnBaENsSHGcIcFTVoOnrBZ8Ug/1ZMhQoJIGUsEUQkoDqWAK0ZuT+jQArpN8RfIAwN/8+DLVz+lbov2aDFnopAvgXvPtXs6UVJ++16jcfq8MGY1GN6bEegvg1ng8vpweAbzL9b9O+/2t0u2fpUF1huRp5L9YoYUp0V4ott9HQw5S/ebm5s22NmKMt3Mf3xXb750hAI7zXL4255fq0vVjxfarMmSRT48vMhie8hqF9hftozNWDWYVwRTaP4/3nys2JNiQZRhshqxalukDwJdUnx6nn0/XrdL+RYyhMzxlBc0Mucj304u6DVkGZ8gS9HpRF/9Pj4lg2bEh1Cm1/LmAMcYYY4wxxhhjjDHGmHDO/AMuQd8zsq2d6AAAAABJRU5ErkJggg==";
  return (
    <>
      <header>
        <div className="p-6 mt-2 select-text">
          <Link href="/">
            <Image src={imgLogo} alt="" width={120} height={100} />
          </Link>
        </div>

        <div className="header h-[15vh] shadow-lg background-color-gray color-gray flex items-center justify-center relative shadow-gray-200">
          <div className="header-content text-center text-gray-500">
            <h2 className="md:text-3xl text-xl ">
              Tell us about your <span className="font-bold">{category}</span>{" "}
              project
            </h2>
            <p className="md:text-xl text-md mt-2">
              {` Let us know some details and we'll match you with Pros for you to
              compare`}
            </p>
          </div>
        </div>
      </header>
      {submitting ? (
        <center>
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          </div>
        </center>
      ) : (
        <section className="bg-gray-50">
          <div className="flex w-[screen] md:w-[800px] flex-col items-center justify-center px-6 py-8 mx-auto h-[screen] lg:py-0 md:mt-20 mt-10">
            <div className="grid  grid-cols-1 align-items-start grid-rows-auto">
              <h5 className="text-xl md:text-3xl font-bold leading-tight tracking-tight text-gray-700">
                What do you need done?
              </h5>
              <p className="text-md md:text-xl text-gray-600">
                Choose a task that best describes the work you need done on your
                home
              </p>
              <div className="md:w-[800px] w-[screen] bg-white  rounded-lg shadow dark:border md:mt-0 md:mx-auto xl:p-0">
                <form class="flex w-[800px] items-center w-[screen] justify-center dark:border-gray-700 my-4">
                  <div class="relative w-full items-center justify-center ml-5 ">
                    <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                      <svg
                        class="w-10 h-10 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 40 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        />
                      </svg>
                    </div>
                    <input
                      type="search"
                      id="default-search"
                      class="input_search block p-5 ps-10 text-md md:text-xl border  mt-3  border-gray-400 rounded-md bg-gray-50 dark:border-gray-300 dark:placeholder-gray-400 dark:text-black "
                      placeholder="Search for a task"
                      value={searchQuery}
                      onChange={handleInputChange}
                      required
                      style={{
                        "@media (max-width: 768px)": {
                          borderColor: "red",
                        },
                      }}
                    />
                  </div>
                </form>

                <div className="p-4 space-y-4 md:space-y-6 md:p-8  text-black">
                  {subcategories.map((value, index) => (
                    <div
                      className="flex items-center border-b pb-4"
                      key={index}
                    >
                      <input
                        id={`radio-${index}`}
                        type="radio"
                        value={value.id}
                        name="default-radio"
                        className="w-5 h-5 mr-3 text-blue-600 border-gray-500  bg-gray-100 focus:ring-blue-500"
                        onChange={(e) => {
                          console.log(e);
                          console.log(e.target);
                          console.log(e.target.value);
                          setRequestData((data) => ({
                            ...data,
                            subcategory: e.target.value,
                          }));
                        }}
                      />
                      <label
                        htmlFor={`radio-${index}`}
                        className="ms-2 md:w-[700px] w-[screen] md:text-2xl text-md font-normal text-gray-500"
                      >
                        {value.name}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <button
                onClick={() => setNextBox({ ...nextBox, showNextBox: true })}
                className={`md:w-[800px] w-[screen] text-white ${
                  requestData.subcategory
                    ? "bg-emerald-600 hover:bg-emerald-800 focus:outline-none "
                    : "bg-gray-300 cursor-not-allowed"
                } font-bold rounded-lg md:my-5 text-xl  md:text-2xl md:px-5 md:py-5 px-3 py-3 text-center bg-emerald-500 hover:bg-emerald-800 `}
                disabled={!requestData.subcategory}
              >
                Next
              </button>
            </div>
          </div>
          {nextBox.showNextBox && (
            <div
              ref={nextBoxRef}
              className="flex w-[screen] md:w-[800px]  flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
            >
              <div className="grid grid-cols-1 align-items-start grid-rows-auto ">
                <h5 className="md:text-3xl text-xl font-bold leading-tight tracking-tight text-gray-700">
                  What type of home do you live in?
                </h5>
                <div className="w-[screen]  md:w-[800px] bg-white rounded-lg shadow dark:border  md:mt-0 xl:p-0">
                  <div className="p-4 w-[screen] space-y-4 md:space-y-6 md:p-8 text-black">
                    <div className=" items-center justify-center flex flex-wrap ">
                      <div className="mx-5 my-3 items-center grid justify-center ">
                        <div
                          className={`border-2 mx-auto items-center flex justify-center w-[100px] rounded-full p-4 ${
                            selectedType === "Detached / Semi-Detached Home"
                              ? "bg-blue-50"
                              : ""
                          } `}
                          style={{
                            borderColor:
                              selectedType === "Detached / Semi-Detached Home"
                                ? "#30ade2"
                                : "#808080",
                          }}
                          onClick={() =>
                            handleTypeSelection("Detached / Semi-Detached Home")
                          }
                        >
                          <img
                            src={
                              selectedType === "Detached / Semi-Detached Home"
                                ? selectedImageHome
                                : dullImageHome
                            }
                            alt="imageHome"
                          />
                        </div>{" "}
                        <label className="mx-auto items-center flex justify-center text-lg md:text-2xl  font-normal text-gray-500">
                          Detached / Semi-Detached Home
                        </label>
                      </div>

                      <div className="mx-5 my-3 items-center grid justify-center">
                        {" "}
                        <div
                          className={`border-2 mx-auto items-center flex justify-center rounded-full w-[100px] p-4 ${
                            selectedType === "Condo / Townhouse"
                              ? "bg-blue-50"
                              : ""
                          }`}
                          style={{
                            borderColor:
                              selectedType === "Condo / Townhouse"
                                ? "#30ade2"
                                : "#808080",
                          }}
                          onClick={() =>
                            handleTypeSelection("Condo / Townhouse")
                          }
                        >
                          <img
                            src={
                              selectedType === "Condo / Townhouse"
                                ? selectedImageTownHouse
                                : dullImageTownHouse
                            }
                            alt="imageHome"
                          />
                        </div>
                        <label className="mx-auto items-center flex justify-center text-lg md:text-2xl font-normal text-gray-500">
                          Condo / Townhouse
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setNextBox({ ...nextBox, showThirdBox: true })}
                  className={`md:w-[800px] w-[screen] text-white ${
                    requestData.home_type
                      ? "bg-emerald-600 hover:bg-emerald-800 focus:outline-none"
                      : "bg-gray-300 cursor-not-allowed"
                  } font-bold rounded-lg md:my-5 text-xl  md:text-2xl md:px-5 md:py-5 px-3 py-3 text-center bg-emerald-500 hover:bg-emerald-800 `}
                  disabled={!requestData.home_type}
                >
                  Next
                </button>
              </div>
            </div>
          )}
          {nextBox.showThirdBox && (
            <div
              ref={thirdBoxRef}
              className="flex flex-col md:w-[800px] w-[screen] items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
            >
              <div className="grid grid-cols-1 align-items-start grid-rows-auto">
                <h5 className="md:text-3xl text-xl font-bold leading-tight tracking-tight text-gray-900 ">
                  When do you want to start this project?
                </h5>
                <div className="md:w-[800px] w-[screen] bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0">
                  <div className="p-4 w-[800px] space-y-4 md:space-y-6  md:p-8 text-black ">
                    {SecoundradioData.map((option, index) => (
                      <div
                        className="flex items-center border-b pb-4"
                        key={index}
                      >
                        <input
                          id={`third-radio-${index}`}
                          type="radio"
                          value={option}
                          name="third-default-radio"
                          className="w-5 h-5 mr-3 text-blue-600 bg-gray-500 border-gray-300 focus:ring-blue-500"
                          onChange={(e) =>
                            setRequestData((data) => ({
                              ...data,
                              time: e.target.value,
                            }))
                          }
                        />
                        <label
                          htmlFor={`third-radio-${index}`}
                          className="ms-2 md:w-[700px] w-[screen] md:text-2xl text-md font-normal text-gray-500"
                        >
                          {option}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() =>
                    setNextBox({ ...nextBox, showFourthBox: true })
                  }
                  className={`md:w-[800px] text-xl  md:text-2xl md:px-5 md:py-5 px-3 py-3 w-[screen] text-white ${
                    requestData.time
                      ? "bg-emerald-600 hover:bg-emerald-800 focus:outline-none"
                      : "bg-gray-300 cursor-not-allowed"
                  } bg-emerald-600 hover:bg-emerald-800 focus:outline-none font-bold rounded-lg text-center md:my-5`}
                  disabled={!requestData.time}
                >
                  Next
                </button>
              </div>
            </div>
          )}
          {nextBox.showFourthBox && (
            <div
              ref={fourthBoxRef}
              className="flex w-[screen] md:w-[800px] sm:w-[600px]  flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
            >
              <div className="grid grid-cols-1 align-items-start grid-rows-auto">
                <h5 className="text-xl md:text-3xl font-bold leading-tight tracking-tight text-gray-700 ">
                  Provide some details about your project
                </h5>
                <p className="text-md md:text-xl text-gray-600">
                  This step is optional
                </p>
                <div className="w-[screen] sm:w-[600px] md:w-[800px]  bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0">
                  <textarea
                    onChange={(e) =>
                      setRequestData((data) => ({
                        ...data,
                        details: e.target.value,
                      }))
                    }
                    id="message"
                    rows="4"
                    class="block p-2.5 w-full text-md md:text-xl  text-gray-900 bg-white rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
                    placeholder="Let the pros know about your project scope (ex. number of rooms), budget, materials you'd like, etc. The more details the better."
                  ></textarea>
                </div>
                <button
                  onClick={() => setNextBox({ ...nextBox, showFifthBox: true })}
                  className="md:w-[800px] text-xl  md:text-2xl md:px-5 md:py-5 px-3 py-3 w-[screen] text-white bg-emerald-600 hover:bg-emerald-800 focus:outline-none font-bold rounded-lg text-center md:my-5"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {nextBox.showFifthBox && (
            <div
              ref={fifthBoxRef}
              className="flex flex-col md:w-[800px] w-[screen] items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0"
            >
              <div className="grid grid-cols-1 align-items-start grid-rows-auto">
                <h5 className="md:text-3xl text-xl font-bold leading-tight tracking-tight text-gray-900 ">
                  Lastly, enter your contact details. We’ll send your request to
                  up to 5 pros.
                </h5>
                <div className="md:w-[800px] w-[screen] bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0">
                  <div className="p-4 md:w-[800px] w-[screen] space-y-4 md:space-y-6 md:p-8 text-black">
                    <form class="w-full mx-auto">
                      <div className="mb-5">
                        <label
                          htmlFor="name"
                          className="block mb-2 md:text-2xl text-md font-normal text-gray-500"
                        >
                          Full Name
                        </label>
                        <input
                          type="name"
                          id="name"
                          name="name"
                          className={` border ${
                            validInput.isNameEntered
                              ? "border-gray-400"
                              : "border-red-700"
                          } text-gray-600 placeholder-gray-400 md:text-md text-sm rounded-md block w-full p-3 placeholder:text-lg `}
                          placeholder="Your Name"
                          value={userData.name}
                          onChange={handleUserDataChange}
                        />
                        {!validInput.isNameEntered && (
                          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            Please enter your name!
                          </p>
                        )}
                      </div>

                      <div className="mb-5">
                        <label
                          htmlFor="email"
                          className="block mb-2 md:text-2xl text-md font-normal text-gray-500"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          className={` border ${
                            validInput.isValidEmail
                              ? "border-gray-400"
                              : "border-red-700"
                          } text-gray-600 placeholder-gray-400 md:text-md text-sm rounded-md block w-full p-3 placeholder:text-lg `}
                          placeholder="Your Email Address"
                          value={userData.email}
                          onChange={handleUserDataChange}
                        />
                        {!validInput.isValidEmail && (
                          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            Please enter a valid email address!
                          </p>
                        )}
                      </div>

                      <div className="mb-5">
                        <label
                          htmlFor="email"
                          className="block mb-2 md:text-2xl text-md font-normal text-gray-500"
                        >
                          Street Address
                        </label>
                        <input
                          type="street"
                          id="street"
                          name="street"
                          className={` border ${
                            validInput.isStreetEntered
                              ? "border-gray-400"
                              : "border-red-700"
                          } text-gray-600 placeholder-gray-400 text-sm md:text-md rounded-md block w-full p-3  placeholder:text-lg `}
                          placeholder="Your Street Address"
                          value={userData.street}
                          onChange={handleUserDataChange}
                        />
                        {!validInput.isStreetEntered && (
                          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            Please enter your street address!
                          </p>
                        )}
                      </div>

                      <div className="mb-5">
                        <label
                          htmlFor="phone"
                          className="block mb-2 md:text-2xl text-md font-normal text-gray-500"
                        >
                          Phone
                        </label>
                        <input
                          type="phone"
                          id="phone"
                          name="phone"
                          className={` border ${
                            validInput.isPhoneEntered
                              ? "border-gray-400"
                              : "border-red-700"
                          } text-gray-600 placeholder-gray-400 text-sm md:text-md rounded-md block w-full p-3 placeholder:text-lg`}
                          placeholder="Your Phone"
                          value={userData.phone}
                          onChange={handleUserDataChange}
                        />
                        {!validInput.isPhoneEntered && (
                          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                            Please enter your phone number!
                          </p>
                        )}
                      </div>
                    </form>
                  </div>
                </div>
                <button
                  onClick={(e) => handleSubmit(e)}
                  type="submit"
                  class="text-white bg-emerald-600 hover:bg-emerald-800
      focus:outline-none
       font-medium rounded-lg md:mt-5 md:mb:2 text-xl  md:text-2xl md:px-5 md:py-5 px-3 py-3 md:w-[800px] w-[screen] text-center"
                >
                  Submit
                </button>
                <div className="text-md text-gray-700">
                  By submitting, I acknowledge and agree to the Terms of Use and
                  Privacy Policy
                </div>
              </div>
            </div>
          )}
        </section>
      )}
    </>
  );
}

const radioData = [
  "Asphalt Shingle Roofing - Install or Replace",
  "Asphalt Shingle Roofing - Repair",
  "Repair Flat, Foam, or Single Ply Roofing",
  "Wood Shake or Composite Roofing - Install or Replace",
];
const SecoundradioData = [
  "It's an emergency",
  "Within a week",
  "Within 2 weeks",
  "Within a month",
  "Time is flexible",
];

export default GetQuotes;
