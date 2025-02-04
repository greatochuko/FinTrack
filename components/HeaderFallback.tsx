"use client";
import React, { useEffect, useRef, useState } from "react";
import profilePicture from "@/public/profile-picture.jpg";
import Image from "next/image";
import { ChevronDown, SearchIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function HeaderFallback() {
  const [query, setQuery] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

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

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/?query=${query}`);
  }

  return (
    <header className="flex items-center justify-between gap-4 border-b px-[5%] py-2">
      <Link href={"/"} className="text-lg font-semibold">
        FinTrack
      </Link>
      <form onSubmit={handleSearch} className="relative w-0 max-w-60 flex-1">
        <input
          type="text"
          placeholder="Search transactions..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-full border px-4 py-2 pl-8 text-sm ring-offset-1 focus-visible:ring-2 focus-visible:ring-zinc-300"
        />
        <SearchIcon className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
      </form>
      <div className="relative" ref={dropdownRef}>
        <button
          onClick={() => setShowDropdown((curr) => !curr)}
          className="flex items-center gap-2 rounded-full p-2 duration-300 hover:bg-zinc-100"
        >
          <Image
            src={profilePicture}
            alt="user profile picture"
            className="h-10 w-10 rounded-full"
          />
          <p className="hidden text-sm font-medium sm:block">Great Ochuko</p>
          <ChevronDown className="-ml-1 h-4 w-4" />
        </button>
        <ul
          className={`absolute right-0 top-[100%] w-fit min-w-full rounded-lg border bg-white p-2 text-sm shadow duration-100 ${
            showDropdown
              ? "visible opacity-100"
              : "invisible -translate-y-1 opacity-0"
          }`}
        >
          <li
            role="button"
            className="cursor-pointer rounded-md p-2 px-4 text-left font-medium duration-300 hover:bg-zinc-100"
          >
            Logout
          </li>
        </ul>
      </div>
    </header>
  );
}
