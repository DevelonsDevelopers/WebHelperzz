import React, { useEffect, useState } from "react";
import {
  OutdoorListData,
  RemodelingData,
  RenovationData,
  applianceListData,
  popularData,
  servicesListData,
} from "../../../public/data/professionData";

import {useRouter} from 'next/navigation'

const PopularList = ({ categories }) => {

const navigation = useRouter()
const handlSubmit = (name) => {
  navigation.push(`/subcategory/${name?.replaceAll(" ","-").replaceAll("/","-").toLowerCase()}`)
}


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
                     <span  onClick={() => handlSubmit(item?.name)} className="text-[15px] font-[500] cursor-pointer mt-[4px]">
                     {item?.name}
                   </span>
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
