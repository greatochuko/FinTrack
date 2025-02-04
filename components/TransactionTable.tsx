"use client";
import { fetchTransactions } from "@/services/transactionServices";
import {
  ChevronDown,
  ChevronsUpDown,
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

  function handleSortBy(sort: string) {}

  return (
    <div>
      <div className="flex justify-between gap-4 py-4">
        <h2 className="text-lg font-medium">Transactions</h2>
        <div className="relative">
          <select
            name="filter"
            id="filter"
            className="peer appearance-none rounded-md border p-2 px-7 text-sm ring-zinc-300 ring-offset-1 focus-visible:ring-2"
          >
            <option value="all">All</option>
            <option value="all">Completed</option>
            <option value="all">Pending</option>
            <option value="all">Failed</option>
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
                <ChevronsUpDown className="h-4 w-4" />
              </th>
              <th
                scope="col"
                onClick={() => handleSortBy("sender")}
                className="flex cursor-pointer items-center gap-2 px-2 py-3 text-left text-xs font-medium uppercase tracking-wider hover:text-zinc-900"
              >
                Sender
                <ChevronsUpDown className="h-4 w-4" />
              </th>
              <th
                scope="col"
                onClick={() => handleSortBy("receiver")}
                className="flex cursor-pointer items-center gap-2 px-2 py-3 text-left text-xs font-medium uppercase tracking-wider hover:text-zinc-900"
              >
                Receiver
                <ChevronsUpDown className="h-4 w-4" />
              </th>
              <th
                scope="col"
                onClick={() => handleSortBy("amount")}
                className="flex cursor-pointer items-center gap-2 px-2 py-3 text-left text-xs font-medium uppercase tracking-wider hover:text-zinc-900"
              >
                Amount
                <ChevronsUpDown className="h-4 w-4" />
              </th>
              <th
                scope="col"
                onClick={() => handleSortBy("status")}
                className="flex cursor-pointer items-center gap-2 px-2 py-3 text-left text-xs font-medium uppercase tracking-wider hover:text-zinc-900"
              >
                Status
                <ChevronsUpDown className="h-4 w-4" />
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
              transactions.map((transaction) => (
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
