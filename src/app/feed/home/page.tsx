import CategoryList from "@/app/components/CategoryList";
import DefaultLayout from "@/app/layouts/DefaultLayout";
import Loading from "@/app/loading";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "SKIPPY | Home"
}

const page = ({searchParams}: { searchParams?: { per_page?: string; page?: string;};}) => {

    return (
        <DefaultLayout>
            <Suspense fallback={<Loading/>}>
                <CategoryList params={{category: ""}}  searchParams={searchParams}/>
            </Suspense>
        </DefaultLayout>
  )
}

export default page