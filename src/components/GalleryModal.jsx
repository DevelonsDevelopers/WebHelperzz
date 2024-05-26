'use client'
import { Button, Modal, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { IMAGE_PATH } from "@/api/BaseUrl";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { MdCancel } from "react-icons/md";

const GalleryModal = ({ open, handleClose, images, selectedImage }) => {
    
    const initialSelectedImage = Number(selectedImage);

    const [selectedIndex, setSelectedIndex] = useState(initialSelectedImage);
    const [zoomedImageUrl, setZoomedImageUrl] = useState(images?.[initialSelectedImage]?.image);

    useEffect(() => {
        setZoomedImageUrl(images?.[selectedIndex]?.image);
    }, [selectedIndex]);

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

    const handleModalClose = () => {
        setSelectedIndex(initialSelectedImage);
        setZoomedImageUrl(images?.[initialSelectedImage]?.image);
        handleClose();
    };

    return (
        <Modal
            open={open}
            onClose={handleModalClose}
            className="!backdrop-blur-sm bg-white/50"
        >
            <div
                style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    boxShadow: 24,
                    padding: '2rem',
                    width: '45vw',
                }}
                className="bg-white/40 rounded-xl px-10 py-2"
            >
                <div className="flex justify-end items-center">
                    <MdCancel
                        className="text-2xl text-gray-600 cursor-pointer"
                        onClick={handleModalClose}
                    />
                </div>
                <div className="flex flex-col justify-center mt-4">
                    <div className="flex justify-center">
                        <img
                            src={`${IMAGE_PATH}${zoomedImageUrl}`}
                            alt="Zoomed"
                            className="w-full h-[350px] xl:h-[75vh] sm:h-[400px] object-cover rounded-md"
                        />
                    </div>
                    <div className="absolute top-1/2 transform -translate-y-1/2 left-4 sm:left-0 right-4 sm:right-0 flex justify-between px-4">
                        <button
                            className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full"
                            onClick={handlePrevClick}
                        >
                            <FaChevronLeft />
                        </button>
                        <button
                            className="flex items-center justify-center w-10 h-10 bg-gray-200 rounded-full"
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
                            onClick={() => {
                                setZoomedImageUrl(item.image);
                                setSelectedIndex(index);
                            }}
                            className={`cursor-pointer ${
                                selectedIndex === index ? "border-solid border-2 border-sky-500" : ""
                            }`}
                        >
                            <img
                                src={`${IMAGE_PATH}${item.image}`}
                                alt={item.image}
                                className="min-w-[100px] h-[60px] object-cover"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </Modal>
    );
};

export default GalleryModal;
