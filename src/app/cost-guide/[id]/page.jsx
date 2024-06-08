import React from 'react';
import Component from "./Component";
import seoService from "@/api/services/seoService";

export async function generateMetadata({params}) {

    const res = await seoService.CostguideSeo(params?.id)
    console.log('res' , res)

    return {
        title: res?.seo?.seo_title,
        description: res?.seo?.seo_description
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
