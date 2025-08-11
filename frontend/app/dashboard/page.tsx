import { SignOut } from "@/app/components/auth/signout-button"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { Chat } from "../components/Chat"
import Image from "next/image"

export default async function Dashboard() {
  const session = await auth()

  if (!session || !session.user) redirect("/")

  return (
    <div className="h-screen bg-gray-950">
      <header className="flex justify-between items-center space-x-2 p-2 bg-gray-700">

        <div className="flex items-center space-x-2">
          <Image src={session.user.image || ""} alt={session.user.name || ""} width={32} height={32} className="w-8 h-8 rounded-full" />
          <p className="text-white">{session.user.name}</p>
        </div>
        <SignOut />

      </header>
      <Chat
        email={session.user.email || ""}
        name={session.user.name || ""}
        image={session.user.image || ""}
      />
    </div>
  )
}