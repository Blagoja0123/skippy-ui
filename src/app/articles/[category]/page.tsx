
import Image from "next/image";
import CategoryList from "../../components/CategoryList";
import Nav from "../../components/Nav";
import { Suspense } from "react";
import Loading from "../../loading";
import DefaultLayout from "@/app/layouts/DefaultLayout";
import '@/app/globalicons.css'
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
    {params, searchParams}: {params: {category: string}; searchParams?: { per_page?: string; page?: string;};},
    parent: ResolvingMetadata
): Promise<Metadata> {
    const category = params.category
    return {
        title: `SKIPPY | ${category}`
    }
}

export default function Page({params, searchParams}: {params: {category: string}; searchParams?: { per_page?: string; page?: string;};}){
    return (
            <DefaultLayout>
                <Suspense fallback={<Loading/>}>
                    <CategoryList params={params} searchParams={searchParams}/>
                </Suspense>
            </DefaultLayout>
    )
}