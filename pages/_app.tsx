import { ClientOnly } from '@/components/layout/client-only'
import '@/styles/globals.css'
import { theme } from '@/styles/theme'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { Polybase } from '@polybase/client'
import { PolybaseProvider } from '@polybase/react'
import { Analytics } from '@vercel/analytics/react'
import type { AppProps } from 'next/app'
import { Provider as RWBProvider } from 'react-wrap-balancer'
import { Toaster } from 'sonner'

const polybase = new Polybase({
  defaultNamespace:
    'pk/0xa6ca155c486fde1b93ec326c8d6d625a24cea697027449ea8a51dad1752e26998fd99b0ff13d7d3078fe5154a819868d171a2317f121b7328e7d15ca674ae3b3/alpha',
})

function MyApp({ Component, pageProps: { ...pageProps } }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <PolybaseProvider polybase={polybase}>
        <RWBProvider>
          <ClientOnly>
            <Toaster position="top-center" richColors />
            <CssBaseline />
            <Component {...pageProps} />
          </ClientOnly>
        </RWBProvider>
        <Analytics />
      </PolybaseProvider>
    </ThemeProvider>
  )
}

export default MyApp
