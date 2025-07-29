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
      <button type="submit" className="inline-flex items-center gap-2 rounded-md bg-foreground text-background px-3.5 py-2.5 text-sm font-medium shadow hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-foreground">Sign Out</button>
    </form>
  )
}