"use client";
import { TransactionType } from "@/db/models/Transaction";
import {
  ChevronDown,
  ChevronDownIcon,
  ChevronsUpDownIcon,
  ChevronUpIcon,
  CircleAlert,
  ListFilterIcon,
} from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function TransactionTable() {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<{
    col: string;
    type: "asc" | "dsc";
  }>({ col: "id", type: "asc" });
  const [filterBy, setFilterBy] = useState("all");
  const searchParams = useSearchParams();

  const query = searchParams.get("query");

  const router = useRouter();

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/transactions?query=${query}`);
        const data = await res.json();
        setTransactions(data.data);
      } catch (err) {
        const error = err as Error;
        console.log("Error fetching transactions: ", error.message);
        setError("An error occured fetching transactions");
      } finally {
        setLoading(false);
      }
    })();
  }, [query]);

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
          ? a.senderName.localeCompare(b.senderName)
          : b.senderName.localeCompare(a.senderName),
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

    default:
      break;
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
          <ChevronDown className="absolute right-2 top-1/2 h-4 w-4 -translate-y-1/2 peer-focus-within:rotate-180" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="flex w-fit min-w-full flex-col gap-2 text-sm text-zinc-700">
          <thead>
            <tr className="grid w-full grid-cols-[minmax(6rem,1fr)_minmax(10rem,2fr)_minmax(10rem,2fr)_minmax(6rem,1fr)_minmax(6rem,1fr)] rounded-md bg-zinc-100">
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
            </tr>
          </thead>
          <tbody className="flex flex-col divide-y divide-gray-200 bg-white">
            {loading ? (
              Array(5)
                .fill("")
                .map((_, i) => (
                  <tr
                    key={i}
                    className="mt-2 animate-pulse rounded-md bg-zinc-300 p-5"
                    style={{ animationDelay: i * 150 + "ms" }}
                  ></tr>
                ))
            ) : error ? (
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
                  className="grid cursor-pointer grid-cols-[minmax(6rem,1fr)_minmax(10rem,2fr)_minmax(10rem,2fr)_minmax(6rem,1fr)_minmax(6rem,1fr)] duration-200 hover:bg-zinc-100"
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
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
