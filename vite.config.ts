import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import analyze from "rollup-plugin-analyzer";
import viteGraphQLUsages from "vite-plugin-graphql-usage";
import "dotenv/config"
// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  console.log("Vite mode:", mode);
  console.log("Vite GraphQL URL:", process.env.VITE_GQL_URL);
  if (mode === "development") {
    process.env = { ...process.env, ...loadEnv(mode, process.cwd(), "") };
  }
  return {
    server: {
      port: process.env.VITE_PORT ? parseInt(process.env.VITE_PORT, 10) : 3007,
      watch: {
        ignored: ["**/*.test.ts", "**/tests/**"],
      },
    },
    plugins: [
      react({
        babel: {
          plugins: [["babel-plugin-react-compiler"]],
        },
      }),
      viteGraphQLUsages({
        schemaSource: {
          endpoint: process.env.VITE_GQL_URL || "http://localhost:4000/graphql",
        },
        exclude: ["**/*.test.ts", "**/tests/**", "src/__generated__/**"],
        printTable: true,
        sortOrder: "completed-first",
      }),
      tailwindcss(),
      tsconfigPaths(),
      analyze({
        // highlight the modules with size > 40kb
        filter(moduleObject) {
          return moduleObject.size > 50000;
        },
      }),
    ],
  };
});




