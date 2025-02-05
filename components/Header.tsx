"use client";
import React, { useEffect, useRef, useState } from "react";
import { SearchIcon } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import AddNewTransactionBtn from "./AddNewTransactionBtn";
import CreateTransactionModal from "./CreateTransactionModal";

export default function Header() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("query") || "";

  const [query, setQuery] = useState(searchQuery);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showModal, setShowModal] = useState(false);
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
    if (query) {
      router.push(`/?query=${query}`);
    } else {
      router.push(`/`);
    }
  }

  return (
    <>
      <header className="flex items-center justify-between gap-4 border-b px-[5%] py-4">
        <Link href={"/"} className="text-lg font-semibold">
          LedgerView
        </Link>
        <form
          onSubmit={handleSearch}
          className="relative w-0 flex-1 sm:max-w-80"
        >
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
          <AddNewTransactionBtn onClick={() => setShowModal(true)} />
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
      <CreateTransactionModal
        open={showModal}
        closeModal={() => setShowModal(false)}
      />
    </>
  );
}
