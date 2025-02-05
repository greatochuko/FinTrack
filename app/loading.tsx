import LoadingIndicator from "@/components/LoadingIndicator";
import React from "react";

export default function loading() {
  return (
    <div className="flex flex-1 items-center justify-center">
      <LoadingIndicator size={28} />
    </div>
  );
}
