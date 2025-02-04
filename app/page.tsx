import DashboardStats from "@/components/DashboardStats";
import TransactionTable from "@/components/TransactionTable";

export default function Home() {
  return (
    <main className="mx-auto flex w-[90%] max-w-7xl flex-1 flex-col gap-4 py-4">
      <h1 className="text-xl font-medium">Welcome to dashboard</h1>
      <DashboardStats />
      <TransactionTable />
    </main>
  );
}
