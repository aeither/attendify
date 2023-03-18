import Layout from '@/components/layout/layout'
import { useEvent } from '@/lib/hooks/use-polybase'
import { Button, Typography } from '@mui/material'

export default function Home() {
  const { events } = useEvent()
  console.log('🚀 ~ file: index.tsx:7 ~ Home ~ events:', events)

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

          {events.map(event => (
            <>
            
            </>
          ))}
        </div>
      </Layout>
    </>
  )
}
