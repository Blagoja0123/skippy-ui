
import Image from "next/image";
import CategoryList from "../../components/CategoryList";
import Nav from "../../components/Nav";
import { Suspense } from "react";
import Loading from "../../loading";
import DefaultLayout from "@/app/layouts/DefaultLayout";
import '@/app/globalicons.css'

export default function Page({params, searchParams}: {params: {category: string}; searchParams?: { per_page?: string; page?: string;};}){
    return (
            <DefaultLayout>
                <Suspense fallback={<Loading/>}>
                    <CategoryList params={params} searchParams={searchParams}/>
                </Suspense>
            </DefaultLayout>
    )
}