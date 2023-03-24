import { AttestationsQuery } from '@/lib/graphql/generated'
import { formatAddress, timeAgo } from '@/lib/utils'
import { parseString } from '@/lib/utils/atst'
import { Stack } from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import * as React from 'react'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 2 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

export default function AttestationTabs({
  recievedAts,
  givenAts,
}: {
  recievedAts: AttestationsQuery | undefined
  givenAts: AttestationsQuery | undefined
}) {
  const [value, setValue] = React.useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Typography gutterBottom variant="h2" component="div">
        Attestations
      </Typography>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={value}
          variant={'fullWidth'}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Received" {...a11yProps(0)} />
          <Tab label="Given" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Stack spacing={2}>
          {recievedAts?.attestations.map((atst) => (
            <Card key={atst.id} sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h4">{parseString(atst.val as any)}</Typography>
                <div className="flex w-full justify-between pt-1">
                  <Typography variant="body1" color={'text.secondary'}>
                    From {formatAddress(atst.creator)}
                  </Typography>
                  <Typography variant="body2" color={'text.secondary'}>
                    {timeAgo(atst.blockTimestamp, false)}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Stack spacing={2}>
          {givenAts?.attestations.map((atst) => (
            <Card key={atst.id} sx={{ minWidth: 275 }}>
              <CardContent>
                <Typography variant="h4">{parseString(atst.val as any)}</Typography>
                <div className="flex w-full justify-between pt-1">
                  <Typography variant="body1" color={'text.secondary'}>
                    To {formatAddress(atst.about)}
                  </Typography>
                  <Typography variant="body2" color={'text.secondary'}>
                    {timeAgo(atst.blockTimestamp, false)}
                  </Typography>
                </div>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </TabPanel>
    </Box>
  )
}
