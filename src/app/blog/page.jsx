import React from 'react';
import BlogComponent from "@/app/blog/blogComponent";
import seoService from "@/api/services/seoService";

export async function generateMetadata() {

    const res = await seoService.fetchSEObyRoute("blog")

    return {
        title: res?.seo?.title,
        description: res?.seo?.meta_description
    }
}

const Page = () => {
    return (
        <>
            <BlogComponent/>
        </>
    );
};

export default Page;
