import InforPerfil from "@/components/InforPerfil";
import { redirect } from "next/navigation";
import Chat from "@/components/Chat";
import { auth } from "@/auth";

export default async function Dashboard() {
  const session = await auth();

  if (!session?.user) redirect("/");

  const user = session.user;
  const name = user.name ?? "User";
  const email = user.email ?? "email@example.com";
  const image = user.image ?? "/avatar.png";

  return (
    <main className="min-h-screen w-full bg-gradient-to-b from-zinc-50 to-white text-foreground dark:from-zinc-950 dark:to-zinc-900">
      <div className="mx-auto max-w-[1400px] p-4 flex flex-col gap-4">
        <InforPerfil 
          name={name} 
          email={email} 
          image={image} 
        />
        <Chat 
          name={name} 
          email={email} 
          image={image} 
        />
      </div>
    </main>
  );
}
