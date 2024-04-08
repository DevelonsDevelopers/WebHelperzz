import * as React from "react";
import { useState, useRef, useEffect } from "react";
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
import { Fade } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { FaChevronDown } from "react-icons/fa";
const pages = ["Browse Categories", "Blog", "Write A review"];
import Image from "next/image";
import imgLogo from "/public/assets/logo.png";
import Signup from "../app/signup/page";
import Login from "../app/login/page";

import categoryService from "../api/services/categoryService";
import { useRouter } from "next/navigation";
import Link from "next/link";
function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [categories, setCategories] = useState();
  const open = Boolean(anchorEl);
  const openUser = Boolean(anchorElUser);

  const buttonRef = useRef(null);
  const [user, setUser] = useState(null);

  const navigate = useRouter();
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const [isSignupDialogOpen, setIsSignupDialogOpen] = useState(false);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);

  const handleLoginOpenDialog = () => {
    setIsLoginDialogOpen(true);
  };
  const handleSignupOpenDialog = () => {
    setIsSignupDialogOpen(true);
  };

  const handleReviewOpenDialog = () => {
    setIsReviewDialogOpen(true);
  };

  const handleClick = (event) => {
    // setAnchorEl(event.currentTarget);
    navigate.push('/category_list/toronto')
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

  const getCategories = async () => {
    try {
      const response = await categoryService.fetchAll();
      setCategories(response.categories);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("HELPERZZ-USER"));
    if (loggedInUser) {
      setUser(loggedInUser);
    } else {
      setUser(null);
    }
  }, []);

  const handleLogout = () => {
    setAnchorElUser(null);
    setUser(null);
    localStorage.removeItem("HELPERZZ-USER");
  };

  return (
    <AppBar
      position="absolute"
      sx={{ backgroundColor: "transparent", boxShadow: "none" }}
    >
      <Container maxWidth="xl">
        <Toolbar className="header_top py-2 select-text" disableGutters>
          <div className="w-28 md:mr-10 select-text">
            <Image
              onClick={() => navigate.push("/")}
              src={imgLogo}
              alt=""
              width={150}
              height={100}
            />
          </div>

          <div>
            <Box
              sx={{
                flexGrow: 1,
                justifyContent: "center",
                display: { xs: "flex", md: "none" },
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
                <MenuIcon className="text-text" />
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
                  display: { xs: "block", md: "none" },
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
                    style={{ userSelect: "text" }}
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
                  <Button
                    style={{ userSelect: "text" }}
                    className="whitespace-nowrap"
                    href="/write_review"
                    sx={{
                      my: 2,
                      color: "black",
                      fontWeight: "bold",
                      display: "block",
                    }}
                  >
                    Write A review
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
                        className="text-text text-sm font-medium whitespace-nowrap cursor-pointer"
                        onClick={() => navigate.push("/login")}
                      >
                        Log In
                      </p>
                      <p
                        className="text-text text-sm font-medium whitespace-nowrap cursor-pointer"
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

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            <div>
              <Button
                ref={buttonRef}
                style={{
                  userSelect: "text",
                  display: "flex",
                }}
                className="whitespace-nowrap"
                onClick={handleClick}
                sx={{ my: 2, color: "white", display: "block" }}
              >
                Browse Categories
                <span style={{ color: "black" }}>
                  <FaChevronDown />
                </span>
              </Button>
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
                PaperProps={{
                  style: {
                    minWidth: buttonRef.current
                      ? buttonRef.current.offsetWidth
                      : undefined,
                  },
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
              >
                {categories?.map((value) => (
                  <MenuItem
                    onClick={() => navigate.push("/category?id=" + value.id)}
                  >
                    {value.name}
                  </MenuItem>
                ))}
              </Menu>
            </div>
            <Button
              style={{ userSelect: "text" }}
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
            <Button
              style={{ userSelect: "text" }}
              className="whitespace-nowrap"
              href="/write_review"
              sx={{
                my: 2,
                color: "black",
                fontWeight: "bold",
                display: "block",
              }}
            >
              Write A review
            </Button>

            <div className="flex bg-transparent border border-[#888888] w-auto min-h-9 items-center  rounded-xl ml-auto mr-4 px-2 h-fit lg:w-auto">
              <input
                type="text"
                placeholder="Search for category or company"
                className="placeholder:text-[#696969] text-[#696969] font-normal bg-transparent sm:text-xs ml-2 h-full outline-none w-8 sm:w-40 xl:w-auto "
              />
              <div className="text-transform : capitalize  text-xs border-l-2 border-r-2 b px-2  border-[#696969] font-normal text-[#696969] ml-2 flex items-center gap-2 sm:text-xs">
                Oshawa{" "}
              </div>
              <div className="pl-2">
                <SearchIcon style={{ color: "#696969" }} />
              </div>
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
              <div className="gap-2 2xl:mr-5 mr-2 hidden md:flex">
                <p
                  className="text-text text-sm font-medium whitespace-nowrap cursor-pointer"
                  onClick={() => navigate.push("/login")}
                >
                  Log In{" "}
                </p>
                <p
                  className="text-text text-sm font-medium whitespace-nowrap cursor-pointer"
                  onClick={() => navigate.push("/signup")}
                >
                  Sign up
                </p>
              </div>
            )}
          </Box>

          <div className=" hidden md:block">
            <Button
              style={{ userSelect: "text" }}
              variant="contained"
              className="btn_header text-sm"
              disableElevation
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
