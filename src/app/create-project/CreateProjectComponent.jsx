"use client";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import categoryService from "@/api/services/categoryService";
import { Footer } from "@/components/Footer";
import Select from "react-select";
import subcategoryService from "@/api/services/subcategoryService";
import toast from "react-hot-toast";
import customerService from "@/api/services/customerService";
import requestService from "@/api/services/requestService";
import { useRouter } from "next/navigation";
import { PatternFormat } from "react-number-format";
import Head from "next/head";
import { usePathname } from "next/navigation";

const work = [
  { name: "Detached / Semi-Detached Home" },
  { name: "Condo / Townhouse" },
];
const time = [
  { name: `It's an emergency` },
  { name: "Within a week" },
  { name: "Within 2 weeks" },
  { name: "Within a month" },
  { name: "Time is flexible" },
];

export default function CreateProjectComponent() {
  const pathname = usePathname();

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
      <Header />
      <div className="pt-14">
        <div className="profile_container max-w-[1200px] mx-auto  px-6 pt-10">
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              underline="hover"
              color="inherit"
              href="/"
              style={{ color: "#000", fontSize: 20 }}
            >
              Helperzz
            </Link>
            <Typography
              color="text.primary"
              style={{ color: "#000", fontSize: 20 }}
            >
              My Account
            </Typography>
          </Breadcrumbs>
        </div>
        <div className="mt-8 bg-[#12937C1A] bg-opacity-10 max-w-[1500px] mx-auto py-5">
          <div className="max-w-[1200px] mx-auto">
            <div className="rounded-2xl py-4 px-24 bg-white w-fit text-secondary font-semibold text-center">
              Overview
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-10 mt-24 max-w-[1200px] mx-auto min-h-[100vh]">
          <div className="flex-initial flex flex-col max-w-[500px] w-full gap-5 p-5">
            <h2 className="text-3xl font-bold">Planning a new project?</h2>
            <p className="font-semibold">
              Tell us about your home improvement project
            </p>
            <small className="text-sm text-[#262626]">
              Let us know some details and we&apos;ll match you with Pros for
              you to compare
            </small>
          </div>
          <Steps />
        </div>
      </div>
      <Footer postProject={false} showNewsLetter={false} />
    </>
  );
}

