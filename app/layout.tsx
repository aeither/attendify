import "@/styles/globals.css"
import "@fontsource/montserrat"
import CssBaseline from "@mui/material/CssBaseline/CssBaseline"
import { StyledEngineProvider } from "@mui/material/styles"

import { Analytics } from "@/components/analytics"
import { ThemeProvider } from "@/components/theme-provider"
import { theme } from "@/styles/theme"

interface RootLayoutProps {
  children: React.ReactNode
}

export const metadata = {
  title: "Next.js",
  description: "Generated by Next.js",
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body>
          <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {children}
            </ThemeProvider>
          </StyledEngineProvider>
          <Analytics />
        </body>
      </html>
    </>
  )
}
