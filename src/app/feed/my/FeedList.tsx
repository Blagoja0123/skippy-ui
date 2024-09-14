import NewsCard from "@/app/components/NewsCard";
import PaginationControl from "@/app/components/PaginationControl";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { getSession } from "@/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


async function getFeed(){

    const sessionToken = cookies().get("session")?.value;

  if (!sessionToken) {
    redirect('/login');
  }
    // Pass the Authorization header with the bearer token
    const res = await fetch('http://localhost:8000/users/feed', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${sessionToken}`,
      },
    }).then(res => res.json()).catch(err => console.error(err));
    return res;
}

export default async function FeedList({searchParams}: {
    searchParams?: { per_page?: string; page?: string;};
  })
    {
    const page = searchParams?.page ?? '1';
    const per_page = searchParams?.per_page ?? '15';

    const articles = await getFeed();
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
                <div className="w-[60%] flex flex-col justify-center items-center">
                    {
                        entries.map((article: any) => (   
                                <Sheet key={article.ID}>
                                    <SheetTrigger className="text-wrap text-start">
                                        <NewsCard key={article.ID} source={article.Source} title={article.Title} imageURL={article.ImageURL} id={article.ID} createdAt={article.CreatedAt} />
                                    </SheetTrigger>
                                    <SheetContent className="w-[1200px] bg-foreground-dark flex flex-col items-center justify-center p-8 text-white gap-8">
                                        <SheetHeader className="flex justify-center items-center">
                                            <SheetTitle className="font-bold text-3xl w-1/2 text-wrap text-start block">{article.Title}</SheetTitle>
                                            <p className="text-wrap text-start w-1/2">{article.Source}, {formatDate(new Date(article.CreatedAt))}</p>
                                            <div className="w-1/2 h-[25rem]">
                                                <img className="w-full h-full" src={article.ImageURL} alt="no img" />
                                            </div>
                                            <SheetDescription className="text-inherit w-1/2 h-[150px] overflow-hidden font-serif font-semibold text-xl" dangerouslySetInnerHTML={{__html: article.Content}}>
                                                
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
            </div>
        </>
    )
}