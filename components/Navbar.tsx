"use client";

import Link from "next/link";
import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const handleLogout = () => {
    try {
      signOut();
      toast.success("Logout successful", { duration: 5000 });
    } catch (error) {
      toast.error("Something went wrong", { duration: 5000 });
    }
  };

  return (
    <nav className="bg-gray-900 text-white mb-4">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div>
          <Link href="/" className="text-xl font-bold">
            Anonymous Message
          </Link>
        </div>
        <div className="hidden md:flex space-x-4 md:items-center">
          <Link href="/dashboard">Dashboard</Link>
          {session ? (
            <Button variant="default" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-white bg-slate-500 py-1 px-4 rounded-xl hover:bg-slate-600"
              >
                Login
              </Link>
              <Link
                href="/auth/user/create"
                className="text-white bg-slate-500 py-1 px-4 rounded-xl hover:bg-slate-600"
              >
                Create Account
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800 flex flex-col items-center space-y-4 py-4">
          <Link href="/dashboard" onClick={() => setIsOpen(false)}>
            Dashboard
          </Link>

          {session ? (
            <Button variant="default" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Link
                href="/auth/login"
                className="text-white bg-slate-500 py-1 px-4 rounded-xl hover:bg-slate-600"
              >
                Login
              </Link>
              <Link
                href="/auth/user/create"
                className="text-white bg-slate-500 py-1 px-4 rounded-xl hover:bg-slate-600"
              >
                Create Account
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}

// Reusable NavLink Component
function NavLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      className="hover:text-gray-300 transition"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
