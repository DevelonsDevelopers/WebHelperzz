import React, { useEffect, useState } from "react";
import ProfessionCard from "../cards/ProfessionCard";
import {
  OutdoorListData,
  RemodelingData,
  RenovationData,
  applianceListData,
  popularData,
  servicesListData,
} from "../../../public/data/professionData";

const PopularList = ({ categories }) => {
  console.log(categories);

  return (
    <div>
      <div>
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
            {categories.map((category, index) => (
              <div key={index}>
                <h2 className="mt-6 mb-3 text-[18px] font-[600]">
                  {category.name}
                </h2>
                <ProfessionCard items={category?.subcategories} />
              </div>
            ))}
          </div>
        </>
      </div>
    </div>
  );
};

export default PopularList;
