import { SignIn } from "@/app/components/auth/signin-button";

export default function Home() {
  return (
    <div className="font-sans bg-gray-900">
      <h1>Chat Free Easy</h1>
      <SignIn />
    </div>
  );
}
