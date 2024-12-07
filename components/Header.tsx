import React from 'react'
import Link from 'next/link';
import { SignedOut,SignedIn, UserButton } from "@clerk/nextjs";


const Header = () => {
  return (
    <header className="bg-rose-600 p-4 text-white">
    <div className="flex items-center justify-between">
      <h1 className="text-2xl font-bold">Modern Events</h1>
      <nav>
        <SignedIn>
        <button className="rounded-full border border-white bg-transparent px-4 py-2 text-white">
        <Link href="/home">Dashboard</Link>
          </button>
        </SignedIn>
        <SignedOut>
        <Link href="/sign-in"className="mr-4 font-semibold">Log In</Link>
        <Link href="/sign-up" className='font-semibold'> <button className=" rounded bg-white px-4 py-2 text-rose-600">Sign up</button></Link> 
        </SignedOut>
      </nav>
    </div>
  </header>
  )
}

export default Header
