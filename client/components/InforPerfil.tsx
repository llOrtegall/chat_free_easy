import { SignOut } from "@/components/log-out";
import Image from "next/image";

interface InforPerfilProps {
    name: string;
    email: string;
    image: string;
}

export default function InforPerfil({ name, email, image }: InforPerfilProps) {
  return (
    <aside className="rounded-2xl border border-zinc-200/60 bg-white/70 shadow-sm backdrop-blur-md dark:border-zinc-800/60 dark:bg-zinc-900/60">
      <article className="flex items-center gap-3 p-4">
        <div className="flex-shrink-0">
          <Image
            className="h-10 w-10 rounded-full object-cover ring-1 ring-zinc-200 dark:ring-zinc-800"
            src={image}
            alt={name}
            width={40}
            height={40}
          />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">{name}</p>
          <p className="truncate text-[11px] text-zinc-500 dark:text-zinc-400" title={email}>{email}</p>
        </div>
        <figure>
          <SignOut />
        </figure>
      </article>
    </aside>
  )
}
