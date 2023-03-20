import Layout from '@/components/layout/layout'
import ScannerModal from '@/components/scanner-modal'
import { useAccount, useEventDetail, useTicket } from '@/lib/hooks/use-polybase'
import { useStore } from '@/lib/store'
import formatDate from '@/lib/utils/date'
import { asymDecrypt, asymEncrypt } from '@/lib/utils/encrypt'
import { AccessTime, LocationCity, People } from '@mui/icons-material'
import ArrowBack from '@mui/icons-material/ArrowBack'
import { IconButton } from '@mui/material'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { decodeFromString, EncryptedDataSecp256k1 } from '@polybase/util'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { toast } from 'sonner'

export default function Home() {
  const router = useRouter()
  const { id } = router.query
  const { data } = useEventDetail(id)
  const { buyTicket } = useTicket()
  const localPubKey = useStore((state) => state.publicKey)
  const decryptKey = useStore((state) => state.decryptKey)
  const [verifier, setVerifier] = useState<EncryptedDataSecp256k1>()

  const EncryptComp = () => {
    const { accountInfo } = useAccount()

    return (
      <>
        {data && (
          <div className="flex gap-2">
            <Typography variant="h2">Encrypt</Typography>

            <Button
              onClick={async () => {
                if (!accountInfo.data) return

                const encryptedData = await asymEncrypt(
                  decodeFromString(accountInfo.data.data.encryptPubKey, 'hex'),
                  'test data',
                )
                setVerifier(encryptedData)
                console.log('🚀 encryptedData:', encryptedData)
              }}
              variant="contained"
            >
              Encrypt
            </Button>

            <Button
              onClick={async () => {
                console.log('🚀 decryptKey:', decryptKey)
                if (!decryptKey || !verifier) return
                const dataInfo = await asymDecrypt(
                  decodeFromString(decryptKey, 'hex'),
                  verifier,
                )
                console.log('🚀 dataInfo:', dataInfo)
              }}
              variant="contained"
            >
              Decrypt
            </Button>
          </div>
        )}
      </>
    )
  }

  return (
    <>
      <Layout>
        <IconButton onClick={() => router.back()}>
          <ArrowBack />
        </IconButton>
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
            <div className="flex gap-2 text-slate-300">
              <People />
              <Typography variant="subtitle1">
                {data.data.participants.length} Attendee(s)
              </Typography>
            </div>
            <Typography variant="h2">About</Typography>
            <Typography variant="body1" className=" text-slate-300">
              {data.data.description}
            </Typography>

            {/* <EncryptComp /> */}

            {/* to be removed */}
            <Button
              variant="contained"
              onClick={async () => {
                await buyTicket({
                  type: 'general',
                  encryptedData: 'test data',
                  quantity: 1,
                  price: 0,
                  eventTitle: data.data.title,
                  eventId: data.data.id,
                })
                toast.success('Ticked purchased successfully!')
                router.push('/tickets')
              }}
            >
              Buy Ticket
            </Button>

            <div className="flex w-full flex-col">
              {data.data.owner === localPubKey ? (
                <ScannerModal />
              ) : (
                <Button
                  variant="contained"
                  onClick={async () => {
                    await buyTicket({
                      type: 'general',
                      encryptedData: 'test data',
                      quantity: 1,
                      price: 0,
                      eventTitle: data.data.title,
                      eventId: data.data.id,
                    })
                    toast.success('Ticked purchased successfully!')
                    router.push('/tickets')
                  }}
                >
                  Buy Ticket
                </Button>
              )}
            </div>
          </div>
        )}
      </Layout>
    </>
  )
}
