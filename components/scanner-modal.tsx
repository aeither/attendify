import Button from '@mui/material/Button'
import Modal from '@mui/material/Modal'
import { QrScanner } from '@yudiel/react-qr-scanner'
import * as React from 'react'
import { toast } from 'sonner'

export default function ScannerModal() {
  const [open, setOpen] = React.useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <div>
      <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="flex max-w-xs">
          <QrScanner
            onDecode={(result) => {
              console.log(result)
              handleClose()
              toast.success(result)
            }}
            onError={(error) => console.log(error?.message)}
          />
        </div>
      </Modal>
    </div>
  )
}
