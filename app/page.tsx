import AddNewTransactionBtn from "@/components/AddNewTransactionBtn";
import TransactionTable from "@/components/TransactionTable";

export default function Home() {
  return (
    <main className="mx-auto flex w-[90%] max-w-7xl flex-1 flex-col gap-4 py-4">
      <div className="flex flex-wrap items-center justify-between">
        <h1 className="whitespace-nowrap text-xl font-medium">
          Welcome to dashboard
        </h1>
        <AddNewTransactionBtn />
      </div>
      <TransactionTable />
    </main>
  );
}
