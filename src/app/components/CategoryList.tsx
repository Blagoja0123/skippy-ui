import NewsCard from "./NewsCard";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import PaginationControl from "@/app/components/PaginationControl";
import Favorite from "./Favorite";
import { getSession } from "@/lib/auth";
import { cookies } from "next/headers";
import { Revalidate } from "../actions";
const hiddenVals = new Map([
    ['politics', 3],
    ['business', 4],
    ['sports', 5],
    ['film', 6],
    ['technology', 7],
    ['science', 8]
])
async function getArticles(category: string){


    const res = await fetch(`http://localhost:8000/articles${ category !== "" ? `?category_id=${hiddenVals.get(category)}` : ''}`);
    return res.json();
}

export default async function CategoryList({params, searchParams}: {
    params: { category: string };
    searchParams?: { per_page?: string; page?: string;};
  })
    {
    const page = searchParams?.page ?? '1';
    const per_page = searchParams?.per_page ?? '15';
    const articles = await getArticles(params.category);
    const session = await getSession();
    const start = (Number(page) - 1) * Number(per_page)
    const end = start + Number(per_page);

    const entries = articles.data.slice(start, end);
    // shuffleArray(entries);
    const formatDay = (day: number) => {
        if (day === 1) return "1st";
        if (day === 2) return "2nd";
        if (day === 3) return "3rd";
        return `${day}th`;
    }

    const formatDate = (published: Date) => {
        const pubDay = published.getDay();
        const pubMon = published.getMonth();
        const pubYear = published.getFullYear();

        return `${published.toLocaleString('default', {month: 'short'})} ${formatDay(pubDay)}, ${pubYear}`
    }
    
    return (
        <>
            <div className="w-full h-full flex flex-col items-center justify-center text-white gap-6">
                <div className="w-[40%] text-start mt-24 sticky top-20 bg-background-dark z-20 flex flex-col justify-center">
                    <div className="flex justify-between items-center mb-4">
                        <h1 className="text-3xl font-bold">Latest {params.category ? params.category : 'news'}</h1>
                        {
                            params.category && 
                            <Favorite user={session} category_id={hiddenVals.get(params.category)!} session={cookies().get("session")?.value} revalidate={Revalidate}/>
                        }
                    </div>
                    <hr className="w-full h-[3px] bg-slate-200"/>    
                </div>
                <div className="w-[60%] flex flex-col justify-center items-center gap-3">
                    {
                        entries.map((article: any) => (   
                                <Sheet key={article.ID}>
                                    <SheetTrigger className="text-wrap text-start">
                                        <NewsCard key={article.ID} source={article.Source} title={article.Title} imageURL={article.ImageURL} id={article.ID} createdAt={article.CreatedAt} />
                                    </SheetTrigger>
                                    <SheetContent className="w-[1200px] bg-foreground-dark flex flex-col items-center justify-center p-8 text-white gap-8">
                                        <SheetHeader className="flex justify-center items-center gap-4">
                                            <SheetTitle className="font-bold text-3xl w-1/2 text-wrap text-start block">{article.Title}</SheetTitle>
                                            <p className="text-wrap text-start w-1/2">{article.Source}, {formatDate(new Date(article.CreatedAt))}</p>
                                            <div className="w-1/2 h-1/2">
                                                <img className="w-full h-full" src={article.ImageURL} alt="no img" />
                                            </div>
                                            <SheetDescription className="text-inherit w-1/2 h-[150px] overflow-hidden font-serif font-semibold text-xl" dangerouslySetInnerHTML={{__html: article.Content}}>
                                                {/* {article.Content} */}
                                            </SheetDescription>
                                            <a className=" bg-tertiary p-4 w-1/2 h-12 flex justify-center items-center" target="_blank" href={article.Origin}>
                                                <button className="font-bold">Visit Website &#128471;</button>
                                            </a>
                                        </SheetHeader>
                                    </SheetContent>
                                </Sheet>
                        ))
                    }
                </div>
                <PaginationControl
                    hasPrev={start > 0}
                    hasNext={end < articles.data.length}
                />
                    <div className=" w-[40%] flex flex-col justify-center items-center gap-5 mb-8">
                        <h3 className="text-3xl font-semibold">Get more news based on your interests</h3>
                        <a href="/feed/my">
                            <button className="bg-tertiary hover:bg-highlight p-2 rounded-md text-xl font-semibold">For you</button>
                        </a>
                    </div>
            </div>
        </>
    )
}