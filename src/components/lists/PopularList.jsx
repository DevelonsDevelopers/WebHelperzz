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
  useEffect(() => {
    console.log(categories);
  }, [categories]);

  return (
    <div>
      <div>
        {categories?.map((value) => (
          <>
            {value.subcategories?.length > 0 && (
              <>
                <h2 className="mt-6 mb-2 text-[22px] font-[400]">
                  {value.name}
                </h2>
                <div className="grid grid-cols-4 max-md:grid-cols-2 mt-2">
                  {value?.subcategories.map((item, index) => (
                    <ProfessionCard key={index} item={item} />
                  ))}
                </div>
              </>
            )}
          </>
        ))}
      </div>
    </div>
  );
};

export default PopularList;
