import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./lib/apollo/client";
import ContextProvider from "./contexts/ContextProvider";
import AppRoutes from "./components/routing/AppRoutes";
import { Toaster } from "@/components/ui/sonner";
import {  useThemeStore } from "./hooks/use-theme";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { NuqsAdapter } from 'nuqs/adapters/react-router/v7'

function App() {
  const isDarkMode = useThemeStore((state) => state.isDarkMode);
  const theme = useThemeStore((state) => state.theme);
  return (
    <NuqsAdapter>
    <Router>
      <ApolloProvider client={client}>
        <NextThemesProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
        >
          <ContextProvider>
            {/* <DevCrossPagesLinks /> */}
            <AppRoutes />
            <Toaster 
             key={theme}
             richColors
             theme={isDarkMode ? "dark" : "light"}
            //  theme={"dark"}
             closeButton={true}
              position="top-center"
             toastOptions={{
              closeButton: true,

             }}
             />
          </ContextProvider>
        </NextThemesProvider>
      </ApolloProvider>
    </Router>
    </NuqsAdapter>
  );
}

export default App;
