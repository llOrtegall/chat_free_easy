import { signOut } from "@/auth"
 
export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button type="submit" className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 cursor-pointer">Sign Out</button>
    </form>
  )
}