import { ClientOnly } from "@/components/layout/client-only";
import "@/styles/globals.css";
import { theme } from "@/styles/theme";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { ThemeProvider } from "@mui/material/styles";
import { Analytics } from "@vercel/analytics/react";
import type { AppProps } from "next/app";
import { Provider as RWBProvider } from "react-wrap-balancer";
import { Toaster } from "sonner";

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <RWBProvider>
        <ClientOnly>
          <Toaster position="top-center" richColors />
          <Component {...pageProps} />
        </ClientOnly>
      </RWBProvider>
      <Analytics />
    </ThemeProvider>
  );
}

export default MyApp;
