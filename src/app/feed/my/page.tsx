
import Nav from "@/app/components/Nav";
import Loading from "@/app/loading";
import { Suspense } from "react";
import FeedList from "./FeedList";
import DefaultLayout from "@/app/layouts/DefaultLayout";
import { cookies } from "next/headers";

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