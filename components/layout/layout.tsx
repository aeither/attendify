import { ControlPoint, Home, LocalActivity, Person } from '@mui/icons-material'
import AppBar from '@mui/material/AppBar'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import * as React from 'react'
import { NextLinkComposed } from '../ui/link'
import ConnectButton from './connect-button'

interface Props {
  children: React.ReactNode
}

export default function Layout({ children }: Props) {
  const router = useRouter()
  const pathname = router.pathname.split('/')[1]

  return (
    <Box sx={{ pb: 7, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <AppBar position="static" className="rounded-none">
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
          <Typography component="div" variant="h3" sx={{ flexGrow: 1 }}>
            ⚪️ Attendify
          </Typography>
          <ConnectButton />
        </Toolbar>
      </AppBar>
      <div className="flex w-full max-w-screen-sm flex-col items-start gap-2 p-4">
        {children}
      </div>
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation showLabels>
          <BottomNavigationAction
            component={NextLinkComposed}
            to={{ pathname: '/' }}
            label="Home"
            icon={<Home />}
            className={clsx(pathname === '' && 'text-white')}
          />
          <BottomNavigationAction
            component={NextLinkComposed}
            to={{ pathname: '/create' }}
            label="Create"
            icon={<ControlPoint />}
            className={clsx(pathname === 'create' && 'text-white')}
          />
          <BottomNavigationAction
            component={NextLinkComposed}
            to={{ pathname: '/tickets' }}
            label="Tickets"
            icon={<LocalActivity />}
            className={clsx(pathname === 'tickets' && 'text-white')}
          />
          <BottomNavigationAction
            component={NextLinkComposed}
            to={{ pathname: '/profile' }}
            label="Profile"
            icon={<Person />}
            className={clsx(pathname === 'profile' && 'text-white')}
          />
        </BottomNavigation>
      </Paper>
    </Box>
  )
}
