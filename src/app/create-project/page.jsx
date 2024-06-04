import React from 'react';
import seoService from "@/api/services/seoService";
import CreateProjectComponent from './CreateProjectComponent'
 
export async function generateMetadata() {

    const res = await seoService.fetchSEObyRoute("contact-us")

    return {
        title: res?.seo?.title,
        description: res?.seo?.meta_description
    }
}

const Page = () => {
    return (
        <>
            <CreateProjectComponent  />
        </>
    );
};

export default Page;
