import "dotenv/config";

import { z } from "zod";

const viteEnvSchema = z.object({
  VITE_BASE_URL: z.string(),
  VITE_GQL_URL: z.string(),
  VITE_SOCKET_URL: z.string(),
});

const { data, error, success } = viteEnvSchema.safeParse(process.env);

if (!success) {
  throw new Error("Invalid environment variables" + error);
}

export const nodeEnvVariables = data!;
