import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard'
import { useAccount } from '@/lib/hooks/use-polybase'
import { CheckCircleOutline, ContentCopy } from '@mui/icons-material'
import ArchiveIcon from '@mui/icons-material/Archive'
import FavoriteIcon from '@mui/icons-material/Favorite'
import RestoreIcon from '@mui/icons-material/Restore'
import AppBar from '@mui/material/AppBar'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import ConnectButton from './connect-button'

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  const [value, setValue] = React.useState(0)
  const { authed, signIn, signOut, updateName, address, name, deleteAccount } =
    useAccount()
  const { copyToClipboard, hasCopied } = useCopyToClipboard()

  return (
    <Box sx={{ pb: 7 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Attendify
          </Typography>
          <ConnectButton />
        </Toolbar>
      </AppBar>
      {children}
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue)
          }}
        >
          <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction label="Favorites" icon={<FavoriteIcon />} />
          <BottomNavigationAction label="Archive" icon={<ArchiveIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  )
}
