import Link from "next/link";
import { Button } from "@/components/ui/button";
export default function Home() {
  console.log("it is server components");
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-4xl font-bold mb-4">🔒 Anonymous Message App</h1>
      <p className="text-lg text-gray-500 mb-6 max-w-md">
        Send anonymous messages to your friends and get honest feedback.
      </p>
      <div className="space-x-4">
        <Link href="/dashboard">
          <Button size="lg">Dashboard</Button>
        </Link>
        <Link href="/auth/login">
          <Button size="lg">Login</Button>
        </Link>
      </div>
    </main>
  );
}
