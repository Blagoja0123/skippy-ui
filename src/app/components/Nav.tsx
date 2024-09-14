"use client";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter, usePathname } from 'next/navigation';
import AvatarComponent from './AvatarComponent';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export default function Nav({categories, user, logout}: {categories: Array<any>, user: any, logout: any}) {
    const currentURL = usePathname();
    const router = useRouter();
    
    return (
        <nav className="w-full h-20 sticky top-0 flex justify-between items-center gap-10 font-bold z-10 bg-inherit">
            <div className="text-white flex items-center justify-center flex-[1]">
                <a className="font-extrabold text-4xl" href='/'>
                    SKIPPY
                </a>
            </div>
            <ul className="flex text-white gap-4 justify-center items-center h-full text-xl flex-[5]">
                <li className={`${currentURL === '/feed/home' ? 'border-b-4 border-white' : ''}`}><a href="http://localhost:3000/feed/home">Home</a></li>
                <li className={`${currentURL === '/feed/my' ? 'border-b-4 border-white' : ''}`}><a href="http://localhost:3000/feed/my">Your Feed</a></li>
                <li className="w-[3px] h-[85%] border rounded border-white block bg-white "></li>
                {
                    categories.map((category: any) => (
                        <li key={category.ID} className={`${currentURL === `/articles/${category.Name}` ? 'border-b-4 border-white' : ''}`}><a href={`http://localhost:3000/articles/${category.Name}`}>{category.Name}</a></li>
                    ))
                }
            </ul>
            <div className="flex flex-[1]">
                <Popover>
                    <PopoverTrigger>
                        <AvatarComponent imageUrl={user ? user.ImageURL : null}/>
                    </PopoverTrigger>
                    <PopoverContent align='center'>
                        {
                            user ? `Logged in as ${user.Username}` : "Not Logged in"    
                        }
                        <div className='flex w-full mt-5'>
                            {
                                user ? 
                                <form action={logout} className='w-full'>
                                    <button type='submit' className='bg-tertiary w-full p-2 rounded-md hover:bg-highlight'>Log out</button>
                                </form>
                                :
                                <button className='bg-tertiary w-full p-2 rounded-md hover:bg-highlight' onClick={() => {router.push('/login')}}>Log in</button>
                            }
                        </div>
                    </PopoverContent>
                </Popover>
            </div>
        </nav>
    )
}