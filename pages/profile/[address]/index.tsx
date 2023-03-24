import AttestationTabs from '@/components/attestation-tabs'
import Layout from '@/components/layout/layout'
import { useGivenAttestations, useReceivedAttestations } from '@/lib/hooks/use-atst'
import { Avatar, Divider, Typography } from '@mui/material'
import { useRouter } from 'next/router'

export default function Profile() {
  const router = useRouter()
  const { address } = router.query

  const { data: recievedAts } = useReceivedAttestations(address)
  const { data: givenAts } = useGivenAttestations(address)

  return (
    <Layout>
      {address && (
        <>
          <div className="flex w-full flex-col gap-2 rounded-lg bg-neutral-800 p-4 ">
            <Avatar src="" className="mt-8" sx={{ width: 56, height: 56 }} />
            <Typography variant="h2">
              {address.slice(0, 4) + '...' + address.slice(-4)}
            </Typography>
          </div>
        </>
      )}

      <Divider />

      <AttestationTabs givenAts={givenAts} recievedAts={recievedAts} />
    </Layout>
  )
}
