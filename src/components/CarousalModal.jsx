'use client'
import { Button, Modal, Typography } from '@mui/material';
import React, { useState , useEffect } from 'react';
import { IMAGE_PATH } from "@/api/BaseUrl";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdCancel } from "react-icons/md";



 
const CarousalModal = ({ open, handleClose ,images,selectedImage}) => {

    console.log('images' ,images)

    const [selectedIndex, setSelectedIndex] = useState(0);
    const [zoomedImageUrl, setZoomedImageUrl] = useState(selectedImage); 

    useEffect(() => {
        setZoomedImageUrl(images?.[0]?.image)
    },[])

    const handlePrevClick = () => {
      setSelectedIndex((prevIndex) =>
        prevIndex === 0 ? images?.length - 1 : prevIndex - 1
      );
    };


    const handleNextClick = () => {
      setSelectedIndex((prevIndex) =>
        prevIndex === images?.length - 1 ? 0 : prevIndex + 1
      );
    };

    useEffect(() => {
      setZoomedImageUrl(images?.[selectedIndex]?.image);
    }, [selectedIndex, images]);



    return (
        
             <Modal
                open={open}
                onClose={handleClose}
                className="!backdrop-blur-sm bg-white/50 "
            >
                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: 'background.paper', boxShadow: 24, p: 4, width: '45vw', }} className="bg-white/40 rounded-xl px-10  py-2" >
                <div className="flex jusitfy-center items-center " >

<h1 className="ml-auto cursor-pointer" onClick={handleClose}>Close </h1>
                <MdCancel className="text-[30px] text-gray-600  cursor-pointer"  onClick={handleClose} />
                    </div>

                <div className="flex flex-col justify-center  sm:mt-[1rem] xl:flex xl:flex-col xl:justify-center">
          <div>
            <div className="flex justify-center">
            <img
              src={`${IMAGE_PATH}${zoomedImageUrl}`}
              alt="Zoomed"
              className="w-full h-[350px] xl:h-[75vh] sm:h-[400px] object-cover rounded-md"
            />
          </div>
          </div>
         
 


              <div className="absolute top-1/2 transform -translate-y-1/2 left-[14px]  sm:left-0 right-[27px] sm:right-0 flex justify-between px-4">
                <button
                  className=" flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full"
                  onClick={handlePrevClick}
                >
                  <FaChevronLeft  />
                </button>
                <button
                  className=" flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full"
                  onClick={handleNextClick}
                >
                  <FaChevronRight />
                </button>
              </div>
            
         
        </div>


    <div className="flex gap-2 mt-2 overflow-x-auto max-w-[70vh] mx-auto">
  {images?.map((item, index) => (
    <div
      key={index}
      onClick={() => {setZoomedImageUrl(item.image) , setSelectedIndex(index)}}
      className={`cursor-pointer  ${
        zoomedImageUrl === item.image ? "border-solid border-2 border-sky-500" : ""
      }`}
    >
      <img
        src={`${IMAGE_PATH}${item.image}`}
        alt={item.image}
        className="min-w-[100px] h-[60px]"
      />
    </div>
  ))}
</div>
                     
                </div>
            </Modal>
    );
};

export default CarousalModal;