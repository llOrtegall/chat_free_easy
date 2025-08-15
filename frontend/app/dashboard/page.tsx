import Header from "../components/ui/Header"
import { redirect } from "next/navigation"
import { Chat } from "../components/Chat"
import { auth } from "@/auth"

export default async function Dashboard() {
  const session = await auth()

  if (!session || !session.user) redirect("/")

  return (
    <div className="">
      <Header 
        email={session.user.email || ""} 
        name={session.user.name || ""} 
        image={session.user.image || ""} 
      />
      <Chat
        email={session.user.email || ""}
        name={session.user.name || ""}
        image={session.user.image || ""}
      />
    </div>
  )
}