const Steps = (props) => {
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

  const [step, setStep] = useState(1);
  const [option, setOption] = useState("");
  const [checkOption, setCheckOption] = useState(false);
  const [option2, setOption2] = useState("");
  const [checkOption2, setCheckOption2] = useState(false);
  const [postalCode, setPostalCode] = useState("");
  const [checkPostalCode, setCheckPostalCode] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const navigate = useRouter();

  useEffect(() => {
    console.log(requestData);
  }, [requestData]);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("HELPERZZ-USER"));
    if (u) {
      setUserData({
        name: u.name,
        email: u.email,
        phone: u.phone,
        street: u.address,
      });
    }
  }, []);

  const handleOptionSelect = (selectedOption) => {
    setOption(selectedOption);
    setRequestData((prev) => ({ ...prev, home_type: selectedOption }));
  };
  const handleOptionSelect2 = (selectedOption) => {
    setOption2(selectedOption);
    setRequestData((prev) => ({ ...prev, time: selectedOption }));
  };

  const handleInput = (inputValue) => {
    setPostalCode(inputValue); // Update postalCode state with the input value
    setRequestData((prev) => ({ ...prev, postal_code: inputValue }));
  };

  const handleDescribe = () => {
    if (/^[A-Z]\d[A-Z] \d[A-Z]\d$/i.test(postalCode)) {
      setStep(step + 1);
    } else {
      toast.error("please enter a valid postal code ");
    }
  };

  const handleDetails = (v) => {
    setRequestData((prev) => ({ ...prev, details: v }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const canadianPhoneRegex = /^(\+1)?\d{10}$/;
    const postalCoderegex = /^[A-Z]\d[A-Z] \d[A-Z]\d$/;
    let validation = {
      isNameEntered: userData.name.trim() !== "",
      isValidEmail: emailRegex.test(userData.email),
      isPhoneEntered: canadianPhoneRegex.test(userData.phone),
      isStreetEntered: userData.street.trim() !== "",
      isPostalCode: postalCoderegex.test(postalCode),
    };
    // setValidInput(validation);
    if (
      validation.isValidEmail &&
      validation.isNameEntered &&
      validation.isStreetEntered &&
      validation.isPhoneEntered &&
      validation.isPostalCode
    ) {
      setSubmitting(true);
      customerService.passwordLessCreate(userData).then((response) => {
        const customer = response.customer.id;
        const data = { ...requestData };
        data.user = customer;
        requestService.create(data).then((response) => {
          setSubmitting(false);
          navigate.replace("/getquotes/complete");
        });
      });
      // requestService.create(requestData).then((response) => {
      //   console.log(response);
      // });
    }
  };

  const [checkTask, setCheckTask] = useState(false);

  useEffect(() => {
    if (requestData.subcategory >= 0) {
      setCheckTask(false);
    }
  }, [requestData.subcategory]);

  useEffect(() => {
    if (option) {
      setCheckOption(false);
    }
  }, [option]);

  useEffect(() => {
    if (option2) {
      setCheckOption2(false);
    }
  }, [option2]);

  useEffect(() => {
    if (/^[A-Z]\d[A-Z] \d[A-Z]\d$/i.test(postalCode)) {
      setCheckPostalCode(false);
    }
  }, [postalCode]);

  console.log("option", option);

  return (
    <div className="flex-1 flex flex-col gap-3 lg:gap-5 p-5">
      <div className="flex flex-wrap gap-3 lg:gap-0 items-center">
        <div className="flex items-center gap-2 lg:gap-3">
          {step === 1 ? (
            <div className="flex w-12 h-12 justify-center items-center bg-secondary rounded-lg ">
              <img src="/assets/check.svg" className="w-6" alt="check" />
            </div>
          ) : (
            <div
              className={`${
                step > 1 ? "bg-secondary" : "bg-[#2626264D]"
              } bg-opacity-30 rounded-lg p-3`}
            >
              <img src="/assets/describe.svg" className="w-6" alt="describe" />
            </div>
          )}
          <h4
            className={`text-sm lg:text-base font-bold ${
              step >= 1 ? "text-secondary" : "text-gray-400"
            }`}
          >
            Select Work
          </h4>
        </div>
        <div className="flex items-center ml-1">
          <div className={`h-12 border ${step >= 1 && "border-secondary"}`} />
          <div className={`w-16 border ${step >= 1 && "border-secondary"}`} />
          {step === 2 ? (
            <div className="flex w-12 h-12 justify-center items-center bg-secondary rounded-lg ">
              <img src="/assets/check.svg" className="w-6" alt="check" />
            </div>
          ) : (
            <div
              className={`${
                step > 2 ? "bg-secondary" : "bg-[#2626264D]"
              } bg-opacity-30 rounded-lg p-3`}
            >
              <img src="/assets/describe.svg" className="w-6" alt="describe" />
            </div>
          )}
        </div>
        <h4
          className={`text-sm lg:text-base font-bold ml-[4px] ${
            step >= 2 ? "text-secondary" : "text-gray-400"
          } `}
        >
          Describe Work
        </h4>
        <div className="flex items-center ml-1">
          <div className={`h-12 border ${step >= 2 && "border-secondary"} `} />
          <div className={`w-16 border ${step >= 2 && "border-secondary"} `} />
          {step === 3 ? (
            <div className="flex w-12 h-12 justify-center items-center bg-secondary rounded-lg ">
              <img src="/assets/check.svg" className="w-6" alt="check" />
            </div>
          ) : (
            <div
              className={`${
                step > 3 ? "bg-secondary" : "bg-[#2626264D]"
              } bg-opacity-30 rounded-lg p-3`}
            >
              <img src="/assets/message.svg" className="w-6" alt="message" />
            </div>
          )}
        </div>
        <h4
          className={`text-sm lg:text-base font-bold ml-[4px] ${
            step >= 3 ? "text-secondary" : "text-gray-400"
          } `}
        >
          Project Detail
        </h4>
      </div>
      <div className="flex flex-col gap-5 rounded-2xl bg-secondary bg-opacity-10 p-3 lg:p-5">
        {step === 1 && (
          <>
            <p className="font-medium">
              Choose a task that best describes the work you need done on your
              home
            </p>
            <SearchInput
              requestData={requestData}
              setRequestData={setRequestData}
            />
            {checkTask && (
              <h1 className="text-red-500 ml-2 -mt-2">
                please enter required data
              </h1>
            )}

            <button
              className="bg-secondary rounded-2xl text-lg font-semibold text-white py-3"
              onClick={() => {
                if (requestData.subcategory) {
                  setStep(step + 1);
                } else {
                  setCheckTask(true);
                }
              }}
            >
              Next
            </button>
          </>
        )}
        {step === 2 && (
          <div className="flex flex-col gap-10 mt-5">
            <p className="font-medium">
              Choose a task that best describes the work you need done on your
              home
            </p>
            <SelectInput
              value={postalCode}
              handleInput={handleInput}
              message={"Postal Code"}
              postalcode={false}
            />
            {checkPostalCode && (
              <h1 className="text-red-500 ml-2 mt-[-2rem]">
                please enter correct postal code
              </h1>
            )}
            <SelectInput
              value={option}
              data={work}
              selectedOption={handleOptionSelect}
              message={"What type of home do you live in?"}
            />
            {checkOption && (
              <h1 className="text-red-500 ml-2 mt-[-2rem]">
                please select option
              </h1>
            )}
            <SelectInput
              value={option2}
              data={time}
              selectedOption={handleOptionSelect2}
              message={"When do you want to start this project?"}
            />
            {checkOption2 && (
              <h1 className="text-red-500 ml-2 mt-[-2rem]">
                please select option
              </h1>
            )}
            <div className="grid grid-cols-2 gap-10 mt-5 ">
              <button
                className="bg-white rounded-2xl text-lg font-semibold py-3"
                onClick={() => setStep(step - 1)}
              >
                Go Back
              </button>
              <button
                onClick={() => {
                  if (/^[A-Z]\d[A-Z] \d[A-Z]\d$/i.test(postalCode)) {
                    if (option) {
                      if (option2) {
                        setStep(step + 1);
                      } else {
                        setCheckOption2(true);
                      }
                    } else {
                      setCheckOption(true);
                    }
                  } else {
                    setCheckPostalCode(true);
                  }
                }}
                className="bg-white hover:bg-secondary hover:text-white rounded-2xl text-lg font-semibold py-3"
              >
                Next
              </button>
            </div>
          </div>
        )}
        {step === 3 && (
          <>
            <p className="font-semibold text-lg mb-5">
              Provide some details about your project
            </p>
            <Textarea
              message={"This Step is Optional"}
              handleDetails={handleDetails}
            />
            <div className="grid grid-cols-2 gap-10 mt-5 ">
              <button
                className="bg-white rounded-2xl text-lg font-semibold py-3"
                onClick={() => setStep(step - 1)}
              >
                Go Back
              </button>
              <button
                onClick={() => setStep(step + 1)}
                className="bg-white hover:bg-secondary hover:text-white rounded-2xl text-lg font-semibold py-3"
              >
                Next
              </button>
            </div>
          </>
        )}
        {step === 4 && (
          <>
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="bg-secondary bg-opacity-10 rounded-2xl p-6 md:p-10"
            >
              <h2 className="text-2xl md:text-3xl font-semibold mb-4 text-text">
                Help us to reach you.
              </h2>
              <p className="mb-6 md:mb-10  text-base md:text-xl mt-4 text-[#5c6261]">
                Contact Info
              </p>
              <div className="mb-5">
                <input
                  type="email"
                  placeholder="Email Address"
                  id="email"
                  // disabled={authData ? true : false}
                  value={userData?.email}
                  onChange={(e) =>
                    setUserData({ ...userData, email: e.target.value })
                  }
                  required
                  name="email"
                  className={
                    "w-full bg-white border border-[#43D9BE] rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#43D9BE]"
                  }
                />
              </div>
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Your Name"
                  id="name"
                  // disabled={authData ? true : false}
                  value={userData?.name}
                  onChange={(e) =>
                    setUserData({ ...userData, name: e.target.value })
                  }
                  required
                  name="name"
                  className={
                    "w-full bg-white border border-[#43D9BE] rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#43D9BE]"
                  }
                />
              </div>
              <div className="mb-5">
                {/* <input
                                    placeholder="Phone Number"
                                    type="tel"
                                    id="phone"
                                    // disabled={authData?.phone ? true : false}
                                    value={userData?.phone}
                                    onChange={(e) => setUserData({...userData, phone:e.target.value})}
                                    required
                                    name="phone"
                                    className={
                                        "w-full bg-white border border-[#43D9BE] rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#43D9BE]"
                                    }
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
                  required
                  placeholder="Phone Number"
                  className={
                    "w-full bg-white border border-[#43D9BE] rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#43D9BE]"
                  }
                />
              </div>
              <div className="mb-5">
                <input
                  type="text"
                  id="address"
                  placeholder="Enter your address"
                  value={userData?.street}
                  onChange={(e) =>
                    setUserData({ ...userData, street: e.target.value })
                  }
                  name="address"
                  required
                  className={
                    "w-full bg-white border border-[#43D9BE] rounded-xl py-3 px-4 focus:outline-none focus:ring-2 focus:ring-[#43D9BE]"
                  }
                />
              </div>

              <div className="grid grid-cols-2 gap-10 mt-5 ">
                <button
                  className="bg-white rounded-2xl text-lg font-semibold py-3"
                  onClick={() => setStep(step - 1)}
                >
                  Go Back
                </button>
                <input
                  type="submit"
                  value="Submit"
                  className="bg-white cursor-pointer hover:bg-secondary hover:text-white rounded-2xl text-lg font-semibold py-3"
                />
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

const SearchInput = ({ message, icon, requestData, setRequestData }) => {
  const [showResult, setShowResult] = useState(true);
  const [selected, setSelected] = useState(requestData.subcategory);
  const [category, setCategory] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const [subCategory, setSubCategory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await categoryService.fetchAll();
      setCategory(response?.categories);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchSubCategory = async () => {
      const response = await subcategoryService.fetchByCategory(
        selectedCategory
      );
      setSubCategory(response?.subcategories);
    };
    fetchSubCategory();
  }, [selectedCategory]);

  useEffect(() => {
    setRequestData((prev) => ({ ...prev, subcategory: selected }));
  }, [selected]);

  const handleSelectChange = (e) => {
    setSelectedCategory(e?.value);
  };

  return (
    <div className="relative w-full">
      <div className="absolute -top-5 left-5 px-10 text-[#FFFFFFCC] py-1 lg:py-2 bg-secondary rounded-xl">
        What do you need done?
      </div>
      <div className="flex w-full bg-white rounded-2xl px-3 border border-secondary">
        <img
          src="/assets/search.svg"
          className="w-4 cursor-pointer ml-3"
          alt="search"
        />

        <Select
          styles={{
            border: "none",
            control: (baseStyles, state) => ({
              ...baseStyles,
              borderColor: "grey",
              borderWidth: 0,
            }),
          }}
          options={category?.map((value, index) => ({
            label: value?.name,
            value: value?.id,
          }))}
          placeholder="Search"
          isSearchable={true}
          className="flex-1 py-5 focus:outline-none ring-0"
          onChange={(e) => handleSelectChange(e)}
        />
      </div>
      {showResult && (
        <div className="flex flex-col w-full py-5 px-6 bg-white rounded-2xl  mt-2 border border-secondary">
          <div className="flex flex-col gap-2 lg:pl-4 mt-1">
            {subCategory?.length > 0 ? (
              <>
                {subCategory?.map((value, i) => (
                  <div key={i}>
                    <label className="cursor-pointer">
                      <input
                        type="radio"
                        value={value?.id}
                        checked={selected === value?.id}
                        onChange={(e) => {
                          setSelected(value?.id);
                        }}
                        style={{ accentColor: "#2B937C", marginRight: 8 }}
                      />
                      {value?.name}
                    </label>
                  </div>
                ))}
              </>
            ) : (
              <h1> Select a category</h1>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const Option = ({ label, value, setSelected, selected }) => {
  return (
    <div className="flex gap-3 items-center">
      <div className="cursor-pointer" onClick={() => setSelected(value)}>
        {selected === value ? (
          <div className="rounded-full bg-secondary w-4 h-4" />
        ) : (
          <div className="rounded-full w-4 h-4 border border-black" />
        )}
      </div>
      <div>{label}</div>
    </div>
  );
};

const SelectInput = ({
  message,
  value,
  data,
  selectedOption,
  postalcode = true,
  handleInput,
}) => {
  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState(-1);

  const handleClick = (e) => {
    selectedOption(e.target.value);
    setShowResult(!showResult);
  };

  return (
    <div className="relative w-full">
      <div className="absolute lg:-top-5 -top-2 left-5 text-xs lg:text-base px-5 lg:px-10 text-[#FFFFFFCC] py-1 lg:py-2 bg-secondary rounded-xl">
        {message}
      </div>
      <div
        className="flex w-full bg-white rounded-2xl py-5 px-3 pt-8  border border-secondary cursor-pointer"
        onClick={() => setShowResult(!showResult)}
      >
        {postalcode ? (
          <div className="flex-1 font-semibold ">
            {value ? value : "Select"}
          </div>
        ) : (
          <input
            type="text"
            className="flex-1  focus:outline-none ring-0"
            placeholder="Enter Postal code "
            maxLength="7"
            onChange={(e) => handleInput(e.target.value)}
          />
        )}
        {postalcode && (
          <img
            src="/assets/thick-arrow-down.svg"
            className="w-2 cursor-pointer"
            alt="arrow"
          />
        )}
      </div>

      {showResult && postalcode && (
        <div className="flex flex-col w-full py-5 px-6 bg-white rounded-2xl  mt-2 border border-secondary">
          <div className="flex flex-col gap-2 lg:pl-4 mt-1">
            {data.map((value, i) => (
              <div key={i}>
                <label className="cursor-pointer">
                  <input
                    type="radio"
                    value={value?.name}
                    checked={selected === value?.name}
                    onChange={(e) => {
                      setSelected(e.target.checked ? e.target.value : null);
                      handleClick(e);
                    }}
                    style={{ accentColor: "#2B937C", marginRight: 8 }}
                  />
                  {value?.name}
                </label>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const Textarea = ({ message, value, handleDetails }) => {
  return (
    <div className="relative w-full">
      <div className="absolute -top-5 left-5 text-sm lg:text-base px-5 lg:px-10 text-white py-2 bg-secondary rounded-xl">
        {message}
      </div>
      <div className="flex w-full bg-white rounded-2xl py-5 px-3 border border-secondary">
        <textarea
          name=""
          id=""
          cols="30"
          className="p-2 w-full focus:outline-none"
          placeholder="Message"
          rows="10"
          onChange={(e) => handleDetails(e.target.value)}
        ></textarea>
      </div>
    </div>
  );
};
