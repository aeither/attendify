import { Box, Dialog } from '@mui/material'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import * as React from 'react'
import QRCode from 'react-qr-code'
import TicketCard, { TicketCardProps } from './ticket-card'

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function TicketModal({ ticket }: TicketCardProps) {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <div className="flex w-full" onClick={handleOpen}>
        <TicketCard ticket={ticket} />
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
        <Box
          sx={{
            position: 'relative',
            height: '100%',
          }}
        >
          <div className="flex w-32">
            <QRCode
              style={{ height: 'auto', maxWidth: '100%', width: '100%' }}
              value={ticket.data.id}
            />
          </div>
        </Box>
      </Dialog>
    </div>
  )
}
