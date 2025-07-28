import { signIn, auth, signOut } from "@/auth";

export default async function Home() {
  const session = await auth()

  return (

    !session ? (
      <form
        action={async () => {
          "use server"
          await signIn("google")
        }}
      >
        <button type="submit" className="p-2 bg-blue-500 text-white rounded m-2 hover:bg-blue-600 cursor-pointer">Signin with Google</button>
      </form>
    ) : (
      <div>
        <p>Logged in as {session.user?.email}</p>
        <form action={async () => {
          "use server"
          await signOut()
        }}>
          <button type="submit" className="p-2 bg-blue-500 text-white rounded m-2 hover:bg-blue-600 cursor-pointer">Sign out</button>
        </form>
      </div>
    )

  )

}
