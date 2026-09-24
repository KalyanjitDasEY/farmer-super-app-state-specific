import { z } from "zod";

const serverEnvironmentSchema = z.object({
  MOCK_LATENCY_MS: z.coerce.number().int().min(0).max(2_000).default(80),
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
});

export const serverEnvironment = serverEnvironmentSchema.parse({
  MOCK_LATENCY_MS: process.env.MOCK_LATENCY_MS,
  NODE_ENV: process.env.NODE_ENV,
});
