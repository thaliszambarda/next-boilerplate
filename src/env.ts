import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["production", "development", "test"]),
  NEXT_PUBLIC_BASE_URL: z.string(),
  NEXT_PUBLIC_ENABLE_API_DELAY: z
    .string()
    .transform((value: string) => value === "true"),
});

export const env = envSchema.parse(process.env);
