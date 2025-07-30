import { signOut } from "@/auth"
 
export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut({
					redirectTo: "/",
				})
      }}
    >
      <button type="submit" className="bg-gray-200 px-2 py-1 rounded text-black cursor-pointer hover:bg-gray-300">Sign Out</button>
    </form>
  )
}