'use client'
import Image from "next/image";
import React, {useState, useEffect} from "react";
import mapIcon from "/public/assets/newImages/map-tag-svgrepo-com.svg";
import searchIcon from "/public/assets/newImages/search-svgrepo-com.svg";
import categoryService from "@/api/services/categoryService";
import Select from 'react-select'
import toast from "react-hot-toast";
import {useRouter} from 'next/navigation'


const Search = () => {

    const [categories, setCategories] = useState([])
    const [selectedOption, setSelectedOption] = useState(null);

    const [postalCode, setPostalCode] = useState('')
    const [isValidPostalCode, setIsValidPostalCode] = useState()

    const navigation = useRouter()

    const handleSubmit = async (event) => {
        event.preventDefault();

        const postalCoderegex = /^[A-Z]\d[A-Z] \d[A-Z]\d$/i;
        if (selectedOption) {

            if (postalCoderegex.test(postalCode)) {
                console.log(selectedOption);
                let postal = postalCode.replaceAll(" ", "-").toLowerCase();
                let category = selectedOption.replaceAll(" ", "-").replaceAll("/", "-").toLowerCase();
                navigation.push("/getquotes/create/" + category + "/" + postal);
            } else {
                toast.error('Enter a valid postal code ')
            }
        } else {
            toast.error('Select a category first')
        }

    };

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
        setPostalCode(inputPostal);
    };

    const options = categories.map((category) => ({
        value: category.tag,
        label: category.name,
    }));

    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption.value);
    };

    useEffect(() => {
        const getCategories = async () => {
            try {
                const response = await categoryService.fetchAll();
                setCategories(response.categories);
            } catch (error) {
                console.error(error);
            }
        };
        getCategories()
    }, [])

    return (
        <div className="w-full bg-[#12937C] flex justify-center ">
            <div className="search-container  h-[204px] width-100 flex flex-col justify-center items-center ">
                <div className="search-text">
                    <h1 className="text-[20px]  sm:text-[28px] font-[500] mb-5 text-[white] text-center">
                        Find the right pro for your project
                    </h1>
                </div>
                <div className="search-input">
                    <div
                        className=" bg-white max-md:bg-transparent  rounded-[20px] shadow-md   flex items-center max-md:flex-col">
                        <div className="flex items-center bg-white rounded-[20px]">

                            <div className="mr-2 pl-3 sm:pl-3 ">
                                <Image
                                    src={searchIcon}
                                    alt="Search Icon"
                                    width={20}
                                    height={20}
                                />
                            </div>
                            <Select
                                styles={{
                                    control: (baseStyles, state) => ({
                                        ...baseStyles,
                                        border: "none",
                                        borderColor: state.isFocused ? "grey" : "red",
                                        width: "250px",
                                        flexGrow: 1,
                                        fontSize: "14px",
                                        borderRadius: "20px",
                                        "&:focus": {outline: "none"},
                                    }),
                                }}
                                options={options}
                                placeholder="What service do you need?"
                                isSearchable={true}
                                className="!outline-none !border-none"
                                onChange={(e) => handleSelectChange(e)}
                            />

                        </div>
                        <div className="flex items-center max-md:mt-2">
                            <div className="bg-white rounded-[20px] py-2 flex ">
                                <div className="mr-2 ml-5 ">
                                    <Image src={mapIcon} alt="Map Icon" width={20} height={20}/>
                                </div>
                                <input
                                    type="text"
                                    placeholder="Postal Code"
                                    value={postalCode}
                                    maxLength={7}
                                    onChange={(e) => handlePostalChange(e)}
                                    className="focus:outline-none flex-grow text-black bg-transparent text-[10px] sm:text-[16px]  sm:w-[110px]"
                                />
                            </div>
                            <button onClick={(e) => handleSubmit(e)}
                                    className="bg-blue-500 text-white text-[14px] px-5 h-[45px] rounded-[20px] ml-2">
                                GET QUOTES
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Search;
