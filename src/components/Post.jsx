import React from "react";
// import {
//   Logo,
//   PlayIcon,
//   ProtectedIcon,
//   SearchBoldIcon,
//   SearchIcon,
//   StarIcon,
// } from "../../SVG";
import ServicePareent from "./Home/Services/ServicePareent";
import CategoryParent from "./Home/Category/CategoryParent";
import Costguides from "./Home/CostGuide/CostguidesParent";
import ReviewParent from "./Home/Reviews/ReviewParenet";
import { TopHelperzzCard } from "./Home/TopHelperzz/TopHelperzzCard";
import { GotDream } from "./Home/GotDreamHeader/GotDream";
import { VideoCard } from "./Home/HelperzzSuccessBlog/VideoCard";
import { PostGrid } from "./Home/GuidesBlog/PostGrid";
import { HowHelpersWork } from "./Home/WorkHeader/HowHelpersWork";

export const Posts = ({ categories, blogs, costGuides, contractors }) => {
  return (
    <>
      <ServicePareent categories={categories} />
      <CategoryParent categories={categories} />
      <Costguides costGuides={costGuides} />
      <div className="flex sm:flex-col flex-col-reverse">
        <PostGrid blogs={blogs} />
        <HowHelpersWork />
      </div>
      <TopHelperzzCard contractors={contractors} />
      <GotDream />
      <VideoCard />
      <ReviewParent />
    </>
  );
};
