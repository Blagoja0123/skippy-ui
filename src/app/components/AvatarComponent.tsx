"use client";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
const AvatarComponent = ({imageUrl}: {imageUrl: string | null}) => {
    return (
        <a className="block text-white items-center justify-center flex-[1] cursor-pointer" >
            <Avatar>
                <AvatarImage src={imageUrl ? imageUrl : ""}/>
                <AvatarFallback>SK</AvatarFallback>
            </Avatar>
        </a>
    )
}

export default AvatarComponent