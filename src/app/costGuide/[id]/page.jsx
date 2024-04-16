"use client";
import { Footer } from "@/components/Footer";
import Header from "@/components/Header";
import React, { useState, useEffect } from "react";
import costGuideService from "../../../api/services/costGuideService";

function CostGuide({ params }) {
  const [costGuides, setCostGuides] = useState([]);
  const [ID, setID] = useState();

  const getCostGuides = async () => {
    try {
      const response = await costGuideService.fetchAll();
      setCostGuides(response.costGuides);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    setID(params.id);
    console.log(params.id);
    console.log(ID);
  }, [ID]);

  useEffect(() => {
    getCostGuides();
  }, []);
  return (
    <>
      <Header />

      {costGuides.map((value) =>
        value.id === parseInt(ID) ? (
          <div
            className="my-28 mx-auto justify-center items-center flex flex-col"
            key={value.id}
          >
            <h1 className="text-3xl font-bold ">{value.title}</h1>
            <h2 className="text-xl font-semibold ">{value.subtitle}</h2>
            <h4
              className="text-xl font-semibold"
              dangerouslySetInnerHTML={{
                __html: value?.content,
              }}
            />
          </div>
        ) : null
      )}

      <Footer />
    </>
  );
}

export default CostGuide;
