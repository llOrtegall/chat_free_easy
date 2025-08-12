import { SignOut } from "@/app/components/auth/signout-button"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { Chat } from "../components/Chat"
import Image from "next/image"

export default async function Dashboard() {
  const session = await auth()

  if (!session || !session.user) redirect("/")

  return (
    <div className="h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <header className="relative z-10 flex justify-between items-center p-6 lg:px-8 bg-white/10 backdrop-blur-sm border-b border-white/20">
        {/* Logo and Brand */}
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-white hidden sm:block">Chat Free Easy</h1>
        </div>

        {/* User Info and Sign Out */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
            <Image 
              src={session.user.image || ""} 
              alt={session.user.name || ""} 
              width={32} 
              height={32} 
              className="w-8 h-8 rounded-full ring-2 ring-white/20" 
            />
            <p className="text-white font-medium hidden sm:block">{session.user.name}</p>
          </div>
          <SignOut />
        </div>
      </header>
      
      <Chat
        email={session.user.email || ""}
        name={session.user.name || ""}
        image={session.user.image || ""}
      />
    </div>
  )
}