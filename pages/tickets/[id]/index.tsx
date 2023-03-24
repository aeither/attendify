import AttendeesModal from '@/components/attendees-modal'
import Layout from '@/components/layout/layout'
import { useEventDetail, useTicket } from '@/lib/hooks/use-polybase'
import { useStore } from '@/lib/store'
import { formatAddress } from '@/lib/utils'
import formatDate from '@/lib/utils/date'
import { AccessTime, LocationCity, People } from '@mui/icons-material'
import ArrowBack from '@mui/icons-material/ArrowBack'
import { Avatar, Chip, IconButton } from '@mui/material'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { toast } from 'sonner'

function stringToColor(string: string) {
  let hash = 0
  let i

  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash)
  }

  let color = '#'

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff
    color += `00${value.toString(16)}`.slice(-2)
  }
  /* eslint-enable no-bitwise */

  return color
}

function stringAvatar(name: string) {
  return {
    sx: {
      bgcolor: stringToColor(name),
    },
    children: `${name.split(' ')[0][0]}`,
  }
}

export default function Home() {
  const router = useRouter()
  const { id } = router.query
  const { data } = useEventDetail(id)
  const { buyTicket } = useTicket()
  const decryptKey = useStore((state) => state.decryptKey)

  return (
    <Layout>
      <IconButton onClick={() => router.back()}>
        <ArrowBack />
      </IconButton>
      {data && (
        <div className="flex w-full flex-col gap-4">
          <div className="relative h-56 w-full">
            <Image
              src={data.data.image}
              alt={data.data.title}
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <Chip label="Free" />
          <Typography variant="h2">{data.data.title}</Typography>
          <div className="flex w-full items-center py-2">
            <Avatar {...stringAvatar(data.data.owner)} />
            <div className="flex flex-col pl-4">
              <Typography variant="subtitle2" color={'text.secondary'}>
                Created by
              </Typography>{' '}
              <Typography variant="body1" className="font-bold">
                {formatAddress(data.data.owner)}
              </Typography>
            </div>
          </div>
          <div className="flex gap-2 text-neutral-300">
            <AccessTime />
            <Typography variant="subtitle1">{formatDate(data.data.date)}</Typography>
          </div>
          <div className="flex gap-2 text-neutral-300">
            <LocationCity />
            <Typography variant="subtitle1">{data.data.location}</Typography>
          </div>
          <AttendeesModal participants={data.data.participants} />

          <div className="flex flex-col gap-2 pb-16">
            <Typography variant="h3">About</Typography>
            <Typography variant="body1" className="text-neutral-300">
              {data.data.description}
            </Typography>
          </div>

          <div className="fixed bottom-20 left-0 right-0 w-full">
            <div className="px-4">
              <Button
                fullWidth
                variant="contained"
                className=""
                onClick={async () => {
                  if (!decryptKey) {
                    toast.error(
                      'Make sure to have generated a encryption keypair first in the profile page.',
                    )
                    return
                  }

                  const res = await buyTicket({
                    type: 'general',
                    encryptedData: 'test data',
                    quantity: 1,
                    price: 0,
                    eventTitle: data.data.title,
                    eventId: data.data.id,
                    image: data.data.image,
                  })
                  if (res) {
                    toast.success('Ticked purchased successfully!')
                    router.push('/tickets')
                  }
                }}
              >
                Buy Ticket
              </Button>{' '}
            </div>
          </div>
        </div>
      )}
    </Layout>
  )
}
