import React from "react";

const ProfessionCard = ({ item }) => {
  return (
    <div className="profession-card">
      <ul className="list-none">
        <li className="text-[15px] mb-1 font-[500] cursor-pointer">
          {item?.name}
        </li>
      </ul>
    </div>
  );
};

export default ProfessionCard;
