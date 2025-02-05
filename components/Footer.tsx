import React from "react";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 p-6">
      <p className="text-center text-sm text-zinc-400">
        &copy; {new Date().getFullYear()} LedgerView by Great Ogheneochuko
      </p>
    </footer>
  );
}
