"use client";

import Link from "next/link";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav className="fixed top-0 left-0 w-full z-30 bg-black bg-opacity-70 text-white py-4 px-6 flex justify-between items-center">
      <Link href="/" className="flex items-center space-x-2">
        <Image
          src="/favicon.svg"
          alt="TravelMate Logo"
          width={40}
          height={40}
          className="h-11 w-auto object-contain"
        />
        <span className="text-xl font-bold ml-2">TravelMate</span>
      </Link>

      <div className="space-x-6 flex items-center">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/about">About</Link>

        {session ? (
          <>
            <span className="text-sm text-gray-300 hidden sm:inline">
              {session.user?.email}
            </span>
            <button
              onClick={() => signOut()}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
            >
              Log Out
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn()}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
          >
            Log In
          </button>
        )}
      </div>
    </nav>
  );
}
