import TransactionTable from "@/components/TransactionTable";
import { fetchAllTransactions } from "@/services/transactionServices";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;

  const { transactions, error } = await fetchAllTransactions(query);

  return (
    <main className="mx-auto flex w-[90%] max-w-7xl flex-1 flex-col gap-4 py-4">
      <TransactionTable transactions={transactions} error={error} />
    </main>
  );
}
