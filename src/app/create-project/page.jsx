"use client";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "next/link";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import categoryService from "@/api/services/categoryService";
// import { Footer } from "@/components/Footer";
import Select from "react-select";
import subcategoryService from "@/api/services/subcategoryService";

const work = [{ name:'Detached / Semi-Detached Home' } , {name :'Condo / Townhouse'}]
const time = [{ name:`It's an emergency`  } , {name :'Within a week'} ,{name :'Within 2 weeks'} ,{name :'Within a month'} , {name :'Time is flexible'} , ]


export default function Page() {


  return (
    <>
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
              style={{ color: "#000", fontSize: 20, fontWeight: "bold" }}
            >
              My Account
            </Typography>
          </Breadcrumbs>
        </div>
        <div className="mt-8 bg-[#12937C1A] bg-opacity-10 max-w-[1500px] mx-auto py-5">
          <div className="max-w-[1200px] mx-auto">
            <div className="rounded-2xl py-4 px-24 w-fit text-secondary font-semibold text-center">
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
      <footer className="text-gray-800 bg-[#E8E8E8] body-font">
        <div className="container px-14 sm:px-0 sm:py-24 mx-auto flex  md:items-center lg:items-start md:flex-row md:flex-nowrap flex-wrap flex-col">
          <div className="flex-grow flex flex-wrap  -mb-10 md:mt-0 mt-10 md:text-left  text-left">
            <div className="footer_col_1 lg:w-1/4 md:w-1/2 w-full px-8">
              <h2 className="title-font font-bold text-gray-900 text-base mb-3 text-transform: uppercase">
                Homeowners
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                    Browse Categories
                  </a>
                </li>
                <li>
                  <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                    Browse Tasks
                  </a>
                </li>
                <li>
                  <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                    Write A Review
                  </a>
                </li>
                <li>
                  <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                    Blog
                  </a>
                </li>
                <li>
                  <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                    Homeowner FAQ
                  </a>
                </li>
                <li>
                  <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                    Review Guidelines
                  </a>
                </li>
                <li>
                  <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                    Homeowner Trust
                  </a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full">
              <h2 className="title-font font-bold text-gray-900 text-base mb-3">
                CONTRACTORS
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                    Join Helperzz
                  </a>
                </li>
                <li>
                  <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                    Home Professional FAQ
                  </a>
                </li>
                <li>
                  <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                    Building Trust
                  </a>
                </li>
                <li>
                  <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                    Home Professional Terms
                  </a>
                </li>
              </nav>
            </div>
            <div className="lg:w-1/4 md:w-1/2 w-full">
              <h2 className="title-font font-bold text-gray-900 text-base mb-3">
                HELPERZZ
              </h2>
              <nav className="list-none mb-10">
                <li>
                  <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                    About
                  </a>
                </li>
                <li>
                  <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                    Careers at Helperzz
                  </a>
                </li>
                <li>
                  <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                    Careers at Helperzz
                  </a>
                </li>
                <li>
                  <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                    Contact Us
                  </a>
                </li>
                <li>
                  <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
                    Terms of Use
                  </a>
                </li>
                <li>
                  <a className="text-gray-800 text-xs hover:text-gray-800 text-transform: uppercase mb-2 block">
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
  );
}

