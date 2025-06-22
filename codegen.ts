import { CodegenConfig } from "@graphql-codegen/cli";
import { nodeEnvVariables } from "./src/node-env";
const config: CodegenConfig = {
  schema: nodeEnvVariables.VITE_GQL_URL, // URL to your GraphQL schema
  // this assumes that all your source files are in a top-level `src/` directory - you might need to adjust this to your file structure
  documents: ["src/**/*.{ts,tsx}"],
  generates: {
    "./src/__generated__/": {
      preset: "client",
      plugins: [],
      presetConfig: {
        gqlTagName: "gql",
      },
    },
  },
  ignoreNoDocuments: true,
};

export default config;
