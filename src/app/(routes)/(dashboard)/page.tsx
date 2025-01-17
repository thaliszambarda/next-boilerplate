import { Suspense } from "react";

import type { IHelloWorldResponse } from "@/api/mocks/get-hello-world-mock";
import { fetchWrapper } from "@/lib/fetch";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HelloWorld />
    </Suspense>
  );
}

export async function HelloWorld() {
  const data = await fetchWrapper<IHelloWorldResponse>("hello");
  return (
    <div>
      <h1>{data?.welcome}</h1>
    </div>
  );
}
