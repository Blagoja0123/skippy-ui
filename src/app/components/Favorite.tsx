'use client';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const Favorite = ({ user, category_id, session, revalidate }: { user: any; category_id: number; session: any; revalidate: any}) => {
    const [likedCats, setLikedCats] = useState<Array<number>>([]);
    const [liked, setLiked] = useState(false); 
    const router = useRouter();
    useEffect(() => {
        if (user && user.LikedCategoryID) {
            setLikedCats([...user.LikedCategoryID]);
        }
    }, [user])

    useEffect(() => {
        const favoriteElement = document.querySelector('#favorite');
        if (likedCats.includes(category_id)) {
            setLiked(true);
            favoriteElement?.classList.add('text-tertiary', 'hover:text-white');
            favoriteElement?.classList.remove('text-white', 'hover:text-tertiary');
        } else {
            setLiked(false);
            favoriteElement?.classList.add('text-white', 'hover:text-tertiary');
            favoriteElement?.classList.remove('text-tertiary', 'hover:text-white');
        }
    }, [likedCats, category_id]);

    const handleFavorite = () => {
        if(user === null){
            return toast("Action not allowed", {
                className: "bg-foreground-dark",
                description: "Cannot like or dislike when not logged in",
                action: {
                    label: "Log in",
                    onClick: () => {router.push('/login')},
                },
                cancel: {
                    label: "OK",
                    onClick: () => {return},
                },
                cancelButtonStyle: {
                    color: "bg-tertiary",
                },
            })
            // return;
        }
        const favoriteElement = document.querySelector('#favorite');
        if (likedCats.includes(category_id)) {
            handleDislike();
            setLiked(false);
            favoriteElement?.classList.toggle('text-white');
            favoriteElement?.classList.toggle('hover:text-tertiary');
        } else {
            handleLike();
            setLiked(true);
            favoriteElement?.classList.toggle('text-tertiary');
            favoriteElement?.classList.toggle('hover:text-white');
        }
        revalidate();
    }


    const handleLike = async () => {
        const response = await fetch('http://localhost:8000/users/likes/add', {
            method: "PATCH",
            headers: {
                'Authorization': `Bearer ${session}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: user.ID, liked_category: category_id }),
        })
        const data = await response.json();
    }

    const handleDislike = async () => {
        const response = await fetch('http://localhost:8000/users/likes/remove', {
            method: "PATCH",
            headers: {
                'Authorization': `Bearer ${session}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ liked_category: category_id }),
        })
        const data = await response.json();
    }

    return (
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            {/* <button type="submit"   className="flex items-center justify-center"> */}
                                    <span onClick={() => {handleFavorite()}} id="favorite" className="material-symbols-outlined">favorite</span>
                            {/* </button> */}
                        </TooltipTrigger>
                        <TooltipContent>
                            <p>
                                {liked ? 'Remove from liked categories' : 'Add to liked categories'}
                            </p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
    )
}

export default Favorite