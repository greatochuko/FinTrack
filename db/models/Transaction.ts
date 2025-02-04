import mongoose from "mongoose";

export type TransactionType = {
  _id: string;
  senderName: string;
  receiverName: string;
  amount: number;
  status: "Completed" | "Pending" | "Failed";
  createdAt: string;
  updatedAt: string;
};

const TransactionSchema = new mongoose.Schema<TransactionType>(
  {
    senderName: { type: String, required: true },
    receiverName: { type: String, required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      required: true,
      enum: ["Completed", "Pending", "Failed"],
    },
  },
  { timestamps: true },
);

const Transaction =
  mongoose.models.Transaction ||
  mongoose.model("Transaction", TransactionSchema);

export default Transaction;
