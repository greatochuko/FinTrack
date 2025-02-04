import connectDb from "@/db/connectDB";
import Transaction from "@/db/models/Transaction";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb();
    const transactions = await Transaction.find();
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
