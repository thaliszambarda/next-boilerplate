import { setupServer } from "msw/node";

import { env } from "@/env";

import { handlers } from "./handlers";

export const server = setupServer(...handlers);

export async function enableMSW() {
  if (env.NODE_ENV !== "test") {
    return;
  }

  server.listen({ onUnhandledRequest: "warn" });
}
