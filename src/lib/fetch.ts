"use server";

// import { cookies } from "next/headers";

import { env } from "@/env";

export async function fetchWrapper<T = unknown>(
  input: string | URL,
  init?: RequestInit
): Promise<T> {
  try {
    /* const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value; */

    const headers = new Headers(init?.headers || {});
    headers.set("Content-Type", "application/json");
    /* if (token) headers.set("Authorization", `Bearer ${token}`); */

    const initWithAuth: RequestInit = {
      ...init,
      headers,
    };

    const url = new URL(input.toString(), env.NEXT_PUBLIC_BASE_URL);

    const response = await fetch(url.toString(), initWithAuth);

    if (env.NEXT_PUBLIC_ENABLE_API_DELAY && env.NODE_ENV === "test") {
      await new Promise((resolve) =>
        setTimeout(resolve, Math.round(Math.random() * 4000))
      );
    }

    if (!response.ok) {
      throw new Error(
        `Error ${response.status}: ${response.statusText || "Unknown error"}`
      );
    }

    return (await response.json()) as T;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Fetch Wrapper Error:", error);
    throw new Error("An error occurred while fetching data. Please try again.");
  }
}
