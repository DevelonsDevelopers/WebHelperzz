"use client";
import React, { useState } from "react";
import Image from "next/image";

const ZoomedImageModal = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center">
      <div className="max-w-full max-h-full overflow-auto">
        <Image src={imageUrl} alt="Zoomed" className="max-w-full max-h-full" />
        <button
          onClick={onClose}
          className="absolute top-0 right-0 m-4 p-5 text-white text-lg"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export const Projects = () => {
  const buttons = [
    "Bathroom",
    "kitchen",
    "kitchen planning",
    "kitchen & Bathroom",
    "living room",
    "exterior",
    "entry",
  ];

  const projectCards = [
    {
      img: require("/public/assets/images/project-01.png"),
      title: "Bathroom Renovation",
    },
    {
      img: require("/public/assets/images/project-02.png"),
      title: "Bathroom Renovation",
    },
    {
      img: require("/public/assets/images/project-03.png"),
      title: "Interior Renovation",
    },
  ];

  const [zoomedImageUrl, setZoomedImageUrl] = useState(null);

  const openZoomedImage = (imageUrl) => {
    setZoomedImageUrl(imageUrl);
  };

  const closeZoomedImage = () => {
    setZoomedImageUrl(null);
  };
  return (
    <div className="profile_container max-w-[1200px] mx-auto md:px-6 px-1">
      <h2 className="text-2xl md:text-3xl font-semibold mb-5 text-text">
        Projects
      </h2>

      <div className="flex mb-10 items-center gap-2 lg:gap-6 flex-wrap">
        {buttons.map((item, index) => (
          <button
            key={index}
            className="bg-secondary transition-all whitespace-nowrap bg-opacity-10 md:text-md text-sm min-w-[120px] hover:bg-opacity-100 hover:text-white border border-secondary text-text text-transform: capitalize  font-semibold sm:py-3 py-[7px] sm:px-4 px-[10px] rounded-xl focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2 focus:ring-offset-white"
          >
            {item}{" "}
          </button>
        ))}
      </div>
      <h2 className="text-2xl md:text-[28px] font-semibold md:mb-5 mb-2 text-text">
        10 Photos
      </h2>
      <p className="font-medium text-[#666666] md:text-base text-sm">
        Filtered results based on the selected room categories{" "}
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-0 md:gap-10 lg:gap-[72px]">
        {projectCards.slice(0, 3).map((project, index) => (
          <div
            className="mt-9"
            key={index}
            onClick={() => openZoomedImage(project.img)}
          >
            <Image src={project.img} alt={project.title} className="rounded-[22px]" />
            <h2 className="text-lg md:text-[22px] text-center md:text-left font-semibold mt-5 text-text">
              {project.title}
            </h2>
          </div>
        ))}
      </div>
      {zoomedImageUrl && (
        <ZoomedImageModal
          imageUrl={zoomedImageUrl}
          onClose={closeZoomedImage}
        />
      )}
      <div className="mt-8 lg:mt-16 flex justify-center text-center">
        <a class=" hover:bg-secondary hover:text-white transition-all cursor-pointer text-text w-[300px]  text-base lg:text-xl justify-center border border-secondary px-5 py-4 rounded-2xl font-bold bg-[#fff] text-transform: uppercase">
          See All Photos
        </a>
      </div>
    </div>
  );
};
