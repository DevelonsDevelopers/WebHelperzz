"use client"

import React, { useEffect, useState } from "react";
import { Rating } from "@material-tailwind/react";
import contractorService from "../../../../api/services/contractorService";
import uploadService from "../../../../api/services/uploadService";

const Page = ({ params }) => {
  const [clicked, setClicked] = useState(false);
  const [images, setImages] = useState([]);
  const [invalidFile, setInvalidFile] = useState(false);
  const [limitLength, setLimitLength] = useState(false);
  const [allImages, setAllImages] = useState([]);

  const [names, setNames] = useState([]);
  const [errors, setErrors] = useState([]);
  const [reviewData, setReviewData] = useState({
    user: 0,
    contractor: 0,
    category: 0,
    rating: 3,
    title: "",
    price: "",
    review: "",
  });

  // const navigate = useNavigate()

  // const location = useLocation();
  // const params = new URLSearchParams(location.search);

  useEffect(() => {
    setReviewData((data) => ({ ...data, contractor: params.contractor }));
  }, []);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("HELPERZZ-USER"));
    if (loggedInUser) {
      setReviewData((data) => ({ ...data, user: loggedInUser.id }));
    }
  }, []);

  useEffect(() => {
    console.log(reviewData);
  }, [reviewData]);

  useEffect(() => {
      setReviewData(data => ({...data, category: params.category}))
  }, []);

  const handleFileChange = (event) => {
    const files = event.target.files;
    let isValidFile = true;
    const newImageUrls = [];
    let imgs = [...allImages];
    imgs.push(...files);
    setAllImages(imgs);

    if (images.length + files.length > 6) {
      setLimitLength(true);
      return;
    }

    Array.from(files).forEach((file) => {
      if (
        file.type.match("image/jpeg") ||
        file.type.match("image/png") ||
        file.type.match("image/gif") ||
        file.type.match("image/svg+xml")
      ) {
        const fileURL = URL.createObjectURL(file);
        newImageUrls.push(fileURL);
      } else {
        isValidFile = false;
      }
    });

    if (isValidFile) {
      setInvalidFile(false);
      setImages((prevImages) => [...prevImages, ...newImageUrls]);
    } else {
      setInvalidFile(true);
    }
  };

  const handleSubmit = () => {
    contractorService
      .createReview(reviewData)
      .then((response) => {
        console.log(response);
        for (let i = 0; i < allImages.length; i++) {
          uploadService.single(allImages[i]).then((file) => {
            const data = { review: response?.review?.id, image: file.fileName };
            contractorService.addImage(data).then((response) => {
              console.log(response);
            });
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <section
        className="flex items-center justify-center min-h-screen bg-gray-200"
        style={{ alignItems: "center" }}
      >
        <div className="block rounded-lg bg-gray-100 shadow-lg ">
          <div className="flex flex-wrap">
            <div className="px-8 md:px-0 ">
              <div className="md:mx-6 md:p-12">
                <form className="justify-center items-center mx-auto">
                  <h1 className="mb-8 text-center mt-5 font-semibold text-2xl">
                    Write Your Review
                  </h1>
                  <div className="text-center">
                    {" "}
                    <Rating
                      style={{ color: "#27a9e1" }}
                      onChange={(e) =>
                        setReviewData((data) => ({ ...data, rating: e }))
                      }
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 grid-cols-1">
                    <div className="mb-4">
                      <label className="text-left text-gray-700 font-bold mb-2">
                        Title
                      </label>
                      <input
                        type="text"
                        name="title"
                        onChange={(e) =>
                          setReviewData((data) => ({
                            ...data,
                            title: e.target.value,
                          }))
                        }
                        className={`w-full border-[1px] bg-transparent px-4 py-2  outline-none border-gray-300`}
                      />
                    </div>

                    <div className="mb-4">
                      <label className="text-left text-gray-700 font-bold mb-2">
                        Price
                      </label>
                      <input
                        type="number"
                        onChange={(e) => (data) => ({
                          ...data,
                          price: e.target.value,
                        })}
                        className={`w-full border-[1px] bg-transparent px-4 py-2  outline-none border-gray-300`}
                      />
                    </div>
                    <div className="mb-4">
                      <label className="text-left text-gray-700 font-bold mb-2">
                        Message
                      </label>

                      <textarea
                        onChange={(e) =>
                          setReviewData((data) => ({
                            ...data,
                            review: e.target.value,
                          }))
                        }
                        rows={4}
                        id="message"
                        name="message"
                        className={`w-full border-[1px] bg-transparent px-4 py-2  outline-none border-gray-300`}
                      ></textarea>
                    </div>

                    <div className="min-w-[250px] w-[100%] mb-6 ">
                      <label
                        htmlFor="dropzone-file"
                        className={`flex flex-col items-center justify-center w-full h-30 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 mt-3 border-gray-300
                      `}
                      >
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg
                            className="w-8 h-8 mb-4 text-gray-500 "
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 16"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                            />
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 ">
                            <span className="font-semibold">
                              Click to upload
                            </span>{" "}
                            or drag and drop
                          </p>
                          <p className="text-xs text-gray-500 ">
                            SVG, PNG, JPG or GIF
                          </p>
                        </div>

                        <input
                          type="file"
                          id="dropzone-file"
                          name="image"
                          className="hidden"
                          multiple
                          onChange={handleFileChange}
                        />
                      </label>
                      {invalidFile && (
                        <p className="text-red-500 text-sm">
                          Invalid file format. Please upload only JPEG, PNG,
                          GIF, or SVG files.
                        </p>
                      )}
                      {limitLength && (
                        <p className="text-red-500 text-sm">
                          Limit reached (maximum limit: 6)
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-wrap">
                    {images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`Uploaded ${index + 1}`}
                        className="w-20 object-cover mr-2"
                      />
                    ))}
                  </div>

                  <div className="mb-4 pb-1 pt-1 text-center">
                    <button
                      onClick={() => handleSubmit()}
                      className="mb-3 py-3 inline-block w-full rounded px-6 font-bold text-base uppercase leading-normal text-white shadow-dark-3 transition duration-150 ease-in-out hover:shadow-dark-2 focus:shadow-dark-2 focus:outline-none focus:ring-0 active:shadow-dark-2 dark:shadow-black/30 dark:hover:shadow-dark-strong dark:focus:shadow-dark-strong dark:active:shadow-dark-strong"
                      type="button"
                      style={{
                        background: "#27a9e1",
                      }}
                    >
                      Submit
                    </button>
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
