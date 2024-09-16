// import { SignJWT, jwtVerify } from "jwt";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";

const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

// Function to call an external API for login and get a JWT token
export async function login(formData: FormData) {
  "use server";
  const response = await fetch("http://localhost:8000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username: formData.get('username'), password: formData.get('password') }),
  });

  if (!response.ok) {
    throw new Error("Failed to login");
  }

  const data = await response.json();
  const token = data.bearer_token;
  const expires = new Date(data.expires); 

  // Store the token in a cookie
  cookies().set("session", token, { 
    httpOnly: true, 
    path: "/", 
    expires, 
    maxAge: 60 * 60 * 24
  });
  redirect('/feed/my');
}


// Decrypt and verify JWT token from cookie
// export async function decrypt(token: string): Promise<any> {
//   const { payload } = await jwtVerify(token, key, {
//     algorithms: ["HS256"],
//   });
//   return payload;
// }

// Get session from the cookie and decrypt the token
export async function getSession() {
  const sessionToken = cookies().get("session")?.value;
  if (!sessionToken) return null;
  try {
    // return await decrypt(sessionToken);
    const res = await fetch('http://localhost:8000/users', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${sessionToken}`,
      },
      next: {
        tags: [ 'user' ],
      }
    });

    return res.json();
  } catch (error) {
    console.error("Invalid session", error);
    redirect('/login');
  }
}

export async function logout(){
  "use server";
  cookies().set("session", "", { expires: new Date(0) });
}

export async function validateSession(req: NextRequest){
  const session = req.cookies.get("session")?.value;

  if (!session) return false;

  return true;
}