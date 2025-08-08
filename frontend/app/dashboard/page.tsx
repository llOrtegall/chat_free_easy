import { SignOut } from "@/app/components/auth/signout-button"
import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { Chat } from "../components/Chat"

export default async function Dashboard() {
  const session = await auth()

  if (!session || !session.user) redirect("/")
  
  return (
    <div className="h-screen bg-gray-950">
      <header className="flex justify-between p-2">
        <h1 className="text-2xl font-bold">Dashboard</h1>
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