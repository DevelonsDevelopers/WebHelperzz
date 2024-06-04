import React from 'react';
import seoService from "@/api/services/seoService";
import LoginComponent from "@/app/login/LoginComponent";

export async function generateMetadata() {

    const res = await seoService.fetchSEObyRoute("login")

    return {
        title: res?.seo?.title,
        description: res?.seo?.meta_description
    }
}

const Page = () => {
    return (
        <>
            <LoginComponent />
        </>
    );
};

export default Page;
