"use client";

import { useSession, signOut } from "next-auth/react";

export default function Dashboard() {
  const { data: session } = useSession();

  if (!session) {
    return <p>Not logged in</p>;
  }

  return (
    <div>
      <h2>Welcome, {session.user.username}</h2>
      <p>Email: {session.user.email}</p>
      <p>First Name: {session.user.firstName}</p>
      <p>Last Name: {session.user.lastName}</p>
      <button onClick={() => signOut()} className="bg-red-500 p-4">
        Sign Out
      </button>
    </div>
  );
}
