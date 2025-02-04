"use client";
import { fetchTransactions } from "@/services/transactionServices";
import {
  ChevronDown,
  ChevronDownIcon,
  ChevronsUpDownIcon,
  ChevronUpIcon,
  CircleAlert,
  ListFilterIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";

export type TransactionType = {
  id: string;
  senderName: string;
  receiverName: string;
  amount: number;
  status: "Completed" | "Pending" | "Failed";
};

export default function TransactionTable() {
  const [transactions, setTransactions] = useState<TransactionType[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<{
    col: string;
    type: "asc" | "dsc";
  }>({ col: "id", type: "asc" });
  const [filterBy, setFilterBy] = useState("all");

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data, error } = await fetchTransactions();
      if (error !== null) {
        setError(error);
      } else {
        setTransactions(data);
      }
      setLoading(false);
    })();
  }, []);

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
          ? a.id.localeCompare(b.id)
          : b.id.localeCompare(a.id),
      );
      break;

    case "sender":
      sortedTransactions = sortedTransactions.sort((a, b) =>
        sortBy.type === "asc"
          ? a.senderName.localeCompare(b.senderName)
          : b.senderName.localeCompare(a.senderName),
      );
      break;

    case "sender":
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
      <div className="flex justify-between gap-4 py-4">
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
      <div className="w-full overflow-x-auto">
        <table className="flex w-full flex-col text-sm text-zinc-700">
          <thead>
            <tr className="grid w-full grid-cols-[1fr_2fr_2fr_1fr_1fr] rounded-md bg-zinc-100">
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
                .map((row, i) => (
                  <tr
                    key={i}
                    className="mt-2 animate-pulse rounded-md bg-zinc-300 p-4"
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
                  key={transaction.id}
                  className="grid grid-cols-[1fr_2fr_2fr_1fr_1fr]"
                >
                  <td className="px-2 py-3">{transaction.id}</td>
                  <td className="px-2 py-3">{transaction.senderName}</td>
                  <td className="px-2 py-3">{transaction.receiverName}</td>
                  <td className="px-2 py-3">{transaction.amount.toFixed(2)}</td>
                  <td className={`px-2 py-3`}>
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
