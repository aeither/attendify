import { EventData } from '@/lib/types'
import formatDate from '@/lib/utils/date'
import { People } from '@mui/icons-material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CollectionRecordResponse } from '@polybase/client'
import Link from 'next/link'

type Props = {
  event: CollectionRecordResponse<EventData>
}

export default function EventCard({ event }: Props) {
  const { date, description, id, location, participants, title, image } = event.data

  return (
    <>
      <Link className="no-underline" href={`/tickets/${id}`} passHref>
        <Card sx={{ display: 'flex' }}>
          <CardMedia
            component="img"
            sx={{ width: 125 }}
            image={image || 'https://placehold.co/400'}
            alt={title}
          />
          <CardContent className="flex w-full flex-col justify-between ">
            <div>
              <Typography variant="subtitle1" color="primary">
                {formatDate(date)}
              </Typography>
              <Typography component="div" variant="h3" className="font-bold">
                {title}
              </Typography>
              <Typography variant="body1" color="text.secondary" component="div">
                {location}
              </Typography>
            </div>
            <div className="flex items-end gap-2 text-neutral-300">
              <People className="text-md" />
              <Typography variant="body1" component="div" className="pt-4">
                {participants.length} Participant(s)
              </Typography>
            </div>
          </CardContent>
        </Card>
      </Link>
    </>
  )
}
