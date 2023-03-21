import EventCard from '@/components/event-card'
import Layout from '@/components/layout/layout'
import { useEvent } from '@/lib/hooks/use-polybase'
import { Typography } from '@mui/material'

export default function Home() {
  const { events } = useEvent()

  return (
      <Layout>
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
  )
}
