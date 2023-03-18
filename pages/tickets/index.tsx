import { useState } from 'react'
import { FormContainer, TextFieldElement } from 'react-hook-form-mui'
import QRCode from 'react-qr-code'
import Layout from '@/components/layout/layout'
import Typography from '@mui/material/Typography'
import { useEvent, useTicket } from '@/lib/hooks/use-polybase'
import EventCard from '@/components/event-card'
import TicketCard from '@/components/ticket-card'

export default function Home() {
  const [url, setUrl] = useState('')
  const { createEvent, organizerEvents } = useEvent()
  const { userTickets } = useTicket()

  return (
    <>
      <Layout>
        <FormContainer
          defaultValues={{ name: '' }}
          onSuccess={(data) => {
            console.log(data)
            setUrl(data.name)
          }}
        >
          <TextFieldElement name="name" label="Name" required />
        </FormContainer>
        <div className="flex w-32">
          <QRCode
            style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
            value={url}
          />
        </div>

        <Typography variant="h2" className="flex w-full justify-start">
          Tickets
        </Typography>
        <div className="flex w-full flex-col gap-2">
          {userTickets &&
            userTickets.map((ticket) => (
              <>
                <TicketCard ticket={ticket} />
              </>
            ))}
        </div>
      </Layout>
    </>
  )
}
