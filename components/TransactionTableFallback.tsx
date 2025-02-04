"use client";
import { ChevronDown, ChevronsUpDownIcon, ListFilterIcon } from "lucide-react";

export default function TransactionTableFallback() {
  return (
    <div>
      <div className="flex items-center justify-between gap-4 py-4">
        <h2 className="text-lg font-medium">Transactions</h2>
        <div className="relative">
          <select
            name="filter"
            id="filter"
            className="peer appearance-none rounded-md border p-2 px-7 text-sm ring-zinc-300 ring-offset-1 focus-visible:ring-2"
          >
            <option value="all">All</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
          <ListFilterIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2" />
          <ChevronDown className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 peer-focus-within:rotate-180" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="flex w-fit min-w-full flex-col gap-2 text-sm text-zinc-700">
          <thead>
            <tr className="grid w-full grid-cols-[minmax(6rem,1fr)_minmax(10rem,2fr)_minmax(10rem,2fr)_minmax(6rem,1fr)_minmax(6rem,1fr)] rounded-md bg-zinc-100">
              <th
                scope="col"
                className="flex cursor-pointer items-center gap-2 px-2 py-3 text-left text-xs font-medium uppercase tracking-wider hover:text-zinc-900"
              >
                ID
                <ChevronsUpDownIcon className="h-4 w-4" />
              </th>
              <th
                scope="col"
                className="flex cursor-pointer items-center gap-2 px-2 py-3 text-left text-xs font-medium uppercase tracking-wider hover:text-zinc-900"
              >
                Sender
                <ChevronsUpDownIcon className="h-4 w-4" />
              </th>
              <th
                scope="col"
                className="flex cursor-pointer items-center gap-2 px-2 py-3 text-left text-xs font-medium uppercase tracking-wider hover:text-zinc-900"
              >
                Receiver
                <ChevronsUpDownIcon className="h-4 w-4" />
              </th>
              <th
                scope="col"
                className="flex cursor-pointer items-center gap-2 px-2 py-3 text-left text-xs font-medium uppercase tracking-wider hover:text-zinc-900"
              >
                Amount
                <ChevronsUpDownIcon className="h-4 w-4" />
              </th>
              <th
                scope="col"
                className="flex cursor-pointer items-center gap-2 px-2 py-3 text-left text-xs font-medium uppercase tracking-wider hover:text-zinc-900"
              >
                Status
                <ChevronsUpDownIcon className="h-4 w-4" />
              </th>
            </tr>
          </thead>
          <tbody className="flex flex-col divide-y divide-gray-200 bg-white">
            {Array(5)
              .fill("")
              .map((_, i) => (
                <tr
                  key={i}
                  className="mt-2 animate-pulse rounded-md bg-zinc-300 p-5"
                  style={{ animationDelay: i * 150 + "ms" }}
                ></tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
