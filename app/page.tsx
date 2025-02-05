import AddNewTransactionBtn from "@/components/AddNewTransactionBtn";
import TransactionContainer from "@/components/TransactionContainer";
import TransactionTableFallback from "@/components/TransactionTableFallback";
import { Suspense } from "react";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) {
  const { query } = await searchParams;

  return (
    <main className="mx-auto flex w-[90%] max-w-7xl flex-1 flex-col gap-4 py-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="whitespace-nowrap text-xl font-medium">
          Welcome to the dashboard
        </h1>
        <AddNewTransactionBtn />
      </div>
      <Suspense fallback={<TransactionTableFallback />}>
        <TransactionContainer query={query} />
      </Suspense>
    </main>
  );
}
