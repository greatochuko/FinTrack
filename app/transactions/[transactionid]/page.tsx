import { fetchTransaction } from "@/services/transactionServices";
import { CheckIcon, ChevronLeftIcon, EllipsisIcon, XIcon } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

export default async function page({
  params,
}: {
  params: Promise<{ transactionId: string }>;
}) {
  const { transactionId } = await params;
  console.log({ transactionId });
  const { transaction, error } = await fetchTransaction(transactionId);

  if (error !== null) {
    return (
      <main className="flex flex-1 items-center justify-center">
        <p>{error}</p>
      </main>
    );
  }

  if (!transaction) notFound();

  const bgColor =
    transaction.status === "Completed"
      ? "bg-green-100"
      : transaction.status === "Pending"
        ? "bg-amber-100"
        : "bg-red-100";

  const fgColor =
    transaction.status === "Completed"
      ? "text-green-600"
      : transaction.status === "Pending"
        ? "text-amber-500"
        : "text-red-500";

  const TransactionIcon =
    transaction.status === "Completed"
      ? CheckIcon
      : transaction.status === "Pending"
        ? EllipsisIcon
        : XIcon;

  return (
    <main className="flex flex-1 items-center justify-center">
      <div className="flex w-[90%] max-w-lg flex-col gap-4 rounded-lg border p-4 shadow">
        <h1 className="flex items-center gap-2 text-lg font-medium">
          <Link href={"/"} className="group block p-2">
            <ChevronLeftIcon
              className="h-4 w-4 text-zinc-500 duration-200 group-hover:text-zinc-900"
              strokeWidth={3}
            />
          </Link>
          Transaction Details
        </h1>

        <div className="flex items-center gap-2 rounded-xl border p-4">
          <div className={`rounded-full ${bgColor} p-3`}>
            <TransactionIcon className={`h-6 w-6 ${fgColor}`} />
          </div>
          <div>
            <h2 className="font-medium">
              Transfer to {transaction.receiverName.split(" ")[0]}
            </h2>
            <p className={`text-sm ${fgColor}`}>{transaction.status}</p>
          </div>
          <p className="ml-auto self-start text-xl font-medium">
            ${transaction.amount.toFixed(2)}
          </p>
        </div>
        <ul className="flex flex-col gap-2 text-sm font-medium sm:text-base">
          <li className="flex items-center justify-between">
            <span className="text-zinc-500">Transaction ID</span>
            <span className="">#{transaction._id}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-zinc-500">Status</span>
            <span
              className={`flex items-center gap-1 rounded-full px-2 py-1 ${bgColor} ${fgColor}`}
            >
              <TransactionIcon className="h-3 w-3" strokeWidth={3} />
              {transaction.status}
            </span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-zinc-500">Sender</span>
            <span className="">{transaction.senderName}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-zinc-500">Receiver</span>
            <span className="">{transaction.receiverName}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-zinc-500">Amount</span>
            <span className="">${transaction.amount.toFixed(2)}</span>
          </li>
          <li className="flex items-center justify-between">
            <span className="text-zinc-500">Transaction Date</span>
            <span className="">
              {new Date(transaction.createdAt).toDateString()}
            </span>
          </li>
        </ul>
      </div>
    </main>
  );
}
