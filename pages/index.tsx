import Layout from '@/components/layout/layout'
import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard'
import { useEncrypt, useAccount } from '@/lib/hooks/use-polybase'
import { CheckCircleOutline, ContentCopy } from '@mui/icons-material'
import { Button, IconButton, Typography } from '@mui/material'
import { useState } from 'react'

export default function Home() {
  const [nftId, setNftId] = useState('')
  const { copyToClipboard, hasCopied } = useCopyToClipboard()
  const { authed, signIn, signOut, updateName, address, name, deleteAccount } =
    useAccount()
  const { decrypt, encrypt } = useEncrypt()

  return (
    <>
      <Layout>
        {/* Encrypt */}
        <div className="flex gap-2">
          <Typography variant="h2">Encrypt</Typography>

          <Button
            onClick={async () => {
              // const encryptedData = await encrypt('hello')
            }}
            variant="contained"
          >
            Encrypt
          </Button>

          <Button
            onClick={async () => {
              // const encryptedData = await decrypt('hello')
            }}
            variant="contained"
          >
            Decrypt
          </Button>
        </div>

        {/* Auth */}
        <div className="flex gap-2">
          <Typography variant="h2">Auth</Typography>

          <Button onClick={() => updateName('hello')} variant="contained">
            Update record
          </Button>

          <Button onClick={() => deleteAccount()} variant="contained">
            Delete account
          </Button>

          {authed && address ? (
            <>
              <Typography variant="h3">{name}</Typography>
              <div className="flex items-center gap-2">
                <Typography>{address}</Typography>
                <IconButton onClick={() => copyToClipboard(address)}>
                  {hasCopied ? (
                    <CheckCircleOutline fontSize="small" />
                  ) : (
                    <ContentCopy fontSize="small" />
                  )}
                </IconButton>
              </div>
              <Button onClick={signOut} variant="contained">
                Logout
              </Button>
            </>
          ) : (
            <Button onClick={signIn} variant="contained">
              Login
            </Button>
          )}
        </div>
      </Layout>
    </>
  )
}
