import EventCard from '@/components/event-card'
import Layout from '@/components/layout/layout'
import { useEvent } from '@/lib/hooks/use-polybase'
import { Button, Stack, Typography } from '@mui/material'

export default function Home() {
  const { events } = useEvent()

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

        <Typography variant="h2" className="flex w-full justify-start">
          Events
        </Typography>
        <div className="flex w-full flex-col gap-2">
          {events &&
            events.map((event) => (
              <>
                <EventCard event={event} />
              </>
            ))}
        </div>
      </Layout>
    </>
  )
}
