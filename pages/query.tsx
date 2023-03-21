import Layout from '@/components/layout/layout'
import { queryAttestations } from '@/lib/graphql/queries'
import { useMyAttestations } from '@/lib/hooks/use-atst'
import { Button, Typography } from '@mui/material'

export default function Home() {
  const { data } = useMyAttestations()
  console.log('🚀 ~ file: query.tsx:8 ~ Home ~ data:', data)

  return (
    <>
      <Layout>
        <Typography variant="h2" className="flex w-full justify-start">
          Events
        </Typography>
        {data?.attestations.map((atst) => (
          <>
            <Typography>{atst.transactionHash}</Typography>
          </>
        ))}
      </Layout>
    </>
  )
}
