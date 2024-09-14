import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import {login} from '@/lib/auth'
import {redirect} from "next/navigation"
const Login = () => {
  return (
    <>
      <div className="bg-background-dark flex items-center justify-center min-h-screen">
        <div className="bg-foreground-dark p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-primary text-2xl font-bold mb-6">Login</h1>
          <form id="loginForm" className="space-y-4" action={async (formData) =>{
            "use server";
            await login(formData);
            redirect("/feed/home");
          }}>
            <div>
              <label htmlFor="username" className="block text-white text-xl font-medium mb-1">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                className="w-full text-black p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                placeholder="username"
                required
              />
            </div>
      
            <div>
              <label htmlFor="password" className="block text-white text-xl font-medium mb-1">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary text-black"
                placeholder="********"
                required
              />
            </div>
      
            <button
              type="submit"
              className="w-full py-3 bg-tertiary text-white font-bold text-xl rounded-lg hover:bg-highlight focus:outline-none focus:ring-2 focus:ring-secondary"
            >
              Login
            </button>
          </form>
        </div>
      
      </div>
    </>
    
  )
}

export default Login