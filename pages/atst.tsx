import { Attest } from '@/components/attest'
import Layout from '@/components/layout/layout'
import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard'
import { useEncrypt, useAccount } from '@/lib/hooks/use-polybase'
import { CheckCircleOutline, ContentCopy } from '@mui/icons-material'
import { Button, IconButton, Typography } from '@mui/material'
import { useState } from 'react'

export default function Home() {
  return (
    <>
      <Layout>
        <Attest />
      </Layout>
    </>
  )
}
