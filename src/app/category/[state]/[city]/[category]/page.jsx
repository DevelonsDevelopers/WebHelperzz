import React from 'react';
import CategoryComponent from "@/app/category/CategoryComponent";
import seoService from "@/api/services/seoService";

export async function generateMetadata() {

    const res = await seoService.fetchSEObyRoute("category")

    return {
        title: res?.seo?.title,
        description: res?.seo?.meta_description
    }
}

const Page = ({ params }) => {
    // console.log('params' , params)
    return (
        <>
            <CategoryComponent params={params} />
        </>
    );
};

export default Page;
