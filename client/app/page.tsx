import SignIn from "@/components/sign-in";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <header className="sticky top-0 z-10 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-black/5 dark:border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500" aria-hidden />
            <span className="font-semibold tracking-tight">Chat Free Easy</span>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm">
            <a href="#features" className="hover:opacity-80">Características</a>
            <a href="#preview" className="hover:opacity-80">Vista previa</a>
            <a href="#faq" className="hover:opacity-80">FAQ</a>
          </nav>
          <div className="flex items-center gap-2">
            <SignIn />
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-500/20 via-transparent to-transparent" aria-hidden />
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Chatea fácil, rápido y seguro
              </h1>
              <p className="mt-4 text-base sm:text-lg text-foreground/80 max-w-prose">
                Una plataforma de chat moderna para tus usuarios, con autenticación segura y una interfaz pensada para la productividad.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="/auth/google"
                  className="inline-flex items-center justify-center rounded-md bg-foreground text-background px-5 py-3 text-sm font-medium shadow hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-foreground"
                >
                  Comenzar ahora
                </a>
              </div>
              <div className="mt-6 text-xs text-foreground/60">
                Autenticación con Google configurada. Sin contraseñas, sin fricción.
              </div>
            </div>

            {/* Chat Preview Card */}
            <div id="preview" className="">
              <div className="mx-auto w-full max-w-md rounded-2xl border border-black/10 dark:border-white/10 bg-background/60 backdrop-blur shadow-lg">
                <div className="p-4 border-b border-black/5 dark:border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" aria-hidden />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-500" aria-hidden />
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500" aria-hidden />
                  </div>
                  <span className="text-xs text-foreground/60">Demo</span>
                </div>
                <div className="p-4 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500" aria-hidden />
                    <div className="rounded-2xl rounded-tl-none bg-foreground/10 px-4 py-2 max-w-[75%]">
                      <p className="text-sm">¡Hola! Soy tu asistente. ¿En qué puedo ayudarte hoy?</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 justify-end">
                    <div className="rounded-2xl rounded-tr-none bg-foreground px-4 py-2 text-background max-w-[75%]">
                      <p className="text-sm">Quiero conocer las funciones principales de la app.</p>
                    </div>
                    <div className="h-8 w-8 shrink-0 rounded-full bg-foreground" aria-hidden />
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 shrink-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500" aria-hidden />
                    <div className="rounded-2xl rounded-tl-none bg-foreground/10 px-4 py-2 max-w-[75%]">
                      <p className="text-sm">Autenticación con Google, chats en tiempo real y un diseño limpio y responsivo.</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 border-t border-black/5 dark:border-white/10">
                  <div className="flex items-center gap-2">
                    <input
                      aria-label="Mensaje"
                      disabled
                      placeholder="Escribe un mensaje..."
                      className="flex-1 rounded-md bg-foreground/5 px-3 py-2 text-sm placeholder:text-foreground/50 disabled:opacity-60"
                    />
                    <button disabled className="rounded-md bg-foreground text-background px-3 py-2 text-sm opacity-80">
                      Enviar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-16 sm:py-24 border-t border-black/5 dark:border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-black/10 dark:border-white/10 p-6 bg-background/60">
              <div className="h-10 w-10 rounded-lg bg-indigo-500/15 text-indigo-500 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M12 3a9 9 0 100 18 9 9 0 000-18zm1 13h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>
              </div>
              <h3 className="font-semibold mb-1">Autenticación simple</h3>
              <p className="text-sm text-foreground/70">Accede con Google en segundos. Sin contraseñas, sin fricción.</p>
            </div>
            <div className="rounded-xl border border-black/10 dark:border-white/10 p-6 bg-background/60">
              <div className="h-10 w-10 rounded-lg bg-purple-500/15 text-purple-500 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M4 6h16v2H4V6zm0 5h10v2H4v-2zm0 5h16v2H4v-2z"/></svg>
              </div>
              <h3 className="font-semibold mb-1">Interfaz limpia</h3>
              <p className="text-sm text-foreground/70">Diseño pensado para conversaciones claras y productivas.</p>
            </div>
            <div className="rounded-xl border border-black/10 dark:border-white/10 p-6 bg-background/60">
              <div className="h-10 w-10 rounded-lg bg-pink-500/15 text-pink-500 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5"><path d="M12 4a8 8 0 00-8 8v5a3 3 0 003 3h10a3 3 0 003-3v-5a8 8 0 00-8-8zm0 4a4 4 0 014 4v1H8v-1a4 4 0 014-4z"/></svg>
              </div>
              <h3 className="font-semibold mb-1">Privado y seguro</h3>
              <p className="text-sm text-foreground/70">Buenas prácticas de seguridad y soporte para modo oscuro.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center text-sm text-foreground/60">
          <p> {new Date().getFullYear()} Chat Free Easy. Ningun derecho reservado. App creada para demostrar conocimiento sin ánimo de lucro.</p>
        </div>
      </footer>
    </main>
  )
}
