import React from "react";
import TransactionTable from "./TransactionTable";
import { fetchAllTransactions } from "@/services/transactionServices";

export default async function TransactionContainer({
  query,
}: {
  query?: string;
}) {
  const { transactions, error } = await fetchAllTransactions(query);

  return <TransactionTable error={error} transactions={transactions} />;
}
