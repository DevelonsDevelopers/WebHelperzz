import React from "react";
import TitleComponent from "../title/Title";
import ServiceCard from "../cards/ServiceCard";
import {
  HomeDesigningData,
  HomeServicesData,
  OutDoorData,
  PopularServicesData,
  ProjectsListData,
} from "./../../../public/data/data";

const ProjectList = () => {
  return (
    <div>
      <div>
        <TitleComponent title="Get Recommended Pros for Your Project" />
        <div className="grid grid-cols-1 gap-[1rem] md:gap-[1.5rem] sm:grid-cols-2 md:grid-cols-5">
          {ProjectsListData.map((item, index) => (
            <ServiceCard key={index} imageSrc={item.image} text={item.text} />
          ))}
        </div>
      </div>
      <div className="mt-[4rem]">
        <TitleComponent title="Popular Services" />
        <div className="grid grid-cols-1 gap-[2rem] md:gap-[1.5rem] sm:grid-cols-2 md:grid-cols-5">
          {PopularServicesData.map((item, index) => (
            <ServiceCard key={index} imageSrc={item.image} text={item.text} />
          ))}
        </div>
      </div>
      <div className="mt-[4rem]">
        <TitleComponent title="Home Design & Remodeling" />
        <div className="grid grid-cols-1 gap-[2rem] md:gap-[1.5rem] sm:grid-cols-2 md:grid-cols-5">
          {HomeDesigningData.map((item, index) => (
            <ServiceCard key={index} imageSrc={item.image} text={item.text} />
          ))}
        </div>
      </div>
      <div className="mt-[4rem]">
        <TitleComponent title="Outdoor & Garden" />
        <div className="grid grid-cols-1 gap-[2rem] md:gap-[1.5rem] sm:grid-cols-2 md:grid-cols-5">
          {OutDoorData.map((item, index) => (
            <ServiceCard key={index} imageSrc={item.image} text={item.text} />
          ))}
        </div>
      </div>
      <div className="mt-[4rem]">
        <TitleComponent title="Home Services" />
        <div className="grid grid-cols-1 gap-[2rem] md:gap-[1.5rem] sm:grid-cols-2 md:grid-cols-5">
          {HomeServicesData.map((item, index) => (
            <ServiceCard key={index} imageSrc={item.image} text={item.text} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
