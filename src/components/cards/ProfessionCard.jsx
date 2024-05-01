import React from "react";

const ProfessionCard = ({ item }) => {
  return (
    // <div className="profession-card">
    //   <ul className="list-none">
        <span className="text-[15px] font-[500] cursor-pointer">
          {item?.name}
        </span>
    //   </ul>
    // </div>
  );
};

export default ProfessionCard;
