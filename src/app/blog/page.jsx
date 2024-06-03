import React from 'react';
import BlogComponent from "@/app/blog/blogComponent";
import Head from "next/head";
import {NextSeo} from "next-seo";

export async function getServerSideProps() {
    const res = await fetch(`https://api.helperzz.com/api/seo/get/blog`)
    const data = await res.json()
    return {props: {data}}
}

export const metadata = {
    title: "Blog",
    description: 'Blog Page',
}

const Page = ({ childern }) => {
    return (
        <>
            <BlogComponent>
                {childern}
            </BlogComponent>
        </>
    );
};

export default Page;
