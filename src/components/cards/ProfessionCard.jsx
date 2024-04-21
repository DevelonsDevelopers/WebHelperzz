import React from "react";

const ProfessionCard = ({ items }) => {
  return (
    <div className="profession-card">
      <ul className="list-none">
        {items.map((item, index) => (
          <li key={index} className="text-base mb-1 font-[500] cursor-pointer">
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProfessionCard;
