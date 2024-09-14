import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

interface Props {
    id: number;
    title: string;
    imageURL: string;
    source: string;
    createdAt: string;
}

const NewsCard = ({id, title, imageURL, source, createdAt}: Props) => {
    const published = new Date(Date.parse(createdAt));
    const current = new Date(Date.now());
    const differenceHours = (current.getTime() - published.getTime()) / (1000 * 60 * 60);
    const diffDays = differenceHours / 24;
  return (
    <>
        <div className="block w-[700px] h-40 text-white p-4 cursor-pointer" data-article-id={id} id="article-card">
            <div className="flex w-full h-full gap-3">
                <div className="w-1/3 h-full rounded-md box-content overflow-hidden">
                    <img className="w-full h-full object-cover box-content rounded-md" src={imageURL} alt="oh no"/>
                </div>
                <div className="w-2/3">
                    <p className="text-xl font-bold text-wrap">
                        {title}
                    </p>
                    <p>
                        {`${source}, ${differenceHours >= 24 ? `${Math.round(diffDays)}d` : `${Math.round(differenceHours)}h`} ago`} 
                    </p>
                </div>
            </div>
        </div>
    </>
  )
}

export default NewsCard

