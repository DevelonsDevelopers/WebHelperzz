import React from 'react';
import CategoryListComponent from "./CategoryListComponent";
import seoService from "@/api/services/seoService";

export async function generateMetadata() {

    const res = await seoService.fetchSEObyRoute("category_list")

    return {
        title: res?.seo?.title,
        description: res?.seo?.meta_description
    }
}

const Page = ({params}) => {
    return (
        <>
            <CategoryListComponent params={params}/>
        </>
    );
};

export default Page;
