import EventCard from '@/components/event-card'
import Layout from '@/components/layout/layout'
import { UploadDropzone } from '@/components/upload-dropzone'
import { usePBAccount, useEvent } from '@/lib/hooks/use-polybase'
import { useStore } from '@/lib/store'
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

interface SubmitData {
  title: string
  description: string
  date: Date | null
  location: string
  image: File
}

export default function Create() {
  const { createEvent, organizerEvents } = useEvent()
  const { accountInfo } = usePBAccount()
  const decryptKey = useStore((state) => state.decryptKey)

  return (
    <Layout>
      <FormContainer
        FormProps={{ className: 'flex w-full flex-col' }}
        defaultValues={{
          title: '',
          description: '',
          date: null,
          location: '',
          image: undefined,
        }}
        onSuccess={(data: SubmitData, e) => {
          e?.preventDefault()
          console.log('🚀 ~ file: create.tsx:101 ~ Create ~ data:', data)

          if (!data.date || !accountInfo.data) return

          // const promise = createEvent({
          //   title: data.title,
          //   description: data.description,
          //   date: String(new Date(data.date).getTime()),
          //   encryptPubKey: accountInfo.data.data.encryptPubKey,
          //   location: data.location,
          // })

          // toast.promise(promise, {
          //   loading: 'Loading',
          //   success: 'Success',
          //   error: (err) => `${err}`,
          // })
        }}
      >
        <Stack spacing={3}>
          <Typography gutterBottom variant="h2" component="div">
            Create new Event
          </Typography>
          
          <UploadDropzone />
          
          {!decryptKey && (
            <Typography gutterBottom variant="body2" component="div">
              Make sure to have generated a encryption keypair first in the profile page.
            </Typography>
          )}
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
        My Events
      </Typography>
      <div className="flex w-full flex-col gap-2">
        {organizerEvents &&
          organizerEvents.map((event) => (
            <>
              <EventCard event={event} />
            </>
          ))}
      </div>
    </Layout>
  )
}
