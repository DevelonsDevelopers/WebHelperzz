'use client'
import * as React from "react";
import {useState, useRef, useEffect} from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import {Fade} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {FaChevronDown} from "react-icons/fa";

const pages = ["Browse Categories", "Blog", "Write A review"];
import Image from "next/image";
import imgLogo from "/public/assets/logo.png";
import Signup from "../app/signup/page";
import Login from "../app/login/page";

import Autosuggest from "react-autosuggest";

import categoryService from "../api/services/categoryService";
import contractorService from "../api/services/contractorService";

import {useRouter} from "next/navigation";
import Link from "next/link";
import cityService from "@/api/services/cityService";
import Select from "react-select";

function Header() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchCategoriesContractors, setSearchCategoriesContractors] = useState([]);
    const [cities, setCities] = useState([])
    const [isValidPostalCode, setIsValidPostalCode] = useState(true);
    const [postalCode, setPostalCode] = useState("");
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedError, setSelectedError] = useState(false);
    const [cityValue, setCityValue] = useState('');
    const [citySuggestions, setCitySuggestions] = useState([]);
    const [citySelectedOption, setCitySelectedOption] = useState('');
    const [citySelectedError, setCitySelectedError] = useState(false);
    const open = Boolean(anchorEl);
    const openUser = Boolean(anchorElUser);
    const buttonRef = useRef(null);
    const [user, setUser] = useState(null);
    const [value, setValue] = useState("");
    const [suggestions, setSuggestions] = useState([]);

    const navigate = useRouter();

    const getSuggestions = (inputValue) => {
        const inputValueLowerCase = inputValue.trim().toLowerCase();
        return searchCategoriesContractors.filter(
            (category) =>
                category.name.toLowerCase().includes(inputValueLowerCase)
        );
    };

    const onSuggestionsFetchRequested = ({value}) => {
        setSuggestions(getSuggestions(value));
        setSelectedOption(value);
        setSelectedError(false);
    };

    const getCitySuggestions = (inputValue) => {
        const inputValueLowerCase = inputValue.trim().toLowerCase();
        return cities.filter(
            (city) =>
                city.name.toLowerCase().includes(inputValueLowerCase) ||
                city.tag.toLowerCase().includes(inputValueLowerCase)
        );
    };

    const onCitySuggestionsFetchRequested = ({value}) => {
        const suggestions = getCitySuggestions(value);
        setCitySuggestions(suggestions);
        setCitySelectedOption(value);
        setCitySelectedError(false);
    };

    const handleSelectChange = (selectedOption) => {
        setSelectedOption(selectedOption);
        setSelectedError(false);
    };

    const handlePostalChange = (e) => {
        const inputPostal = e.target.value;
        setPostalCode(inputPostal);
    };

    const handleClick = (event) => {
        // setAnchorEl(event.currentTarget);
        navigate.push("/category_list/toronto");
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const getCategoryContractors = async () => {
        try {
            const response = await categoryService.fetchAllActive()
            setSearchCategoriesContractors(response.categories);
        } catch (error) {
            console.error(error);
        }
    };

    const getCities = async () => {
        try {
            const response = await cityService.fetchAll();
            setCities(response.cities);
        } catch (error) {
            console.error(error);
        }
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (value) {
            if (cityValue) {
                let postal = cityValue.postalCode.replaceAll(" ", "-").toLowerCase();
                navigate.push("/getquotes/create/" + value.name.replaceAll(" ", "-").toLowerCase() + "/" + postal);
            }
        }
    };

    const handleLogout = () => {
        setAnchorElUser(null);
        setUser(null);
        localStorage.removeItem("HELPERZZ-USER");
    };

    useEffect(() => {
        console.log(value)
    }, [value]);

    useEffect(() => {
        getCategoryContractors();
        getCities()
    }, []);

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("HELPERZZ-USER"));
        if (loggedInUser) {
            setUser(loggedInUser);
        } else {
            setUser(null);
        }
    }, []);

    return (
        <AppBar
            position="absolute"
            sx={{backgroundColor: "transparent", boxShadow: "none"}}
        >
            <Container maxWidth="xl">
                <Toolbar className=" flex flex-wrap py-2 select-text" disableGutters>
                    <div className="w-28 md:mr-10 select-text cursor-pointer">
                        <Image
                            onClick={() => navigate.push("/")}
                            src={imgLogo}
                            alt=""
                            width={150}
                            height={100}
                        />
                    </div>

                    <div className="ml-auto">
                        <Box
                            sx={{
                                flexGrow: 1,
                                justifyContent: "between",
                                display: {xs: "flex", md: "none"},
                            }}
                        >
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon className="text-text !ml-auto"   />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: "bottom",
                                    horizontal: "left",
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: "top",
                                    horizontal: "left",
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: {xs: "block", md: "none"},
                                }}
                            >
                                <div>
                                    <Button
                                        id="fade-button"
                                        aria-controls={open ? "fade-menu" : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={open ? "true" : undefined}
                                        onClick={handleClick}
                                        sx={{
                                            my: 2,
                                            color: "black",
                                            fontWeight: "bold",
                                            display: "block",
                                        }}
                                    >
                                        Browse Categories
                                    </Button>
                                    <Menu
                                        id="fade-menu"
                                        MenuListProps={{
                                            "aria-labelledby": "fade-button",
                                        }}
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                        TransitionComponent={Fade}
                                    >
                                        {pages.map((page) => (
                                            <MenuItem key={page} onClick={handleCloseNavMenu}>
                                                <Typography textAlign="center">{page}</Typography>
                                            </MenuItem>
                                        ))}
                                    </Menu>
                                    <Button
                                        style={{userSelect: "text"}}
                                        className="whitespace-nowrap"
                                        onClick={handleCloseNavMenu}
                                        href="/blog"
                                        sx={{
                                            my: 2,
                                            color: "black",
                                            fontWeight: "bold",
                                            display: "block",
                                        }}
                                    >
                                        Blog
                                    </Button>
                                    {user ? (
                                        <div>
                                            <Button
                                                className="text-text text-sm px-3 font-medium whitespace-nowrap cursor-pointer"
                                                id="user_button"
                                                aria-controls={openUser ? "user-menu" : undefined}
                                                aria-haspopup="true"
                                                aria-expanded={openUser ? "true" : undefined}
                                                onClick={handleOpenUserMenu}
                                                sx={{
                                                    my: 2,
                                                    color: "black",
                                                    fontWeight: "bold",
                                                    display: "block",
                                                }}
                                            >
                                                {user.name}
                                            </Button>
                                            <Menu
                                                id="user-menu"
                                                MenuListProps={{
                                                    "aria-labelledby": "user_button",
                                                }}
                                                anchorEl={anchorElUser}
                                                open={openUser}
                                                onClose={handleCloseUserMenu}
                                                TransitionComponent={Fade}
                                            >
                                                <MenuItem onClick={handleCloseUserMenu}>
                                                    Profile
                                                </MenuItem>
                                                <MenuItem onClick={handleCloseUserMenu}>
                                                    My account
                                                </MenuItem>
                                                <MenuItem onClick={handleCloseUserMenu}>
                                                    <p
                                                        className="cursor-pointer"
                                                        onClick={() => setUser(null)}
                                                    >
                                                        Logout
                                                    </p>
                                                </MenuItem>
                                            </Menu>
                                        </div>
                                    ) : (
                                        <div className="gap-2 2xl:mr-5 mr-2 hidden md:flex">
                                            <p
                                                className="text-text text-sm font-medium font-[700] whitespace-nowrap cursor-pointer"
                                                onClick={() => navigate.push("/login")}
                                            >
                                                Log In
                                            </p>
                                            <p
                                                className="text-text text-sm font-medium font-[700] whitespace-nowrap cursor-pointer"
                                                onClick={() => navigate.push("/signup")}
                                            >
                                                Sign up
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </Menu>
                        </Box>
                    </div>

                    <Box sx={{flexGrow: 1, display: {xs: "none", md: "flex"}}}>
                        <div>
                            <Button
                                ref={buttonRef}
                                style={{
                                    userSelect: "text",
                                    display: "flex",
                                }}
                                className="whitespace-nowrap"
                                onClick={handleClick}
                                sx={{my: 2, color: "white", display: "block"}}
                            >
                                Browse Categories
                            </Button>
                        </div>
                        <Button
                            style={{userSelect: "text"}}
                            className="whitespace-nowrap"
                            onClick={handleCloseNavMenu}
                            href="/join-us"
                            sx={{
                                my: 2,
                                color: "black",
                                fontWeight: "bold",
                                display: "block",
                                fontSize: 12
                            }}
                        >
                            Join Us
                        </Button>
                        <Button
                            style={{userSelect: "text"}}
                            className="whitespace-nowrap"
                            href="/join-us"
                            sx={{
                                my: 2,
                                color: "black",
                                fontWeight: "bold",
                                display: "block",
                                fontSize: 12
                            }}
                        >
                            Why work with us
                        </Button>
                        <div className="flex-col ml-auto relative top-0">


                            <div
                                className={`relative flex bg-transparent border  ${selectedError || !isValidPostalCode
                                    ? "border-red-500"
                                    : "border-[#888888]"
                                } w-auto min-h-9 items-center  rounded-xl ml-auto mr-4 px-2 h-fit lg:w-auto`}
                            >
                                <div className="sm:w-32">
                                    <div className="absolute z-50 top-0">
                                        <Select
                                            onChange={(e) => setValue(e)}
                                            value={value}
                                            options={searchCategoriesContractors.map(value => {
                                                return {
                                                    name: value.name,
                                                    id: value.id
                                                }
                                            })}
                                            placeholder={"Search Category"}
                                            isSearchable={true}
                                            className={`text-black w-36 text-[10px]`}
                                            getOptionValue={(e) => e.id}
                                            components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
                                            styles={{
                                                control: (baseStyles, state) => ({
                                                    ...baseStyles, width: "100%", cursor: "pointer", fontSize: '12px', backgroundColor: "none", borderColor: state.isFocused ? 'transparent' : 'transparent', outlineColor: "transparent", border: 0, boxShadow: "none",
                                                }),
                                                menuList: (base) => ({
                                                    ...base, "::-webkit-scrollbar": {
                                                        display: "none"
                                                    },
                                                })
                                            }}
                                            getOptionLabel={(e) => e.name}
                                        />

                                    </div>
                                </div>
                                <span className="ml-3 text-black">|</span>
                                <div className="sm:w-28">
                                    <div
                                        className="absolute z-20 top-0  px-0 border-[#696969] font-normal text-[#696969] ">
                                        <Select
                                            onChange={(e) => setCityValue(e)}
                                            value={cityValue}
                                            options={cities.map(value => {
                                                return {
                                                    name: value.name,
                                                    id: value.id,
                                                    postalCode: value.postal_code
                                                }
                                            })}
                                            placeholder={"City"}
                                            isSearchable={true}
                                            className={`text-black w-36 text-[10px]`}
                                            getOptionValue={(e) => e.postalCode}
                                            components={{ DropdownIndicator:() => null, IndicatorSeparator:() => null }}
                                            styles={{
                                                control: (baseStyles, state) => ({
                                                    ...baseStyles, width: "100%", cursor: "pointer", fontSize: '12px', backgroundColor: "none", borderColor: state.isFocused ? 'transparent' : 'transparent', outlineColor: "transparent", border: 0, boxShadow: "none",
                                                }),
                                                menuList: (base) => ({
                                                    ...base, "::-webkit-scrollbar": {
                                                        display: "none"
                                                    },
                                                })
                                            }}
                                            getOptionLabel={(e) => e.name}
                                        />

                                    </div>
                                </div>
                                <span className="text-black">|</span>

                                <div
                                    className="pl-2 cursor-pointer z-40"
                                    onClick={(e) => handleSubmit(e)}
                                >
                                    <SearchIcon style={{color: "#696969"}}/>
                                </div>
                            </div>


                            {/* <h1 className="text-right text-sm text-red-500 ml-[-15px]">Enter a valid postal code </h1> */}

                        </div>

                        {user ? (
                            <div>
                                <div
                                    className="text-text text-sm px-3 font-medium whitespace-nowrap cursor-pointer"
                                    id="user_button"
                                    aria-controls={openUser ? "user-menu" : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={openUser ? "true" : undefined}
                                    onClick={handleOpenUserMenu}
                                >
                                    {user.name}
                                </div>
                                <Menu
                                    id="user-menu"
                                    MenuListProps={{
                                        "aria-labelledby": "user_button",
                                    }}
                                    anchorEl={anchorElUser}
                                    open={openUser}
                                    onClose={handleCloseUserMenu}
                                    TransitionComponent={Fade}
                                >
                                    <MenuItem onClick={handleCloseUserMenu}>Profile</MenuItem>
                                    <MenuItem onClick={handleCloseUserMenu}>My account</MenuItem>
                                    <MenuItem onClick={handleLogout}>
                                        <p className="cursor-pointer" onClick={() => setUser(null)}>
                                            Logout
                                        </p>
                                    </MenuItem>
                                </Menu>
                            </div>
                        ) : (
                            <div className="gap-4 2xl:mr-5 mr-2 hidden z-[9999] md:flex ">
                                <p
                                    className="text-text text-sm font-bold whitespace-nowrap w-10 cursor-pointer"
                                    onClick={() => navigate.push("/login")}
                                >
                                    Log In{" "}
                                </p>
                                <p
                                    className="text-text text-sm text- font-bold whitespace-nowrap  w-10 mr-4 cursor-pointer"
                                    onClick={() => navigate.push("/signup")}
                                >
                                    Sign up
                                </p>
                            </div>
                        )}
                    </Box>

                    <div className=" hidden lg:block ml-auto">
                        <Button
                            style={{userSelect: "text"}}
                            variant="contained"
                            className="btn_header text-sm"
                            disableElevation
                            onClick={() => navigate.push("/join-us")}

                        >
                            Are you a Home pro ?
                        </Button>
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default Header;
