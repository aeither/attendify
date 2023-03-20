import { TicketData } from '@/lib/types'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { CollectionRecordResponse } from '@polybase/client'

export type TicketCardProps = {
  ticket: CollectionRecordResponse<TicketData>
}

export default function TicketCard({ ticket }: TicketCardProps) {
  const { type, price, quantity, eventId, eventTitle } = ticket.data

  return (
    <Card className="flex w-full hover:cursor-pointer">
      <CardMedia
        component="img"
        sx={{ width: 125 }}
        image="https://placehold.co/400"
        alt={eventTitle}
      />
      <CardContent className="flex w-full flex-col justify-between ">
        <div>
          <Typography component="div" variant="h5">
            {eventTitle}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            event{eventId}
          </Typography>
        </div>
        <Typography variant="body1" component="div">
          {type}
        </Typography>
      </CardContent>
    </Card>
  )
}
