"use server";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function Logout() {
    cookies().set("session", "", { httpOnly: true, path: "/", maxAge: 0 });
    redirect('/feed/home');
}

export async function Revalidate(){
    revalidateTag('user');
}

