import { z } from "zod";

const viteEnvSchema = z.object({
  VITE_BASE_URL: z.string(),
  VITE_GQL_URL: z.string(),
  VITE_SOCKET_URL: z.string(),
  VITE_GOOGLE_CLIENT_ID: z.string(),
  VITE_FB_APP_ID: z.string(),
  VITE_BACKEND_URL: z.string(),
  VITE_LINKEDIN_CLIENT_ID: z.string().default("7787ucithznmod"),
  VITE_CONNECT_ACCOUNT_REDIRECT_URL: z.string().default("/settings")
});

type EnvVariables = z.infer<typeof viteEnvSchema>;

const { data, error, success } = viteEnvSchema.safeParse(import.meta.env);

if (!success) {
  throw new Error("Invalid environment variables" + error);
}

export const envVariables = data!;

// VITE_GOOGLE_CLIENT_ID = "483685283004-evj9qkbamhn381fos115kjoucnnj9h6c.apps.googleusercontent.com";
// VITE_FB_APP_ID = "1194936455227835";
// NODE_ENV = "development";
// VITE_FACEBOOK_AUTH_URL = "https://flowbizcrm-api.vercel.app/fb/auth/facebook";
// VITE_BASE_URL = "http://localhost:5173";
// VITE_SOCKET_URL = "ws://localhost:3001/graphql";
// VITE_GQL_URL = "http://localhost:3001/graphql";





