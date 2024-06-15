import React from 'react';
 import seoService from "@/api/services/seoService";
 import ProfileComponent from './ProfileComponent'

export async function generateMetadata({params}) {

    const res = await seoService.contractorSeo(params?.id)

    return {
        title: res?.seo?.title,
        description: res?.seo?.description
    }
}

const Page = ({params}) => {
    return (
        <>
            <ProfileComponent params={params}/>
        </>
    );
};

export default Page;
