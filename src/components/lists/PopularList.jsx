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
        console.log(categories)
    }, [categories]);

    return (
        <div>
            <div>
                {categories?.map(value => (
                    <>
                        <h2 className="mt-6 mb-3 text-[18px] font-[600]">{value.name}</h2>
                        <div className="grid grid-cols-4 gap-4">
                            {value?.subcategories.map((item, index) => (
                                <ProfessionCard key={index} item={item}/>
                            ))}
                        </div>
                    </>
                ))}
            </div>
        </div>
    );
};

export default PopularList;
