import React from 'react';
 import seoService from "@/api/services/seoService";
 import SuccessComponent from './SuccessComponent'
 
export async function generateMetadata() {

    const res = await seoService.fetchSEObyRoute("join-us/success")

    return {
        title: res?.seo?.title,
        description: res?.seo?.meta_description
    }
}

const Page = () => {
    return (
        <>
            <SuccessComponent />
        </>
    );
};

export default Page;
