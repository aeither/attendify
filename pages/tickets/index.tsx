import Layout from '@/components/layout/layout'
import TicketModal from '@/components/ticket-modal'
import { useEvent, useTicket } from '@/lib/hooks/use-polybase'
import Typography from '@mui/material/Typography'
import { useState } from 'react'

export default function Home() {
  const { userTickets } = useTicket()

  return (
    <>
      <Layout>
        <Typography variant="h2" className="flex w-full justify-start">
          Tickets
        </Typography>
        <div className="flex w-full flex-col gap-2">
          {userTickets &&
            userTickets.map((ticket) => (
              <>
                <TicketModal ticket={ticket} />
              </>
            ))}
        </div>
      </Layout>
    </>
  )
}
