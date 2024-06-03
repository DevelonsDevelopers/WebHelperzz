import React from 'react';
import BlogDetailComponent from "./BlogDetailComponent";
import seoService from "@/api/services/seoService";

export async function generateMetadata() {

    const res = await seoService.fetchSEObyRoute("blog")

    return {
        title: res?.seo?.title,
        description: res?.seo?.meta_description
    }
}

const Page = ({params}) => {
    return (
        <>
            <BlogDetailComponent params={params}/>
        </>
    );
};

export default Page;
