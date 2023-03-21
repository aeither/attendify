import { EventData } from '@/lib/types'
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
  const { date, description, id, location, participants, title } = event.data

  return (
    <>
      <Link className="no-underline" href={`/tickets/${id}`} passHref>
        <Card sx={{ display: 'flex' }}>
          <CardMedia
            component="img"
            sx={{ width: 125 }}
            image="https://placehold.co/400"
            alt={title}
          />
          <CardContent className="flex w-full flex-col justify-between ">
            <div>
              <Typography component="div" variant="h5">
                {title}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" component="div">
                {location}
              </Typography>
            </div>
            <Typography variant="body1" component="div">
              {location}
            </Typography>
          </CardContent>
        </Card>
      </Link>
    </>
  )
}
