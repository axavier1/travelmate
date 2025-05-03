'use client';

import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-30 bg-black bg-opacity-70 text-white py-4 px-6 flex justify-between items-center">
      <Link href="/" className="flex items-center space-x-2">
        <Image
          src="/favicon.svg" 
          alt="TravelMate Logo"
          width={40}
          height={40}
          className="h-11 w-auto object-contain"
        /></Link>
      <div className="space-x-6">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/builder">Itinerary</Link>
        <Link href="/about">About</Link>
        <Link href="/login">Log In</Link>
      </div>
    </nav>
  );
}
