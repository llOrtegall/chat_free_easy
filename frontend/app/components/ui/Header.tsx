import { SignOut } from "@/app/components/auth/signout-button"
import { UserProps } from "@/interfaces/User"
import Image from "next/image";

export default async function Header({ name, image }: UserProps) {
  return (
    <header className="flex justify-between items-center p-2 lg:px-8 bg-gradient-to-br from-slate-900 to-slate-900">
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
        <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-full px-2 py-1 border border-white/10">
          <Image
            src={image}
            alt={name}
            width={24}
            height={24}
            className="w-6 h-6 rounded-full ring-2 ring-white/20"
          />
          <p className="text-white font-medium hidden sm:block">{name}</p>
        </div>
        <SignOut />
      </div>
    </header>
  )
}