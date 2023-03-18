import * as React from 'react'
import { useTheme } from '@mui/material/styles'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import SkipNextIcon from '@mui/icons-material/SkipNext'
import { EventInfo } from '@/lib/types'

type Props = {
  event: EventInfo
}

export default function EventCard({ event }: Props) {
  console.log('🚀 ~ file: event-card.tsx:19 ~ EventCard ~ event:', event)
  const { date, description, id, location, participants, title } = event.data

  return (
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
  )
}
