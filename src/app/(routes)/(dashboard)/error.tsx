"use client";

import { XCircle } from "lucide-react";

export default function Error() {
  return (
    <div className="flex size-full flex-col items-center justify-center gap-y-3">
      <XCircle size={30} />
      <p>Ooh no! Something went wrong.</p>
    </div>
  );
}
