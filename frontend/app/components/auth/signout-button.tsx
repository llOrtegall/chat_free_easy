import { signOut } from "@/auth"

export function SignOut() {
  return (
    <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <button type="submit" className="flex items-center gap-5 px-4 py-1 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white font-semibold hover:bg-white/15 transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl group cursor-pointer">
        Sign Out
      </button>
    </form>
  )
}