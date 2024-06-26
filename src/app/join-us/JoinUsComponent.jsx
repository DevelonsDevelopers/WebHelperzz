"use client";
import Header from "@/components/Header";
import { Footer } from "@/components/Footer";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CiFileOn } from "react-icons/ci";
import categoryService from "@/api/services/categoryService";
import contractorService from "@/api/services/contractorService";
import subcategoryService from "@/api/services/subcategoryService";
import uploadService from "@/api/services/uploadService";
import { useRouter } from "next/navigation";
import emailService from "@/api/services/emailService";
import { PatternFormat } from "react-number-format";
import toast from "react-hot-toast";
import cityService from "@/api/services/cityService";
import { usePathname } from "next/navigation";
import Select from "react-select";
import { FiUpload } from "react-icons/fi";

const JoinUsComponent = ({ params }) => {
  const navigate = useRouter();

  const [categories, setCategories] = useState([]);

   const [subcategory, setSubcategory] = useState([]);
  const [subcategoryValue, setSubcategoryValue] = useState();

  const [phoneNumber, setPhoneNumber] = useState("");
  const [category, setCategory] = useState();

  const [cities, setCities] = useState([]);
  const [secondSub, setSecondSub] = useState(subcategoryValue);

  const [licenses, setLicenses] = useState([]);
  const [companyLogo, setCompanyLogo] = useState(null);
  const [certificates, setCertificates] = useState([]);

  const licensesRef = useRef(null);
  const companyLogoRef = useRef(null);
  const certificatesRef = useRef(null);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");

  const [contractorId, setContractorId] = useState("");

  const [submiting, setSubmiting] = useState(false);

  const [name, setName] = useState({
    company_name: "company_name",
    category: "category",
    subcategories: "subcategories",
    firstName: "firstName",
    lastName: "lastName",
    email: "email",
    phone: "phone",
    city: "city",
    address: "address",
    postal_code: "postal_code",
    license: "license",
    companyLogo: "companyLogo",
    certificates: "certificates",
  });

  const [error, setError] = useState({
    company_name: false,
    category: false,
    subcategories: false,
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    city: false,
    address: false,
    postal_code: false,
    license: false,
    companyLogo: false,
    certificates: false,
  });

  const [formData, setFormData] = useState({
    company_name: "",
    category: "",
    subcategories: "",
    city: "",
    address: address,
    postal_code: "",
    license: null,
    companyLogo: null,
    certificates: null,
    name: firstName + lastName,
    email: "",
    phone: "",
    password: "123456",
    image: "one",
    status: "0",
    checked: "0",
    skills: "nothing",
  });

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "license") {
      setLicenses(Array.from(files));
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: files,
      }));
       setError((prevError) => ({
        ...prevError,
        [name]: false,
      }))
    } else if (name === "companyLogo") {
      setCompanyLogo(files[0]);
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: files[0],
      }));
      setError((prevError) => ({
        ...prevError,
        [name]: false,
      }))
    } else if (name === "certificates") {
      setCertificates(Array.from(files));
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: files,
      }));
      setError((prevError) => ({
        ...prevError,
        [name]: false,
      }))
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

  const getSubcategoryByCategory = async (category) => {
    try {
      const response = await subcategoryService.fetchByCategory(category);
      setSubcategory(response.subcategories);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setFormData({ ...formData, subcategories: secondSub });
  }, [secondSub]);

  useEffect(() => {
    setFormData({ ...formData, address: address });
  }, [address]);

  useEffect(() => {
    setFormData({ ...formData, name: firstName + " " + lastName });
  }, [firstName, lastName]);

  useEffect(() => {
    const getCities = async () => {
      try {
        const response = await cityService.fetchAll();
        setCities(response.cities);
      } catch (error) {
        console.error(error);
      }
    };
    getCities();
  }, []);

  useEffect(() => {
    if (category) {
      getSubcategoryByCategory(category);
    }
  }, [category]);

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    setSecondSub(subcategoryValue);
  }, [subcategoryValue]);

  useEffect(() => {
    if (Array.isArray(secondSub) && secondSub.length > 0) {
      const concatenatedValues = secondSub
        .map((option) => option.value)
        .toString();
      setSecondSub(concatenatedValues);
    }
  }, [secondSub]);


  const handlePostalCodeChange = (e) => {
    let { value } = e.target;
    value = value.replace(/[^\dA-Za-z]/g, '').toUpperCase();
    if (value.length > 3) {
      value = `${value.slice(0, 3)} ${value.slice(3, 6)}`;
    }
    setFormData({ ...formData, postal_code: value });
    setError((prevError) => ({
      ...prevError,
      postal_code: false,
    }));
  };




  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmiting(true);
    let hasError = false;
    const newError = { ...error };

    for (const key in formData) {
      if (!formData[key] || (Array.isArray(formData[key]) && formData[key].length === 0)) {
        newError[key] = true;
        hasError = true;
      } else {
        newError[key] = false;
      }
    }

    setError(newError);

    if (hasError) {
      toast.error("Please fill all the required fields");
      setSubmiting(false);
      return;
    } else {
      try {
        const logoFile = await uploadService.single(companyLogo);
        let contractor = { ...formData };
        contractor.companyLogo = logoFile.fileName;

        const submittedContractor = await contractorService.join(contractor);

        if (submittedContractor.responseCode === 201) {
          if (submittedContractor.contractor !== null) {
            for (const license of licenses) {
              const licenseFile = await uploadService.single(license);
              const docData = {
                contractor: submittedContractor.contractor,
                title: "License",
                file: licenseFile.fileName,
              };
              await contractorService.createDocument(docData);
            }

            for (const certificate of certificates) {
              const certificateFile = await uploadService.single(certificate);
              const certificateData = {
                contractor: submittedContractor.contractor,
                title: "Incorporate Certificate",
                file: certificateFile.fileName,
              };
              await contractorService.createDocument(certificateData);
            }

            setSubmiting(false);
            navigate.push("/");
          }
        } else {
          toast.error(submittedContractor.message);
        }
      } catch (error) {
        console.error("Error during submission:", error);
        toast.error(error.message);
        setSubmiting(false);
      }
    }
  };


  return (
    <>
      <Header />
      <div className="flex flex-col gap-5 lg:gap-10 py-44 justify-center items-center bg-gray-100 min-h-[100vh]">
        <div className="flex-1">
          <div className=" flex flex-col items-start ml-auto gap-10 max-w-xl p-1">
            <h3 className="font-bold text-3xl lg:text-5xl">
              With us, your business grows to new heights.
            </h3>
            <div className="bg-[#27A9E1] h-1.5 rounded-full w-[200px]" />
          </div>
        </div>
        <div className="flex-1">
          <div className="flex flex-col gap-3 lg:items-center w-fit p-1">
            <form
              onSubmit={(e) => handleSubmit(e)}
              className="flex flex-col gap-5 md:mx-6 p-5 md:p-12 w-[100vw] lg:w-[1000px] bg-white shadow-lg"
            >
              <h4 className="font-bold text-xl self-center">
                Join Us as a Contractor
              </h4>
              <div className="flex flex-col lg:flex-row gap-4 w-full">
                <div className="flex-1 flex flex-col">
                  <label className="font-bold text-sm">
                    Professional/Company Name
                  </label>
                  <input
                    type="text"
                    name={name?.company_name}
                    value={formData.company_name}
                    onChange={(e) => {
                      setFormData({
                        ...formData,
                        company_name: e.target.value,
                      });
                      setError((prevError) => ({
                        ...prevError,
                        company_name: false,
                      }));
                    }}
                    className={`${
                      error.company_name ? "border-red-500" : ""
                    } border-2 w-full p-2`}
                    placeholder="Your Business Name"
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <label className="font-bold text-sm">Category</label>
                  <select
                    className={`${
                      error.category ? "border-red-500" : ""
                    } border-2 w-full p-2`}
                    value={category}
                    name={name?.category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      setSecondSub(null);
                      setSubcategoryValue([]);
                      setFormData({ ...formData, category: e.target.value });
                      setError((prevError) => ({
                        ...prevError,
                        category: false,
                      }));
                    }}
                  >
                    <option value="" selected disabled>
                      Select Category
                    </option>
                    {options.map((option, i) => (
                      <option key={i} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="flex-1 flex flex-col">
                <label className="font-bold text-sm">Subcategories</label>
                <Select
                  placeholder="Select category first"
                  name={name?.subcategories}
                  value={subcategoryValue}
                  onChange={(e) => {setSubcategoryValue(e) ;  setError((prevError) => ({
                    ...prevError,
                    subcategories: false,
                  }));}}
                  className={`${
                    error.subcategories ? "border-red-500" : ""
                  } border-2 w-full p-2`}
                  options={subcategory.map((value, index) => ({
                    label: value.name,
                    value: value.id,
                  }))}
                  isMulti={true}
                  styles={{
                    control: (provided) => ({
                      ...provided,
                      border: "none",
                    }),
                    menu: (provided) => ({
                      ...provided,
                      border: "none",
                    }),
                    multiValue: (provided) => ({
                      ...provided,
                      borderRadius: "0",
                    }),
                  }}
                />
              </div>
              <div className="flex flex-col lg:flex-row gap-4 w-full">
                <div className="flex-1 flex flex-col">
                  <label className="font-bold text-sm">First Name</label>
                  <input
                    type="text"
                    name={name?.firstName}
                    value={firstName}
                    onChange={(e) => {setFirstName(e.target.value) ; setError((prevError) => ({
                        ...prevError,
                        firstName: false,
                      }))}}
                    className={`${
                      error.firstName ? "border-red-500" : ""
                    } border-2 w-full p-2`}
                    placeholder="First Name"
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <label className="font-bold text-sm">Last Name</label>
                  <input
                    type="text"
                    name={name?.lastName}
                    value={lastName}
                    onChange={(e) => {setLastName(e.target.value) ;setError((prevError) => ({
                        ...prevError,
                        lastName: false,
                      }))  }}
                    className={`${
                      error.lastName ? "border-red-500" : ""
                    } border-2 w-full p-2`}
                    placeholder="Last Name"
                  />
                </div>
              </div>
              <div className="flex flex-col lg:flex-row gap-4 w-full">
                <div className="flex-1 flex flex-col">
                  <label className="font-bold text-sm">Email</label>
                  <input
                    type="text"
                    name={name?.email}
                    value={formData.email}
                    onChange={(e) =>
                      {setFormData({ ...formData, email: e.target.value })  ;  setError((prevError) => ({
                        ...prevError,
                        email: false,
                      }))   }
                    }
                    className={`${
                      error.email ? "border-red-500" : ""
                    } border-2 w-full p-2`}
                    placeholder="Email Address"
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <label className="font-bold text-sm">Phone Number</label>

                  <PatternFormat
                    type="tel"
                    format="+1 (###) ###-####"
                    name={name?.phone}
                    onValueChange={(value) =>
                     { setFormData({ ...formData, phone: value.value })  ;  setError((prevError) => ({
                        ...prevError,
                        phone: false,
                      })) }
                    }
                    placeholder="Phone Number"
                    className={`${
                      error.phone ? "border-red-500" : ""
                    } border-2 w-full p-2`}
                  />
                </div>
              </div>

              <div className="flex-1 flex flex-col">
                <label className="font-bold text-sm">City</label>
                <select
                  className={`${
                    error.city ? "border-red-500" : ""
                  } border-2 w-full p-2`}
                  value={formData.city}
                  name={name?.city}
                  onChange={(e) =>
                   { setFormData({ ...formData, city: e.target.value }) ; setError((prevError) => ({
                    ...prevError,
                    city: false,
                  }))  }
                  }
                >
                  <option value="" selected disabled>
                    Select City
                  </option>
                  {cities.map((option, i) => (
                    <option key={i} value={option.id}>
                      {option.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-4">
                <div className="flex-1 flex flex-col">
                  <label className="font-bold text-sm">Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    name={name?.address}
                    onChange={(e) =>
                      {setFormData({ ...formData, address: e.target.value }) ; setError((prevError) => ({
                        ...prevError,
                        address: false,
                      }))  }
                    }
                    className={`${
                      error.address ? "border-red-500" : ""
                    } border-2 w-full p-2`}
                    placeholder="Address"
                  />
                </div>
                <div className="flex-initial flex flex-col">
                  <label className="font-bold text-sm">Postal Code</label>
                  <input
                    type="text"
                    name={name?.postal_code}
                    value={formData.postal_code}
                    onChange={handlePostalCodeChange}
                    className={`${
                      error.postal_code ? "border-red-500" : ""
                    } border-2 w-full p-2`}
                    placeholder="Postal Code"
                  />
                </div>
              </div>
              <div className="min-w-[250px] w-[100%] mb-6 ">
                <label className="font-bold text-sm">Licenses</label>
                <div
                  htmlFor="dropzone-file"
                  onClick={() => licensesRef.current?.click()}
                  className={` ${
                    error.license ? "border-red-500" : ""
                  } flex flex-col items-center justify-center w-full h-30 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 mt-3 border-gray-300`}
                >
                  {licenses.length > 0 ? (
                    <div className="flex flex-wrap gap-1 py-3">
                      {licenses.map((license, i) => (
                        <img
                          key={i}
                          src={URL.createObjectURL(license)}
                          alt="Uploaded Logo"
                          className="w-20 object-cover mr-2"
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FiUpload
                        className="text-3xl text-gray-600 mb-2"
                        size={30}
                      />
                      <p className="mb-2 text-sm text-gray-500 ">
                        <span className="font-semibold">Click to upload</span>
                      </p>
                      <p className="text-xs text-gray-500 ">
                        SVG, PNG, JPG or GIF
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    multiple
                    id="dropzone-file"
                    name={name.license}
                    accept="image/jpeg, image/png, image/svg+xml"
                    className="hidden"
                    ref={licensesRef}
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <div className="min-w-[250px] w-[100%] mb-6 ">
                <label className="font-bold text-sm">Company Logo</label>
                <div
                  onClick={() => companyLogoRef.current?.click()}
                  className={` ${
                    error.companyLogo ? "border-red-500" : ""
                  } flex flex-col items-center justify-center w-full h-30 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 mt-3 border-gray-300`}
                >
                  {companyLogo ? (
                    <img
                      src={URL.createObjectURL(companyLogo)}
                      alt="Uploaded Logo"
                      className="w-20 object-cover mr-2"
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FiUpload
                        className="text-3xl text-gray-600 mb-2"
                        size={30}
                      />
                      <p className="mb-2 text-sm text-gray-500 ">
                        <span className="font-semibold">Click to upload</span>
                      </p>
                      <p className="text-xs text-gray-500 ">
                        SVG, PNG, JPG or GIF
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    id="dropzone-file-company-logo"
                    name={name.companyLogo}
                    accept="image/jpeg, image/png, image/svg+xml"
                    className="hidden"
                    ref={companyLogoRef}
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              <div className="min-w-[250px] w-[100%] mb-6 ">
                <label className="font-bold text-sm">
                  Incorporation Certificate
                </label>
                <div
                  onClick={() => certificatesRef.current?.click()}
                  className={` ${
                    error.certificates ? "border-red-500" : ""
                  } flex flex-col items-center justify-center w-full h-30 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 mt-3 border-gray-300`}
                >
                  {certificates.length > 0 ? (
                    <div className="flex flex-wrap gap-1 py-3">
                      {certificates.map((certificate, i) => (
                        <img
                          key={i}
                          src={URL.createObjectURL(certificate)}
                          alt="Uploaded Certificate"
                          className="w-20 object-cover mr-2"
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FiUpload
                        className="text-3xl text-gray-600 mb-2"
                        size={30}
                      />
                      <p className="mb-2 text-sm text-gray-500 ">
                        <span className="font-semibold">Click to upload</span>
                      </p>
                      <p className="text-xs text-gray-500 ">
                        SVG, PNG, JPG or GIF
                      </p>
                    </div>
                  )}
                  <input
                    type="file"
                    multiple
                    id="dropzone-file-certificates"
                    name={name.certificates}
                    accept="image/jpeg, image/png, image/svg+xml"
                    className="hidden"
                    ref={certificatesRef}
                    onChange={handleFileChange}
                  />
                </div>
              </div>
              {submiting ? (
                <button
                   onClick={(e) => e.preventDefault()}
                  className="py-5 bg-[#27A9E1] font-bold text-sm text-white"
                >
                  <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-white mx-auto"></div>
                </button>
              ) : (
                <button
                  type="submit"
                  className="py-5 bg-[#27A9E1] font-bold text-sm text-white"
                >
                  REGISTER NOW!
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
      <Footer showNewsLetter={false} postProject={false} />
    </>
  );
};

export default JoinUsComponent;
