"use client";

import React from "react";

export default function AddNewTransactionBtn() {
  async function handlePopulate() {}
  return (
    <button
      onClick={handlePopulate}
      className="rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white duration-200 hover:bg-blue-500/90"
    >
      + New Transaction
    </button>
  );
}
