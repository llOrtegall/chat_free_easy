import { SignOut } from "@/app/components/auth/signout-button"
import { redirect } from "next/navigation"
import { auth } from "@/auth"

export default async function Dashboard() {
  const session = await auth()

  if (!session) redirect("/")

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Session: {JSON.stringify(session)}</p>
      <SignOut />
    </div>
  )
}