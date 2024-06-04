import React from 'react';
 import seoService from "@/api/services/seoService";
import JoinUsComponent from './JoinUsComponent';

export async function generateMetadata() {

    const res = await seoService.fetchSEObyRoute("join-us")

    return {
        title: res?.seo?.title,
        description: res?.seo?.meta_description
    }
}

const Page = () => {
    return (
        <>
            <JoinUsComponent />
        </>
    );
};

export default Page;
