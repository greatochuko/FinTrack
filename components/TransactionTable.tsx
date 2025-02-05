"use client";
import React, { useState } from "react";
import {
  ChevronDownIcon,
  ChevronsUpDownIcon,
  ChevronUpIcon,
  CircleAlert,
  ListFilterIcon,
} from "lucide-react";
import { TransactionType } from "@/db/models/Transaction";
import { useRouter } from "next/navigation";

export default function TransactionTable({
  transactions,
  error,
}: {
  transactions: TransactionType[];
  error: string | null;
}) {
  const [sortBy, setSortBy] = useState<{
    col: string;
    type: "asc" | "dsc";
  }>({ col: "date", type: "asc" });
  const [filterBy, setFilterBy] = useState("all");

  const router = useRouter();

  const filteredTransactions =
    filterBy === "all"
      ? [...transactions]
      : transactions.filter((tran) => tran.status === filterBy);

  let sortedTransactions = filteredTransactions;

  switch (sortBy.col) {
    case "id":
      sortedTransactions = sortedTransactions.sort((a, b) =>
        sortBy.type === "asc"
          ? a._id.localeCompare(b._id)
          : b._id.localeCompare(a._id),
      );
      break;

    case "sender":
      sortedTransactions = sortedTransactions.sort((a, b) =>
        sortBy.type === "asc"
          ? a.senderName.localeCompare(b.senderName)
          : b.senderName.localeCompare(a.senderName),
      );
      break;

    case "receiver":
      sortedTransactions = sortedTransactions.sort((a, b) =>
        sortBy.type === "asc"
          ? a.receiverName.localeCompare(b.receiverName)
          : b.receiverName.localeCompare(a.receiverName),
      );
      break;

    case "amount":
      sortedTransactions = sortedTransactions.sort((a, b) =>
        sortBy.type === "asc" ? a.amount - b.amount : b.amount - a.amount,
      );
      break;

    case "status":
      sortedTransactions = sortedTransactions.sort((a, b) => {
        const statusOrder = ["Completed", "Pending", "Failed"];
        return sortBy.type === "asc"
          ? statusOrder.indexOf(a.status) - statusOrder.indexOf(b.status)
          : statusOrder.indexOf(b.status) - statusOrder.indexOf(a.status);
      });
      break;

    case "date":
      sortedTransactions = sortedTransactions.sort((a, b) => {
        return sortBy.type === "asc"
          ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      });
      break;

    default:
      break;
  }

  function handleSortBy(col: string) {
    if (sortBy) {
      if (sortBy.col === col) {
        setSortBy({
          col,
          type: sortBy.type === "asc" ? "dsc" : "asc",
        });
      } else {
        setSortBy({
          col,
          type: "asc",
        });
      }
    } else {
      setSortBy({ col, type: "dsc" });
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 py-4">
        <h2 className="text-lg font-medium">Transactions</h2>
        <div className="relative">
          <select
            name="filter"
            id="filter"
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="peer appearance-none rounded-md border p-2 px-7 text-sm ring-zinc-300 ring-offset-1 focus-visible:ring-2"
          >
            <option value="all">All</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
          <ListFilterIcon className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2" />
          <ChevronDownIcon className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 peer-focus-within:rotate-180" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="flex w-fit min-w-full flex-col gap-2 text-sm text-zinc-700">
          <thead>
            <tr className="grid w-full grid-cols-[minmax(6rem,1fr)_minmax(10rem,2fr)_minmax(10rem,2fr)_minmax(6rem,1fr)_minmax(6rem,1fr)_minmax(6rem,1fr)] rounded-md bg-zinc-100">
              <th
                scope="col"
                onClick={() => handleSortBy("id")}
                className="flex cursor-pointer items-center gap-2 px-2 py-3 text-left text-xs font-medium uppercase tracking-wider hover:text-zinc-900"
              >
                ID
                {sortBy?.col === "id" ? (
                  sortBy.type === "asc" ? (
                    <ChevronDownIcon className="h-4 w-4" />
                  ) : (
                    <ChevronUpIcon className="h-4 w-4" />
                  )
                ) : (
                  <ChevronsUpDownIcon className="h-4 w-4" />
                )}
              </th>
              <th
                scope="col"
                onClick={() => handleSortBy("sender")}
                className="flex cursor-pointer items-center gap-2 px-2 py-3 text-left text-xs font-medium uppercase tracking-wider hover:text-zinc-900"
              >
                Sender
                {sortBy?.col === "sender" ? (
                  sortBy.type === "asc" ? (
                    <ChevronDownIcon className="h-4 w-4" />
                  ) : (
                    <ChevronUpIcon className="h-4 w-4" />
                  )
                ) : (
                  <ChevronsUpDownIcon className="h-4 w-4" />
                )}
              </th>
              <th
                scope="col"
                onClick={() => handleSortBy("receiver")}
                className="flex cursor-pointer items-center gap-2 px-2 py-3 text-left text-xs font-medium uppercase tracking-wider hover:text-zinc-900"
              >
                Receiver
                {sortBy?.col === "receiver" ? (
                  sortBy.type === "asc" ? (
                    <ChevronDownIcon className="h-4 w-4" />
                  ) : (
                    <ChevronUpIcon className="h-4 w-4" />
                  )
                ) : (
                  <ChevronsUpDownIcon className="h-4 w-4" />
                )}
              </th>
              <th
                scope="col"
                onClick={() => handleSortBy("amount")}
                className="flex cursor-pointer items-center gap-2 px-2 py-3 text-left text-xs font-medium uppercase tracking-wider hover:text-zinc-900"
              >
                Amount
                {sortBy?.col === "amount" ? (
                  sortBy.type === "asc" ? (
                    <ChevronDownIcon className="h-4 w-4" />
                  ) : (
                    <ChevronUpIcon className="h-4 w-4" />
                  )
                ) : (
                  <ChevronsUpDownIcon className="h-4 w-4" />
                )}
              </th>
              <th
                scope="col"
                onClick={() => handleSortBy("status")}
                className="flex cursor-pointer items-center gap-2 px-2 py-3 text-left text-xs font-medium uppercase tracking-wider hover:text-zinc-900"
              >
                Status
                {sortBy?.col === "status" ? (
                  sortBy.type === "asc" ? (
                    <ChevronDownIcon className="h-4 w-4" />
                  ) : (
                    <ChevronUpIcon className="h-4 w-4" />
                  )
                ) : (
                  <ChevronsUpDownIcon className="h-4 w-4" />
                )}
              </th>
              <th
                scope="col"
                onClick={() => handleSortBy("date")}
                className="flex cursor-pointer items-center gap-2 px-2 py-3 text-left text-xs font-medium uppercase tracking-wider hover:text-zinc-900"
              >
                Date
                {sortBy?.col === "date" ? (
                  sortBy.type === "asc" ? (
                    <ChevronDownIcon className="h-4 w-4" />
                  ) : (
                    <ChevronUpIcon className="h-4 w-4" />
                  )
                ) : (
                  <ChevronsUpDownIcon className="h-4 w-4" />
                )}
              </th>
            </tr>
          </thead>
          <tbody className="flex flex-col bg-white">
            {error ? (
              <tr className="flex h-40 items-center justify-center">
                <td className="flex items-center gap-2">
                  <CircleAlert className="h-4 w-4 text-red-500" />
                  {error}
                </td>
              </tr>
            ) : (
              sortedTransactions.map((transaction) => (
                <tr
                  onClick={() =>
                    router.push(`/transactions/${transaction._id}`)
                  }
                  key={transaction._id}
                  className="grid cursor-pointer grid-cols-[minmax(6rem,1fr)_minmax(10rem,2fr)_minmax(10rem,2fr)_minmax(6rem,1fr)_minmax(6rem,1fr)_minmax(6rem,1fr)] border-b border-gray-200 duration-200 hover:bg-zinc-100"
                >
                  <td className="whitespace-nowrap px-2 py-3">
                    #{transaction._id.slice(18)}
                  </td>
                  <td className="whitespace-nowrap px-2 py-3">
                    {transaction.senderName}
                  </td>
                  <td className="whitespace-nowrap px-2 py-3">
                    {transaction.receiverName}
                  </td>
                  <td className="whitespace-nowrap px-2 py-3">
                    {transaction.amount.toFixed(2)}
                  </td>
                  <td className={`whitespace-nowrap px-2 py-3`}>
                    <span
                      className={`rounded-full px-2 py-1 ${
                        transaction.status === "Completed"
                          ? "bg-green-100 text-green-600"
                          : transaction.status === "Pending"
                            ? "bg-amber-100 text-amber-600"
                            : "bg-red-100 text-red-600"
                      }`}
                    >
                      {transaction.status}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-2 py-3">
                    {new Date(transaction.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
