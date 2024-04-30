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
import { useRouter } from "next/navigation";

const ProjectList = ({categories , tag}) => {

    const [popular, setPopular] = useState([])
    const [shuffled, setShuffled] = useState(false)
    const [random, setRandom] = useState([])
    const navigate = useRouter();

    useEffect(() => {
        setPopular(categories.filter(value => value.popular === 1))
        if (categories.length > 0){
            let array = [...categories]
            setRandom(ShuffleArray(array))
        }
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
                    {random.slice(0, 5).map((item, index) => (
                        <ServiceCard key={index} tag={item?.tag}  imageSrc={`${IMAGE_PATH}${item.image}`} text={item.name}/>
                    ))}
                </div>
            </div>
            <div className="mt-[4rem]">
                <TitleComponent title="Popular Services"/>
                <div className="grid grid-cols-1 gap-[2rem] md:gap-[1.5rem] sm:grid-cols-2 md:grid-cols-5">
                    {popular.slice(0, 5).map((item, index) => (
                        <ServiceCard key={index} tag={item?.tag}  imageSrc={`${IMAGE_PATH}${item.image}`} text={item.name}/>
                    ))}
                </div>
            </div>
            <div className="mt-[4rem]">
                <TitleComponent title="More Services"/>
                <div className="grid grid-cols-1 gap-[2rem] md:gap-[1.5rem] sm:grid-cols-2 md:grid-cols-5">
                    {categories.map((item, index) => (
                        <ServiceCard key={index} tag={item?.tag}  imageSrc={`${IMAGE_PATH}${item.image}`} text={item.name}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectList;
