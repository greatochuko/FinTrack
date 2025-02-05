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
      <Suspense fallback={<TransactionTableFallback />}>
        <TransactionContainer query={query} />
      </Suspense>
    </main>
  );
}
