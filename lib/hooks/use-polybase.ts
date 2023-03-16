import { Auth } from '@polybase/auth'
import { ethPersonalSignRecoverPublicKey } from '@polybase/eth'
import { usePolybase, useCollection, useRecord } from '@polybase/react'
import { EncryptedDataSecp256k1 } from '@polybase/util'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'
import { useStore } from '../store'
import { asymEncrypt, asymDecrypt, getUint8Array, genKeys } from '../utils/encrypt'

const auth = typeof window !== 'undefined' ? new Auth() : null

/**
 * Utility
 */

async function getPublicKey() {
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
 * useAccount
 */

export function useAccount() {
  const polybase = usePolybase()

  const [authed, setAuthed] = useState(false)
  const [name, setName] = useState('')
  const [address, setAddress] = useState<string | null | undefined>()
  // const { data, error, loading } = useRecord<string>(
  //   polybase.collection('users').record('id'),
  // )
  const signIn = async () => {
    if (!auth) return
    const res = await auth.signIn()
    if (!res) return
    toast('Logged in')
  }

  const signOut = async () => {
    if (!auth) return
    const res = await auth.signOut()
    if (res) return
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
