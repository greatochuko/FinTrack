import connectDb from "@/db/connectDB";
import Transaction, { TransactionType } from "@/db/models/Transaction";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    await connectDb();
    const searchParams = new URL(req.url).searchParams;
    const query = searchParams.get("query") || "";
    const transactions: TransactionType[] = await Transaction.find();
    const filteredTransactions =
      query && query !== "null" && query !== "undefined"
        ? transactions.filter(
            (tran) =>
              tran._id.toString().includes(query.toLowerCase()) ||
              tran.senderName.toLowerCase().includes(query.toLowerCase()) ||
              tran.receiverName.toLowerCase().includes(query.toLowerCase()),
          )
        : transactions;
    return NextResponse.json({ data: filteredTransactions, error: null });
  } catch (err) {
    const error = err as Error;
    console.log("Error fetching transactions: ", error.message);
    return NextResponse.json(
      { data: null, error: "An error occured fetching transactions" },
      { status: 500 },
    );
  }
}
