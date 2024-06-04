import React from 'react';
import seoService from "@/api/services/seoService";
import SignupComponent from "@/app/signup/SignupComponent";

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
        <SignupComponent />
      </>
  );
};

export default Page;
