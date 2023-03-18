import Layout from '@/components/layout/layout'
import { useEventDetail } from '@/lib/hooks/use-polybase'
import formatDate from '@/lib/utils/date'
import { AccessTime, LocationCity } from '@mui/icons-material'
import ArrowBack from '@mui/icons-material/ArrowBack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Image from 'next/image'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  const { id } = router.query
  const { data } = useEventDetail(id)
  console.log('🚀 ~ file: index.tsx:12 ~ Home ~ data:', data)
  const xxx = new Date()
  return (
    <>
      <Layout>
        <ArrowBack />
        {data && (
          <div className="flex w-full flex-col gap-2">
            <div className="relative h-56 w-full">
              <Image
                src="https://placehold.co/400"
                alt=""
                fill
                className="object-cover"
              />
            </div>
            <div className="flex gap-2 text-slate-300">
              <AccessTime />
              <Typography variant="subtitle1">{formatDate(data.data.date)}</Typography>
            </div>
            <div className="flex gap-2 text-slate-300">
              <LocationCity />
              <Typography variant="subtitle1">{data.data.location}</Typography>
            </div>
            <Typography variant="h2">About</Typography>
            <Typography variant="body1" className=" text-slate-300">
              {data.data.description}
            </Typography>
          </div>
        )}

        <Button variant="contained">Buy Ticket</Button>
      </Layout>
    </>
  )
}
