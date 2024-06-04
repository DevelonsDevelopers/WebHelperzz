import React from 'react';
import seoService from "@/api/services/seoService";
import ContactUsComponent from './ContactUsComponent';

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
            <ContactUsComponent  />
        </>
    );
};

export default Page;
