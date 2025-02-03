"use client";
import { searchTransactions } from "@/actions/transactionActions";
import React from "react";
import profilePicture from "@/public/david.jpg";
import Image from "next/image";
import { ChevronDown, SearchIcon } from "lucide-react";

export default function Header() {
  return (
    <header className="flex justify-between py-4 px-[5%] border-b items-center">
      <h2 className="text-lg font-semibold">FinTrack</h2>
      <form
        action={searchTransactions}
        className="relative w-0 flex-1 max-w-60"
      >
        <input
          type="text"
          placeholder="Search transactions..."
          className="py-2 px-4 pl-8 rounded-full w-full  border text-sm focus-visible:ring-2 focus-visible:ring-zinc-300 ring-offset-1"
        />
        <SearchIcon className="w-4 h-4 absolute top-1/2 left-2.5 -translate-y-1/2 text-zinc-500" />
      </form>
      <div className="flex gap-2 items-center">
        <Image
          src={profilePicture}
          alt="user profile picture"
          className="w-10 h-10 rounded-full"
        />
        <p className="font-medium text-sm">John Doe</p>
        <ChevronDown className="w-4 h-4 -ml-1" />
      </div>
    </header>
  );
}
