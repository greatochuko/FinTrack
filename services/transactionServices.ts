import connectDb from "@/db/connectDB";
import Transaction, { TransactionType } from "@/db/models/Transaction";

export async function fetchTransaction(transactionId: string) {
  try {
    await connectDb();
    const transaction: TransactionType | null = JSON.parse(
      JSON.stringify(await Transaction.findById(transactionId)),
    );
    return { transaction, error: null };
  } catch (err) {
    const error = err as Error;
    console.log("Error fetching transactions: ", error.message);
    return {
      transaction: null,
      error: "An error occured fetching transactions",
    };
  }
}
