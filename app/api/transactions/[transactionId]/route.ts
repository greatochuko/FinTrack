import connectDB from "@/db/connectDB";
import Transaction from "@/db/models/Transaction";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const transactionId = url.pathname.split("/").at(-1);
  try {
    await connectDB();
    const transaction = await Transaction.findById(transactionId);
    return NextResponse.json({ data: transaction, error: null });
  } catch (err) {
    const error = err as Error;
    console.log("Error fetching transaction: ", error.message);
    return NextResponse.json(
      {
        data: null,
        error: `An error occured fetching transaction with ID ${transactionId}`,
      },
      { status: 500 },
    );
  }
}
