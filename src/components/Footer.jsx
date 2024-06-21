import React from "react";
import Image from "next/image";
import Link from "next/link";
import "../style/Footer.css";
export const Footer = ({ showNewsLetter = true  , postProject = true}) => {

  return (
    <>
        {postProject && (
      <section className="sm:bg-secondary">


        <div
          className="main_part pt-5 pb-0 sm:py-14 relative mt-10 mx-auto sm:flex sm:justify-center"
          style={{ maxWidth: "1400px" }}
        >
          <div className="header_part2 sm:absolute  sm:top-0  pt-8 sm:right-0 mt-4 bg-secondary sm:bg-transparent w-full sm:w-auto">
            <div className="pt-6 pb-0 sm:py-14 relative mt-10 mx-auto">
              <Image
                className="image_footer sm:min-w-[600px]  sm:max-w-[70%] max-w-[100%] w-full object-center mb-0 pb-0 rounded-3xl mx-auto -mt-28 md-sm:mt-0"
                src={require("/public/assets/images/women-image.png")}
                alt="women image"
              />
            </div>
          </div>

          <div className="outer_header_part min-h-35 container px-4 flex flex-col items-center justify-center sm:justify-between flex-wrap sm:flex-row">
            <div className="header_part1 flex flex-col items-center justify-center sm:block bg-[#F7F9FB] sm:bg-transparent pb-10 md:pb-0 mb-10 md:mb-0 w-full sm:w-[60%]">
              <h2 className="text-2xl max-md:!text-[1.4rem] max-md:font-[500] sm:text-3xl font-bold mb-6 sm:text-white mt-2 text-transform: uppercase sm:text-left text-center">
                Suddenly IT’s all so doable.{" "}
              </h2>
              <Link
                href="/create-project"
                className="text-text sm:mt-3 max-md:w-full max-md:border-[#119DED] mt-0 text-lg min-w-60 justify-center border-secondary cursor-pointer hover:bg-primary hover:text-white border font-bold sm:border px-5 py-3 rounded-2xl bg-[#fff] inline-flex items-center"
              >
                Post your Project
              </Link>
            </div>
          </div>
        </div>
      </section>
      )}

      {showNewsLetter ? (
        <section className="bg-[#F7F9FB] py-0">
          <div className="outer_header2_part min-h-60 container px-2 mx-auto flex flex-col items-center justify-center py-6">
            <div className="header2_content_container flex flex-col md:flex-row items-center justify-center w-full max-w-[1100px] px-4">
              <div className="header2_part1 w-full md:w-[60%] mb-6 md:mb-0">
                <h2
                  className="text-2xl mx-auto pt-5 sm:text-2xl text-left font-bold text-text"
                  style={{ lineHeight: 1.5 }}
                >
                  Get
                  <span className="mx-2 text-[#43D9BE]">
                    free project cost <br /> information
                  </span>
                  delivered to <br /> your inbox
                </h2>
              </div>
              <form className="header2_part2 text-center sm:pr-16 flex flex-col items-center justify-center w-auto">
                <input
                  type="email"
                  required
                  className="border-2 border-[#43D9BE] w-full md:w-96 p-3 mx-auto rounded-xl mb-6 md:mb-0"
                  placeholder="Email Address"
                />
                <input
                type="submit"
                value="SUBSCRIBE"
                  className="hover:bg-[#43D9BE] w-fit mt-3 sm:w-48 mx-auto hover:text-white transition-all cursor-pointer text-text text-base lg:text-xl justify-center border-2 border-[#43D9BE] px-4 py-2 rounded-2xl font-bold bg-[#fff] text-transform: uppercase"
               />


              </form>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}

<footer className="text-gray-800 bg-[#E8E8E8] max-md:bg-[#F7F9FB]  ">
                <div
                    className="container px-14 sm:px-0 sm:pt-24 sm:pb-10 mx-auto flex  md:items-center lg:items-start md:flex-row  flex-col">
                    <div className="flex-grow flex max-md:flex-col    md:mt-0 mt-10 md:text-left  text-left">
                        <div className="footer_col_1 lg:w-1/4 w-1/2 max-md:mx-auto ">
                            <h2 className="title-font font-bold text-gray-900 text-base mb-3 text-transform: uppercase">
                                Homeowners
                            </h2>
                            <nav className="list-none mb-10">
                                <li>
                                    <Link href="/categories" className="text-gray-800 text-xs hover:text-gray-800 mb-2 block">
                                        Browse Categories
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/top-contractors" className="text-gray-800 text-xs hover:text-gray-800 mb-2 block">
                                        Browse Top Contractors
                                    </Link>
                                </li>
                                {/* <li>
                                    <Link href="/write-review" className="text-gray-800 text-xs hover:text-gray-800 mb-2 block">
                                        Write A Review
                                    </Link>
                                </li> */}
                                <li>
                                    <Link href="/blog" className="text-gray-800 cursor-pointer text-xs hover:text-gray-800 mb-2 block">
                                        Blog
                                    </Link>
                                </li>
                                <li>
                                <Link href="/Homeowner-faq" className="text-gray-800 cursor-pointer text-xs hover:text-gray-800 mb-2 block">
                                        Homeowner FAQ
                                    </Link>
                                </li>
                                <li>
                                <Link href="/Review-Guidline" className="text-gray-800 cursor-pointer text-xs hover:text-gray-800 mb-2 block">
                                        Review Guidelines
                                    </Link>
                                </li>
                                <li>
                                <Link href="/homeowner-trust" className="text-gray-800 cursor-pointer text-xs hover:text-gray-800 mb-2 block">
                                        Homeowner Trust
                                        </Link>
                                </li>
                            </nav>
                        </div>
                        <div className="lg:w-1/4 w-1/2 max-md:mx-auto">
                            <h2 className="title-font font-bold text-gray-900 text-base mb-3">
                                CONTRACTORS
                            </h2>
                            <nav className="list-none mb-10">
                                <li>
                                <Link href="/join-us" className="text-gray-800 cursor-pointer text-xs hover:text-gray-800 mb-2 block">
                                        Join Helperzz
                                    </Link>
                                </li>
                                <li>
                                <Link href="/join-us" className="text-gray-800 cursor-pointer text-xs hover:text-gray-800 mb-2 block">
                                        Home Professional FAQ
                                    </Link>
                                </li>
                                <li>
                                <Link href="/building-trust" className="text-gray-800 cursor-pointer text-xs hover:text-gray-800 mb-2 block">
                                        Building Trust
                                    </Link>
                                </li>
                                <li>
                                <Link href="/home-professional-terms" className="text-gray-800 cursor-pointer text-xs hover:text-gray-800 mb-2 block">
                                        Home Professional Terms
                                    </Link>
                                </li>
                            </nav>
                        </div>
                        <div className="lg:w-1/4 w-1/2 max-md:mx-auto">
                            <h2 className="title-font font-bold text-gray-900 text-base mb-3">
                                HELPERZZ
                            </h2>
                            <nav className="list-none mb-10">
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 mb-2 block">
                                        About
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 mb-2 block">
                                        Careers at Helperzz
                                    </a>
                                </li>

                                <li>
                                    <Link href='/contact-us' className="text-gray-800 text-xs hover:text-gray-800 mb-2 block">
                                        Contact Us
                                    </Link>
                                </li>
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 mb-2 block">
                                        Terms of Use
                                    </a>
                                </li>
                                <li>
                                    <a className="text-gray-800 text-xs hover:text-gray-800 mb-2 block">
                                        Privacy{" "}
                                    </a>
                                </li>
                            </nav>
                        </div>
                    </div>
                </div>
                <div className="text-center text-base text-transform: uppercase font-bold text-text">
                    Helperzz.com
                </div>
                <p className="text-center text-sm  pb-4">2024</p>
            </footer>
    </>
  );
};
