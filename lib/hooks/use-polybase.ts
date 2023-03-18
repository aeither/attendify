import { Auth } from '@polybase/auth'
import { ethPersonalSignRecoverPublicKey } from '@polybase/eth'
import { usePolybase, useCollection, useRecord } from '@polybase/react'
import { EncryptedDataSecp256k1 } from '@polybase/util'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useStore } from '../store'
import { nanoid } from '../utils'
import { asymEncrypt, asymDecrypt, getUint8Array, genKeys } from '../utils/encrypt'

const auth = typeof window !== 'undefined' ? new Auth() : null

/**
 * Reads
 */

// export const useUserInfo = (pubkey: string | undefined) => {
//   const polybase = usePolybase()
//   const userInfo = useRecord(polybase.collection('User').record(pubkey || ''))
//   return userInfo
// }

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

export function useEncrypt() {
  const polybase = usePolybase()
  const privateKey = useStore((state) => state.privateKey)

  const encrypt = async (publicKey: string, data: string) => {
    return await asymEncrypt(getUint8Array(publicKey), data)
  }

  const decrypt = async (data: EncryptedDataSecp256k1) => {
    if (!privateKey) {
      const { publicKey, privateKey } = await genKeys()
      //
      return await asymDecrypt(privateKey, data)
    }
    return await asymDecrypt(getUint8Array(privateKey), data)
  }

  return {
    encrypt,
    decrypt,
  }
}
/**
 * useEvent
 */
interface CreateEvent {
  // id: string
  title: string
  description: string
  date: number
  location: string
  // participant: string
}

export function useEvent() {
  const polybase = usePolybase()
  const { address } = useAccount()
  const [publicKey, setPublicKey] = useState<string>()

  const events = useCollection(polybase.collection('Event'))

  const createEvent = async (props: CreateEvent) => {
    const { title, description, date, location } = props
    const id = nanoid(16)

    if (!publicKey) {
      throw new Error('PublicKey undefined. Sign in.')
    }
    const res = await polybase
      .collection('Event')
      .create([id, title, description, date, location, publicKey])
    return res
  }

  useEffect(() => {
    if (address) {
      getPublicKey().then((publicKey) => {
        if (publicKey) setPublicKey(publicKey)
      })
    }
  }, [address])

  return {
    events,
    createEvent,
  }
}
/**
 * useAccount
 */

export function useAccount() {
  const polybase = usePolybase()

  const [authed, setAuthed] = useState(false)
  const [name, setName] = useState<string | null | undefined>()
  const [address, setAddress] = useState<string | null | undefined>()

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

  const deleteAccount = async () => {
    const publicKey = await getPublicKey()
    if (!publicKey) return
    const res = await polybase.collection('User').record(publicKey).call('del')
    return res
  }

  const updateName = async (name: string) => {
    const publicKey = await getPublicKey()
    if (!publicKey) return
    const res = await polybase
      .collection('User')
      .record(publicKey)
      .call('setName', [name])

    // Update local user
    setName(res.data.name)
    return res
  }

  useEffect(() => {
    if (!auth) return

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
      let publicKey = authState.publicKey ? authState.publicKey : await getPublicKey()
      if (!publicKey) return

      // Create user if not exists
      try {
        const res = await polybase.collection('User').record(publicKey).get()
        setName(res.data.name)
      } catch (e) {
        const res = await polybase.collection('User').create([publicKey])
        setName(res.data.name)
      }
    })

    return unsub
  }, [])

  return {
    authed,
    address,
    name,
    signIn,
    signOut,
    updateName,
    deleteAccount,
  }
}
