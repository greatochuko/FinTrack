import connectDb from "@/db/connectDB";
import Transaction, { TransactionType } from "@/db/models/Transaction";

export async function fetchAllTransactions(query?: string) {
  try {
    await connectDb();
    const transactions: TransactionType[] = JSON.parse(
      JSON.stringify(await Transaction.find().sort({ createdAt: -1 })),
    );
    const filteredTransactions =
      query && query !== "null" && query !== "undefined"
        ? transactions.filter(
            (tran) =>
              tran._id.toString().includes(query.toLowerCase()) ||
              tran.senderName.toLowerCase().includes(query.toLowerCase()) ||
              tran.receiverName.toLowerCase().includes(query.toLowerCase()),
          )
        : transactions;
    return { transactions: filteredTransactions, error: null };
  } catch (err) {
    const error = err as Error;
    console.log("Error fetching transactions: ", error.message);
    return {
      transactions: [],
      error: "An error occured fetching transactions",
    };
  }
}

export async function fetchTransaction(transactionId: string) {
  try {
    await connectDb();
    const transaction: TransactionType | null = JSON.parse(
      JSON.stringify(await Transaction.findById(transactionId)),
    );
    console.log({ transaction });
    return { transaction, error: null };
  } catch (err) {
    const error = err as Error;
    console.log("Error fetching transaction: ", error.message);
    return {
      transaction: null,
      error: `An error occured fetching transaction with ID ${transactionId}`,
    };
  }
}
