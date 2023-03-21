import Layout from '@/components/layout/layout'
import { queryAttestations } from '@/lib/graphql/simple-queries'
import { Button, Typography } from '@mui/material'

export default function Home() {
  const queryAtst = async () => {
    let qAttestations = await queryAttestations({
      creator: '0x33413c433dd28c5e0a90cba7b0a6f98d3ab971fb',
    })
    console.log('🚀 ~ file: query.tsx:14 ~ queryAtst ~ qAttestations:', qAttestations)
  }
  return (
    <>
      <Layout>
        <Typography variant="h2" className="flex w-full justify-start">
          Events
        </Typography>
        <Button onClick={queryAtst}>Fetch</Button>
      </Layout>
    </>
  )
}
