import React, {useEffect, useState} from "react";
import TitleComponent from "../title/Title";
import ServiceCard from "../cards/ServiceCard";
import {
    HomeDesigningData,
    HomeServicesData,
    OutDoorData,
    PopularServicesData,
    ProjectsListData,
} from "./../../../public/data/data";
import {IMAGE_PATH} from "@/api/BaseUrl";

const ProjectList = ({categories}) => {

    const [popular, setPopular] = useState([])
    const [shuffled, setShuffled] = useState(false)

    useEffect(() => {
        setPopular(categories.filter(value => value.popular === 1))
    }, [categories]);

    useEffect(() => {
        if (popular.length > 0 && shuffled){
            let temp = [...popular]
            temp = ShuffleArray(temp)
            setPopular(temp)
            setShuffled(true)
        }
    }, [popular])

    const ShuffleArray = arr => {
        const newArr = arr.slice()
        for (let i = newArr.length - 1; i > 0; i--) {
            const rand = Math.floor(Math.random() * (i + 1));
            [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
        }
        return newArr
    };

    return (
        <div>
            <div>
                <TitleComponent title="Get Recommended Pros for Your Project"/>
                <div className="grid grid-cols-1 gap-[1rem] md:gap-[1.5rem] sm:grid-cols-2 md:grid-cols-5">
                    {popular.slice(0, 5).map((item, index) => (
                        <ServiceCard key={index} imageSrc={`${IMAGE_PATH}${item.image}`} text={item.name}/>
                    ))}
                </div>
            </div>
            <div className="mt-[4rem]">
                <TitleComponent title="Popular Services"/>
                <div className="grid grid-cols-1 gap-[2rem] md:gap-[1.5rem] sm:grid-cols-2 md:grid-cols-5">
                    {popular.slice(0, 5).map((item, index) => (
                        <ServiceCard key={index} imageSrc={`${IMAGE_PATH}${item.image}`} text={item.name}/>
                    ))}
                </div>
            </div>
            <div className="mt-[4rem]">
                <TitleComponent title="Home Design & Remodeling"/>
                <div className="grid grid-cols-1 gap-[2rem] md:gap-[1.5rem] sm:grid-cols-2 md:grid-cols-5">
                    {HomeDesigningData.map((item, index) => (
                        <ServiceCard key={index} imageSrc={item.image} text={item.text}/>
                    ))}
                </div>
            </div>
            <div className="mt-[4rem]">
                <TitleComponent title="Outdoor & Garden"/>
                <div className="grid grid-cols-1 gap-[2rem] md:gap-[1.5rem] sm:grid-cols-2 md:grid-cols-5">
                    {OutDoorData.map((item, index) => (
                        <ServiceCard key={index} imageSrc={item.image} text={item.text}/>
                    ))}
                </div>
            </div>
            <div className="mt-[4rem]">
                <TitleComponent title="Home Services"/>
                <div className="grid grid-cols-1 gap-[2rem] md:gap-[1.5rem] sm:grid-cols-2 md:grid-cols-5">
                    {HomeServicesData.map((item, index) => (
                        <ServiceCard key={index} imageSrc={item.image} text={item.text}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectList;
