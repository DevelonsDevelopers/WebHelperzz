import React from 'react';
import Component from "./Component";
import seoService from "@/api/services/seoService";

export async function generateMetadata({params}) {

    const res = await seoService.CategorySeo(params?.tag)
    console.log('res' , res)

    return {
        title: res?.seo?.meta_title,
        description: res?.seo?.meta_description
    }
}

const Page = ({params}) => {
    return (
        <>
            <Component params={params}/>
        </>
    );
};

export default Page;
