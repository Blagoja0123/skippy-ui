"use client";
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
const LoginForm = ({login}: {login: any}) => {
    const router = useRouter();
  return (
    <>
      
      <div className="bg-background-dark flex items-center justify-center min-h-screen">
        <div className="bg-foreground-dark p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-primary text-2xl font-bold mb-6">Login</h1>
          <form id="loginForm" className="space-y-4" action={async (formData) =>{
              try {
                  await login(formData);
                  router.push("/feed/home");
              } catch (error) {
                return toast("Error", {
                    className: "bg-foreground-dark",
                    description: "Something went wrong while registering",
                    action: {
                        label: "OK",
                        onClick: () => {return},
                    }
                })
              }
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

export default LoginForm