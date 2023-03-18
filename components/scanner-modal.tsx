import { Close } from '@mui/icons-material'
import { Box, Dialog } from '@mui/material'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import { QrScanner } from '@yudiel/react-qr-scanner'
import * as React from 'react'
import { toast } from 'sonner'

// TODO: tailwind not working in this component

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

export default function ScannerModal() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Dialog
        fullScreen
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
          <Box position={'absolute'} zIndex="10" top={'0'} right={'0'}>
            <IconButton onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>
          <QrScanner
            containerStyle={{ height: '100%' }}
            onDecode={(result) => {
              console.log(result)
              handleClose()
              toast.success(result)
            }}
            onError={(error) => console.log(error?.message)}
          />
        </Box>
      </Dialog>
    </div>
  )
}
