"use server";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function Logout() {
    try {
        cookies().set("session", "", { httpOnly: true, path: "/", maxAge: 0 });
        cookies().delete({name: "session"});
        console.log('deleted cookies');

        revalidateTag("user");
        revalidatePath('/');
        revalidatePath('/articles/[category]', 'page');
        revalidatePath('/feed/home');

    } catch (error) {
        console.error('Error during logout:', error);
    }
}
export default Logout;
export async function Revalidate(){
    revalidateTag('user');
}

