import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard'
import { usePBAccount } from '@/lib/hooks/use-polybase'
import { CheckCircleOutline, ContentCopy } from '@mui/icons-material'
import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import * as React from 'react'

export default function ConnectButton() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const { authed, signIn, signOut, updateName, address, name, deleteAccount } =
    usePBAccount()
  const { copyToClipboard, hasCopied } = useCopyToClipboard()

  return (
    <>
      {authed && address ? (
        <>
          <Button
            id="basic-button"
            variant="text"
            color="secondary"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            {name || 'Anonymous'}
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={() => copyToClipboard(address)}>
              {hasCopied ? (
                <div className="flex items-center justify-center gap-2">
                  Copy address
                  <CheckCircleOutline fontSize="small" />
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  Copy address
                  <ContentCopy fontSize="small" />
                </div>
              )}
            </MenuItem>
            <MenuItem onClick={signOut}>Logout</MenuItem>
          </Menu>
        </>
      ) : (
        <Button onClick={signIn} variant="contained">
          Login
        </Button>
      )}
    </>
  )
}
