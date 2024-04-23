import React, {useEffect, useState} from "react";
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

    // const [popular, setPopular] = useState([])
    //
    // useEffect(() => {
    //     setPopular(categories.filter(value => value.popular === 1))
    // }, [categories]);
    //
    // useEffect(() => {
    //     if (popular.length > 0 && shuffled) {
    //         let temp = [...popular]
    //         temp = ShuffleArray(temp)
    //         setPopular(temp)
    //         setShuffled(true)
    //     }
    // }, [popular])
    //
    // const ShuffleArray = arr => {
    //     const newArr = arr.slice()
    //     for (let i = newArr.length - 1; i > 0; i--) {
    //         const rand = Math.floor(Math.random() * (i + 1));
    //         [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
    //     }
    //     return newArr
    // };

    return (
        <div>
            <div>
                <h2 className="mt-6 mb-3 text-[18px] font-[600]">Popular</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {popularData.map((item, index) => (
                        <ProfessionCard key={index} items={item.professions}/>
                    ))}
                </div>
            </div>
            <div>
                <h2 className="mt-6 mb-3 text-[18px] font-[600]">Remodeling</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {RemodelingData.map((item, index) => (
                        <ProfessionCard key={index} items={item.professions}/>
                    ))}
                </div>
            </div>
            <div>
                <h2 className="mt-6 mb-3 text-[18px] font-[600]">Renovation</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {RenovationData.map((item, index) => (
                        <ProfessionCard key={index} items={item.professions}/>
                    ))}
                </div>
            </div>
            <div>
                <h2 className="mt-6 mb-3 text-[18px] font-[600]">Outdoor</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {OutdoorListData.map((item, index) => (
                        <ProfessionCard key={index} items={item.professions}/>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="mt-6 mb-3 text-[18px] font-[600]">Popular</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {servicesListData.map((item, index) => (
                        <ProfessionCard key={index} items={item.professions}/>
                    ))}
                </div>
            </div>

            <div>
                <h2 className="mt-6 mb-3 text-[18px] font-[600]">
                    Appliances & Systems
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    {applianceListData.map((item, index) => (
                        <ProfessionCard key={index} items={item.professions}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PopularList;
