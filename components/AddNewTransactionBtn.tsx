"use client";

import { PlusIcon } from "lucide-react";
import React from "react";

export default function AddNewTransactionBtn({ onClick }: { onClick(): void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1 rounded-md bg-blue-500 px-2 py-2 text-sm font-medium text-white duration-200 hover:bg-blue-500/90 sm:pr-3"
    >
      <PlusIcon className="h-4 w-4" strokeWidth={3} />{" "}
      <span className="hidden sm:inline">New Transaction</span>
    </button>
  );
}
