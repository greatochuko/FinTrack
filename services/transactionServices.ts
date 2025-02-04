export async function fetchTransactions() {
  try {
    const res = await fetch("/transactions.json");
    const data = await res.json();
    return { data, error: null };
  } catch (err) {
    const error = err as Error;
    console.log("Error fetching transactions: ", error.message);
    return { data: null, error: "An error occured fetching transactions" };
  }
}
