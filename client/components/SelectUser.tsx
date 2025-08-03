export default function SelectUser() {
  return (
    <div className="flex h-full items-center justify-center">
      <div className="text-center">
        <div className="mx-auto mb-4 h-14 w-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-500 opacity-90 shadow-md" />
        <h2 className="text-lg font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">Selecciona un chat</h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Elige un usuario de la izquierda para comenzar a conversar.</p>
      </div>
    </div>
  )
}