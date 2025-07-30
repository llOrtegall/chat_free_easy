'use client';

const listUsersConected = [
  {
    id: 1,
    name: "User 1",
    email: "user1@gmail.com",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=User1"
  },
  {
    id: 2,
    name: "User 2",
    email: "user2@gmail.com",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=User2"
  },
  {
    id: 3,
    name: "User 3",
    email: "user3@gmail.com",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=User3"
  }
]

export default function Chat({ name, email, image }: { name: string, email: string, image: string }) {
  return (
    <section className="flex h-[calc(100vh-80px)] w-full gap-4 bg-gradient-to-b from-zinc-50 to-white dark:from-zinc-950 dark:to-zinc-900">
      {/* Sidebar: usuarios conectados */}
      <nav className="w-full max-w-xs shrink-0 rounded-2xl border border-zinc-200/60 bg-white/70 p-3 shadow-sm backdrop-blur-md dark:border-zinc-800/60 dark:bg-zinc-900/60">
        <div className="mb-3 flex items-center justify-between px-1">
          <h3 className="text-xs font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">Conectados</h3>
          <span className="rounded-full bg-emerald-500/90 px-2 py-0.5 text-[10px] font-medium text-white shadow">{listUsersConected.length}</span>
        </div>
        <ul className="space-y-2 overflow-y-auto pr-1 max-h-[calc(100vh-140px)] [&_::-webkit-scrollbar]:w-2 [&_::-webkit-scrollbar-thumb]:rounded-full [&_::-webkit-scrollbar-thumb]:bg-zinc-300/50 hover:[&_::-webkit-scrollbar-thumb]:bg-zinc-400/60 dark:[&_::-webkit-scrollbar-thumb]:bg-zinc-700/50 dark:hover:[&_::-webkit-scrollbar-thumb]:bg-zinc-600/60">
          {listUsersConected.map((user) => (
            <li key={user.id}>
              <div className="group flex items-center gap-3 rounded-xl border border-transparent bg-white/60 p-2 transition-all hover:border-zinc-200 hover:bg-white dark:bg-zinc-900/50 dark:hover:border-zinc-800 dark:hover:bg-zinc-900">
                <div className="relative">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="h-10 w-10 rounded-full object-cover ring-1 ring-zinc-200 transition-shadow group-hover:shadow-sm dark:ring-zinc-800"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-zinc-900" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-zinc-900 dark:text-zinc-100">{user.name}</p>
                  <p className="truncate text-[11px] text-zinc-500 dark:text-zinc-400">{user.email}</p>
                </div>
                <span className="ml-auto hidden text-zinc-400 transition-opacity group-hover:inline dark:text-zinc-500">•••</span>
              </div>
            </li>
          ))}
        </ul>
      </nav>

      {/* Panel principal */}
      <article className="flex-1 rounded-2xl border border-zinc-200/60 bg-white/70 shadow-sm backdrop-blur-md dark:border-zinc-800/60 dark:bg-zinc-900/60">
        <div className="flex h-full items-center justify-center">
          <div className="text-center">
            <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 opacity-90 shadow-md" />
            <h2 className="text-lg font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">Selecciona un chat</h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Elige un usuario de la izquierda para comenzar a conversar.</p>
          </div>
        </div>
      </article>
    </section>
  )
}