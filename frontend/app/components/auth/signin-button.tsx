import { signIn } from "@/auth"
import Image from "next/image"

export function SignIn() {
  return (
    <div className="flex flex-col sm:flex-row gap-3">
      <form
        action={async () => {
          "use server"
          await signIn("google", { redirectTo: "/dashboard" })
        }}
      >
        <button 
          type="submit" 
          className="flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white font-semibold hover:bg-white/15 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl group cursor-pointer"
        >
          <Image 
            src="/google.svg" 
            alt="Google" 
            width={20} 
            height={20} 
            className="group-hover:scale-110 transition-transform duration-200"
          />
          <span className="hidden sm:inline">Sign in with Google</span>
          <span className="sm:hidden">Google</span>
        </button>
      </form>
      
      <form
        action={async () => {
          "use server"
          await signIn("github", { redirectTo: "/dashboard" })
        }}
      >
        <button 
          type="submit" 
          className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-full hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl group cursor-pointer"
        >
          <Image 
            src="/github.svg" 
            alt="GitHub" 
            width={20} 
            height={20} 
            className="group-hover:scale-110 transition-transform duration-200"
          />
          <span className="hidden sm:inline">Sign in with GitHub</span>
          <span className="sm:hidden">GitHub</span>
        </button>
      </form>
    </div>
  )
}