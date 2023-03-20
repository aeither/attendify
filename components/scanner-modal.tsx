import { useStore } from '@/lib/store'
import { asymDecrypt } from '@/lib/utils/encrypt'
import { Close } from '@mui/icons-material'
import { Box, Dialog, Stack, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Slide from '@mui/material/Slide'
import { TransitionProps } from '@mui/material/transitions'
import {
  decodeFromString,
  EncryptedDataSecp256k1,
  parseEncrypedData,
} from '@polybase/util'
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
  const [decryptedContent, setDecryptedContent] = React.useState<string>()
  const decryptKey = useStore((state) => state.decryptKey)
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <Button variant="contained" onClick={handleOpen}>
        Scan QR
      </Button>
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
          {decryptedContent && (
            <Box
              zIndex="10"
              sx={{
                position: 'absolute',
                bottom: '10%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            >
              <Stack spacing={2}>
                <Typography>{decryptedContent}</Typography>
                <Button
                  variant="contained"
                  onClick={() => {
                    // if (result === 'decoded event id with owner key') console.log(result)
                    // update db and attest to user address event info

                    setDecryptedContent(undefined)
                    // handleClose()
                    toast.success('Success')
                  }}
                >
                  Attest
                </Button>
              </Stack>
            </Box>
          )}
          <QrScanner
            containerStyle={{ height: '100%' }}
            onDecode={async (result) => {
              if (!decryptKey) return

              const decryptedData = parseEncrypedData(
                result,
                'base64',
              ) as EncryptedDataSecp256k1
              const msg = await asymDecrypt(
                decodeFromString(decryptKey, 'hex'),
                decryptedData,
              )
              setDecryptedContent(msg)
            }}
            onError={(error) => console.log(error?.message)}
          />
        </Box>
      </Dialog>
    </>
  )
}
