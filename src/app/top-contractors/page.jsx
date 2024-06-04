import React from 'react';
import seoService from "@/api/services/seoService";
import Component from "@/app/top-contractors/Component";

export async function generateMetadata() {

    const res = await seoService.fetchSEObyRoute("top-contractors")

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
