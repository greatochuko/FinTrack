import { HandCoinsIcon, PackageIcon, SendIcon, WalletIcon } from "lucide-react";

const dailyTransactions = [
  { day: "sunday", amount: 2000 },
  { day: "monday", amount: 3000 },
  { day: "tuesday", amount: 3500 },
  { day: "wednesday", amount: 2500 },
  { day: "thursday", amount: 600 },
  { day: "friday", amount: 1500 },
  { day: "saturday", amount: 4700 },
];

const maxTransactionAmount = Math.max(
  ...dailyTransactions.map((transaction) => transaction.amount),
);

export default function DashboardStats() {
  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <div className="grid flex-1 grid-cols-2 gap-4">
        <div className="flex flex-col gap-2 rounded-lg border p-4">
          <h2 className="flex items-center justify-between text-sm font-medium">
            Balance <WalletIcon className="h-4 w-4 text-blue-500" />
          </h2>
          <p className="text-lg font-semibold">₦50,000</p>
          <p className="text-sm text-zinc-500">20% from last month</p>
        </div>
        <div className="flex flex-col gap-2 rounded-lg border p-4">
          <h2 className="flex items-center justify-between text-sm font-medium">
            Sent <SendIcon className="h-4 w-4 text-red-500" />
          </h2>
          <p className="text-lg font-semibold">₦50,000</p>
          <p className="text-sm text-zinc-500">20% from last month</p>
        </div>
        <div className="flex flex-col gap-2 rounded-lg border p-4">
          <h2 className="flex items-center justify-between text-sm font-medium">
            Received <HandCoinsIcon className="h-4 w-4 text-green-600" />
          </h2>
          <p className="text-lg font-semibold">₦50,000</p>
          <p className="text-sm text-zinc-500">20% from last month</p>
        </div>
        <div className="flex flex-col gap-2 rounded-lg border p-4">
          <h2 className="flex items-center justify-between text-sm font-medium">
            Transactions <PackageIcon className="h-4 w-4 text-amber-500" />
          </h2>
          <p className="text-lg font-semibold">27</p>
          <p className="text-sm text-zinc-500">20% from last month</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-2 rounded-lg border p-4 text-sm">
        <div className="grid flex-1 grid-cols-[24,_repeat(7,_1fr)] gap-2 sm:gap-4">
          <ul className="flex w-fit flex-col justify-between gap-4 text-end md:gap-0">
            <li>50k</li>
            <li>40k</li>
            <li>30k</li>
            <li>20k</li>
            <li>10k</li>
            <li>0</li>
          </ul>
          {dailyTransactions.map((transaction) => (
            <div
              key={transaction.amount}
              className="group relative mt-auto cursor-pointer rounded-md bg-blue-500 duration-200 hover:bg-blue-400"
              style={{
                height: (transaction.amount / maxTransactionAmount) * 100 + "%",
              }}
            >
              <div className="invisible absolute left-1/2 top-0 -translate-x-1/2 -translate-y-[90%] rounded-md border bg-white px-2 py-1 opacity-0 shadow duration-300 group-hover:visible group-hover:-translate-y-[110%] group-hover:opacity-100">
                {transaction.amount}
              </div>
            </div>
          ))}
        </div>
        <ul className="grid grid-cols-[24,_repeat(7,_1fr)] justify-between gap-2 text-center sm:gap-4">
          <li></li>
          <li>Sun</li>
          <li>Mon</li>
          <li>Tue</li>
          <li>Wed</li>
          <li>Thu</li>
          <li>Fri</li>
          <li>Sat</li>
        </ul>
      </div>
    </div>
  );
}