const Steps = (props) => {
  const [step, setStep] = useState(1);
  const [option , setOption] = useState('')
  const [option2 , setOption2] = useState('')

  const handleOptionSelect = (selectedOption) => {
    setOption(selectedOption);
};
  const handleOptionSelect2 = (selectedOption) => {
    setOption2(selectedOption);
};


  return (
    <div className="flex-1 flex flex-col gap-3 lg:gap-5 p-5">
      <div className="flex flex-wrap gap-3 lg:gap-0 items-center">
        <div className="flex items-center gap-2 lg:gap-3">
          {step === 1 ? (
            <div className="flex p-2 lg:p-3 bg-secondary rounded-lg ">
              <img src="/assets/check.svg" className="w-6" alt="" />
            </div>
          ) : (
            <div
              className={`${
                step > 1 ? "bg-secondary" : "bg-[#2626264D]"
              } bg-opacity-30 rounded-lg p-3`}
            >
              <img src="/assets/describe.svg" className="w-6" alt="" />
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
            <div className="flex p-2 lg:p-3 bg-secondary rounded-lg ">
              <img src="/assets/check.svg" className="w-6" alt="" />
            </div>
          ) : (
            <div
              className={`${
                step > 2 ? "bg-secondary" : "bg-[#2626264D]"
              } bg-opacity-30 rounded-lg p-3`}
            >
              <img src="/assets/describe.svg" className="w-6" alt="" />
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
            <div className="flex p-2 lg:p-3 bg-secondary rounded-lg ">
              <img src="/assets/check.svg" className="w-5" alt="" />
            </div>
          ) : (
            <div
              className={`${
                step > 3 ? "bg-secondary" : "bg-[#2626264D]"
              } bg-opacity-30 rounded-lg p-3`}
            >
              <img src="/assets/message.svg" className="w-6" alt="" />
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
            <SearchInput />
            <button
              className="bg-secondary rounded-2xl text-lg font-semibold text-white py-3"
              onClick={() => setStep(step + 1)}
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
              // value={option}
              // data={work}
              // selectedOption={handleOptionSelect}
              message={"Postal Code"}
              postalcode={false}
            />
            <SelectInput
              value={option}
              data={work}
              selectedOption={handleOptionSelect}
              message={"What type of home do you live in?"}
            />
            <SelectInput
              value={option2}
              data={time}
              selectedOption={handleOptionSelect2}
              message={"When do you want to start this project?"}
            />
           <div className="grid grid-cols-2 gap-10 mt-5 ">
            <button
              className="bg-white rounded-2xl text-lg font-semibold py-3"
              onClick={() => setStep(step - 1)}
            >
              Go Back
            </button>
            <button    onClick={() => setStep(step + 1)} className="bg-white hover:bg-secondary hover:text-white rounded-2xl text-lg font-semibold py-3">
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
            <Textarea message={"This Step is Optional"} />
            <div className="grid grid-cols-2 gap-10 mt-5 ">
            <button
              className="bg-white rounded-2xl text-lg font-semibold py-3"
              onClick={() => setStep(step - 1)}
            >
              Go Back
            </button>
            <button className="bg-white hover:bg-secondary hover:text-white rounded-2xl text-lg font-semibold py-3">
              Next
            </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const SearchInput = ({ message, icon }) => {
  const [showResult, setShowResult] = useState(true);
  const [selected, setSelected] = useState(-1);
  const [category, setCategory] = useState([]);
  const [selectedCategory , setSelectedCategory] = useState()
  const [subCategory , setSubCategory] = useState([])


  useEffect(() => {
    const fetchData = async () => {
      const response  = await categoryService.fetchAll()
      setCategory(response?.categories);
    };
    fetchData();
  }, []);

//   useEffect(() => {
//     const fetchSubCategory = async () => {
//       const response  = await categoryService.
//       setCategory(response?.categories);
//     };
//     fetchSubCategory();
//   }, []);

useEffect(() => {
    const fetchSubCategory = async () => {
      const response  = await subcategoryService.fetchByCategory(selectedCategory)
      setSubCategory(response?.subcategories);
    };
    fetchSubCategory();
  }, [selectedCategory]);

  

  const handleSelectChange = (e) => {
    setSelectedCategory(e?.value)
  }
  

  return (
    <div className="relative w-full">
      <div className="absolute -top-5 left-5 px-10 text-white py-1 lg:py-2 bg-secondary rounded-xl">
        What do you need done?
      </div>
      <div className="flex w-full bg-white rounded-2xl px-3 border border-secondary">
        <img
          src="/assets/search.svg"
          className="w-4 cursor-pointer mr-3"
          alt=""
        />
        {/* <input
          type="text"
          className="flex-1 py-5 focus:outline-none ring-0"
          placeholder="Search"
        /> */}
         <Select
                  styles={{
                    border: "none",
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      borderColor: "grey",
                      borderWidth :0
                     
                    }),
                  }}
                  options={category?.map((value, index) => (
                    { label: value?.name, value: value?.id }
                  ))}
                  
                  placeholder="What type of service do you need?"
                  isSearchable={true}
                  className="flex-1 py-5 focus:outline-none ring-0"            
                        onChange={(e) => handleSelectChange(e)}
                />
        {/* <img
          src="/assets/thick-arrow-down.svg"
          className="w-2 cursor-pointer"
          alt=""
          onClick={() => setShowResult(!showResult)}
        /> */}
      </div>
      {showResult && (
        <div className="flex flex-col w-full py-5 px-6 bg-white rounded-2xl  mt-2 border border-secondary">
           
          <div className="flex flex-col gap-2 lg:pl-4 mt-1">
{subCategory?.length > 0 ?
<>
            {subCategory?.map((value, i) => (
           <div key={i}>
           <label className="cursor-pointer">
             <input
               type="radio"
               value={value?.name}
               checked={selected === value?.name}
                
               onChange={(e) => {
                 setSelected(e.target.checked ? e.target.value : null);
                }}
               style={{ accentColor: '#2B937C' , marginRight:8}} 
             />
             {value?.name}
           </label>
         </div>
            ))}
            </>
:
<h1> Select a category</h1>
 }
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

const SelectInput = ({ message, value,data ,selectedOption , postalcode = true }) => {

  const [showResult, setShowResult] = useState(false);
  const [selected, setSelected] = useState(-1);

  const handleClick = (e) => {
    console.log('Clicked:', e.target.value);
    selectedOption(e.target.value)
   };

  return (
    <div className="relative w-full">
      <div className="absolute lg:-top-5 -top-2 left-5 text-xs lg:text-base px-5 lg:px-10 text-white py-1 lg:py-2 bg-secondary rounded-xl">
        {message}
      </div>
      <div className="flex w-full bg-white rounded-2xl py-5 px-3 border border-secondary cursor-pointer"  onClick={() => setShowResult(!showResult)}>
       {postalcode ?
        <div className="flex-1 font-semibold ">{value ? value :  "Select"}</div>
        :
        <input
          type="text"
          className="flex-1  focus:outline-none ring-0"
          placeholder="Enter Postal code "
        /> 
       }
{postalcode && 
        <img
          src="/assets/thick-arrow-down.svg"
          className="w-2 cursor-pointer"
          alt=""
         
        />
}
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
        style={{ accentColor: '#2B937C' , marginRight:8}} 
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

const Textarea = ({ message, value }) => {
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
        ></textarea>
      </div>
    </div>
  );
};
