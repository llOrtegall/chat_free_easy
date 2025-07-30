import { SignOut } from "@/components/log-out";
import { redirect } from "next/navigation";
import Chat from "@/components/Chat";
import Image from "next/image";
import { auth } from "@/auth";

export default async function Dashboard() {
  const session = await auth()
  if (!session) redirect("/")

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-zinc-50 to-white text-foreground dark:from-zinc-950 dark:to-zinc-900">
      <div className="mx-auto max-w-[1400px] p-4 flex flex-col gap-4">
        <aside className="rounded-2xl border border-zinc-200/60 bg-white/70 shadow-sm backdrop-blur-md dark:border-zinc-800/60 dark:bg-zinc-900/60">
          <article className="flex items-center gap-3 p-4">
            <div className="flex-shrink-0">
              <Image
                className="h-10 w-10 rounded-full object-cover ring-1 ring-zinc-200 dark:ring-zinc-800"
                src={session.user?.image || "/avatar.png"}
                alt={session.user?.name || "User"}
                width={40}
                height={40}
              />
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">{session.user?.name}</p>
              <p className="truncate text-[11px] text-zinc-500 dark:text-zinc-400" title={session.user?.email || ""}>{session.user?.email}</p>
            </div>
            <figure>
              <SignOut />
            </figure>
          </article>
        </aside>

        <Chat name={session.user?.name || "User"} email={session.user?.email || ""} image={session.user?.image || "/avatar.png"} />
      </div>
    </main>
  );
}
