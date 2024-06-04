import React from 'react';
import seoService from "@/api/services/seoService";
import Component from "@/app/why-work-with-us/Component";

export async function generateMetadata() {

    const res = await seoService.fetchSEObyRoute("why-work-with-us")

    return {
        title: res?.seo?.title,
        description: res?.seo?.meta_description
    }
}

const Page = () => {
    return (
        <>
            <Component/>
        </>
    );
};

export default Page;
