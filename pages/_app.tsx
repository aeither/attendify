import { ClientOnly } from '@/components/layout/client-only'
import { useDarkMode } from '@/lib/hooks/use-dark-mode'
import '@/styles/globals.css'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import CssBaseline from '@mui/material/CssBaseline'
import type { Theme } from '@mui/material/styles'
import { ThemeProvider } from '@mui/material/styles'
import { Polybase } from '@polybase/client'
import { PolybaseProvider } from '@polybase/react'
import { SafeThemeProvider } from '@safe-global/safe-react-components'
import '@safe-global/safe-react-components/dist/fonts.css'
import { Analytics } from '@vercel/analytics/react'
import { ConnectKitProvider, getDefaultClient } from 'connectkit'
import type { AppProps } from 'next/app'
import { Provider as RWBProvider } from 'react-wrap-balancer'
import { Toaster } from 'sonner'
import { createClient, WagmiConfig } from 'wagmi'
import { optimism, optimismGoerli } from 'wagmi/chains'
// import { WalletConnectConnector } from 'wagmi/connectors/walletConnect'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

const polybase = new Polybase({
  defaultNamespace: 'test-one',
})

if (!process.env.NEXT_PUBLIC_ALCHEMY_ID)
  throw new Error('NEXT_PUBLIC_ALCHEMY_ID not found')
const alchemyId = process.env.NEXT_PUBLIC_ALCHEMY_ID

const chains = [optimism, optimismGoerli]

const client = createClient(
  getDefaultClient({
    appName: 'Attendify',
    alchemyId,
    chains,
    // enableWebSocketProvider: false,
    // connectors: [
    //   new WalletConnectConnector({
    //     chains: chains,
    //     options: {
    //       projectId: '',
    //       showQrModal: false,
    //     },
    //   }),
    // ],
  }),
)

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  const isDarkMode = useDarkMode()
  const themeMode = isDarkMode ? 'dark' : 'light'

  return (
    <SafeThemeProvider mode={themeMode}>
      {(safeTheme: Theme) => (
        <ThemeProvider theme={safeTheme}>
          <PolybaseProvider polybase={polybase}>
            <WagmiConfig client={client}>
              <ConnectKitProvider theme="midnight">
                <RWBProvider>
                  <ClientOnly>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <Toaster position="top-center" richColors theme="dark" />
                      <CssBaseline />
                      <Component {...pageProps} />
                    </LocalizationProvider>
                  </ClientOnly>
                </RWBProvider>
              </ConnectKitProvider>
            </WagmiConfig>
            <Analytics />
          </PolybaseProvider>
        </ThemeProvider>
      )}
    </SafeThemeProvider>
  )
}

export default MyApp
