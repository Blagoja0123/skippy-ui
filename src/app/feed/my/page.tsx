
import Nav from "@/app/components/Nav";
import Loading from "@/app/loading";
import { Suspense } from "react";
import FeedList from "./FeedList";
import DefaultLayout from "@/app/layouts/DefaultLayout";
import { cookies } from "next/headers";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "SKIPPY | Your Feed"
}

const page = ({searchParams}: { searchParams?: { per_page?: string; page?: string;};}) => {
    

    return (
        <DefaultLayout>
            <Suspense fallback={<Loading/>}>
                <FeedList searchParams={searchParams}/>
            </Suspense>
        </DefaultLayout>
    )
}

export default page;