import { formatAddress } from '@/lib/utils'
import { People } from '@mui/icons-material'
import { Dialog, DialogContent, DialogTitle, List, Typography } from '@mui/material'
import ListItem from '@mui/material/ListItem'
import ListItemText from '@mui/material/ListItemText'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import Link from 'next/link'
import * as React from 'react'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function TicketModal({ participants }: { participants: string[] }) {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <div className="flex gap-2 text-neutral-300" onClick={handleOpen}>
        <People />
        <Typography variant="subtitle1" className="underline">
          {participants.length} Attendee(s)
        </Typography>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <DialogTitle>
          <Typography variant="h2">Attendees</Typography>
        </DialogTitle>
        <DialogContent>
          <List>
            {participants.map((participant: string, i) => (
              <Link
                key={i}
                className="text-white"
                href={`/profile/${participant}`}
                passHref
              >
                <ListItem alignItems="flex-start">
                  <ListItemText
                    sx={{ color: 'white' }}
                    primary={formatAddress(participant)}
                  />
                </ListItem>
              </Link>
            ))}
          </List>
        </DialogContent>
      </Dialog>
    </>
  )
}
