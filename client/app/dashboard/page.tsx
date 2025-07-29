import { SignOut } from "@/components/log-out";

  export default function Dashboard() {
  const conversations: { name: string; last: string; unread: number }[] = [
    { name: "Equipo Soporte", last: "¿En qué podemos ayudarte?", unread: 2 },
    { name: "Marketing", last: "Revisemos la campaña.", unread: 0 },
    { name: "General", last: "Acta de la reunión...", unread: 1 },
    { name: "Producto", last: "Mockups listos.", unread: 0 },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-[1400px] h-[calc(100vh-0px)] grid grid-rows-[auto_1fr] md:grid-cols-[280px_1fr] md:grid-rows-1">
        {/* Sidebar */}
        <aside className="hidden md:flex md:flex-col border-r border-black/5 dark:border-white/10 bg-background/70 backdrop-blur">
          <div className="h-16 flex items-center justify-between px-4 border-b border-black/5 dark:border-white/10">
            <h2 className="text-sm font-semibold tracking-tight">Conversaciones</h2>
            <button className="inline-flex items-center rounded-md bg-foreground text-background px-3 py-1.5 text-xs font-medium hover:opacity-90">
              Nuevo chat
            </button>
          </div>
          <div className="p-4 border-b border-black/5 dark:border-white/10">
            <label className="sr-only" htmlFor="search">Buscar</label>
            <input
              id="search"
              placeholder="Buscar..."
              className="w-full rounded-md bg-foreground/5 px-3 py-2 text-sm placeholder:text-foreground/50"
            />
          </div>
          <nav className="flex-1 overflow-y-auto p-2 space-y-1">
            {conversations.map((c, idx) => (
              <a key={idx} href="#" className="group flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-foreground/5">
                <div className="h-8 w-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500" aria-hidden />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-medium">{c.name}</p>
                    {c.unread > 0 && (
                      <span className="ml-auto inline-flex items-center justify-center rounded-full bg-foreground text-background px-1.5 text-[10px] h-5 min-w-5">
                        {c.unread}
                      </span>
                    )}
                  </div>
                  <p className="truncate text-xs text-foreground/60">{c.last}</p>
                </div>
              </a>
            ))}
          </nav>
          <footer>
            <SignOut />
          </footer>
        </aside>

        {/* Main Chat */}
        <section className="flex flex-col min-h-0">
          {/* Topbar (mobile) */}
          <div className="md:hidden h-14 flex items-center justify-between px-4 border-b border-black/5 dark:border-white/10 sticky top-0 bg-background/80 backdrop-blur z-10">
            <button aria-label="Abrir conversaciones" className="rounded-md border border-foreground/20 px-2 py-1 text-xs">Menú</button>
            <span className="text-sm font-medium">Chat</span>
            <a href="/" className="text-xs underline">Home</a>
          </div>

          {/* Header */}
          <header className="h-16 hidden md:flex items-center justify-between px-6 border-b border-black/5 dark:border-white/10">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500" aria-hidden />
              <div>
                <p className="text-sm font-semibold leading-tight">Equipo Soporte</p>
                <p className="text-xs text-foreground/60">Activo ahora</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button className="rounded-md border border-foreground/20 px-3 py-1.5 text-xs hover:bg-foreground/5">Buscar</button>
              <button className="rounded-md border border-foreground/20 px-3 py-1.5 text-xs hover:bg-foreground/5">Opciones</button>
            </div>
          </header>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-4">
            <div className="flex items-center justify-center">
              <span className="text-[11px] px-2 py-1 rounded bg-foreground/5 text-foreground/60">Hoy</span>
            </div>

            {/* Message: them */}
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500" aria-hidden />
              <div className="max-w-[75%] rounded-2xl rounded-tl-none bg-foreground/10 px-4 py-2">
                <p className="text-sm">¡Hola! Bienvenido al dashboard de Chat Free Easy. ¿Listo para empezar?</p>
              </div>
            </div>

            {/* Message: me */}
            <div className="flex items-start gap-3 justify-end">
              <div className="max-w-[75%] rounded-2xl rounded-tr-none bg-foreground px-4 py-2 text-background">
                <p className="text-sm">Sí, muéstrame cómo se ve una conversación.</p>
              </div>
              <div className="h-8 w-8 shrink-0 rounded-full bg-foreground" aria-hidden />
            </div>

            {/* Message: them */}
            <div className="flex items-start gap-3">
              <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500" aria-hidden />
              <div className="max-w-[75%] rounded-2xl rounded-tl-none bg-foreground/10 px-4 py-2">
                <p className="text-sm">Esta es una vista de ejemplo con soporte para modo oscuro y un diseño limpio.</p>
              </div>
            </div>
          </div>

          {/* Composer */}
          <div className="border-t border-black/5 dark:border-white/10 p-3">
            <form className="flex items-end gap-2">
              <button type="button" className="rounded-md border border-foreground/20 px-3 py-2 text-sm hover:bg-foreground/5">Adjuntar</button>
              <label className="sr-only" htmlFor="message">Mensaje</label>
              <textarea
                id="message"
                rows={1}
                placeholder="Escribe un mensaje..."
                className="flex-1 resize-none rounded-md bg-foreground/5 px-3 py-2 text-sm placeholder:text-foreground/50"
              />
              <button type="button" className="rounded-md bg-foreground text-background px-4 py-2 text-sm hover:opacity-90">
                Enviar
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
