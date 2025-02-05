import { createTransaction } from "@/actions/transactionActions";
import { StatusType, TransactionType } from "@/db/models/Transaction";
import { DollarSignIcon, XIcon } from "lucide-react";
import React, { useState } from "react";

export default function CreateTransactionModal({
  open,
  closeModal,
}: {
  open: boolean;
  closeModal(): void;
}) {
  const [transactionData, setTransactionData] = useState<
    Partial<TransactionType>
  >({
    senderName: "",
    receiverName: "",
    amount: 0,
    status: "Completed",
  });
  const [loading, setLoading] = useState(false);

  function updateTransactionData<T extends keyof typeof transactionData>(
    fieldName: T,
    value: (typeof transactionData)[T],
  ) {
    setTransactionData((curr) => ({ ...curr, [fieldName]: value }));
  }
  const [error, setError] = useState("");

  const cannotSubmit = Object.entries(transactionData).some(
    ([key, value]) =>
      !value.toString().trim() || (key === "amount" && !Number(value)),
  );

  async function handleCreateTransaction(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const { error } = await createTransaction(transactionData);
    if (error) {
      setError(error);
    } else {
      closeModal();
    }
    setLoading(false);
  }

  return (
    <div
      onClick={closeModal}
      className={`fixed left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-black/50 duration-200 ${open ? "visible opacity-100" : "invisible opacity-0"}`}
    >
      <div
        className="w-[90%] max-w-xl overflow-hidden overflow-y-auto rounded-lg bg-white"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <h3 className="border-b p-4 text-center text-lg font-medium">
            New Transaction
          </h3>
          <button
            onClick={closeModal}
            className="group absolute right-2 top-1/2 -translate-y-1/2 p-2"
          >
            <XIcon className="h-4 w-4 text-zinc-500 duration-200 group-hover:text-zinc-900" />
          </button>
        </div>
        <form
          onSubmit={handleCreateTransaction}
          className="flex flex-col gap-4 p-4 text-sm"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="senderName" className="font-medium">
              Sender name
            </label>
            <input
              type="text"
              name="senderName"
              id="senderName"
              value={transactionData.senderName}
              onChange={(e) =>
                updateTransactionData("senderName", e.target.value)
              }
              autoComplete="off"
              placeholder="e.g. John Doe"
              className="rounded-lg border p-2 ring-zinc-300 ring-offset-1 focus-visible:ring-2"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="receiverName" className="font-medium">
              Receiver name
            </label>
            <input
              type="text"
              name="receiverName"
              id="receiverName"
              value={transactionData.receiverName}
              onChange={(e) =>
                updateTransactionData("receiverName", e.target.value)
              }
              autoComplete="off"
              placeholder="e.g. Sarah Smith"
              className="rounded-lg border p-2 ring-zinc-300 ring-offset-1 focus-visible:ring-2"
            />
          </div>
          <div className="relative flex flex-col gap-2">
            <label htmlFor="amount" className="font-medium">
              Amount
            </label>
            <input
              type="number"
              name="amount"
              id="amount"
              value={transactionData.amount}
              onChange={(e) =>
                updateTransactionData("amount", Number(e.target.value))
              }
              autoComplete="off"
              className="rounded-lg border p-2 pl-8 ring-zinc-300 ring-offset-1 focus-visible:ring-2"
            />
            <span className="absolute bottom-3 left-2 font-medium">
              <DollarSignIcon className="h-3.5 w-3.5" />
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="status" className="font-medium">
              Status
            </label>
            <select
              name="status"
              id="status"
              tabIndex={0}
              value={transactionData.status}
              onChange={(e) =>
                updateTransactionData("status", e.target.value as StatusType)
              }
              className="rounded-lg border p-2 ring-zinc-300 ring-offset-1 focus-visible:ring-2"
            >
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </div>

          <button
            type="submit"
            disabled={loading || cannotSubmit}
            className="rounded-lg bg-blue-500 px-4 py-2 font-medium text-white ring-blue-400 ring-offset-1 duration-200 hover:bg-blue-500/90 focus-visible:ring-2 disabled:cursor-not-allowed disabled:bg-blue-500/50"
          >
            {loading ? "Creating..." : "Create Transaction"}
          </button>
        </form>
      </div>
    </div>
  );
}
