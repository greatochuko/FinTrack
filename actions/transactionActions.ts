"use server";

import Transaction, { TransactionType } from "@/db/models/Transaction";
import { revalidatePath } from "next/cache";

export async function createTransaction(
  transactionData: Partial<TransactionType>,
) {
  try {
    const newTransaction: TransactionType = JSON.parse(
      JSON.stringify(await Transaction.create(transactionData)),
    );
    revalidatePath("/");
    return { newTransaction, error: null };
  } catch (err) {
    const error = err as Error;
    console.log("Error creating transaction: ", error.message);
    return {
      newTransaction: null,
      error: "An error occured creating new transaction",
    };
  }
}
