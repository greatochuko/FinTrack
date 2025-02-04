import connectDb from "@/db/connectDB";
import Transaction from "@/db/models/Transaction";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const transactionId = url.pathname.split("/").at(-1);
    await connectDb();
    const transactions = await Transaction.findById(transactionId);
    return NextResponse.json({ data: transactions, error: null });
  } catch (err) {
    const error = err as Error;
    console.log("Error fetching transactions: ", error.message);
    return NextResponse.json(
      { data: null, error: "An error occured fetching transactions" },
      { status: 500 },
    );
  }
}
