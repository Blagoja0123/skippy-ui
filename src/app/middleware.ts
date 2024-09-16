import { NextRequest } from "next/server";
import { validateSession } from "@/lib/auth";

export async function middleware(req: NextRequest) {
    console.log("middleware");
    return await validateSession(req);
}