"use client";
import { searchTransactions } from "@/actions/transactionActions";
import React, { useEffect, useRef, useState } from "react";
import profilePicture from "@/public/david.jpg";
import Image from "next/image";
import { ChevronDown, SearchIcon } from "lucide-react";

export default function Header() {
  const [showDropdown, setShowDropdown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <header className="flex gap-4 justify-between py-4 px-[5%] border-b items-center">
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
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown((curr) => !curr)}
          className="flex  gap-2 items-center duration-300 hover:bg-zinc-100 rounded-full p-2"
        >
          <Image
            src={profilePicture}
            alt="user profile picture"
            className="w-8 h-8 rounded-full"
          />
          <p className="font-medium text-sm hidden sm:block">John Doe</p>
          <ChevronDown className="w-4 h-4 -ml-1" />
        </button>
        <ul
          className={`absolute top-[110%] bg-white p-2 duration-100 border shadow rounded-lg w-fit right-0 text-sm ${
            showDropdown
              ? "visible opacity-100"
              : "invisible opacity-0 -translate-y-1"
          }`}
        >
          <li
            role="button"
            className="hover:bg-zinc-100 duration-300 font-medium p-2 text-left px-4 rounded-md cursor-pointer"
          >
            Logout
          </li>
        </ul>
      </div>
    </header>
  );
}
