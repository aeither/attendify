import { Attest } from '@/components/attest'
import Layout from '@/components/layout/layout'
import { useEvent } from '@/lib/hooks/use-polybase'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import {
  DateTimePickerElement,
  FormContainer,
  TextFieldElement,
} from 'react-hook-form-mui'
import { toast } from 'sonner'
import EventCard from '@/components/event-card'

interface SubmitData {
  title: string
  description: string
  date: Date | null
  location: string
}

export default function Create() {
  const { createEvent, organizerEvents } = useEvent()

  return (
    <>
      <Layout>

        <FormContainer
          FormProps={{ className: 'flex w-full flex-col' }}
          defaultValues={{ title: '', description: '', date: null, location: '' }}
          onSuccess={(data: SubmitData, e) => {
            e?.preventDefault()

            if (!data.date) return

            const promise = createEvent({
              title: data.title,
              description: data.description,
              date: String(new Date(data.date).getTime()),
              location: data.location,
            })

            toast.promise(promise, {
              loading: 'Loading',
              success: 'Success',
              error: 'Error',
            })
          }}
        >
          <Stack spacing={3}>
            <Typography gutterBottom variant="h2" component="div">
              Create new Event
            </Typography>
            <TextFieldElement name="title" label="Title" margin="normal" required />
            <TextFieldElement
              name="description"
              label="Description"
              margin="normal"
              required
            />
            <DateTimePickerElement name="date" label="Date" required />
            <TextFieldElement name="location" label="Location" margin="normal" required />
            <Button type="submit" variant="contained">
              Create Event
            </Button>
          </Stack>
        </FormContainer>

        <Divider className="h-4" />

        <Typography variant="h2" className="flex w-full justify-start">
          Events
        </Typography>
        <div className="flex w-full flex-col gap-2">
          {organizerEvents &&
            organizerEvents.map((event) => (
              <>
                <EventCard event={event} />
              </>
            ))}
        </div>

        <Attest />
      </Layout>
    </>
  )
}
