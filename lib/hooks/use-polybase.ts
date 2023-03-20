import { Auth } from '@polybase/auth'
import { ethPersonalSignRecoverPublicKey } from '@polybase/eth'
import { useCollection, usePolybase, useRecord } from '@polybase/react'
import {
  addPublicKeyPrefix,
  decodeFromString,
  encodeToString,
  stringifyEncryptedData,
} from '@polybase/util'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useStore } from '../store'
import { TicketEncryptedData, EventData, TicketData, UserData } from '../types'
import { nanoid } from '../utils'
import { asymEncrypt } from '../utils/encrypt'

const auth = typeof window !== 'undefined' ? new Auth() : null

/**
 * Reads
 */

export const useEventDetail = (id: string | string[] | undefined) => {
  const polybase = usePolybase()
  const eventDetail = useRecord<EventData>(
    typeof id === 'string' ? polybase.collection('Event').record(id) : null,
  )
  return eventDetail
}

/**
 * Utility
 */

export async function getPublicKey() {
  if (!auth) return
  const msg = 'Login to app'
  const sig = await auth.ethPersonalSign(msg)
  const publicKey = ethPersonalSignRecoverPublicKey(sig, msg)
  return '0x' + publicKey.slice(4)
}

/**
 * Encrypt data
 */

// export function useEncrypt() {
//   const polybase = usePolybase()
//   const privateKey = useStore((state) => state.privateKey)

//   const encrypt = async (publicKey: string, data: string) => {
//     return await asymEncrypt(getUint8Array(publicKey), data)
//   }

//   const decrypt = async (data: EncryptedDataSecp256k1) => {
//     if (!privateKey) {
//       const { publicKey, privateKey } = await genKeys()
//       //
//       return await asymDecrypt(privateKey, data)
//     }
//     return await asymDecrypt(getUint8Array(privateKey), data)
//   }

//   return {
//     encrypt,
//     decrypt,
//   }
// }

/**
 * useTicket
 */

export function useTicket() {
  const polybase = usePolybase()
  const localPubKey = useStore((state) => state.publicKey)
  const { accountInfo, address } = usePBAccount()

  const userTickets = useCollection<TicketData>(
    localPubKey ? polybase.collection('Ticket').where('userId', '==', localPubKey) : null,
  )

  const buyTicket = async (props: Omit<TicketData, 'id' | 'userId'>) => {
    const { type, price, quantity, eventTitle, eventId } = props
    const id = nanoid(16)

    const publicKey = localPubKey || (await getPublicKey())
    if (!publicKey) {
      throw new Error('PublicKey undefined. Sign in.')
    }

    if (!accountInfo.data) {
      throw new Error('accountInfo undefined. Sign in.')
    }

    if (!address) {
      throw new Error('address undefined. Sign in.')
    }

    const dataToBeEncrypted: TicketEncryptedData = {
      tickedId: id,
      eventId,
      eventTitle,
      address: address,
    }

    const encryptedData = await asymEncrypt(
      decodeFromString(accountInfo.data.data.encryptPubKey, 'hex'),
      JSON.stringify(dataToBeEncrypted),
    )

    const res = await polybase
      .collection('Ticket')
      .create([
        id,
        stringifyEncryptedData(encryptedData, 'base64'),
        type,
        price,
        quantity,
        eventTitle,
        eventId,
        publicKey,
      ])
    return res
  }

  return {
    userTickets: (userTickets.data && userTickets.data.data) || undefined,
    buyTicket,
  }
}

/**
 * useEvent
 */

export function useEvent() {
  const polybase = usePolybase()
  const localPubKey = useStore((state) => state.publicKey)

  const events = useCollection<EventData>(polybase.collection('Event'))

  const organizerEvents = useCollection<EventData>(
    localPubKey ? polybase.collection('Event').where('owner', '==', localPubKey) : null,
  )

  const createEvent = async (props: Omit<EventData, 'id' | 'owner' | 'participants'>) => {
    const { title, description, encryptPubKey, date, location } = props
    const id = nanoid(16)

    const publicKey = localPubKey || (await getPublicKey())
    if (!publicKey) {
      throw new Error('PublicKey undefined. Sign in.')
    }

    const res = await polybase
      .collection('Event')
      .create([
        id,
        title,
        description,
        date,
        location,
        encryptPubKey,
        publicKey,
        publicKey,
      ])
    return res
  }

  return {
    events: (events.data && events.data.data) || undefined,
    organizerEvents: (organizerEvents.data && organizerEvents.data.data) || undefined,
    createEvent,
  }
}

/**
 * useAccount
 */
export function usePBAccount() {
  const polybase = usePolybase()

  const [authed, setAuthed] = useState(false)
  const [name, setName] = useState<string | null | undefined>()
  const [address, setAddress] = useState<string | null | undefined>()

  const localPubKey = useStore((state) => state.publicKey)
  const setLocalPubKey = useStore((state) => state.setPublicKey)

  const signIn = async () => {
    if (!auth) return
    const res = await auth.signIn()
    if (!res) return
    toast('Logged in')
  }

  const signOut = async () => {
    if (!auth) return
    await auth.signOut()
    toast('Logged out')
  }

  const accountInfo = useRecord(
    localPubKey ? polybase.collection<UserData>('User').record(localPubKey) : null,
  )

  const deleteAccount = async () => {
    const publicKey = localPubKey || (await getPublicKey())
    if (!publicKey) return
    const res = await polybase.collection('User').record(publicKey).call('del')
    return res
  }

  const updateName = async (name: string) => {
    const publicKey = localPubKey || (await getPublicKey())
    if (!publicKey) return
    const res = await polybase
      .collection('User')
      .record(publicKey)
      .call('setName', [name])

    // Update local user
    setName(res.data.name)
    return res
  }

  const updateEncryptPubKey = async (encryptionPubKey: Uint8Array) => {
    const publicKey = localPubKey || (await getPublicKey())
    if (!publicKey) return

    const res = await polybase
      .collection('User')
      .record(publicKey)
      .call('setEncryptPubKey', [
        encodeToString(addPublicKeyPrefix(encryptionPubKey), 'hex'),
      ])

    // Update local user
    setName(res.data.name)
    return res
  }

  useEffect(() => {
    if (!auth) {
      setLocalPubKey(undefined)
      return
    }

    const unsub = auth.onAuthUpdate(async (authState) => {
      setAuthed(!!authState)

      if (!authState) return

      // If login
      setAddress(authState.userId)
      polybase.signer(async (data) => {
        return {
          h: 'eth-personal-sign',
          sig: await auth.ethPersonalSign(data),
        }
      })

      // get public
      // authState.publicKey contain pubkey only for Metamask
      let publicKey = localPubKey ? localPubKey : await getPublicKey()
      if (!publicKey) return

      // Create user if not exists
      try {
        const res = await polybase.collection('User').record(publicKey).get()
        setName(res.data.name)
      } catch (e) {
        const res = await polybase.collection('User').create([publicKey])
        setName(res.data.name)
      }

      setLocalPubKey(publicKey)
    })

    return unsub
  }, [])

  return {
    authed,
    address,
    name,
    signIn,
    signOut,
    accountInfo,
    updateName,
    updateEncryptPubKey,
    deleteAccount,
  }
}
